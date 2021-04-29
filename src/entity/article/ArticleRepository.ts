import { EntityRepository, Repository } from "typeorm";
import {Article} from "./Article";

@EntityRepository(Article)
export class PostRepository extends Repository<Article> {
}
