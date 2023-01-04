import { useMemo } from "react";

import { DateTime } from "luxon";
import { useFormContext } from "react-hook-form";
import { ERPModules, Features } from "src/common/constants/enum";
import { FilterAppliedObjectsMap } from "src/common/constants/types";
import { getMinDateToDisablePrevDates, handleDisablePrevDates } from "src/common/utils/time";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyBase from "src/components/Typographys/TypographyBase";
import AutocompleteCoursesHF from "src/squads/lesson/components/Autocompletes/AutocompleteCoursesHF";
import AutocompleteDayOfWeekHF from "src/squads/lesson/components/Autocompletes/AutocompleteDayOfWeekHF";
import AutocompleteGradesHF from "src/squads/lesson/components/Autocompletes/AutocompleteGradesHF";
import AutocompleteLowestLevelLocationsHF from "src/squads/lesson/components/Autocompletes/AutocompleteLowestLevelLocationsHF";
import AutocompleteStudentsHF from "src/squads/lesson/components/Autocompletes/AutocompleteStudentsHF";
import AutocompleteTeachersHF from "src/squads/lesson/components/Autocompletes/AutocompleteTeachersHF";
import DatePickerHF from "src/squads/lesson/components/DatePickers/DatePickerHF";
import TimePickerHF from "src/squads/lesson/components/DatePickers/TimePickerHF";
import FormFilterAdvanced from "src/squads/lesson/components/Forms/FormFilterAdvanced";
import AutocompleteLessonStatusHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteLessonStatusHF";

import isEqual from "lodash/isEqual";
import useDatePickerPairHF from "src/squads/lesson/hooks/useDatePickerPairHF";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useFormFilterAdvanced from "src/squads/lesson/hooks/useFormFilterAdvanced";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useValidateRulesForFormFilterAdvancedLessonManagement, {
    FormFilterLessonManagementValues,
} from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";

export const formFilterDefaultValues: FormFilterLessonManagementValues = {
    lessonStatus: [],
    fromDate: null,
    toDate: null,
    dayOfWeek: [],
    startTime: null,
    endTime: null,
    teachers: [],
    centers: [],
    students: [],
    grades: [],
    courses: [],
    classOfCourses: [],
};

const filterFieldObjects: FilterAppliedObjectsMap<FormFilterLessonManagementValues> = {
    lessonStatus: {
        name: "lessonStatus",
        inputLabel: "resources.lesson_management.filters.lessonStatus",
        isApplied: false,
        defaultValue: [],
    },
    fromDate: {
        name: "fromDate",
        inputLabel: "resources.lesson_management.filters.fromDate",
        isApplied: false,
        defaultValue: null,
    },
    toDate: {
        name: "toDate",
        inputLabel: "resources.lesson_management.filters.toDate",
        isApplied: false,
        defaultValue: null,
    },
    dayOfWeek: {
        name: "dayOfWeek",
        inputLabel: "resources.lesson_management.filters.dayOfTheWeekFilter",
        isApplied: false,
        defaultValue: [],
    },
    startTime: {
        name: "startTime",
        inputLabel: "resources.lesson_management.filters.startTime",
        isApplied: false,
        defaultValue: null,
    },
    endTime: {
        name: "endTime",
        inputLabel: "resources.lesson_management.filters.endTime",
        isApplied: false,
        defaultValue: null,
    },
    teachers: {
        name: "teachers",
        inputLabel: "resources.lesson_management.filters.teachers",
        isApplied: false,
        defaultValue: [],
    },
    centers: {
        name: "centers",
        inputLabel: "resources.lesson_management.filters.locations",
        isApplied: false,
        defaultValue: [],
    },
    students: {
        name: "students",
        inputLabel: "resources.lesson_management.filters.students",
        isApplied: false,
        defaultValue: [],
    },
    grades: {
        name: "grades",
        inputLabel: "resources.lesson_management.filters.grades",
        isApplied: false,
        defaultValue: [],
    },
    courses: {
        name: "courses",
        inputLabel: "resources.lesson_management.filters.courses",
        isApplied: false,
        defaultValue: [],
    },
    classOfCourses: {
        name: "classOfCourses",
        chipLabel: "resources.lesson_management.filters.classes",
        inputLabel: "",
        isApplied: false,
        defaultValue: [],
    },
};

const convertDefaultFilterAppliedObjects = (
    defaultFilters: FormFilterLessonManagementValues,
    filterFieldObjects: FilterAppliedObjectsMap<FormFilterLessonManagementValues>
) => {
    const result = Object.values(filterFieldObjects).filter(
        (filterField) => !isEqual(filterField.defaultValue, defaultFilters[filterField.name])
    );

    return result.map((_) => ({ ..._, isApplied: true }));
};

const isEmptyForm = (values: FormFilterLessonManagementValues) => {
    return isEqual(formFilterDefaultValues, values);
};

export interface FormFilterAdvancedLessonProps {
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: FormFilterLessonManagementValues) => void;
    defaultKeyword: string;
}

const FormFilterAdvancedLesson = (props: FormFilterAdvancedLessonProps) => {
    const { onEnterSearchBar, onApplySubmit, defaultKeyword } = props;
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const formContext = useFormContext<FormFilterLessonManagementValues>();
    const values = formContext.getValues();
    useDatePickerPairHF("startTime", "endTime");

    const validateRules = useValidateRulesForFormFilterAdvancedLessonManagement(tLessonManagement);

    const minDate = useMemo(() => getMinDateToDisablePrevDates(values.fromDate), [values.fromDate]);
    const isNoData = useMemo(() => isEmptyForm(values), [values]);
    const defaultFilterAppliedObjects = useMemo(
        () => convertDefaultFilterAppliedObjects(values, filterFieldObjects),
        [values]
    );

    const { isEnabled: isEnabledStatusFilter } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_DRAFT_OR_PUBLISHED_LESSON
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterLessonManagementValues>({
            defaultValue: formFilterDefaultValues,
            isNoData,
            filterFieldObjects,
            defaultFilterAppliedObjects,
            onApplySubmit,
            ...formContext,
        });

    return (
        <FormFilterAdvanced<FormFilterLessonManagementValues>
            isDisableReset={isNoData}
            filterNameApplied={filterApplied}
            onEnterSearchBar={onEnterSearchBar}
            onDelete={onDelete}
            onReset={onReset}
            onApply={formContext.handleSubmit(onApply)}
            onClosePopover={onClosePopover}
            inputSearchPlaceholder={tLessonManagement("enterStudentName")}
            defaultSearchKeyword={defaultKeyword}
        >
            <Box width={512} data-testid="FormFilterAdvancedLesson__root">
                <Grid container justifyContent="space-between" direction="column">
                    <Grid item container direction="row" spacing={2}>
                        {isEnabledStatusFilter ? (
                            <>
                                <Grid item xs={12}>
                                    <TypographyBase variant="subtitle2">
                                        {tLessonManagement("lessonStatusSection")}
                                    </TypographyBase>
                                </Grid>
                                <Grid item xs={12}>
                                    <AutocompleteLessonStatusHF
                                        label={filterFieldObjects.lessonStatus.inputLabel}
                                        name={filterFieldObjects.lessonStatus.name}
                                        size="small"
                                        disableCloseOnSelect
                                        filterSelectedOptions
                                        multiple
                                        getOptionSelectedField="id"
                                    />
                                </Grid>
                            </>
                        ) : null}
                        <Grid item xs={12}>
                            <TypographyBase variant="subtitle2">
                                {tLessonManagement("generalInfo")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid": "FormFilterAdvancedLesson__fromDate",
                                }}
                                label={filterFieldObjects.fromDate.inputLabel}
                                name={filterFieldObjects.fromDate.name}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid": "FormFilterAdvancedLesson__toDate",
                                }}
                                label={filterFieldObjects.toDate.inputLabel}
                                name={filterFieldObjects.toDate.name}
                                shouldDisableDate={(date) =>
                                    handleDisablePrevDates(date, values.fromDate, minDate)
                                }
                                minDate={values.fromDate ? DateTime.fromJSDate(minDate) : undefined}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteDayOfWeekHF
                                label={filterFieldObjects.dayOfWeek.inputLabel}
                                name={filterFieldObjects.dayOfWeek.name}
                                size="small"
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                getOptionSelectedField="id"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePickerHF
                                label={filterFieldObjects.startTime.inputLabel}
                                name={filterFieldObjects.startTime.name}
                                InputProps={{
                                    "data-testid": "FormFilterAdvancedLesson__startTime",
                                }}
                                rules={validateRules.startTime}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePickerHF
                                label={filterFieldObjects.endTime.inputLabel}
                                name={filterFieldObjects.endTime.name}
                                InputProps={{
                                    "data-testid": "FormFilterAdvancedLesson__endTime",
                                }}
                                rules={validateRules.endTime}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AutocompleteTeachersHF
                                label={filterFieldObjects.teachers.inputLabel}
                                name={filterFieldObjects.teachers.name}
                                optionLabelKey="id"
                                disableCloseOnSelect
                                limitChipText="Ellipsis"
                                getOptionSelectedField="user_id"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AutocompleteLowestLevelLocationsHF
                                label={filterFieldObjects.centers.inputLabel}
                                name={filterFieldObjects.centers.name}
                                optionLabelKey="id"
                                limitChipText="Ellipsis"
                                getOptionSelectedField="locationId"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DividerDashed />
                        </Grid>

                        <Grid item xs={12}>
                            <TypographyBase variant="subtitle2">
                                {tLessonManagement("studentInfo")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={12}>
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
                            <AutocompleteGradesHF
                                label={filterFieldObjects.grades.inputLabel}
                                name={filterFieldObjects.grades.name}
                                size="small"
                                limitChipText="Ellipsis"
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                getOptionSelectedField="id"
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
                    </Grid>
                </Grid>
            </Box>
        </FormFilterAdvanced>
    );
};
export default FormFilterAdvancedLesson;
