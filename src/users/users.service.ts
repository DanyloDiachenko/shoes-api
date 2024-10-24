import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entites/user.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import * as argon2 from "argon2";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
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
            throw new BadRequestException("This email already exists");
        }

        const createdUser = await this.usersRepository.save({
            email: createUserDto.email,
            passwordHash: createUserDto.password
                ? await argon2.hash(createUserDto.password)
                : null,
        });

        const token = this.jwtService.sign({
            email: createUserDto.email,
            
        });

        const { passwordHash, ...createdUserWithoutPassword } = createdUser;

        return {
            ...createdUserWithoutPassword,
            token,
        };
    }

    async update(updateUserDto: UpdateUserDto, userId: string) {
        const userToUpdate = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!userToUpdate) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        if (updateUserDto.passwordNew) {
            const isPasswordsMatched = await argon2.verify(
                userToUpdate.passwordHash,
                updateUserDto.passwordPrev,
            );

            if (!isPasswordsMatched) {
                throw new BadRequestException("Previous password is incorrect");
            }
            userToUpdate.passwordHash = await argon2.hash(
                updateUserDto.passwordNew,
            );
        }

        const updatedUser = this.usersRepository.merge(
            userToUpdate,
            updateUserDto,
        );

        await this.usersRepository.save(updatedUser);

        const { passwordHash, ...updatedUserWithoutPassword } = updatedUser;

        return {
            ...updatedUserWithoutPassword,
        };
    }

    async findOne(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
            relations: ["shippingAddress", "billingAddress", "favorites", "orders", "reviews"],
        });
    }
}
