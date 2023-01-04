import { useCallback } from "react";

import { swapDisplayOrder } from "src/squads/syllabus/common/helpers/display-order";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { NsSyllabus_ChapterService } from "src/squads/syllabus/services/eureka/chapter-service";
import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import { ChapterFormData } from "../components/ChapterForm";

import useBasicContent from "src/squads/syllabus/hooks/useBasicContent";

interface UseUpsertChapterParams {
    bookId: string;
}

const useUpsertChapter = ({ bookId }: UseUpsertChapterParams) => {
    const { school_id } = useBasicContent();

    const { mutate, isLoading } = inferMutation({
        entity: "chapter",
        action: "syllabusChapterUpsert",
    })();

    const makePayload = useCallback(
        (
            formData: ChapterFormData,
            chapter?: ChapterAttrsFragment
        ): NsSyllabus_ChapterService.UpsertChapters => {
            const mapperName = (
                chapter?: ChapterAttrsFragment
            ): NsSyllabus_ChapterService.UpsertChapters["chaptersList"][0] | {} => {
                if (!chapter) return {};

                return {
                    chapterId: chapter.chapter_id,
                    chapterName: chapter.name,
                    schoolId: chapter.school_id,
                    displayOrder: chapter.display_order,
                };
            };
            const safeChapterData = mapperName(chapter);

            return {
                bookId,
                chaptersList: [
                    {
                        chapterId: genId(),
                        schoolId: school_id,
                        displayOrder: 0,
                        ...safeChapterData,
                        chapterName: formData.name,
                    },
                ],
            };
        },
        [bookId, school_id]
    );

    const makePayloadReOrder = useCallback(
        (chapters: ChapterAttrsFragment[]): NsSyllabus_ChapterService.UpsertChapters => {
            let arrSwapped: ChapterAttrsFragment[] = chapters;
            // Only pass ts-error data length always is 2
            if (chapters.length >= 2) {
                arrSwapped = swapDisplayOrder(chapters[0], chapters[1]);
            }

            return {
                bookId,
                chaptersList: arrSwapped.map((chapter) => ({
                    chapterId: chapter.chapter_id,
                    chapterName: chapter.name,
                    schoolId: chapter.school_id,
                    displayOrder: chapter.display_order ?? 1,
                })),
            };
        },
        [bookId]
    );

    const upsertChapter = useCallback(
        (
            { formData, chapter }: { formData: ChapterFormData; chapter?: ChapterAttrsFragment },
            options: Parameters<typeof mutate>[1]
        ) => {
            const payload = makePayload(formData, chapter);
            mutate(payload, options);
        },
        [makePayload, mutate]
    );

    const updateOrder = useCallback(
        (chapters: ChapterAttrsFragment[], options: Parameters<typeof mutate>[1]) => {
            const payload = makePayloadReOrder(chapters);
            mutate(payload, options);
        },
        [makePayloadReOrder, mutate]
    );

    return {
        upsertChapter,
        updateOrder,
        isLoading,
    };
};

export default useUpsertChapter;
