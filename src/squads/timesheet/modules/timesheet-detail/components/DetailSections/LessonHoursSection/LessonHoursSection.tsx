import { ERPModules } from "src/common/constants/enum";
import { TimesheetInformation } from "src/squads/timesheet/common/types";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import LessonHoursTable from "./Table";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export interface LessonHoursSectionProps {
    timesheet?: TimesheetInformation;
    loading?: boolean;
}

const PREFIX = "LessonHoursSection";

export const LessonHoursSection = ({ timesheet, loading = false }: LessonHoursSectionProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

    return (
        <Box flexDirection="column" data-testid={`${PREFIX}__root`} mt={3}>
            <Grid container direction="row" justifyContent="space-between" spacing={3}>
                <Grid item>
                    <Box mb={1}>
                        <TypographyPrimary data-testid={`${PREFIX}__title`}>
                            {tTimesheetManagement("titles.lessonHours")}
                        </TypographyPrimary>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={2} pb={2} data-testid={`${PREFIX}__lessonHours`}>
                <LessonHoursTable
                    dataSource={timesheet?.lesson_hours || []}
                    loading={loading}
                ></LessonHoursTable>
            </Box>
            <Grid item xs={12} p={1}>
                <DividerDashed />
            </Grid>
        </Box>
    );
};

export default LessonHoursSection;
