import {ArticleService} from "../service/article/ArticleService";
import {Body, HttpCode, JsonController, Post, Res} from "routing-controllers";
import {Response} from "express";
import {ArticleCreateDto} from "../service/article/dto/ArticleCreateDto";

@JsonController("/article")
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @HttpCode(200)
    @Post()
    public async create(
        @Body() createDto: ArticleCreateDto,
        @Res() res: Response,
    ) {
        return await this.articleService.create(createDto, false, null);
    }


}
