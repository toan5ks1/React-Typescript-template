import { getSearchString } from "src/squads/syllabus/services/utils/utils";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import {
    BooksTitleQueryVariables,
    Syllabus_BooksListV2QueryVariables,
    Syllabus_BooksManyReferenceQueryVariables,
} from "../../eureka-types";
import bookQueries from "../book-service.query";
import {
    createMockDataBooksListQueryRaw,
    createMockDataBooksManyReferenceQueryRaw,
    createMockDataBookTitleQueryRaw,
} from "./data";

const spyCallFn = () => {
    return jest.spyOn(bookQueries, "_call");
};

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    default: { isFeatureEnabled: jest.fn() },
}));

describe(bookQueries.getTitle.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();

        const params: BooksTitleQueryVariables = { book_id: "Book_01" };

        const response = createMockDataBookTitleQueryRaw();

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await bookQueries.getTitle(params);

        const [body] = getLatestCallParams(callFn);

        describe("should called with correct variable", () => {
            expect(body.variables).toEqual(params);
        });

        describe("should return the first book", () => {
            expect(result).toEqual(response.books[0]);
        });
    });
});

describe(bookQueries.getManyReference.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();

        const params: Syllabus_BooksManyReferenceQueryVariables = {
            limit: 10,
            offset: 0,
            name: "I want to search",
        };

        const response = createMockDataBooksManyReferenceQueryRaw({}, { quantity: 5 });

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await bookQueries.getManyReference(params);

        const [body] = getLatestCallParams(callFn);

        describe("should query with correct variable and search the name field", () => {
            expect(body.variables).toEqual({ ...params, name: getSearchString(params.name) });
        });

        describe("should return data is books field property", () => {
            expect(result).toEqual(response.books);
        });
    });

    it("should only support query book list with type is BOOK_TYPE_GENERAL", async () => {
        const callFn = spyCallFn();

        const params: Syllabus_BooksManyReferenceQueryVariables = {
            limit: 10,
            offset: 0,
            name: "I want to search",
            type: "BOOK_ANOTHER_TYPE",
        };

        const response = createMockDataBooksManyReferenceQueryRaw({}, { quantity: 0 });

        callFn.mockResolvedValue({
            data: response,
        });

        await bookQueries.getManyReference(params);

        const [body] = getLatestCallParams(callFn);

        describe("should't pass the type field into the variables payload", () => {
            expect(body.variables.type).toBeUndefined();
        });
    });
});

describe(bookQueries.getList.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();

        const params: Syllabus_BooksListV2QueryVariables = {
            limit: 10,
            offset: 0,
            name: "I want to search",
        };

        const response = createMockDataBooksListQueryRaw({}, { quantity: 5 });

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await bookQueries.getList(params);

        const [body] = getLatestCallParams(callFn);

        describe("should query with correct variable and search the name field", () => {
            expect(body.variables).toEqual({ ...params, name: getSearchString(params.name) });
        });

        describe("should return data is books field property", () => {
            expect(result).toEqual({
                data: response.books,
                total: response.books_aggregate.aggregate?.count,
            });
        });
    });

    it("should only support query book list with type is BOOK_TYPE_GENERAL", async () => {
        const callFn = spyCallFn();
        const params: Syllabus_BooksListV2QueryVariables = {
            limit: 10,
            offset: 0,
            name: "I want to search",
            type: "BOOK_ANOTHER_TYPE",
        };

        const response = createMockDataBooksListQueryRaw({}, { quantity: 0 });

        callFn.mockResolvedValue({
            data: response,
        });

        await bookQueries.getList(params);

        const [body] = getLatestCallParams(callFn);

        describe("should't pass the type field into the variables payload", () => {
            expect(body.variables.type).toBeUndefined();
        });
    });
});
