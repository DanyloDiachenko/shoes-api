import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IUser } from "types/user.interface";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: "User login" })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 201,
        description: "Login successful",
        type: LoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: "User or password are incorrect / Unathorized",
    })
    @ApiResponse({ status: 400, description: "User not found" })
    async login(@Request() req: { user: IUser }) {
        return await this.authService.login(req.user);
    }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get user profile" })
    @ApiResponse({
        status: 200,
        description: "Return user profile",
        type: ProfileResponseDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async getProfile(@Request() req: { user: IUser }) {
        return req.user;
    }
}
