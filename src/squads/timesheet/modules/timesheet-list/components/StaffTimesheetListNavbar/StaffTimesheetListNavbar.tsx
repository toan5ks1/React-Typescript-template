import { Entities, ModeOpenDialog } from "src/common/constants/enum";
import TimesheetUpsert from "src/squads/timesheet/modules/timesheet-upsert";

import Box from "@mui/material/Box";
import ButtonCreate from "src/components/Buttons/ButtonCreate";

import useDialog from "src/hooks/useDialog";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export const StaffTimesheetListNavbar = () => {
    const {
        open: openCreateTimesheet,
        onOpen: onOpenCreateTimesheet,
        onClose: onCloseCreateTimesheet,
    } = useDialog();

    const t = useTranslate();

    return (
        <>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="start"
                mb={1}
                data-testid="StaffTimesheetListNavbar__root"
            >
                <ButtonCreate
                    data-testid="StaffTimesheetListNavbar__addButton"
                    resource={Entities.TIMESHEET_MANAGEMENT}
                    onClick={onOpenCreateTimesheet}
                >
                    {t("resources.action.create")}
                </ButtonCreate>
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
export default StaffTimesheetListNavbar;
