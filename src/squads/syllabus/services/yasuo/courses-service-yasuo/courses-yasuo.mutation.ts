import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { formInvalidError, paramsInvalidError } from "src/squads/syllabus/internals/errors";
import { createPayloadToSend, toRemoteQuiz, validateQuiz } from "src/squads/syllabus/models/quiz";
import { uploadServiceClientBob } from "src/squads/syllabus/services/bob/upload-reader-service-bob";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import { CourseServicePromiseClient } from "manabie-yasuo/course_grpc_web_pb";
import {
    AddBooksRequest,
    DeleteCoursesRequest,
    DeleteLosRequest,
    DeleteTopicsRequest,
    UpsertBooksRequest,
    UpsertCoursesRequest,
    UpsertQuizRequest,
} from "manabie-yasuo/course_pb";

export const validateDeleteCourses = (data: NsSyllabus_Yasuo_CoursesService.DeleteCourses) => {
    const shouldThrowErr = !data.courseIdsList || !data.courseIdsList.length;

    if (shouldThrowErr) throw paramsInvalidError;
};

export function validateDeleteLos(data: NsSyllabus_Yasuo_CoursesService.DeleteLos) {
    const shouldThrowErr = !data.loIdsList || !data.loIdsList.length;

    if (shouldThrowErr) {
        throw paramsInvalidError;
    }
}

export const createDeleteCoursesRequest = ({
    courseIdsList,
}: NsSyllabus_Yasuo_CoursesService.DeleteCourses) => {
    const request = new DeleteCoursesRequest();

    request.setCourseIdsList(courseIdsList);

    return request;
};

export const createDeleteTopicsRequest = ({
    topicIdsList,
}: NsSyllabus_Yasuo_CoursesService.DeleteTopics) => {
    const request = new DeleteTopicsRequest();

    request.setTopicIdsList(topicIdsList);

    return request;
};

export const createDeleteLosRequest = ({
    loIdsList,
}: NsSyllabus_Yasuo_CoursesService.DeleteLos) => {
    const request = new DeleteLosRequest();

    request.setLoIdsList(loIdsList);

    return request;
};

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

export const createUpsertCourseReq = (course: NsSyllabus_Yasuo_CoursesService.UpsertCourses) => {
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
};

export const validateAddBooksToCourse = (
    data: NsSyllabus_Yasuo_CoursesService.AddBooksToCourse
) => {
    const { courseId, bookIdsList } = data;

    if (!courseId || !bookIdsList || !bookIdsList.length) throw formInvalidError;
};

export const createAddBooksToCourseRequest = (
    data: NsSyllabus_Yasuo_CoursesService.AddBooksToCourse
) => {
    const req = new AddBooksRequest();
    req.setCourseId(data.courseId);

    req.setBookIdsList(data.bookIdsList);
    return req;
};

export type AttachMaterialsToCourseReturn = {
    newMediaIds: string[];
    mediaIds: string[];
};

class CoursesYasuoMutation extends InheritedGrpcServiceClient<CourseServicePromiseClient> {
    async deleteCourses(data: NsSyllabus_Yasuo_CoursesService.DeleteCourses) {
        validateDeleteCourses(data);

        const req = createDeleteCoursesRequest(data);

        const resp = await this._call("deleteCourses", req);

        return resp.toObject();
    }

    async upsertCourses(course: NsSyllabus_Yasuo_CoursesService.UpsertCourses) {
        const { files, course_id } = course;
        if (files) {
            const resp = await uploadServiceClientBob.generateResumableUploadURL({
                files: files,
            });
            course.icon = resp[0]?.gRPC.downloadUrl;
        }

        const req = createUpsertCourseReq(course);
        await this._call("upsertCourses", req);

        return {
            data: { id: course_id },
        };
    }

    async upsertQuiz({ quiz: quizOriginal }: NsSyllabus_Yasuo_CoursesService.UpsertQuiz) {
        validateQuiz(quizOriginal);
        const quiz = createPayloadToSend(quizOriginal);

        const req = new UpsertQuizRequest();

        const remoteQuiz = toRemoteQuiz(quiz);
        req.setQuiz(remoteQuiz.quizCore);
        req.setLoId(remoteQuiz.loId);

        const resp = await this._call("upsertQuiz", req);

        return resp.toObject();
    }
}

const coursesYasuoMutation = new CoursesYasuoMutation(
    CourseServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default coursesYasuoMutation;
