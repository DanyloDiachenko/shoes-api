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

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const findedUser = await this.usersService.findOne(email);

        if (!findedUser) {
            throw new BadRequestException("User not found");
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

    async login(user: LoginDto) {
        const { email, password } = user;

        const findedUser = await this.usersService.findOne(email);
        if (!findedUser) {
            throw new UnauthorizedException("User not found");
        }

        const isPasswordsMatched = await argon2.verify(
            findedUser.passwordHash,
            password,
        );
        if (!isPasswordsMatched) {
            throw new UnauthorizedException("User or password are incorrect");
        }

        return {
            id: findedUser.id,
            email: findedUser.email,
            token: this.jwtService.sign({ id: findedUser.id, email }),
        };
    }
}
