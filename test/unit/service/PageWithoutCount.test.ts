import {PageWithoutCount } from "../../../src/service/PageWithoutCount";

describe('PageWithoutCount', () => {
    it.each([
        [2, ['a', 'b', 'c'], true, ['a', 'b']],
        [2, ['a', 'b'], true, ['a', 'b']],
        [2, ['a'], false, ['a']],
    ])('pageSize=%i, items=%j 이면 isNext=%s, items=%j',
        (pageSize, items, expectedIsNext, expectedItems) => {
        const pageWithoutCount = new PageWithoutCount(pageSize, items);
        expect(pageWithoutCount.isNext).toBe(expectedIsNext);
        expect(pageWithoutCount.items).toStrictEqual(expectedItems);
    })
})
