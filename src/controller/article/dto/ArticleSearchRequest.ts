import { WebPageRequest } from "../../WebPageRequest";

export class ArticleSearchRequest extends WebPageRequest{
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
