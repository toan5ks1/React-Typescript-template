import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

import NsSyllabus_Yasuo_CoursesService from "../../../yasuo/courses-service-yasuo/types";
import {
    BooksTitleQuery,
    Syllabus_BooksListV2Query,
    Syllabus_BooksManyReferenceQuery,
} from "../../eureka-types";

export const createMockDataBookTitleQueryRaw: CreateMockDataTest<BooksTitleQuery> = () => {
    return {
        books: [{ name: "Book Title 1" }],
    };
};

export const createMockDataBooksManyReferenceQueryRaw: CreateMockDataTest<
    Syllabus_BooksManyReferenceQuery,
    {
        quantity: number;
    }
> = (overrides = {}, options = { quantity: 3 }) => {
    return {
        books: createArrayNumber(options.quantity).map((i) => ({
            book_id: `bookId_${i}`,
            name: `bookName_${i}`,
        })),
        ...overrides,
    };
};

export const createMockDataUpsertBook: CreateMockDataTest<NsSyllabus_Yasuo_CoursesService.UpsertBook> =
    (override = {}) => {
        return {
            name: "bookName",
            bookId: "bookId",
            schoolId: 99,
            chapterIdsList: [],
            ...override,
        };
    };

export const createMockDataBooksListQueryRaw: CreateMockDataTest<
    Syllabus_BooksListV2Query,
    {
        quantity: number;
    }
> = (overrides = {}, options = { quantity: 3 }) => {
    return {
        books: createArrayNumber(options.quantity).map((i) => ({
            book_id: `bookId_${i}`,
            name: `bookName_${i}`,
        })),
        books_aggregate: {
            aggregate: { count: 100 },
        },
        ...overrides,
    };
};
