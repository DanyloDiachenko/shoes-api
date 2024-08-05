import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as argon2 from "argon2";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserEntity } from "src/users/entites/user.entity";
import { IUser } from "types/user.interface";

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

    async login(user: IUser) {
        const { id, email } = user;

        return {
            id,
            email,
            token: this.jwtService.sign({ id, email }),
        };
    }
}
