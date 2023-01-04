import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { TimesheetInformation } from "src/squads/timesheet/common/types";

import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue, {
    TypographyWithValueProps,
} from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

const PREFIX = "GeneralInfoSection";

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

export interface GeneralInfoSection {
    timesheet?: TimesheetInformation;
    onClickEdit?: () => void;
}

interface TimesheetInfoSchema
    extends Pick<
        TypographyWithValueProps,
        | "label"
        | "value"
        | "xsLabel"
        | "xsValue"
        | "styleValue"
        | "classNameLabel"
        | "classNameValue"
        | "dataTestidLabel"
        | "dataTestidValue"
    > {}

interface GroupsBoxTimesheetInfo {
    childElements: TimesheetInfoSchema[];
}

const GeneralInfoSection = ({ timesheet }: GeneralInfoSection) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

    const groupsBoxTimesheetInfo = useMemo<GroupsBoxTimesheetInfo[]>(
        () => [
            {
                childElements: [
                    {
                        value: convertString(timesheet?.staff_name),
                        label: tTimesheetManagement("labels.staffName"),
                        dataTestidValue: `${PREFIX}__generalStaffNameValue`,
                    },

                    {
                        value: convertString(timesheet?.staff_email),
                        label: tTimesheetManagement("labels.staffEmail"),
                        dataTestidValue: `${PREFIX}__generalStaffEmailValue`,
                    },
                ],
            },
            {
                childElements: [
                    {
                        value: convertString(timesheet?.timesheet_date),
                        label: tTimesheetManagement("labels.date"),
                        dataTestidValue: `${PREFIX}__generalTimesheetDateValue`,
                    },
                    {
                        value: convertString(timesheet?.location_name),
                        label: tTimesheetManagement("labels.location"),
                        dataTestidValue: `${PREFIX}__generalTimesheetLocationValue`,
                    },
                ],
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(timesheet), tTimesheetManagement]
    );
    return (
        <StyledBox data-testid={`${PREFIX}__root`} mt={3}>
            <Grid container direction="row" justifyContent="space-between" spacing={3}>
                <Grid item>
                    <Box mb={1}>
                        <TypographyPrimary data-testid={`${PREFIX}__title`}>
                            {tTimesheetManagement("titles.generalInfo")}
                        </TypographyPrimary>
                    </Box>
                </Grid>
            </Grid>
            <Box data-testid={`${PREFIX}__generalInfo`}>
                {groupsBoxTimesheetInfo.map((group, index) => {
                    return (
                        <Box key={index} display="flex" flexDirection="row" py={1}>
                            {group.childElements.map(({ value, label, ...rest }, indexChild) => (
                                <Grid
                                    key={indexChild}
                                    container
                                    data-testid={`${PREFIX}__generalInfoItem`}
                                >
                                    <TypographyWithValue
                                        variant="horizontal"
                                        value={value}
                                        label={label}
                                        xsLabel={3}
                                        xsValue={8}
                                        {...rest}
                                    />
                                </Grid>
                            ))}
                        </Box>
                    );
                })}
            </Box>
            <Box my={2}>
                <DividerDashed />
            </Box>
        </StyledBox>
    );
};

export default GeneralInfoSection;
