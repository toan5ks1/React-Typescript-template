import { useMemo } from "react";

import { inferQuery } from "src/squads/syllabus/services/infer-query";

const useGetChapterIdsByBookId = (id: string) => {
    const { data, ...rest } = inferQuery({
        entity: "book",
        action: "syllabusBookGetOne",
    })(
        {
            book_id: id,
        },
        {
            enabled: true,
        }
    );

    const chapterIds = useMemo((): string[] => {
        if (data && data.book_chapters) return data.book_chapters.map((e) => e.chapter_id);
        return [];
    }, [data]);

    return {
        chapterIds,
        ...rest,
    };
};

export default useGetChapterIdsByBookId;
