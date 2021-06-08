import { PageRequest } from "../../PageRequest";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class ArticleSearchRequest extends PageRequest {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    reservationDate: Date | null;
    title: string | null;

    constructor() {
        super();
    }

    static create(reservationDate: Date | null, title: string | null, pageNo:number, pageSize:number) {
        const param = new ArticleSearchRequest();
        param.reservationDate = reservationDate;
        param.title = title;
        param.pageNo = pageNo;
        param.pageSize = pageSize;
        return param;
    }

    hasReservationDate() : boolean {
        return this.reservationDate != null;
    }

    hasTitle() : boolean {
        return this.title != null;
    }
}
