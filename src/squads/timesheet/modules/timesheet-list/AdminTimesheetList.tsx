import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import AdminTimesheetListNavbar from "src/squads/timesheet/modules/timesheet-list/components/AdminTimesheetListNavbar";
import AdminTimesheetListTable from "src/squads/timesheet/modules/timesheet-list/components/AdminTimesheetListTable";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useQueryTimesheetList from "src/squads/timesheet/modules/timesheet-list/hooks/useQueryTimesheetList";

const AdminTimesheetList = () => {
    const tTimesheetManagement = useResourceTranslate(Entities.TIMESHEET_MANAGEMENT);

    const { data, pagination, isFetching } = useQueryTimesheetList();

    return (
        <WrapperPageContent>
            <TypographyPageTitle title={tTimesheetManagement("titles.timesheetManagement")} />
            <Grid container spacing={2} data-testid="AdminTimesheetList">
                <Grid item xs={12}>
                    <AdminTimesheetListNavbar />
                </Grid>
                <Grid item xs={12}>
                    <AdminTimesheetListTable
                        data={data}
                        isFetching={isFetching}
                        pagination={pagination}
                    />
                </Grid>
            </Grid>
        </WrapperPageContent>
    );
};

export default AdminTimesheetList;
