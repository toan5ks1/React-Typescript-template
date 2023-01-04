import { memo, useEffect, useMemo } from "react";

import { DateTime } from "luxon";
import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import {
    TIMESHEET_LIMIT_SELECTABLE_MONTHS_IN_THE_FUTURE,
    TIMESHEET_START_DATE,
} from "src/squads/timesheet/common/constants/timesheet";
import { handleDisableExistedDate } from "src/squads/timesheet/common/utils/time";
import { isTeacher } from "src/squads/timesheet/internals/permission";
import { UserIdentity } from "src/squads/timesheet/typings/auth-provider";

import { Grid, Box } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import LocationAutocomplete from "src/squads/timesheet/modules/timesheet-upsert/components/LocationAutocomplete";
import StaffAutocomplete from "src/squads/timesheet/modules/timesheet-upsert/components/StaffAutocomplete";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useQueryExistedTimesheet from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryExistedTimesheet";
import useTimesheetInfoRules from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetInfoRules";

export interface GeneralInfoFormSectionProps {
    staffId?: string;
    locationId?: string;
    userProfile: UserIdentity;
}

const GeneralInfoFormSection = memo(
    ({ userProfile, staffId, locationId }: GeneralInfoFormSectionProps) => {
        const isTeacherLogging = isTeacher(userProfile.userGroup);
        const hasStaffValue = !!staffId;
        const hasLocationValue = !!locationId;

        const disabledDatePicker = Boolean(
            !isTeacherLogging ? !hasStaffValue || !hasLocationValue : !hasLocationValue
        );
        const disabledLocationField = Boolean(!hasStaffValue && !isTeacherLogging);

        const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

        const { setValue } = useFormContext();
        const validateRules = useTimesheetInfoRules();
        const maxSelectableDate = useMemo(
            () => DateTime.now().plus({ months: TIMESHEET_LIMIT_SELECTABLE_MONTHS_IN_THE_FUTURE }),
            []
        );
        const timesheetStartDate = useMemo(() => DateTime.fromJSDate(TIMESHEET_START_DATE), []);

        const { data } = useQueryExistedTimesheet({
            locationId,
            staffId: isTeacherLogging ? userProfile.id : staffId,
            fromDate: timesheetStartDate,
            toDate: maxSelectableDate,
        });
        const dateList = useMemo(() => data.map((item) => new Date(item.timesheet_date)), [data]);

        useEffect(() => {
            if (!hasStaffValue && !isTeacherLogging) {
                setValue("location", undefined);
            }
            if (!hasLocationValue) {
                setValue("timesheetDate", null);
            }
        }, [hasStaffValue, setValue, isTeacherLogging, hasLocationValue]);

        return (
            <Grid container data-testid="GeneralInfoFormSection__root" pb={1}>
                <Box mb={2}>
                    <TypographyPrimary data-testid="GeneralInfoFormSection__title">
                        {tTimesheetManagement("titles.generalInfo")}
                    </TypographyPrimary>
                </Box>
                <Grid container item xs={12}>
                    {isTeacherLogging ? (
                        <>
                            <Grid item xs={6} py={1} pr={1}>
                                <TypographyWithValue
                                    variant="horizontal"
                                    value={convertString(userProfile?.name)}
                                    label={tTimesheetManagement("labels.staffName")}
                                    xsLabel={3}
                                    xsValue={8}
                                    dataTestidValue="GeneralInfoFormSection__generalStaffNameValue"
                                />
                            </Grid>
                            <Grid item xs={6} py={1} pl={1}>
                                <TypographyWithValue
                                    variant="horizontal"
                                    value={convertString(userProfile?.email)}
                                    label={tTimesheetManagement("labels.staffEmail")}
                                    xsLabel={3}
                                    xsValue={8}
                                    dataTestidValue="GeneralInfoFormSection__generalStaffEmailValue"
                                />
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12} py={1}>
                            <StaffAutocomplete />
                        </Grid>
                    )}
                </Grid>

                <Grid container item xs={12} pb={1}>
                    <Grid item xs={6} py={1} pr={1}>
                        <LocationAutocomplete disabled={disabledLocationField} />
                    </Grid>
                    <Grid item xs={6} py={1} pl={1}>
                        <DatePickerHF
                            name="timesheetDate"
                            label={tTimesheetManagement("labels.date")}
                            InputProps={{
                                "data-testid": "GeneralInfoFormSection__timesheetDate",
                                required: true,
                            }}
                            rules={{ required: validateRules.required }}
                            disabled={disabledDatePicker}
                            readOnly={disabledDatePicker}
                            onAccept={(date) => {
                                setValue(
                                    "timesheetDate",
                                    (date as DateTime).startOf("day").toJSDate()
                                );
                            }}
                            maxDate={maxSelectableDate}
                            minDate={timesheetStartDate}
                            shouldDisableDate={(date) => handleDisableExistedDate(date, dateList)}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} p={1}>
                    <DividerDashed />
                </Grid>
            </Grid>
        );
    }
);

export default GeneralInfoFormSection;
