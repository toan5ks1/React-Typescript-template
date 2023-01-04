import { UpsertBooksRequest } from "manabie-yasuo/course_pb";

import { SimpleBookChapter } from "./book-chapter";

export interface Book extends UpsertBooksRequest.Book.AsObject {}

export interface BookHasura {
    id: string;
    book_id: string;
    name: string;
    book_chapters?: SimpleBookChapter[];
}
