import { paramsInvalidError, formInvalidError } from "src/squads/syllabus/internals/errors";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import {
    createUpsertChaptersRequest,
    validateUpsertChapters,
    createDeleteChaptersRequest,
    validateDeleteChapters,
} from "../chapter-modifier.request";
import NsSyllabus_ChapterService from "../types";
import { createMockDataChapterUpsert, createMockDataDeleteChapters } from "./data";

jest.mock("src/internals/feature-controller");

describe(validateUpsertChapters.name, () => {
    const invalidTestCases: TestCaseValidateRequest<
        NsSyllabus_ChapterService.UpsertChapters,
        false
    >[] = [
        {
            title: "bookId and chapterList are undefined",
            input: {},
        },
        {
            title: "chapterList is undefined",
            input: { bookId: "bookId" },
        },
        {
            title: "chapterList is empty",
            input: {
                bookId: "bookId",
                chaptersList: [],
            },
        },
    ];

    test.each(invalidTestCases)("should throw invalid params error when %o", ({ input }) => {
        expect(() =>
            validateUpsertChapters(input as NsSyllabus_ChapterService.UpsertChapters)
        ).toThrowError(paramsInvalidError);
    });
});

describe(createUpsertChaptersRequest.name, () => {
    it("should create request with id", () => {
        const payload = createMockDataChapterUpsert();

        const request = createUpsertChaptersRequest(payload);

        expect(request.toObject()).toEqual({
            bookId: payload.bookId,
            chaptersList: payload.chaptersList.map((chapter) => ({
                bookId: "",
                info: {
                    id: chapter.chapterId,
                    name: chapter.chapterName,
                    schoolId: chapter.schoolId,
                    displayOrder: chapter.displayOrder,
                    grade: 0,
                    country: 0,
                    subject: 0,
                    iconUrl: "",
                    masterId: "",
                    createdAt: undefined,
                    deletedAt: undefined,
                    updatedAt: undefined,
                },
                topicIdsList: [],
            })),
        });
    });
});

describe(createDeleteChaptersRequest.name, () => {
    it("should create correct request", () => {
        const payload = createMockDataDeleteChapters({
            chapterIdsList: ["chapterId_01", "chapterId_02"],
        });

        const request = createDeleteChaptersRequest(payload);

        expect(request.toObject()).toEqual(payload);
    });
});

describe(`test for ${validateDeleteChapters.name} invalid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_ChapterService.DeleteChapters>[] = [
        {
            title: "ids is undefined",
            input: {} as NsSyllabus_ChapterService.DeleteChapters,
        },
        {
            title: "ids is empty list",
            input: { chapterIdsList: [] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() => validateDeleteChapters(input)).toThrowError(formInvalidError);
        });
    });
});

describe(`test for ${validateDeleteChapters.name} valid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_ChapterService.DeleteChapters>[] = [
        {
            title: "ids have only a element",
            input: { chapterIdsList: ["12"] },
        },
        {
            title: "ids have multiple element",
            input: { chapterIdsList: ["12", "99"] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`shouldn't throw err when ${title}`, () => {
            expect(() => validateDeleteChapters(input)).not.toThrowError();
        });
    });
});
