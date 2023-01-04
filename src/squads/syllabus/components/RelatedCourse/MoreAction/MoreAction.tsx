import { useCallback } from "react";

import { Entities, MutationMenus, NotifyTypes } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import ActionPanel, { ActionPanelProps } from "src/components/Menus/ActionPanel";

import useCourseControl from "src/squads/syllabus/hooks/useCourseControl";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface MoreActionProps extends ActionPanelProps {
    recordId: string;
    recordName: string;
    onEdit: () => void;
}

const MoreAction = ({ recordId, recordName, onEdit, ...rest }: MoreActionProps) => {
    const t = useTranslate();
    const navigation = useNavigation();
    const showSnackbar = useShowSnackbar();
    const { actions } = useCourseControl();

    const { mutate: onDelete, isLoading } = inferMutation({
        action: "courseDelete",
        entity: "coursesYasuo",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: t(`resources.${Entities.COURSES}.name`),
                    },
                    { lowercase: true }
                )
            );

            navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.COURSES}`);
        },
        onError: () => {
            showSnackbar(t("ra.common.deleteFail"), NotifyTypes.ERROR);
        },
    });

    const onMutation = useCallback(
        (action: string) => {
            switch (action) {
                case MutationMenus.DELETE: {
                    return onDelete({ courseIdsList: [recordId] });
                }
                case MutationMenus.EDIT: {
                    return onEdit();
                }
                default:
                    return;
            }
        },
        [onDelete, onEdit, recordId]
    );

    if (!actions || !actions.length) return null;

    return (
        <ActionPanel
            resource={Entities.COURSES}
            loading={isLoading}
            recordName={recordName}
            actions={actions}
            onAction={onMutation}
            buttonStyle="square"
            {...rest}
        />
    );
};

export default MoreAction;
