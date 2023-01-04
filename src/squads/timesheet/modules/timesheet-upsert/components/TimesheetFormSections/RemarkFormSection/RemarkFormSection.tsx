import { ERPModules } from "src/common/constants/enum";

import { Box, Grid } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

const PREFIX = "RemarkFormSection";

const REMARK_MAX_LENGTH = 500;

const RemarkFormSection = () => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

    return (
        <Box flexDirection="column" data-testid={`${PREFIX}__root`} mt={3}>
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
                <Grid container>
                    <TextFieldHF
                        name="remark"
                        label={tTimesheetManagement("titles.remark")}
                        inputProps={{
                            "data-testid": `${PREFIX}__remarkInput`,
                            maxLength: REMARK_MAX_LENGTH,
                        }}
                        multiline
                        rows={6.215}
                    />
                </Grid>
            </Box>
        </Box>
    );
};

export default RemarkFormSection;
