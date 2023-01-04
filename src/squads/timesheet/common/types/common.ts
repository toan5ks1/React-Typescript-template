import { OptionSelectType } from "src/common/constants/types";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import {
    Timesheet_LessonHoursByTimesheetIdsQuery,
    Timesheet_LessonListByLessonIdsQuery,
    Timesheet_OtherWorkingHoursByTimesheetIdQuery,
    Timesheet_TimesheetConfigListByKeyQuery,
    Timesheet_TimesheetListQuery,
    Timesheet_TimesheetListV2Query,
    Timesheet_TimesheetOneQuery,
} from "src/squads/timesheet/service/timesheet/timesheet-types";

export interface UpsertTimesheetFormProps {
    timesheetId?: string;
    staff?: OptionSelectType & {
        name?: string;
        email?: string;
    };
    timesheetDate?: string | null;
    location?: OptionSelectType;
    remark?: string | null;
    [TimesheetKeys.OTHER_WORKING_HOURS]: OtherWorkingHour[];
    lessonHours?: LessonHour[];
}

export type TimesheetListData = Array<
    ArrayElement<Timesheet_TimesheetListQuery["timesheet"]> & {
        location_name?: string;
        staff_name?: string;
        staff_email?: string;
    }
>;

export type TimesheetListDataV2 = Array<
    ArrayElement<Timesheet_TimesheetListV2Query["timesheet"]> & {
        location_name?: string;
        staff_name?: string;
        staff_email?: string;
        total_hour?: number;
        number_of_lessons?: number;
        total_lesson_hours?: number;
    }
>;

export type TimesheetConfigListData = Array<
    ArrayElement<Timesheet_TimesheetConfigListByKeyQuery["timesheet_config"]>
>;

export type WorkingTypeAutocompleteOption = ArrayElement<
    Timesheet_TimesheetConfigListByKeyQuery["timesheet_config"]
>;

export type OtherWorkingHour = ArrayElement<
    Timesheet_OtherWorkingHoursByTimesheetIdQuery["other_working_hours"]
> & {
    working_type?: string;
    id?: string; // id of array fields Hook form
    startTimeAutocomplete?: TimeAutocompleteOption;
    endTimeAutocomplete?: TimeAutocompleteOption;
    workingTypeAutocomplete?: WorkingTypeAutocompleteOption;
};

export type OtherWorkingHourListData = Array<
    ArrayElement<Timesheet_OtherWorkingHoursByTimesheetIdQuery["other_working_hours"]> & {
        working_type?: string;
    }
>;

export interface TimesheetInformation
    extends Partial<ArrayElement<Timesheet_TimesheetOneQuery["timesheet"]>> {
    location_name?: string;
    staff_name?: string;
    staff_email?: string;
    other_working_hours?: OtherWorkingHourListData;
    lesson_hours?: LessonHour[];
}

export interface TimeAutocompleteOption {
    label: string;
    value: Date | null | undefined;
}

export type LessonHour = ArrayElement<
    Timesheet_LessonHoursByTimesheetIdsQuery["timesheet_lesson_hours"]
> &
    ArrayElement<Timesheet_LessonListByLessonIdsQuery["lessons"]>;
