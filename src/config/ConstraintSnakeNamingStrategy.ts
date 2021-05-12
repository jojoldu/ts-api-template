import {SnakeNamingStrategy} from "typeorm-naming-strategies";
import {Table} from "typeorm";

export class ConstraintSnakeNamingStrategy extends SnakeNamingStrategy {

    constructor() {
        super();
    }

    primaryKeyName(tableOrName: Table | string, columnNames: string[]) {
        const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        const columnsSnakeCase = columnNames.join("_");

        return `pk_${table}_${columnsSnakeCase}`;
    }
}
