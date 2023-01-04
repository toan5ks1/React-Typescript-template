import { OtherWorkingHour } from "src/squads/timesheet/common/types";

export const initializeOtherWorkingHour = (): OtherWorkingHour => ({
    timesheet_id: "",
    other_working_hours_id: "",
    timesheet_config_id: "",
    start_time: "",
    end_time: "",
    remarks: "",
    total_hour: 0,
    endTimeAutocomplete: {
        label: "",
        value: undefined,
    },
    startTimeAutocomplete: {
        label: "",
        value: undefined,
    },
    workingTypeAutocomplete: {
        config_type: "",
        config_value: "",
        timesheet_config_id: "",
    },
});
