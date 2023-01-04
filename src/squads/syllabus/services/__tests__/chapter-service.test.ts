import { chapterService } from "../chapter-service";
import { chapterQueries } from "../eureka/chapter-service";
import {
    createMockDataChapterUpsert,
    createMockDataDeleteChapters,
} from "../eureka/chapter-service/__tests__/data";
import chapterModifierMutation from "../eureka/chapter-service/chapter-modifier.mutation";
import { ChaptersManyQueryVariables, ChaptersTitleQueryVariables } from "../eureka/eureka-types";

jest.mock("src/squads/syllabus/services/eureka/chapter-service/chapter-service.query", () => {
    return {
        __esModule: true,
        default: {
            getMany: jest.fn(),
            getTitle: jest.fn(),
        },
    };
});

jest.mock("src/squads/syllabus/services/eureka/chapter-service/chapter-modifier.mutation", () => {
    return {
        __esModule: true,
        default: {
            upsertChapters: jest.fn(),
            deleteChapters: jest.fn(),
        },
    };
});

describe(`test for upsert chapter ${chapterService.mutation.syllabusChapterUpsert.name}`, () => {
    const payload = createMockDataChapterUpsert();

    it("should return correct data after success", async () => {
        const upsertChaptersResponse = "UpsertChaptersResponse";
        (chapterModifierMutation.upsertChapters as jest.Mock).mockResolvedValue(
            upsertChaptersResponse
        );

        const result = await chapterService.mutation.syllabusChapterUpsert(payload);

        expect(chapterModifierMutation.upsertChapters).toBeCalledWith(payload);
        expect(result).toEqual(upsertChaptersResponse);
    });
});

describe(chapterService.query.syllabusChapterGetTitle.name, () => {
    it("should not call query and return undefined when missing identity", async () => {
        const result = await chapterService.query.syllabusChapterGetTitle(
            {} as ChaptersTitleQueryVariables
        );

        expect(result).toBeUndefined();
        expect(chapterQueries.getTitle).not.toBeCalled();
    });

    it("should call getTitle and return correct data after query success", async () => {
        const response = "response_chapter_getTitle";
        const params: ChaptersTitleQueryVariables = {
            chapter_id: "chapterId_1",
        };

        (chapterQueries.getTitle as jest.Mock).mockResolvedValue(response);

        const result = await chapterService.query.syllabusChapterGetTitle(params);

        expect(result).toEqual(response);
        expect(chapterQueries.getTitle).toBeCalledWith(params);
    });
});

describe(`test query for get many chapter by ids ${chapterService.query.syllabusChapterGetMany.name}`, () => {
    it("should return correct after call query success", async () => {
        const bookQueryResp = "bookQueryResp";
        (chapterQueries.getMany as jest.Mock).mockReturnValue(bookQueryResp);

        const params: ChaptersManyQueryVariables = { chapter_ids: ["12"] };
        const data = await chapterService.query.syllabusChapterGetMany(params);

        expect(chapterQueries.getMany).toBeCalledWith(params);
        expect(data).toEqual(bookQueryResp);
    });

    it("should return undefined when missing ids", async () => {
        const data = await chapterService.query.syllabusChapterGetMany({});
        expect(data).toBeUndefined();
    });
});

describe(`test for delete chapter ${chapterService.mutation.syllabusChapterDelete.name}`, () => {
    it("should return correct data after success", async () => {
        const payload = createMockDataDeleteChapters();
        const response = "response_deleteChapters";

        (chapterModifierMutation.deleteChapters as jest.Mock).mockResolvedValue(response);

        const result = await chapterService.mutation.syllabusChapterDelete(payload);

        expect(chapterModifierMutation.deleteChapters).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});
