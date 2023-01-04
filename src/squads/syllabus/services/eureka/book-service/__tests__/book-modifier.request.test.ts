import { createUpsertBookRequest } from "../book-modifier.mutation";
import { createMockDataUpsertBook } from "./data";

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    featureControllerUnleash: { isFeatureEnabled: jest.fn() },
}));

describe(`${createUpsertBookRequest.name} create book`, () => {
    it("should create request with bookId when payload contain it", () => {
        const bookId = "bookId";
        const payload = createMockDataUpsertBook({
            bookId,
        });

        const request = createUpsertBookRequest(payload);
        expect(request.toObject().booksList).toEqual([
            {
                ...payload,
                bookId,
                country: 0,
                grade: "",
                subject: 0,
            },
        ]);
    });

    it("should create request without bookId and chapterList when payload don't contain them", () => {
        const payload = createMockDataUpsertBook({
            bookId: undefined,
            chapterIdsList: undefined,
        });

        const request = createUpsertBookRequest(payload);
        expect(request.toObject().booksList).toEqual([
            {
                ...payload,
                chapterIdsList: [],
                bookId: "",
                country: 0,
                grade: "",
                subject: 0,
            },
        ]);
    });
});
