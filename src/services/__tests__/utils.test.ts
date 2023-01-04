import { PagingRequest } from "src/common/constants/types";
import { RaSort, RaSortOrder } from "src/typings/react-admin";

import { GqlPagination } from "../service-types";
import {
    createEmptyResponse,
    getEmptyResponse,
    toGqlQuerySorts,
    calcGqlPagination,
    getSearchString,
    toBasicPagingProto,
} from "../utils";

import { Order_By } from "src/__generated__/root-types";

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

describe("getSearchString", () => {
    it("should return a search string", () => {
        expect(getSearchString("text")).toEqual("%text%");
    });

    it("should return undefined for empty search string", async () => {
        expect(getSearchString("")).toEqual(undefined);
    });

    it("should return undefined for undefined value", async () => {
        expect(getSearchString(undefined)).toEqual(undefined);
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

describe("calcGqlPagination", () => {
    it("should return correct result", () => {
        const values = calcGqlPagination({ page: 1 });
        expect(values).toEqual<GqlPagination>({ offset: 0, limit: 10 });
    });

    it("should return correct result with null list", () => {
        const values = calcGqlPagination({ page: undefined, perPage: undefined });
        expect(values).toEqual<GqlPagination>({ offset: 0, limit: 10 });
    });
});

describe("toBasicPagingProto", () => {
    it("should return Paging proto", () => {
        const pagingObject: PagingRequest = {
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
        const pagingObject: PagingRequest = {
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
        const pagingObject: PagingRequest = {
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
