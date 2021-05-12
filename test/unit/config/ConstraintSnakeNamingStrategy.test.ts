import {ConstraintSnakeNamingStrategy} from "../../../src/config/ConstraintSnakeNamingStrategy";

describe('TypeORM naming Strategy', () => {
    let strategy: ConstraintSnakeNamingStrategy;
    beforeAll(() => {
        strategy = new ConstraintSnakeNamingStrategy();
    })

    test('Entity 필드는 snakeCase가 된다', () => {
        const fieldName = 'tableName';

        const columnName = strategy.columnName(fieldName, '', []);

        expect(columnName).toBe('table_name');
    });

    test('snakeCase 필드는 그대로 간다', () => {
        const fieldName = 'table_name';

        const columnName = strategy.columnName(fieldName, '', []);

        expect(columnName).toBe('table_name');
    });

    test('@Column(name)이 최우선값이다', () => {
        const fieldName = 'fieldName';
        const columnNameOption = 'column_name';

        const columnName = strategy.columnName(fieldName, columnNameOption, []);

        expect(columnName).toBe(columnNameOption);
    });

    test('pk는 테이블명 기반으로 생성된다', () => {
        const tableOrName = 'article';
        const columnNames = ['id'];

        const primaryKeyName = strategy.primaryKeyName(tableOrName, columnNames);

        expect(primaryKeyName).toBe(`pk_${tableOrName}_${columnNames[0]}`);
    })

    test('복합키로 이루어진 pk는 컬럼이 모두 사용된다', () => {
        const tableOrName = 'article';
        const columnNames = ['id', 'tx_date'];

        const primaryKeyName = strategy.primaryKeyName(tableOrName, columnNames);

        expect(primaryKeyName).toBe(`pk_${tableOrName}_${columnNames[0]}_${columnNames[1]}`);
    })
});
