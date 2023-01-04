import { memo } from "react";

import { isEmpty } from "lodash";
import { Redirect } from "react-router";
import { Entities, ModeOpenDialog, MutationMenus } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import TimesheetUpsert from "src/squads/timesheet/modules/timesheet-upsert";
import { UserIdentity } from "src/squads/timesheet/typings/auth-provider";

import LessonHoursSection from "./components/DetailSections/LessonHoursSection";
import OtherWorkingHourSection from "./components/DetailSections/OtherWorkingHourSection";
import { Box } from "@mui/material";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import {
    GeneralInfoSection,
    RemarkSection,
} from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections";
import HeaderTimesheetDetail from "src/squads/timesheet/modules/timesheet-detail/components/HeaderTimesheetDetail";

import useDialog from "src/hooks/useDialog";
import useTimesheetDetail from "src/squads/timesheet/modules/timesheet-detail/hooks/useTimesheetDetail";

interface TimesheetDetailProps {
    id: string;
    userProfile: UserIdentity;
}

const TimesheetDetail = memo(({ id, userProfile }: TimesheetDetailProps) => {
    const {
        open: openEditTimesheet,
        onOpen: onOpenEditTimesheet,
        onClose: onCloseEditTimesheet,
    } = useDialog();

    const { data, isLoading, refetch } = useTimesheetDetail({ timesheetId: id, userProfile });

    // Actions header
    const onAction = (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.EDIT:
                onOpenEditTimesheet();
                break;
            default: {
                break;
            }
        }
    };

    if (!id)
        return (
            <Redirect to={`/${MicroFrontendTypes.TIMESHEET}/${Entities.TIMESHEET_MANAGEMENT}`} />
        );

    if (isLoading) return <Loading />;

    if (isEmpty(data)) return <NotFound data-testid="NotFound__root" />;

    return (
        <Box data-testid="TimesheetDetail__root">
            <HeaderTimesheetDetail timesheet={data} isLoading={isLoading} onAction={onAction} />

            {openEditTimesheet && (
                <TimesheetUpsert
                    open={openEditTimesheet}
                    mode={ModeOpenDialog.EDIT}
                    onClose={onCloseEditTimesheet}
                    onSave={refetch}
                    timesheet={data}
                />
            )}

            <Box data-testid="TimesheetDetail__detailSections">
                <GeneralInfoSection timesheet={data} />
                <LessonHoursSection timesheet={data} loading={isLoading} />
                <OtherWorkingHourSection timesheet={data} loading={isLoading} />
                <RemarkSection timesheet={data} />
            </Box>
        </Box>
    );
});

export default TimesheetDetail;
