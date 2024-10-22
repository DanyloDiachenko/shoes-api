import {
    Body,
    Controller,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
} from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUser } from "src/types/user.interface";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("create")
    @ApiOperation({ summary: "Create a new user" })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: "User created successfully",
        type: UserDto,
    })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Put("update")
    @ApiOperation({ summary: "Update a user" })
    @ApiBody({ type: UpdateUserDto })
    @ApiBearerAuth()
    @ApiResponse({
        status: 201,
        description: "User updated successfully",
        type: UserDto,
    })
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 400, description: "Bad Request" })
    async update(
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: { user: FindOneParamsDto },
    ) {
        return await this.usersService.update(updateUserDto, req.user.id);
    }
}
