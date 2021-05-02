import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {Table} from "typeorm";

export class PrivateSnakeNamingStrategy extends SnakeNamingStrategy {

    constructor() {
        super();
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        const columnName = super.columnName(propertyName, customName, embeddedPrefixes);
        if(columnName.startsWith('_')) {
            return columnName.replace('_', '');
        }
        return columnName;
    }

    primaryKeyName(tableOrName: Table | string, columnNames: string[]) {
        const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        const columnsSnakeCase = columnNames.join("_");

        return `pk_${table}_${columnsSnakeCase}`;
    }
}
