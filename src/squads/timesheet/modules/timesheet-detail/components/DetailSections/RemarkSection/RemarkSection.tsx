import { ERPModules } from "src/common/constants/enum";
import { TimesheetInformation } from "src/squads/timesheet/common/types";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export interface RemarkSection {
    timesheet?: TimesheetInformation;
}

const PREFIX = "RemarkSection";

const classes = {
    labelOneColumn: `${PREFIX}-labelOneColumn`,
    valueOneColumn: `${PREFIX}-valueOneColumn`,
    breakWord: `${PREFIX}-breakWord`,
};

const StyledBox = styled(Box)({
    [`& .${classes.labelOneColumn}`]: {
        maxWidth: "12.5%",
    },
    [`& .${classes.valueOneColumn}`]: {
        maxWidth: "37.2%",
        whiteSpace: "pre-wrap",
    },
    [`& .${classes.breakWord}`]: {
        wordBreak: "break-word",
    },
});

const RemarkSection = ({ timesheet }: RemarkSection) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

    return (
        <StyledBox flexDirection="column" data-testid={`${PREFIX}__root`} mt={3} pb={3}>
            <Grid container direction="row" justifyContent="space-between" spacing={3}>
                <Grid item>
                    <Box mb={1}>
                        <TypographyPrimary data-testid={`${PREFIX}__title`}>
                            {tTimesheetManagement("titles.remarks")}
                        </TypographyPrimary>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={2} data-testid={`${PREFIX}__remark`}>
                <Grid container data-testid={`${PREFIX}__remarkItem`}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={timesheet?.remark}
                        label={tTimesheetManagement("titles.remark")}
                        xsLabel={2}
                        xsValue={10}
                    />
                </Grid>
            </Box>
        </StyledBox>
    );
};

export default RemarkSection;
