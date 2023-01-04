import { paramsInvalidError, formInvalidError } from "src/squads/syllabus/internals/errors";

import { Chapter, ContentBasicInfo } from "manabuf/common/v1/contents_pb";
import {
    UpsertChaptersRequest,
    DeleteChaptersRequest,
} from "manabuf/eureka/v1/chapter_modifier_pb";

import NsSyllabus_ChapterService from "./types";

export const validateDeleteChapters = ({
    chapterIdsList,
}: NsSyllabus_ChapterService.DeleteChapters) => {
    const shouldThrowErr = !chapterIdsList || !chapterIdsList.length;
    if (shouldThrowErr) throw formInvalidError;
};

export const validateUpsertChapters = (data: NsSyllabus_ChapterService.UpsertChapters) => {
    const shouldThrowErr = !data.bookId || !data.chaptersList || !data.chaptersList.length;

    if (shouldThrowErr) throw paramsInvalidError;
};

export const createUpsertChaptersRequest = (
    data: NsSyllabus_ChapterService.UpsertChapters
): UpsertChaptersRequest => {
    const request = new UpsertChaptersRequest();

    request.setBookId(data.bookId);

    data.chaptersList.forEach((chapter) => {
        const chapterRequest = new Chapter();
        const basicInfo = new ContentBasicInfo();

        const { chapterId, chapterName, schoolId, displayOrder } = chapter;

        if ("chapterId" in chapter && chapterId) basicInfo.setId(chapterId);
        basicInfo.setName(chapterName);
        basicInfo.setSchoolId(schoolId);
        basicInfo.setDisplayOrder(displayOrder);

        chapterRequest.setInfo(basicInfo);

        request.addChapters(chapterRequest);
    });

    return request;
};

export const createDeleteChaptersRequest = (data: NsSyllabus_ChapterService.DeleteChapters) => {
    const { chapterIdsList } = data;

    const request = new DeleteChaptersRequest();

    request.setChapterIdsList(chapterIdsList);

    return request;
};
