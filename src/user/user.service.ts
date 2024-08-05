import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entites/user.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });

        if (existingUser) {
            throw new BadRequestException("This email already exist");
        }

        const createdUser = await this.usersRepository.save({
            email: createUserDto.email,
            passwordHash: await argon2.hash(createUserDto.password),
        });

        const token = this.jwtService.sign({
            email: createUserDto.email,
        });

        return {
            createdUser,
            token,
        };
    }
}
