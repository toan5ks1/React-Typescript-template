import { BooksOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useGetChapterIdsByBookId from "../useGetChapterIdsByBookId";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

describe(useGetChapterIdsByBookId.name, () => {
    const data: BooksOneQuery["books"][0] = {
        book_chapters: [
            { chapter_id: "CHAPTER_ID_1" },
            { chapter_id: "CHAPTER_ID_2" },
            { chapter_id: "CHAPTER_ID_3" },
        ],
        book_id: "BOOK_ID",
        name: "BOOK_NAME",
        school_id: 10,
    };

    it("should return list chapter id", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data }));

        const { result } = renderHook(() => useGetChapterIdsByBookId("BOOK_ID"));

        expect(result.current.chapterIds).toEqual(
            data.book_chapters.map((chapter) => chapter.chapter_id)
        );
    });

    it("should return empty array when getData is failed", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({}));

        const { result } = renderHook(() => useGetChapterIdsByBookId("BOOK_ID"));

        expect(result.current.chapterIds).toHaveLength(0);
    });
});
