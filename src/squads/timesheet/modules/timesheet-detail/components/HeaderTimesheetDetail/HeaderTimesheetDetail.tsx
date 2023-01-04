import { useMemo } from "react";

import { ERPModules, MutationMenus } from "src/common/constants/enum";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { TimesheetInformation } from "src/squads/timesheet/common/types";

import { Box } from "@mui/material";
import Breadcrumbs from "src/components/Breadcrumbs";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import ChipTimesheetStatus from "src/squads/timesheet/modules/timesheet-list/components/ChipTimesheetStatus";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface HeaderTimesheetDetailProps {
    timesheet?: TimesheetInformation;
    isLoading?: boolean;
    onAction?: (...args: any[]) => void;
}

const HeaderTimesheetDetail = ({ timesheet, isLoading, onAction }: HeaderTimesheetDetailProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const t = useTranslate();

    const actions: Action[] = useMemo(() => {
        return [{ action: MutationMenus.EDIT, label: t("resources.action.edit") }];
    }, [t]);

    const timesheetDate = convertString(timesheet?.timesheet_date);

    return (
        <Box data-testid="HeaderTimesheetDetail__root">
            <Breadcrumbs resource={ERPModules.TIMESHEET_MANAGEMENT} name={timesheetDate} />
            <WrapperPageHeader
                title={tTimesheetManagement("timesheetDetail")}
                status={
                    <ChipTimesheetStatus
                        data-testid="TimesheetStatusChip"
                        status={timesheet?.timesheet_status}
                    />
                }
                action={
                    <ActionPanel
                        loading={isLoading}
                        actions={actions}
                        record={timesheet}
                        recordName={timesheet?.timesheet_date}
                        buttonStyle="square"
                        onAction={onAction}
                    />
                }
            />
        </Box>
    );
};

export default HeaderTimesheetDetail;
