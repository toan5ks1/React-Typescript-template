import { genId } from "src/common/utils/id-generator";

import {
    Chapter,
    UpsertBooksRequest,
    UpsertChapterRequest,
    UpsertCoursesRequest,
} from "manabie-yasuo/course_pb";

import NsYasuoCourseService from "./types";

export function newUpsertBooksRequest(books: UpsertBooksRequest.Book[]) {
    const req = new UpsertBooksRequest();

    req.setBooksList(books);

    return req;
}

export function newUpsertCourseReq(course: NsYasuoCourseService.UpsertCourses) {
    const req = new UpsertCoursesRequest();
    const courseReq = new UpsertCoursesRequest.Course();

    const id = course.course_id || genId();

    courseReq.setId(id);
    courseReq.setName(course.name);
    if (course.icon) courseReq.setIcon(course.icon);
    courseReq.setSchoolId(course.school_id);
    courseReq.setDisplayOrder(course.display_order || 1);
    courseReq.setChapterIdsList(course.chapter_ids || []);

    req.addCourses(courseReq);

    return req;
}

export function newUpsertBooksReq(books: NsYasuoCourseService.UpsertBooks) {
    const req = new UpsertBooksRequest();

    for (const book of books) {
        const bookReq = new UpsertBooksRequest.Book();
        const bookId = book.bookId || genId();

        //require field
        bookReq.setName(book.name);
        bookReq.setSchoolId(book.schoolId);

        bookReq.setBookId(bookId);
        if (book.chapterIdsList) bookReq.setChapterIdsList(book.chapterIdsList);

        req.addBooks(bookReq);
    }

    return req;
}

export function newUpsertChaptersReq(chapters: NsYasuoCourseService.UpsertChapters[]) {
    const req = new UpsertChapterRequest();
    const chapterIds = [];

    req.setBookId(chapters[0].book_id!);
    for (let chapter of chapters) {
        const chapterReq = new Chapter();
        const id = chapter.chapter_id || genId();
        if (!chapter.chapter_id) {
            chapterIds.push(id);
        }

        chapterReq.setChapterId(id);
        chapterReq.setChapterName(chapter.name);
        chapterReq.setSchoolId(chapter.school_id);
        chapterReq.setDisplayOrder(chapter.display_order);

        req.addChapters(chapterReq);
    }

    return req;
}
