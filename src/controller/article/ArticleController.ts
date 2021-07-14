import { ArticleService } from "../../service/article/ArticleService";
import { Body, Get, HttpCode, JsonController, Param, Post, QueryParams, Res } from "routing-controllers";
import { Response } from "express";
import { ArticleCreateParam } from "../../service/article/dto/ArticleCreateParam";
import logger from "../../config/logger";
import { ArticleSearchRequest } from "./dto/ArticleSearchRequest";

@JsonController("/article")
export class ArticleController {
    constructor(private articleService: ArticleService) {
    }

    @HttpCode(200)
    @Get("/search")
    public async search(@QueryParams() param: ArticleSearchRequest, @Res() res: Response) {
        try {
            return await this.articleService.search(param);
        } catch (e) {
            logger.error("에러 발생", e);
            return e.message;
        }
    }

    @HttpCode(200)
    @Get("/search-more")
    public async searchMore(@QueryParams() param: ArticleSearchRequest, @Res() res: Response) {
        try {
            return await this.articleService.searchMore(param);
        } catch (e) {
            logger.error("에러 발생", e);
            return e.message;
        }
    }

    @HttpCode(200)
    @Get("/")
    public async get(@Res() res: Response) {
        try {
            return await this.articleService.findAll();
        } catch (e) {
            logger.error("에러 발생", e);
            return e.message;
        }
    }

    @HttpCode(200)
    @Post("/")
    public async create(
        @Body() createDto: ArticleCreateParam,
        @Res() res: Response,
    ) {
        try {
            return await this.articleService.create(createDto, null);
        } catch (e) {
            logger.error("에러 발생", e);
            return e.message;
        }
    }

    @HttpCode(200)
    @Post("/:id/publish")
    public async publish(
        @Param("id") id: number,
        @Res() res: Response,
    ) {
        return await this.articleService.publish(id, null);
    }
}
