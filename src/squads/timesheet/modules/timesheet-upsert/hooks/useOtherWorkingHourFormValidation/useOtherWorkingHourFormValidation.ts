import { UseControllerProps, useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { timeIsAfter } from "src/common/utils/time";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { OtherWorkingHour, UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export interface UseOtherWorkingHourFormValidationReturn {
    validate: {
        workingTypeAutocomplete: UseControllerProps["rules"];
        useStartTimeAutocompleteRules: (index?: number) => UseControllerProps["rules"];
        useEndTimeAutocompleteRules: (index?: number) => UseControllerProps["rules"];
    };
}

export const useOtherWorkingHourFormValidation = (): UseOtherWorkingHourFormValidationReturn => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    return {
        validate: {
            workingTypeAutocomplete: {
                validate: (workingType: OtherWorkingHour["workingTypeAutocomplete"]) => {
                    if (!workingType?.config_value) {
                        return tTimesheetManagement("messages.validation.requiredField");
                    }
                    return undefined;
                },
            },
            useStartTimeAutocompleteRules: (index) => {
                const { watch, clearErrors, setError } = useFormContext<UpsertTimesheetFormProps>();
                const otherWorkingHours = watch(TimesheetKeys.OTHER_WORKING_HOURS);

                return {
                    validate: (startTime: OtherWorkingHour["startTimeAutocomplete"]) => {
                        if (!startTime?.value) {
                            return tTimesheetManagement("messages.validation.requiredField");
                        }
                        if (typeof index == "undefined") {
                            return undefined;
                        }
                        const endTime = otherWorkingHours[index].endTimeAutocomplete;
                        if (!endTime?.value) {
                            return undefined;
                        }
                        if (!timeIsAfter(endTime.value, startTime.value)) {
                            setError(`otherWorkingHours.${index}.endTimeAutocomplete`, {
                                message: "",
                            });
                            return tTimesheetManagement("messages.validation.invalidTimeRange");
                        }
                        clearErrors(`otherWorkingHours.${index}.endTimeAutocomplete`);
                        return undefined;
                    },
                };
            },
            useEndTimeAutocompleteRules: (index) => {
                const { watch, clearErrors, setError } = useFormContext<UpsertTimesheetFormProps>();
                const otherWorkingHours = watch(TimesheetKeys.OTHER_WORKING_HOURS);

                return {
                    validate: (endTime: OtherWorkingHour["startTimeAutocomplete"]) => {
                        if (!endTime?.value) {
                            return tTimesheetManagement("messages.validation.requiredField");
                        }
                        if (typeof index === "undefined") {
                            return undefined;
                        }
                        const startTime = otherWorkingHours[index].startTimeAutocomplete;
                        if (!startTime?.value) {
                            return undefined;
                        }
                        if (timeIsAfter(endTime.value, startTime.value)) {
                            clearErrors(`otherWorkingHours.${index}.startTimeAutocomplete`);
                            return undefined;
                        }
                        setError(`otherWorkingHours.${index}.startTimeAutocomplete`, {
                            message: tTimesheetManagement("messages.validation.invalidTimeRange"),
                        });

                        return "";
                    },
                };
            },
        },
    };
};

export default useOtherWorkingHourFormValidation;
