import {ArticleService} from "../../service/article/ArticleService";
import { Body, Get, HttpCode, JsonController, Param, Post, Res } from "routing-controllers";
import {Response} from "express";
import {ArticleCreateDto} from "../../service/article/dto/ArticleCreateDto";
import logger from "../../config/logger";

@JsonController("/article")
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @HttpCode(200)
    @Get('/')
    public async get(
        @Res() res: Response,
    ) {
        try{
            return await this.articleService.findAll();
        }catch (e) {
            logger.error('에러 발생', e);
            return null;
        }
    }

    @HttpCode(200)
    @Post('/')
    public async create(
        @Body() createDto: ArticleCreateDto,
        @Res() res: Response,
    ) {
        try{
            return await this.articleService.create(createDto, null);
        }catch (e) {
            logger.error('에러 발생', e);
            return null;
        }
    }

    @HttpCode(200)
    @Post('/:id/publish')
    public async publish(
        @Param("id") id: number,
        @Res() res: Response,
    ) {
        return await this.articleService.publish(id, null);
    }
}
