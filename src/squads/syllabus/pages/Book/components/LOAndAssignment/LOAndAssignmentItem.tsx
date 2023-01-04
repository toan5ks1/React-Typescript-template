import { useCallback, useState } from "react";

import { Entities, EurekaEntities, MutationMenus } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import IconButtonBase from "src/components/IconButton/IconButtonBase";
import ActionPanel from "src/components/Menus/ActionPanel";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import LearningObjectiveIcon from "src/squads/syllabus/components/LeaningObjectiveIcon";

import useDeleteLOAndAssignment from "../../hooks/useDeleteLOAndAssignment";
import DialogUpdateLOs from "../DialogUpdateLOs/DialogUpdateLOs";
import { LOAndAssignmentType, LOByTopicIdQuery } from "./models";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import { Action } from "src/squads/syllabus/hooks/useSwapOrder";

export interface LOAndAssignmentItemProps {
    topicId: string;
    data: LOAndAssignmentType;
    disabledDown: boolean;
    disabledUp: boolean;
    isLO: boolean;
    searchUrl: string;
    itemId: string;
    resource: Entities.LOS | EurekaEntities.ASSIGNMENTS | EurekaEntities.TASK_ASSIGNMENTS;
    onReOrder: (action: Action, identity: string) => void;
    onSuccess: () => void;
}

const LOAndAssignmentItem = (props: LOAndAssignmentItemProps) => {
    const {
        topicId,
        data: item,
        onSuccess,
        onReOrder,
        isLO,
        disabledDown,
        disabledUp,
        itemId: learningObjectOrAssignmentId,
        searchUrl,
        resource,
    } = props;

    const { name, type } = item;

    const path = `/${MicroFrontendTypes.SYLLABUS}/${resource}/${learningObjectOrAssignmentId}/show${searchUrl}`;

    const { push } = useNavigation();

    const [visible, setVisible] = useState<boolean>(false);

    const { isDisableAction } = useBookDetail();

    const { deleteLOsAndAssignment, isLoading } = useDeleteLOAndAssignment({ entity: resource });

    const onMutation = useCallback(
        (actionType: MutationMenus) => {
            switch (actionType) {
                case MutationMenus.RENAME: {
                    if (isLO) return setVisible(true);
                    // Otherwise, is assignment (redirect the user to edit assignment page)
                    return push({
                        pathname: `/${MicroFrontendTypes.SYLLABUS}/${resource}/${learningObjectOrAssignmentId}/edit`,
                        search: `${searchUrl}`,
                    });
                }
                case MutationMenus.DELETE: {
                    return deleteLOsAndAssignment(learningObjectOrAssignmentId, {
                        onSuccess,
                    });
                }
                default:
                    break;
            }
        },
        [
            deleteLOsAndAssignment,
            learningObjectOrAssignmentId,
            isLO,
            onSuccess,
            push,
            resource,
            searchUrl,
        ]
    );

    return (
        <>
            {isLO && (
                <DialogUpdateLOs
                    open={visible}
                    topicId={topicId}
                    data={item as LOByTopicIdQuery}
                    onClose={() => setVisible(false)}
                    onSuccess={onSuccess}
                />
            )}
            <ListItem
                key={learningObjectOrAssignmentId}
                disableRipple
                button
                data-testid="LOAndAssignmentItem__root"
                data-value={learningObjectOrAssignmentId}
                onClick={() => push(path)}
            >
                <Box mr={-1}>
                    <LearningObjectiveIcon type={type} />
                </Box>
                <Box pl={1}>
                    <ListItemText
                        data-testid="LOAndAssignmentItem__name"
                        primary={
                            <TypographyShortenStr variant="body2" color="primary" maxLength={60}>
                                {name}
                            </TypographyShortenStr>
                        }
                    />
                </Box>
                <ListItemSecondaryAction sx={(theme) => ({ right: theme.spacing(0.5) })}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButtonBase
                            size="large"
                            sx={{ width: 40, height: 40 }}
                            color="primary"
                            disabled={disabledDown || isDisableAction}
                            onClick={() =>
                                onReOrder(MutationMenus.MOVE_DOWN, learningObjectOrAssignmentId)
                            }
                            data-testid="LOAndAssignmentItem__moveDown"
                        >
                            <ArrowDownward fontSize="small" />
                        </IconButtonBase>
                        <IconButtonBase
                            size="large"
                            sx={{ width: 40, height: 40 }}
                            color="primary"
                            disabled={disabledUp || isDisableAction}
                            onClick={() =>
                                onReOrder(MutationMenus.MOVE_UP, learningObjectOrAssignmentId)
                            }
                            data-testid="LOAndAssignmentItem__moveUp"
                        >
                            <ArrowUpward fontSize="small" />
                        </IconButtonBase>
                        <ActionPanel
                            loading={isLoading}
                            actions={[MutationMenus.RENAME, MutationMenus.DELETE]}
                            onAction={onMutation}
                            recordName={name}
                            resource={Entities.LOS}
                            disabled={isDisableAction}
                        />
                    </Box>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

export default LOAndAssignmentItem;
