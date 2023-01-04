import { useMemo } from "react";

import { DateTime } from "luxon";
import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { FilterAppliedObjectsMap, FilterAppliedObjectValuesMap } from "src/common/constants/types";
import { getMinDateToDisablePrevDates, handleDisablePrevDates } from "src/common/utils/time";

import { Box, Grid } from "@mui/material";
import AutocompleteCoursesHF from "src/squads/lesson/components/Autocompletes/AutocompleteCoursesHF";
import AutocompleteLowestLevelLocationsHF from "src/squads/lesson/components/Autocompletes/AutocompleteLowestLevelLocationsHF";
import AutocompleteStudentsHF from "src/squads/lesson/components/Autocompletes/AutocompleteStudentsHF";
import DatePickerHF from "src/squads/lesson/components/DatePickers/DatePickerHF";
import FormFilterAdvanced from "src/squads/lesson/components/Forms/FormFilterAdvanced";
import AutocompleteAssignedStudentStatusHF from "src/squads/lesson/domains/AssignedStudentList/components/Autocompletes/AssignedStudentStatusAutocompleteHF";

import isEqual from "lodash/isEqual";
import {
    FormFilterAdvancedAssignedStudentListRecurringValues,
    formFilterAssignedStudentListRecurringDefaultValues,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useFormFilterAdvanced from "src/squads/lesson/hooks/useFormFilterAdvanced";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

const filterFieldObjects: FilterAppliedObjectsMap<FormFilterAdvancedAssignedStudentListRecurringValues> =
    {
        startDate: {
            name: "startDate",
            inputLabel: "resources.assigned_student_list.filters.startDate",
            isApplied: false,
            defaultValue: null,
        },
        endDate: {
            name: "endDate",
            inputLabel: "resources.assigned_student_list.filters.endDate",
            isApplied: false,
            defaultValue: null,
        },
        assignedStudentStatus: {
            name: "assignedStudentStatus",
            inputLabel: "resources.assigned_student_list.filters.assignedStudentStatus",
            isApplied: false,
            defaultValue: [],
        },
        locations: {
            name: "locations",
            inputLabel: "resources.assigned_student_list.filters.locations",
            isApplied: false,
            defaultValue: [],
        },
        students: {
            name: "students",
            inputLabel: "resources.assigned_student_list.filters.students",
            isApplied: false,
            defaultValue: [],
        },
        courses: {
            name: "courses",
            inputLabel: "resources.assigned_student_list.filters.courses",
            isApplied: false,
            defaultValue: [],
        },
    };

const convertDefaultFilterAppliedObjects = (
    defaultFilters: FormFilterAdvancedAssignedStudentListRecurringValues,
    filterFieldObjects: FilterAppliedObjectsMap<FormFilterAdvancedAssignedStudentListRecurringValues>
): FilterAppliedObjectValuesMap<FormFilterAdvancedAssignedStudentListRecurringValues> => {
    return Object.values(filterFieldObjects).reduce(
        (
            filtered: FilterAppliedObjectValuesMap<FormFilterAdvancedAssignedStudentListRecurringValues>,
            filterField
        ) => {
            if (!isEqual(filterField.defaultValue, defaultFilters[filterField.name])) {
                filtered.push({ ...filterField, isApplied: true });
            }
            return filtered;
        },
        []
    );
};

const isEmptyForm = (values: FormFilterAdvancedAssignedStudentListRecurringValues) => {
    return isEqual(formFilterAssignedStudentListRecurringDefaultValues, values);
};

export interface FormFilterAdvancedAssignedStudentListRecurringProps {
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: FormFilterAdvancedAssignedStudentListRecurringValues) => void;
    defaultKeyword: string;
}

const FormFilterAdvancedAssignedStudentListRecurring = (
    props: FormFilterAdvancedAssignedStudentListRecurringProps
) => {
    const { onEnterSearchBar, onApplySubmit, defaultKeyword } = props;
    const tAssignedStudent = useResourceTranslate(ERPModules.ASSIGNED_STUDENT_LIST);
    const formContext = useFormContext<FormFilterAdvancedAssignedStudentListRecurringValues>();
    const values = formContext.getValues();

    const minDate = useMemo(
        () => getMinDateToDisablePrevDates(values.startDate),
        [values.startDate]
    );
    const isNoData = useMemo(() => isEmptyForm(values), [values]);
    const defaultFilterAppliedObjects = useMemo(
        () => convertDefaultFilterAppliedObjects(values, filterFieldObjects),
        [values]
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterAdvancedAssignedStudentListRecurringValues>({
            defaultValue: formFilterAssignedStudentListRecurringDefaultValues,
            isNoData,
            filterFieldObjects,
            defaultFilterAppliedObjects,
            onApplySubmit,
            ...formContext,
        });

    return (
        <FormFilterAdvanced<FormFilterAdvancedAssignedStudentListRecurringValues>
            isDisableReset={isNoData}
            filterNameApplied={filterApplied}
            onEnterSearchBar={onEnterSearchBar}
            onDelete={onDelete}
            onReset={onReset}
            onApply={formContext.handleSubmit(onApply)}
            onClosePopover={onClosePopover}
            inputSearchPlaceholder={tAssignedStudent("enterStudentName")}
            defaultSearchKeyword={defaultKeyword}
        >
            <Box width={512} data-testid="FormFilterAdvancedAssignedStudentListRecurring__root">
                <Grid container justifyContent="space-between" direction="column">
                    <Grid item container direction="row" spacing={2}>
                        <Grid item xs={6}>
                            <AutocompleteStudentsHF
                                label={filterFieldObjects.students.inputLabel}
                                name={filterFieldObjects.students.name}
                                disableClearable={false}
                                size="small"
                                limitChipText="Ellipsis"
                                optionImage=""
                                getOptionSelectedField="user_id"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AutocompleteCoursesHF
                                label={filterFieldObjects.courses.inputLabel}
                                name={filterFieldObjects.courses.name}
                                size="small"
                                limitChipText="Ellipsis"
                                disableCloseOnSelect
                                filterSelectedOptions
                                getOptionSelectedField="course_id"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid":
                                        "FormFilterAdvancedAssignedStudentListRecurring__fromDate",
                                }}
                                label={filterFieldObjects.startDate.inputLabel}
                                name={filterFieldObjects.startDate.name}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid":
                                        "FormFilterAdvancedAssignedStudentListRecurring__toDate",
                                }}
                                label={filterFieldObjects.endDate.inputLabel}
                                name={filterFieldObjects.endDate.name}
                                shouldDisableDate={(date) =>
                                    handleDisablePrevDates(date, values.startDate, minDate)
                                }
                                minDate={
                                    values.startDate ? DateTime.fromJSDate(minDate) : undefined
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteLowestLevelLocationsHF
                                label={filterFieldObjects.locations.inputLabel}
                                name={filterFieldObjects.locations.name}
                                optionLabelKey="id"
                                limitChipText="Ellipsis"
                                getOptionSelectedField="locationId"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteAssignedStudentStatusHF
                                label={filterFieldObjects.assignedStudentStatus.inputLabel}
                                name={filterFieldObjects.assignedStudentStatus.name}
                                size="small"
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                getOptionSelectedField="id"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </FormFilterAdvanced>
    );
};
export default FormFilterAdvancedAssignedStudentListRecurring;
