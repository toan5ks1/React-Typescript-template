import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

import { ChaptersManyQuery } from "../../eureka-types";
import NsSyllabus_ChapterService from "../types";

export const createMockDataChapterGetMany = (quantity: number): ChaptersManyQuery["chapters"] =>
    createArrayNumber(quantity).map((i) => {
        return {
            chapter_id: `chapter_id${i}_getMany`,
            name: `chapter_name${i}_getMany`,
            school_id: 1,
            display_order: i,
        };
    });

export const createMockDataChapterUpsert: CreateMockDataTest<NsSyllabus_ChapterService.UpsertChapters> =
    (override = {}) => {
        return {
            bookId: "book_id_upsertChapters",
            chaptersList: [
                {
                    chapterId: "chapter_id_upsertChapters",
                    chapterName: "chapter_name_upsertChapters",
                    schoolId: 1,
                    displayOrder: 6,
                },
            ],
            ...override,
        };
    };

export const createMockDataDeleteChapters: CreateMockDataTest<NsSyllabus_ChapterService.DeleteChapters> =
    (override = {}) => {
        return {
            chapterIdsList: ["chapterId_01", "chapterId_02"],
            ...override,
        };
    };
