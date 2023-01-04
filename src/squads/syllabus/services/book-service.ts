import { arrayHasItem } from "src/common/utils/other";
import {
    BooksManyQueryVariables,
    Syllabus_BooksListV2QueryVariables,
    BooksOneQueryVariables,
    BooksTitleQueryVariables,
    Syllabus_BooksManyReferenceQueryVariables,
    Syllabus_BookOneQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { bookModifierService } from "./eureka/book-service";
import bookQueries from "./eureka/book-service/book-service.query";
import {
    courseModifierServiceEureka,
    NsEurekaCourseModifierService,
} from "./eureka/course-modifier-eureka";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";
import { NsSyllabus_Yasuo_CoursesService } from "./yasuo/courses-service-yasuo/types";

export const bookService = defineService({
    query: {
        BOOK_GET_ONE: (params: BooksOneQueryVariables) => {
            if (params.book_id) return bookQueries.getOne(params);

            return createEmptyResponse(undefined);
        },
        syllabusBookGetOne: (params: Syllabus_BookOneQueryVariables) => {
            if (params.book_id) return bookQueries.getOneV2(params);

            return createEmptyResponse(undefined);
        },
        BOOK_GET_MANY: (params: BooksManyQueryVariables) => {
            if (arrayHasItem(params.book_id)) return bookQueries.getMany(params);
            return createEmptyResponse(undefined);
        },
        syllabusBookGetTitle: (params: BooksTitleQueryVariables) => {
            if (params.book_id) return bookQueries.getTitle(params);

            return createEmptyResponse(undefined);
        },
        BOOK_GET_LIST: (params: Syllabus_BooksListV2QueryVariables) => {
            return bookQueries.getList(params);
        },
        syllabusBookGetManyReference: (params: Syllabus_BooksManyReferenceQueryVariables) => {
            return bookQueries.getManyReference(params);
        },
    },
    mutation: {
        syllabusBookUpsert: (payload: NsSyllabus_Yasuo_CoursesService.UpsertBook) => {
            return bookModifierService.upsertBook(payload);
        },
        BOOK_DUPLICATE: (payload: NsEurekaCourseModifierService.DuplicateBook) => {
            return courseModifierServiceEureka.duplicateBook(payload);
        },
        syllabusBookAddToCourse: (payload: NsEurekaCourseModifierService.AddBooksToCourse) => {
            return courseModifierServiceEureka.addBooksToCourse(payload);
        },
    },
});
