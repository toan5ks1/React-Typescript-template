import {
    Syllabus_BooksManyReferenceQueryVariables,
    BooksOneQueryVariables,
    BooksTitleQueryVariables,
    Syllabus_BookOneQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { bookService } from "../book-service";
import {
    createBookGetOneQueryData,
    createNBookGetManyQueryData,
} from "../eureka/book-service/__mocks__/book-service-query";
import bookQueries from "../eureka/book-service/book-service.query";
import { courseModifierServiceEureka } from "../eureka/course-modifier-eureka";
import { createMockDataAddBooksToCourse } from "../yasuo/courses-service-yasuo/__tests__/data";

jest.mock("src/squads/syllabus/services/eureka/book-service/book-service.query", () => ({
    __esModule: true,
    default: {
        getOne: jest.fn(),
        getOneV2: jest.fn(),
        getTitle: jest.fn(),
        getMany: jest.fn(),
        getManyReference: jest.fn(),
    },
}));

jest.mock("src/squads/syllabus/services/eureka/course-modifier-eureka");

describe(`test query for book get one ${bookService.query.BOOK_GET_ONE.name}`, () => {
    test("book get one success", async () => {
        const bookQueryResp = createBookGetOneQueryData();

        (bookQueries.getOne as jest.Mock).mockReturnValue(bookQueryResp);
        const data = await bookService.query.BOOK_GET_ONE({ book_id: "12" });

        describe("should call to query with correct params", () => {
            expect(bookQueries.getOne).toBeCalledWith({ book_id: "12" });
        });

        describe("should return correct data after query success", () => {
            expect(data).toEqual(bookQueryResp);
        });
    });

    test("book get one missing identity", async () => {
        const data = await bookService.query.BOOK_GET_ONE({} as BooksOneQueryVariables);

        describe("should return undefined", () => {
            expect(data).toBeUndefined();
        });
    });
});

describe(`test query for book get one ${bookService.query.syllabusBookGetOne.name}`, () => {
    test("book get one success", async () => {
        const bookQueryResp = createBookGetOneQueryData();

        (bookQueries.getOneV2 as jest.Mock).mockReturnValue(bookQueryResp);
        const data = await bookService.query.syllabusBookGetOne({ book_id: "12" });

        describe("should call to query with correct params", () => {
            expect(bookQueries.getOneV2).toBeCalledWith({ book_id: "12" });
        });

        describe("should return correct data after query success", () => {
            expect(data).toEqual(bookQueryResp);
        });
    });

    test("book get one missing identity", async () => {
        const data = await bookService.query.syllabusBookGetOne(
            {} as Syllabus_BookOneQueryVariables
        );

        describe("should return undefined", () => {
            expect(data).toBeUndefined();
        });
    });
});

describe(bookService.query.syllabusBookGetTitle.name, () => {
    it("should not call query and return undefined when missing identity", async () => {
        const result = await bookService.query.syllabusBookGetTitle({} as BooksTitleQueryVariables);

        expect(result).toBeUndefined();
        expect(bookQueries.getTitle).not.toBeCalled();
    });

    it("should call getTitle and return correct data after query success", async () => {
        const response = "response_book_getTitle";
        const params: BooksTitleQueryVariables = {
            book_id: "bookId_1",
        };

        (bookQueries.getTitle as jest.Mock).mockResolvedValue(response);

        const result = await bookService.query.syllabusBookGetTitle(params);

        expect(result).toEqual(response);
        expect(bookQueries.getTitle).toBeCalledWith(params);
    });
});

describe(bookService.query.syllabusBookGetManyReference.name, () => {
    it("should call getManyReference and return correct data after query success", async () => {
        const response = "response_book_getManyReference";
        const params: Syllabus_BooksManyReferenceQueryVariables = {
            limit: 10,
            offset: 0,
            name: "Book 12",
        };

        (bookQueries.getManyReference as jest.Mock).mockResolvedValue(response);

        const result = await bookService.query.syllabusBookGetManyReference(params);

        expect(result).toEqual(response);
        expect(bookQueries.getManyReference).toBeCalledWith(params);
    });
});

describe(`test query for book get many ${bookService.query.BOOK_GET_MANY.name}`, () => {
    test("book get many success", async () => {
        const queryResp = createNBookGetManyQueryData(2);

        (bookQueries.getMany as jest.Mock).mockReturnValue(queryResp);
        const data = await bookService.query.BOOK_GET_MANY({ book_id: ["13", "12"] });

        describe("should call to query with correct params", () => {
            expect(bookQueries.getMany).toBeCalledWith({ book_id: ["13", "12"] });
        });

        describe("should return correct data after query success", () => {
            expect(data).toEqual(queryResp);
        });
    });

    test("book get many with empty ids", async () => {
        const data = await bookService.query.BOOK_GET_MANY({
            book_id: [],
        });

        describe("should return undefined", () => {
            expect(bookQueries.getMany).not.toBeCalled();
            expect(data).toBeUndefined();
        });
    });

    test("book get many with missing ids", async () => {
        const data = await bookService.query.BOOK_GET_MANY({} as BooksOneQueryVariables);

        describe("should return undefined", () => {
            expect(bookQueries.getMany).not.toBeCalled();
            expect(data).toBeUndefined();
        });
    });
});

describe(`test for add book to course ${bookService.mutation.syllabusBookAddToCourse.name}`, () => {
    const payload = createMockDataAddBooksToCourse();

    it("should return correct data after success", async () => {
        const response = "addBooksToCourseResponse";
        (courseModifierServiceEureka.addBooksToCourse as jest.Mock).mockResolvedValue(response);

        const result = await bookService.mutation.syllabusBookAddToCourse(payload);

        expect(courseModifierServiceEureka.addBooksToCourse).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});
