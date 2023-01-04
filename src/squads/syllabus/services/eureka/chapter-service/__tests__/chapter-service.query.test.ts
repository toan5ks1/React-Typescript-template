import { ChaptersManyQueryVariables } from "../../eureka-types";
import chapterQueries from "../chapter-service.query";
import { createMockDataChapterGetMany } from "./data";

jest.mock("src/internals/feature-controller");

describe("chapterQueries", () => {
    it(chapterQueries.getMany.name, async () => {
        const mockChapterGetManyData = createMockDataChapterGetMany(2);
        const variables: ChaptersManyQueryVariables = {
            chapter_ids: mockChapterGetManyData.map((chapter) => chapter.chapter_id),
        };
        const _callSpy = jest.spyOn(chapterQueries, "_call");

        _callSpy.mockResolvedValue({
            data: {
                chapters: mockChapterGetManyData,
            },
        });

        const result = await chapterQueries.getMany(variables);

        expect(result).toEqual(mockChapterGetManyData);
    });
});
