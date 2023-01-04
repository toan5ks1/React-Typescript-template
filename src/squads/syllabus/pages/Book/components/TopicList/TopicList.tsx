import { Fragment, useCallback, useState } from "react";

import { Entities } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";
import {
    ChapterAttrsFragment,
    TopicsManyQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import DividerBase from "src/components/Divider/DividerBase";

import useUpdateTopic from "../../hooks/useUpdateTopic";
import DialogCreateTopic from "../DialogCreateTopic";
import TopicItem from "../TopicItem";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useSwapOrder, { Action } from "src/squads/syllabus/hooks/useSwapOrder";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface TopicListProps {
    bookId: string;
    chapter: ChapterAttrsFragment;
    belongToFirstChapter: boolean;
}

const TopicList = ({ bookId, chapter, belongToFirstChapter }: TopicListProps) => {
    const tTopic = useResourceTranslate(Entities.TOPICS);
    const { chapter_id: chapterId } = chapter;

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { isDisableAction } = useBookDetail();

    const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);

    const { updateOrder, isLoading } = useUpdateTopic();

    const { data = [], refetch } = inferQuery({
        entity: "topic",
        action: "syllabusTopicGetManyByChapterId",
    })(
        {
            chapter_id: chapterId,
        },
        {
            enabled: Boolean(chapterId),
        }
    );

    const { swap } = useSwapOrder<TopicsManyQuery["topics"][0]>({ data, key: "topic_id" });

    const onReOrder = useCallback(
        (action: Action, identity: string) => {
            const swapped = swap(action, identity);

            if (!swapped) return;

            updateOrder([swapped[0], swapped[1]], {
                onSuccess: () => {
                    showSnackbar(t("ra.message.moveSuccess"));
                    void refetch();
                },
                onError: (e) => {
                    logger.error("[TopicList] move topic", e);

                    showSnackbar(`${t("ra.message.moveFail")}: ${t(e.message)}`, "error");
                },
            });
        },
        [showSnackbar, swap, t, updateOrder, refetch]
    );

    return (
        <Box data-testid="TopicList__root">
            {data.map((topic, index) => {
                return (
                    <Fragment key={topic.topic_id}>
                        <TopicItem
                            defaultExpanded={belongToFirstChapter && index === 0}
                            key={topic.topic_id}
                            topic={topic}
                            bookId={bookId}
                            chapterId={chapterId}
                            refetch={refetch}
                            onReOrder={onReOrder}
                            disabledDown={isLoading || index === data.length - 1}
                            disabledUp={isLoading || index === 0}
                        />
                        <DividerBase />
                    </Fragment>
                );
            })}

            <Box height={52} pl={5} display="flex" alignItems="center">
                <ButtonCreate
                    color="primary"
                    variant="text"
                    onClick={() => setVisibleEditModal(true)}
                    disabled={isDisableAction}
                    data-testid="TopicList__createTopic"
                >
                    {tTopic("addTitle")}
                </ButtonCreate>
            </Box>

            <DialogCreateTopic
                chapter={chapter}
                refetch={refetch}
                onClose={() => setVisibleEditModal(false)}
                open={visibleEditModal}
            />
        </Box>
    );
};

export default TopicList;
