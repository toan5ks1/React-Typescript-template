import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { BookModifierServicePromiseClient } from "manabuf/eureka/v1/book_modifier_grpc_web_pb";
import { UpsertBooksRequest } from "manabuf/eureka/v1/book_modifier_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import NsSyllabus_Yasuo_CoursesService from "../../yasuo/courses-service-yasuo/types";

export const createUpsertBookRequest = (book: NsSyllabus_Yasuo_CoursesService.UpsertBook) => {
    const req = new UpsertBooksRequest();

    const { chapterIdsList, name, schoolId } = book;

    const bookReq = new UpsertBooksRequest.Book();

    bookReq.setName(name);
    bookReq.setSchoolId(schoolId);

    if ("bookId" in book && book.bookId) bookReq.setBookId(book.bookId);
    if (chapterIdsList) bookReq.setChapterIdsList(chapterIdsList);

    req.addBooks(bookReq);

    return req;
};

class BookModifierService extends InheritedGrpcServiceClient<BookModifierServicePromiseClient> {
    async upsertBook(payload: NsSyllabus_Yasuo_CoursesService.UpsertBook) {
        const request = createUpsertBookRequest(payload);
        const response = await this._call("upsertBooks", request);

        return response.toObject();
    }
}

const bookModifierService = new BookModifierService(
    BookModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default bookModifierService;
