import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {Table} from "typeorm";

export class ConstraintSnakeNamingStrategy extends SnakeNamingStrategy {

    constructor() {
        super();
    }

    primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
        const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        const columnsSnakeCase = columnNames.join("_");

        return `pk_${table}_${columnsSnakeCase}`;
    }

    foreignKeyName(tableOrName: Table | string, columnNames: string[], _referencedTablePath?: string, _referencedColumnNames?: string[]): string {
        const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        return `fk_${table}_${_referencedTablePath}`;
    }
}
