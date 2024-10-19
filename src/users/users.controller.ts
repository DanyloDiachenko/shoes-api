import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";

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
}
