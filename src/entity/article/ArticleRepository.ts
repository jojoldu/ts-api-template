import { EntityRepository, Repository } from "typeorm";
import {Article} from "./Article";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
}
