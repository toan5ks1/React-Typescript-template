import { useMemo } from "react";

import { ModeOpenDialog, MutationMenus } from "src/common/constants/enum";
import TimesheetUpsert from "src/squads/timesheet/modules/timesheet-upsert";

import Box from "@mui/material/Box";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";

import useDialog from "src/hooks/useDialog";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export const AdminTimesheetListNavbar = () => {
    const t = useTranslate();
    const {
        open: openCreateTimesheet,
        onOpen: onOpenCreateTimesheet,
        onClose: onCloseCreateTimesheet,
    } = useDialog();

    const actions: Action[] = useMemo(() => {
        return [{ action: MutationMenus.CREATE, label: t("resources.action.create") }];
    }, [t]);

    const onMutation = async (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.CREATE:
                onOpenCreateTimesheet();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="start"
                mb={1}
                data-testid="AdminTimesheetListNavbar__root"
            >
                <ActionPanel
                    actions={actions}
                    onAction={onMutation}
                    recordName=""
                    buttonStyle="square"
                />
            </Box>
            {openCreateTimesheet && (
                <TimesheetUpsert
                    open={openCreateTimesheet}
                    mode={ModeOpenDialog.ADD}
                    onClose={onCloseCreateTimesheet}
                />
            )}
        </>
    );
};
export default AdminTimesheetListNavbar;
