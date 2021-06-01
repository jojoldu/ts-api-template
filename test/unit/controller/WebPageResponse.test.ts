import {WebPageResponse} from "../../../src/controller/WebPageResponse";

describe('WebPageResponse', () => {
    it.each([
        [10, 10, 1],
        [11, 10, 2],
        [20, 10, 2],
        [9, 10, 1],
        [0, 10, 0],
    ])('totalCount=%i, pageSize=%i 이면 totalPage=%i', (totalCount, pageSize, expected) => {
        expect(new WebPageResponse(totalCount, pageSize, []).totalPage).toBe(expected);
    })

})
