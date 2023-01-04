import { NsSyllabus_ChapterService } from "src/squads/syllabus/services/eureka/chapter-service";
import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useUpsertChapter from "../useUpsertChapter";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/hooks/useBasicContent");

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockChapterMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        chapter: mockChapterMutation,
    });
};

describe(useUpsertChapter.name, () => {
    const mutate = jest.fn();

    beforeEach(() => {
        mockChapterMutation.mockReturnValueOnce({ mutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    // With the display order is 0 display order will be auto generator
    it("should create chapter with display order is 0 ", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertChapter({ bookId: "bookId" }));

        current.upsertChapter({ formData: { name: "chapter" } }, {});

        const params = getLatestCallParams(mutate)[0] as NsSyllabus_ChapterService.UpsertChapters;

        expect(params.chaptersList[0].displayOrder).toEqual(0);
    });

    it("should update chapter correct payload and display order", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertChapter({ bookId: "bookId" }));

        const chapter: ChapterAttrsFragment = {
            school_id: 1,
            name: "chapter_name",
            chapter_id: "chapter_id",
            display_order: 12,
        };

        current.upsertChapter(
            {
                formData: { name: "chapter_rename" },
                chapter,
            },
            {}
        );

        const params = getLatestCallParams(mutate)[0] as NsSyllabus_ChapterService.UpsertChapters;

        expect(params).toEqual<NsSyllabus_ChapterService.UpsertChapters>({
            bookId: "bookId",
            chaptersList: [
                {
                    chapterId: chapter.chapter_id,
                    chapterName: "chapter_rename",
                    displayOrder: Number(chapter.display_order),
                    schoolId: chapter.school_id,
                },
            ],
        });
        expect(params.chaptersList[0].displayOrder).toEqual(12);
    });

    it("should call swap display order chapters with correct payload", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertChapter({ bookId: "bookId" }));

        const displayOrderFirstChapter = 12;
        const displayOrderSecondChapter = 14;
        const chapters: ChapterAttrsFragment[] = [
            {
                school_id: 1,
                name: "chapter_name_01",
                chapter_id: "chapter_id_01",
                display_order: displayOrderFirstChapter,
            },
            {
                school_id: 1,
                name: "chapter_name_02",
                chapter_id: "chapter_id_02",
                display_order: displayOrderSecondChapter,
            },
        ];
        current.updateOrder(chapters, {});

        const params = getLatestCallParams(mutate)[0] as NsSyllabus_ChapterService.UpsertChapters;

        expect(params.chaptersList).toEqual<
            NsSyllabus_ChapterService.UpsertChapters["chaptersList"]
        >(
            chapters.map((chapter) => ({
                chapterId: chapter.chapter_id,
                chapterName: chapter.name,
                displayOrder: Number(chapter.display_order),
                schoolId: chapter.school_id,
            }))
        );

        expect(params.chaptersList[0].displayOrder).toEqual(displayOrderSecondChapter);
        expect(params.chaptersList[1].displayOrder).toEqual(displayOrderFirstChapter);
    });
});
