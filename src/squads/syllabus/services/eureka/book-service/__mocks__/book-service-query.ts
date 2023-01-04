import {
    Syllabus_BooksListV2Query,
    BooksManyQuery,
    BooksOneQuery,
    BooksTitleQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";

export const mockBookGetListData: DataWithTotal<Syllabus_BooksListV2Query["books"]> = {
    data: [
        { book_id: "book1", name: "Book Name 1" },
        { book_id: "book2", name: "Book Name 2" },
    ],
    total: 2,
};

export const createBookGetOneQueryData = (
    override: Partial<BooksOneQuery["books"][0]> = {}
): BooksOneQuery["books"][0] => {
    return {
        book_chapters: [],
        book_id: "book_id_getOne",
        name: "book_name_getOne",
        school_id: 12,
        ...override,
    };
};

export const createNBookGetManyQueryData = (total: number = 1): BooksManyQuery["books"] => {
    return [...Array(total).keys()].map((i) => ({
        book_id: `book id ${i}`,
        name: `bookName_${i}`,
        school_id: 12,
    }));
};

export const mockBookGetTitleData = (
    bookName: string = "Book name"
): BooksTitleQuery["books"][0] => {
    return {
        name: bookName,
    };
};
