import { RaSort, RaSortOrder } from "src/typings/react-admin";

import { createEmptyResponse, getEmptyResponse, toGqlQuerySorts } from "../utils";

import { Order_By } from "src/squads/adobo/__generated__/bob/root-types";

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

    it("should return DESC sort by default if no Sort is found", () => {
        expect(toGqlQuerySorts(undefined)).toMatchObject({
            created_at: Order_By.Desc,
        });
    });
});
