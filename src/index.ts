import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import {User} from "./entity/user/User";
import {Article} from "./entity/article/Article";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
    const now = new Date();
    const article = Article.createContent(now, '테스트', '테스트데이터', 'jojoldu');

    let articleRepository = connection.getRepository(Article);
    await articleRepository.save(article);
    let savedArticles = await articleRepository.find();
    console.log("All articles from the db: ", savedArticles);
    const id = 1;
    await connection.transaction("SERIALIZABLE", async transactionalEntityManager => {
        await transactionalEntityManager.delete(Article, {id: id})
    });

}).catch(error => console.log(error));
