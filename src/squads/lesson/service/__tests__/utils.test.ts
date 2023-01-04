import {
    toBasicPagingProto,
    createEmptyResponse,
    getEmptyResponse,
    toGqlQuerySorts,
} from "src/squads/lesson/service/utils";
import { RaSort, RaSortOrder } from "src/squads/lesson/typings/react-admin";

import { Paging } from "manabuf/common/v1/requests_pb";

import { Order_By } from "src/squads/lesson/__generated__/bob/root-types";

describe("createEmptyResponse", () => {
    it("should return a object", async () => {
        const obj = { data: { id: "123" } };

        expect(await createEmptyResponse(obj)).toMatchObject(obj);
    });
    it("should return a undefined", async () => {
        const obj = undefined;

        expect(await createEmptyResponse(obj)).toEqual(obj);
    });
    it("should return a array", async () => {
        const obj = [{ id: 123 }];

        expect(await createEmptyResponse(obj)).toMatchObject(obj);
    });
});

describe("getEmptyResponse", () => {
    it("should return a empty response", async () => {
        expect(await getEmptyResponse()).toMatchObject({ data: { id: null } });
    });
});

describe("toGqlQuerySorts", () => {
    it("should convert RaSort to GqlSort", () => {
        const sorts: RaSort = { order: RaSortOrder.ASC, field: "created_at" };
        expect(toGqlQuerySorts(sorts)).toMatchObject({ created_at: Order_By.Asc });
    });

    it("should convert RaSort[] to GqlSort", () => {
        const sorts: RaSort[] = [
            { order: RaSortOrder.ASC, field: "created_at" },
            { order: RaSortOrder.DESC, field: "updated_at" },
        ];

        expect(toGqlQuerySorts(sorts)).toMatchObject({
            created_at: Order_By.Asc,
            updated_at: Order_By.Desc,
        });
    });
});

describe("toBasicPagingProto", () => {
    it("should return Paging proto", () => {
        const pagingObject: Paging.AsObject = {
            limit: 5,
            offsetInteger: 0,
            offsetString: "offsetString__dependsOnApi",
        };
        const actualValue = toBasicPagingProto(pagingObject);
        expect(actualValue.getLimit()).toEqual(pagingObject.limit);
        expect(actualValue.getOffsetInteger()).toEqual(pagingObject.offsetInteger);
        expect(actualValue.getOffsetString()).toEqual(pagingObject.offsetString);
    });

    it("should ignore offsetString", () => {
        const pagingObject: Paging.AsObject = {
            limit: 5,
            offsetInteger: 10,
            offsetString: "",
        };
        const actualValue = toBasicPagingProto(pagingObject);
        expect(actualValue.getLimit()).toEqual(pagingObject.limit);
        expect(actualValue.getOffsetInteger()).toEqual(pagingObject.offsetInteger);
        expect(actualValue.getOffsetString()).toEqual("");
    });

    it("should ignore offsetInteger", () => {
        const pagingObject: Paging.AsObject = {
            limit: 5,
            offsetInteger: 10,
            offsetString: "offsetString__dependsOnApi",
        };
        const actualValue = toBasicPagingProto(pagingObject);
        expect(actualValue.getLimit()).toEqual(pagingObject.limit);
        expect(actualValue.getOffsetInteger()).toEqual(0);
        expect(actualValue.getOffsetString()).toEqual(pagingObject.offsetString);
    });
});
