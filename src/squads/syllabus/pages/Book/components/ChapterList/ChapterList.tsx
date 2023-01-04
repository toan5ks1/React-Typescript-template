import { useCallback } from "react";

import logger from "src/squads/syllabus/internals/logger";
import { ChaptersManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Box } from "@mui/material";

import useGetChapterIdsByBookId from "../../hooks/useGetChapterIdsByBookId";
import useUpsertChapter from "../../hooks/useUpsertChapter";
import ChapterItem from "../ChapterItem";
import CreateChapter from "../CreateChapter";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useSwapOrder, { Action } from "src/squads/syllabus/hooks/useSwapOrder";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface ChapterListProps {
    bookId: string;
}

const ChapterList = ({ bookId }: ChapterListProps) => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { chapterIds, refetch } = useGetChapterIdsByBookId(bookId);

    const { updateOrder, isLoading } = useUpsertChapter({ bookId });
    const enabled = chapterIds.length !== 0;

    const { data = [], refetch: refetchChapter } = inferQuery({
        entity: "chapter",
        action: "syllabusChapterGetMany",
    })(
        {
            chapter_ids: chapterIds,
        },
        {
            enabled,
        }
    );

    const { swap } = useSwapOrder<ChaptersManyQuery["chapters"][0]>({ data, key: "chapter_id" });

    const onReOrder = useCallback(
        (action: Action, identity: string) => {
            const swapArr = swap(action, identity);
            if (swapArr) {
                const [first, second] = swapArr;
                updateOrder([first, second], {
                    onSuccess: () => {
                        showSnackbar(t("ra.message.moveSuccess"));
                        void refetchChapter();
                    },
                    onError: (e) => {
                        logger.warn("[ChapterList re-order failed]", e);
                        showSnackbar(`${t("ra.message.moveFail")} ${t(e.message)}: `, "error");
                    },
                });
            }
        },
        [showSnackbar, refetchChapter, swap, t, updateOrder]
    );

    return (
        <>
            <Box>
                {enabled &&
                    data.map((chapter, index) => {
                        return (
                            <Box mb={1.25} key={chapter.chapter_id}>
                                <ChapterItem
                                    bookId={bookId}
                                    chapter={chapter}
                                    onSuccess={refetch}
                                    refetchChapter={refetchChapter}
                                    onReOrder={onReOrder}
                                    disabledUp={isLoading || index === 0}
                                    disabledDown={isLoading || index === data?.length - 1}
                                    defaultExpanded={index === 0}
                                />
                            </Box>
                        );
                    })}
            </Box>

            <CreateChapter onSuccess={refetch} />
        </>
    );
};

export default ChapterList;
