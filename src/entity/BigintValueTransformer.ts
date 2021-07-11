import { ValueTransformer } from "typeorm";

export class BigintValueTransformer implements ValueTransformer {
    to(entityValue: bigint) {
        return entityValue;
    }

    from(databaseValue: string): bigint {
        return BigInt(databaseValue);
    }
}
