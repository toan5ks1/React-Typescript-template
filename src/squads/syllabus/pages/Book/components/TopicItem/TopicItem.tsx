import { useCallback, useState } from "react";

import { useToggle } from "react-use";
import { MutationMenus } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { toArr } from "src/common/utils/other";
import { TopicsManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Box } from "@mui/material";
import { AccordionBaseProps } from "src/components/Accordions/AccordionBase";
import IconButtonBase from "src/components/IconButton/IconButtonBase";
import ActionPanel from "src/components/Menus/ActionPanel";

import useDeleteTopic from "../..//hooks/useDeleteTopic";
import DialogEditTopic from "../DialogEditTopic";
import LOAndAssignment from "../LOAndAssignment";
import TopicAccordion from "./TopicAccordion";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import { Action } from "src/squads/syllabus/hooks/useSwapOrder";

export interface TopicItemProps extends Pick<AccordionBaseProps, "defaultExpanded"> {
    topic: TopicsManyQuery["topics"][0];
    chapterId: string;
    bookId: string;
    refetch: () => void;
    onReOrder: (action: Action, identity: string) => void;
    disabledUp: boolean;
    disabledDown: boolean;
}

const TopicItem = (props: TopicItemProps) => {
    const {
        refetch,
        topic,
        chapterId,
        bookId,
        disabledDown,
        disabledUp,
        onReOrder,
        defaultExpanded = false,
    } = props;
    const { topic_id: topicId, icon_url: iconUrl, name } = topic;

    const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
    const [visibleModal, setVisibleModal] = useToggle(false);

    const { isDisableAction } = useBookDetail();

    const { deleteTopic, isLoading } = useDeleteTopic({ onSuccess: refetch });

    const onMutation = useCallback(
        (actionType: MutationMenus) => {
            switch (actionType) {
                case MutationMenus.DELETE:
                    return deleteTopic({ topicIdsList: toArr(topic.topic_id) });

                case MutationMenus.RENAME:
                    return setVisibleModal();
            }
        },
        [deleteTopic, topic, setVisibleModal]
    );

    const onChangeAccordion = () => {
        setExpanded((previous) => !previous);
    };

    return (
        <>
            <Box pl={4} data-testid="TopicItem__root" data-value={topicId}>
                <TopicAccordion
                    expanded={expanded}
                    name={name}
                    iconUrl={convertString(iconUrl)}
                    onChange={onChangeAccordion}
                    endNode={
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButtonBase
                                size="large"
                                sx={{ width: 40, height: 40 }}
                                color="primary"
                                disabled={disabledDown || isDisableAction}
                                data-testid="TopicItem__moveDown"
                                onClick={() => onReOrder(MutationMenus.MOVE_DOWN, topicId)}
                            >
                                <ArrowDownward fontSize="small" />
                            </IconButtonBase>
                            <IconButtonBase
                                size="large"
                                sx={{ width: 40, height: 40 }}
                                color="primary"
                                disabled={disabledUp || isDisableAction}
                                data-testid="TopicItem__moveUp"
                                onClick={() => onReOrder(MutationMenus.MOVE_UP, topicId)}
                            >
                                <ArrowUpward fontSize="small" />
                            </IconButtonBase>

                            <ActionPanel
                                recordName={topic.name}
                                loading={isLoading}
                                actions={[MutationMenus.RENAME, MutationMenus.DELETE]}
                                onAction={onMutation}
                                disabled={isDisableAction}
                            />
                        </Box>
                    }
                >
                    <Box pl={8}>
                        <LOAndAssignment bookId={bookId} chapterId={chapterId} topicId={topicId} />
                    </Box>
                </TopicAccordion>
            </Box>
            <DialogEditTopic
                topic={topic}
                open={visibleModal}
                onSuccess={refetch}
                onClose={() => setVisibleModal(false)}
            />
        </>
    );
};

export default TopicItem;
