import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import StaffTimesheetListNavbar from "src/squads/timesheet/modules/timesheet-list/components/StaffTimesheetListNavbar";
import StaffTimesheetListTable from "src/squads/timesheet/modules/timesheet-list/components/StaffTimesheetListTable";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useQueryTimesheetList from "src/squads/timesheet/modules/timesheet-list/hooks/useQueryTimesheetList";

export interface StaffTimesheetListProps {
    staffId: string;
}

const StaffTimesheetList = ({ staffId }: StaffTimesheetListProps) => {
    const tTimesheetManagement = useResourceTranslate(Entities.TIMESHEET_MANAGEMENT);
    const { data, pagination, isFetching } = useQueryTimesheetList(staffId);

    return (
        <WrapperPageContent>
            <TypographyPageTitle title={tTimesheetManagement("titles.timesheetManagement")} />
            <Grid container spacing={2} data-testid="StaffTimesheetList">
                <Grid item xs={12}>
                    <StaffTimesheetListNavbar />
                </Grid>
                <Grid item xs={12}>
                    <StaffTimesheetListTable
                        data={data}
                        isFetching={isFetching}
                        pagination={pagination}
                    />
                </Grid>
            </Grid>
        </WrapperPageContent>
    );
};

export default StaffTimesheetList;
