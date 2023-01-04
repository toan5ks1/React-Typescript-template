import { memo } from "react";

import { useWatch } from "react-hook-form";
import { ModeOpenDialog } from "src/common/constants/enum";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { TimesheetInformation, UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";

import LessonHoursSection from "../../../timesheet-detail/components/DetailSections/LessonHoursSection";
import { Box } from "@mui/material";
import { GeneralInfoSection } from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections";
import {
    GeneralInfoFormSection,
    RemarkFormSection,
} from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections";
import OtherWorkingHoursFormSection from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/OtherWorkingHoursFormSection/index";

import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";

export interface FormTimesheetInfoProps {
    mode: ModeOpenDialog;
    timesheet?: TimesheetInformation;
}

export interface FormTimesheetProps {
    mode: ModeOpenDialog;
    timesheet?: TimesheetInformation;
}

const FormTimesheetInfo = memo(({ mode, timesheet }: FormTimesheetInfoProps) => {
    return (
        <Box data-testid="FormTimesheetInfo__root">
            <FormTimesheet mode={mode} timesheet={timesheet} />
        </Box>
    );
});

const FormTimesheet = memo(({ mode, timesheet }: FormTimesheetProps) => {
    const [staff, location, timesheetDateValue] = useWatch<
        UpsertTimesheetFormProps,
        ["staff", "location", "timesheetDate"]
    >({
        name: ["staff", "location", "timesheetDate"],
    });
    const { userProfile } = useGetLocalProfile();

    if (mode === ModeOpenDialog.EDIT) {
        return (
            <Box data-testid="FormTimesheetInfo__form">
                <GeneralInfoSection
                    timesheet={{
                        timesheet_date: convertString(timesheetDateValue),
                        location_id: convertString(location?.id?.toString()),
                        staff_id: convertString(staff?.id?.toString()),
                        location_name: convertString(location?.value),
                        staff_name: staff?.name,
                        staff_email: staff?.email,
                    }}
                />

                <LessonHoursSection timesheet={timesheet} />

                <OtherWorkingHoursFormSection />

                <RemarkFormSection />
            </Box>
        );
    }

    return (
        <Box data-testid="FormTimesheetInfo__addGeneralInfoSection">
            {userProfile && (
                <GeneralInfoFormSection
                    locationId={location?.id.toString()}
                    staffId={staff?.id.toString()}
                    userProfile={userProfile}
                />
            )}{" "}
            <OtherWorkingHoursFormSection />
            <RemarkFormSection />
        </Box>
    );
});

export default FormTimesheetInfo;
