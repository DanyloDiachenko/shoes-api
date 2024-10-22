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
import { LoginResponseDto } from "./dto/login-response.dto";
import { ProfileResponseDto } from "./dto/profile-response.dto";
import { GoogleLoginDto } from "./dto/google-login.dto";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";

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
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
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
    @ApiBody({ type: GoogleLoginDto })
    @ApiResponse({
        status: 201,
        description: "Login successful",
    })
    @ApiResponse({
        status: 401,
        description: "Google token is invalid",
    })
    async googleLogin(@Body() googleLoginDto: GoogleLoginDto) {
        const user = await this.authService.validateGoogleUser(
            googleLoginDto.token,
        );

        if (!user) {
            throw new UnauthorizedException(
                "Invalid Google token on controller",
            );
        }

        return this.authService.loginWithGoogle(user);
    }
}
