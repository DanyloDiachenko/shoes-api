import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as argon2 from "argon2";
import { IUser } from "src/types/user.interface";
import { LoginDto } from "./dto/login.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "./dto/register.dto";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.googleClient = new OAuth2Client(
            this.configService.get("GOOGLE_CLIENT_ID"),
        );
    }

    async validateUser(email: string, password: string) {
        const findedUser = await this.usersService.findOne(email);

        if (!findedUser) {
            throw new BadRequestException("User not found");
        }

        if (findedUser.passwordHash == null) {
            return findedUser;
        }

        const isPasswordsMatched = await argon2.verify(
            findedUser.passwordHash,
            password,
        );

        if (findedUser && isPasswordsMatched) {
            return findedUser;
        }

        throw new UnauthorizedException("User or password are incorrect");
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const findedUser = await this.usersService.findOne(email);
        if (!findedUser) {
            throw new UnauthorizedException("User not found");
        }

        if (findedUser.passwordHash == null) {
            throw new BadRequestException("Please, sign in with Google");
        }

        const isPasswordsMatched = await argon2.verify(
            findedUser.passwordHash,
            password,
        );
        if (!isPasswordsMatched) {
            throw new UnauthorizedException("Password is incorrect");
        }

        const expiresIn = this.configService.get(
            loginDto
                ? "TOKEN_EXPIRES_IN_REMEMBER_ME"
                : "TOKEN_EXPIRES_IN_NOT_REMEMBER_ME",
        );

        const token = await this.jwtService.signAsync(
            {
                id: findedUser.id,
                email,
            },
            {
                expiresIn,
            },
        );

        return {
            token: token,
        };
    }

    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto;

        const findedUser = await this.usersService.findOne(email);
        if (findedUser) {
            throw new BadRequestException("User already exists");
        }

        const hashedPassword = await argon2.hash(password);
        await this.usersService.create({
            email,
            password: hashedPassword,
        });

        return await this.login({ email, password });
    }

    async getProfile(email: string) {
        const user = await this.usersService.findOne(email);
        if (!user) {
            throw new BadRequestException("User not found");
        }

        const { passwordHash, ...userWithoutPassword } = user;

        return { ...userWithoutPassword };
    }

    async googleLogin(token: string) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: this.configService.get("GOOGLE_CLIENT_ID"),
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new UnauthorizedException("Google token is invalid");
        }

        const user = await this.usersService.findOne(payload.email);
        if (user) {
            return await this.login({
                email: user.email,
                password: process.env.GOOGLE_DEFAULT_PASSWORD,
            });
        } else {
            const hashedPassword = await argon2.hash(
                this.configService.get(process.env.GOOGLE_DEFAULT_PASSWORD),
            );

            const newUser = await this.usersService.create({
                email: payload.email,
                password: hashedPassword,
                firstName: payload.given_name,
                lastName: payload.family_name,
            });

            return await this.login({
                email: newUser.email,
                password: this.configService.get("GOOGLE_DEFAULT_PASSWORD"),
            });
        }
    }
}
