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
import { OAuth2Client } from "google-auth-library";
import { ConfigService } from "@nestjs/config";

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

        return {
            id: findedUser.id,
            email: findedUser.email,
            token: this.jwtService.sign({ id: findedUser.id, email }),
        };
    }

    async validateGoogleUser(accessToken: string) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/oauth2/v3/userinfo`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            const payload = await response.json();

            if (!payload || !payload.email) {
                throw new UnauthorizedException("Invalid Google token 89");
            }

            let user = await this.usersService.findOne(payload.email);
            if (!user) {
                user = await this.usersService.create({
                    email: payload.email,
                    password: null,
                });
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException("Invalid Google token catch");
        }
    }

    async loginWithGoogle(user) {
        return {
            id: user.id,
            email: user.email,
            token: this.jwtService.sign({ id: user.id, email: user.email }),
        };
    }

    async getProfile(userEmail: string) {
        const user = await this.usersService.findOne(userEmail);

        const { passwordHash, ...userWithoutPassword } = user;

        return { ...userWithoutPassword };
    }
}
