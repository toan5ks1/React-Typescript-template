import { useCallback } from "react";

import { MutationMenus } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";

import { Box } from "@mui/material";
import ActionPanel, { CustomAction } from "src/components/Menus/ActionPanel";
import TypographyBase from "src/components/Typographys/TypographyBase";

export type ActionMutationMenu = {
    action: CustomAction<MutationMenus>;
    mutation: () => void;
};

export interface HeaderLessonReportWithActionProps {
    title: string;
    actionsList?: ActionMutationMenu[];
}

const HeaderLessonReportWithAction = (props: HeaderLessonReportWithActionProps) => {
    const { title, actionsList = [] } = props;

    const actions = actionsList.map((element) => element.action);

    const onMutation = useCallback(
        (action: MutationMenus) => {
            const mutateAction = actionsList.find(
                (actionElement) => actionElement.action.action === action
            );

            mutateAction?.mutation();
        },
        [actionsList]
    );

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <TypographyBase variant="subtitle1" data-testid="HeaderLessonReportWithAction__title">
                {title}
            </TypographyBase>

            {arrayHasItem(actionsList) && (
                <ActionPanel actions={actions} onAction={onMutation} recordName={title} />
            )}
        </Box>
    );
};

export default HeaderLessonReportWithAction;
