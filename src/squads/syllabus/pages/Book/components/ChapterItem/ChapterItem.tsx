import { ChangeEvent, useCallback, useState } from "react";

import { useToggle } from "react-use";
import { MutationMenus } from "src/common/constants/enum";
import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";

import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import { Box } from "@mui/material";
import { AccordionBaseProps } from "src/components/Accordions/AccordionBase";
import IconButtonBase from "src/components/IconButton/IconButtonBase";
import ActionPanel from "src/components/Menus/ActionPanel";
import BackdropInlineBlock from "src/squads/syllabus/components/Backdrops/BackdropInlineBlock";

import useDeleteChapter from "../../hooks/useDeleteChapter";
import EditChapter from "../EditChapter";
import TopicList from "../TopicList";
import ChapterAccordion from "./ChapterAccordion";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import { Action } from "src/squads/syllabus/hooks/useSwapOrder";

export interface ChapterItemProps extends Pick<AccordionBaseProps, "defaultExpanded"> {
    chapter: ChapterAttrsFragment;
    bookId: string;
    onSuccess: () => void;
    refetchChapter: () => void;
    onReOrder: (action: Action, identity: string) => void;
    disabledUp: boolean;
    disabledDown: boolean;
}

const ChapterItem = ({
    bookId,
    chapter,
    onSuccess,
    refetchChapter,
    onReOrder,
    disabledUp,
    disabledDown,
    defaultExpanded = false,
}: ChapterItemProps) => {
    const { chapter_id: chapterId, name } = chapter;
    const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
    const [editMode, toggleEditMode] = useToggle(false);
    const { mutate, isLoading } = useDeleteChapter({ onSuccess });

    const { isDisableAction } = useBookDetail();

    const onEditSuccess = () => {
        toggleEditMode();
        refetchChapter();
    };

    const onChangeAccordion = (_event: ChangeEvent<{}>) => {
        setExpanded((previous) => !previous);
    };

    const onAction = useCallback(
        (actionName: MutationMenus) => {
            switch (actionName) {
                case MutationMenus.DELETE:
                    return mutate({ chapterIdsList: [chapterId] });
                case MutationMenus.RENAME:
                    return toggleEditMode();

                default:
                    break;
            }
        },
        [chapterId, mutate, toggleEditMode]
    );

    return (
        <BackdropInlineBlock
            open={editMode}
            overlayContent={
                <EditChapter
                    bookId={bookId}
                    chapter={chapter}
                    onClose={toggleEditMode}
                    refetch={onEditSuccess}
                />
            }
        >
            <Box data-testid="ChapterItem_root" data-value={chapterId}>
                <ChapterAccordion
                    name={name}
                    onChange={onChangeAccordion}
                    expanded={expanded}
                    endNode={
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButtonBase
                                size="large"
                                sx={{ width: 40, height: 40 }}
                                color="primary"
                                disabled={disabledDown || isDisableAction}
                                data-testid="ChapterItem__moveDown"
                                onClick={() => onReOrder(MutationMenus.MOVE_DOWN, chapterId)}
                            >
                                <ArrowDownward fontSize="small" />
                            </IconButtonBase>
                            <IconButtonBase
                                size="large"
                                sx={{ width: 40, height: 40 }}
                                color="primary"
                                disabled={disabledUp || isDisableAction}
                                data-testid="ChapterItem__moveUp"
                                onClick={() => onReOrder(MutationMenus.MOVE_UP, chapterId)}
                            >
                                <ArrowUpward fontSize="small" />
                            </IconButtonBase>
                            <ActionPanel
                                loading={isLoading}
                                onAction={onAction}
                                record={chapter}
                                actions={[MutationMenus.RENAME, MutationMenus.DELETE]}
                                recordName={name}
                                disabled={isDisableAction}
                            />
                        </Box>
                    }
                >
                    <TopicList
                        belongToFirstChapter={defaultExpanded}
                        bookId={bookId}
                        chapter={chapter}
                    />
                </ChapterAccordion>
            </Box>
        </BackdropInlineBlock>
    );
};

export default ChapterItem;
