import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IUser } from "src/types/user.interface";
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
import { AuthResponseDto } from "./dto/auth-response.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { RegisterDto } from "./dto/register.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";

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
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: "User or password are incorrect / Unathorized",
    })
    @ApiResponse({ status: 400, description: "User not found" })
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post("register")
    @ApiOperation({ summary: "User register" })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 201,
        description: "Register successful",
        type: AuthResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: "User already exists",
    })
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
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
    async getProfile(@Request() req: any) {
        return this.authService.getProfile(req.user.email);
    }

    @Post("google-login")
    @ApiOperation({ summary: "Google login" })
    @ApiBody({ type: AuthResponseDto })
    @ApiResponse({
        status: 201,
        description: "Authentification with googlesuccessful",
    })
    @ApiResponse({
        status: 401,
        description: "Google token is invalid",
    })
    async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
        return await this.authService.googleLogin(googleLoginDto.token);
    }
}
