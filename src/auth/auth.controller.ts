import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/users/entites/user.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { IUser } from "types/user.interface";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: { user: IUser }) {
        return await this.authService.login(req.user);
    }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req: { user: IUser }) {
        return req.user;
    }
}
