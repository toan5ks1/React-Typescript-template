import { arrayHasItem } from "src/common/utils/other";

import {
    chapterModifierService,
    chapterQueries,
    NsSyllabus_ChapterService,
} from "./eureka/chapter-service";
import { ChaptersManyQueryVariables, ChaptersTitleQueryVariables } from "./eureka/eureka-types";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const chapterService = defineService({
    query: {
        syllabusChapterGetMany: (params: ChaptersManyQueryVariables) => {
            const { chapter_ids } = params;
            if (arrayHasItem(chapter_ids)) return chapterQueries.getMany(params);

            return createEmptyResponse(undefined);
        },
        syllabusChapterGetTitle: (params: ChaptersTitleQueryVariables) => {
            if (params.chapter_id) return chapterQueries.getTitle(params);

            return createEmptyResponse(undefined);
        },
    },
    mutation: {
        syllabusChapterUpsert: (payload: NsSyllabus_ChapterService.UpsertChapters) => {
            return chapterModifierService.upsertChapters(payload);
        },
        syllabusChapterDelete: (payload: NsSyllabus_ChapterService.DeleteChapters) => {
            return chapterModifierService.deleteChapters(payload);
        },
    },
});
