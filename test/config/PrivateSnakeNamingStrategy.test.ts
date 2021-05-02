import {PrivateSnakeNamingStrategy} from "../../config/PrivateSnakeNamingStrategy";

describe('TypeORM naming Strategy', () => {
    let strategy: PrivateSnakeNamingStrategy;
    beforeAll(() => {
        strategy = new PrivateSnakeNamingStrategy();
    })

    test('컬럼명에 private prefix(_) 는 제거된다', () => {
        const fieldName = '_id';

        let columnName = strategy.columnName(fieldName, '', []);

        expect(columnName).toBe('id');
    });

    test('Entity 필드는 snakeCase가 된다', () => {
        const fieldName = '_tableName';

        let columnName = strategy.columnName(fieldName, '', []);

        expect(columnName).toBe('table_name');
    });

    test('snakeCase 필드는 그대로 간다', () => {
        const fieldName = '_table_name';

        let columnName = strategy.columnName(fieldName, '', []);

        expect(columnName).toBe('table_name');
    });

    test('@Column(name)이 최우선값이다', () => {
        const fieldName = 'fieldName';
        const columnNameOption = 'column_name';

        let columnName = strategy.columnName(fieldName, columnNameOption, []);

        expect(columnName).toBe(columnNameOption);
    });
});
