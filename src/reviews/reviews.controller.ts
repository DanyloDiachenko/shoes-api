import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewDto } from "./dto/review.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FindOneParamsDto } from "src/helpers/find-one-params.dto";

@ApiTags("reviews")
@Controller("reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiOperation({ summary: "Create a new review" })
    @ApiBody({ type: CreateReviewDto })
    @ApiResponse({
        status: 201,
        description: "Review created successfully",
        type: ReviewDto,
    })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async create(@Body() createReviewDto: CreateReviewDto, @Req() req: any) {
        return await this.reviewsService.create(createReviewDto, req.user);
    }

    @Post("benefit/:id/:type")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Change the benefit of a review" })
    @ApiResponse({
        status: 201,
        description: "Review benefit changed successfully",
        type: ReviewDto,
    })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    async changeBenefit(
        @Param() params: FindOneParamsDto,
        @Param("type") type: "increase" | "decrease",
    ) {
        return await this.reviewsService.changeBenefit(params.id, type);
    }
}
