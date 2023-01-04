import { useCallback, useMemo } from "react";

import { DateTime } from "luxon";
import { useFormContext, useWatch } from "react-hook-form";
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
import AutocompleteTimeOfDayHF from "src/squads/lesson/components/Autocompletes/AutocompleteTimeOfDayHF";
import DatePickerHF from "src/squads/lesson/components/DatePickers/DatePickerHF";
import FormFilterAdvanced from "src/squads/lesson/components/Forms/FormFilterAdvanced";
import AutocompleteClassesOfManyCoursesHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteClassesOfManyCoursesHF";
import AutocompleteLessonStatusHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteLessonStatusHF";

import isEqual from "lodash/isEqual";
import useDatePickerPairHF from "src/squads/lesson/hooks/useDatePickerPairHF";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useFormFilterAdvanced from "src/squads/lesson/hooks/useFormFilterAdvanced";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useValidateRulesForLessonManagementListFormFilterAdvancedV2, {
    FormFilterLessonManagementValuesV2,
} from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonManagementListFormFilterAdvancedV2";

export const formFilterDefaultValuesV2: FormFilterLessonManagementValuesV2 = {
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

const filterFieldObjects: FilterAppliedObjectsMap<FormFilterLessonManagementValuesV2> = {
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
        inputLabel: "resources.lesson_management.filters.classes",
        isApplied: false,
        defaultValue: [],
    },
};

const convertDefaultFilterAppliedObjects = (
    defaultFilters: FormFilterLessonManagementValuesV2,
    filterFieldObjects: FilterAppliedObjectsMap<FormFilterLessonManagementValuesV2>
) => {
    const result = Object.values(filterFieldObjects).filter(
        (filterField) => !isEqual(filterField.defaultValue, defaultFilters[filterField.name])
    );

    return result.map((_) => ({ ..._, isApplied: true }));
};

const isEmptyForm = (values: FormFilterLessonManagementValuesV2) => {
    return isEqual(formFilterDefaultValuesV2, values);
};

export interface FormFilterAdvancedLessonV2Props {
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: FormFilterLessonManagementValuesV2) => void;
    defaultKeyword: string;
}

const FormFilterAdvancedLessonV2 = (props: FormFilterAdvancedLessonV2Props) => {
    const { onEnterSearchBar, onApplySubmit, defaultKeyword } = props;
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const formContext = useFormContext<FormFilterLessonManagementValuesV2>();
    const { resetField } = formContext;

    const values = formContext.getValues();
    useDatePickerPairHF("startTime", "endTime");

    const validateRules =
        useValidateRulesForLessonManagementListFormFilterAdvancedV2(tLessonManagement);

    const { isEnabled: isEnabledStatusFilter } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_DRAFT_OR_PUBLISHED_LESSON
    );

    const minDate = useMemo(() => getMinDateToDisablePrevDates(values.fromDate), [values.fromDate]);
    const isNoData = useMemo(() => isEmptyForm(values), [values]);
    const defaultFilterAppliedObjects = useMemo(
        () => convertDefaultFilterAppliedObjects(values, filterFieldObjects),
        [values]
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterLessonManagementValuesV2>({
            defaultValue: formFilterDefaultValuesV2,
            isNoData,
            filterFieldObjects,
            defaultFilterAppliedObjects,
            onApplySubmit,
            ...formContext,
        });

    const [courses, classOfCourses] = useWatch<
        FormFilterLessonManagementValuesV2,
        ["courses", "classOfCourses"]
    >({
        name: ["courses", "classOfCourses"],
    });

    const onChangeCourse = useCallback(() => {
        classOfCourses && resetField("classOfCourses", { defaultValue: [] });
    }, [classOfCourses, resetField]);

    return (
        <FormFilterAdvanced<FormFilterLessonManagementValuesV2>
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
            <Box width={512} data-testid="FormFilterAdvancedLessonV2__root">
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
                                    "data-testid": "FormFilterAdvancedLessonV2__fromDate",
                                }}
                                label={filterFieldObjects.fromDate.inputLabel}
                                name={filterFieldObjects.fromDate.name}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid": "FormFilterAdvancedLessonV2__toDate",
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
                            <AutocompleteTimeOfDayHF
                                name={filterFieldObjects.startTime.name}
                                getOptionSelectedField="value"
                                label={filterFieldObjects.startTime.inputLabel}
                                rules={validateRules.startTime}
                                data-testid="FormFilterAdvancedLessonV2__startTime"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AutocompleteTimeOfDayHF
                                name={filterFieldObjects.endTime.name}
                                getOptionSelectedField="value"
                                label={filterFieldObjects.endTime.inputLabel}
                                rules={validateRules.endTime}
                                data-testid="FormFilterAdvancedLessonV2__endTime"
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
                        <Grid item xs={12}>
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
                                onChange={onChangeCourse}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <AutocompleteClassesOfManyCoursesHF
                                label={filterFieldObjects.classOfCourses.inputLabel}
                                name={filterFieldObjects.classOfCourses.name}
                                size="small"
                                limitChipText="Ellipsis"
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                courses={courses}
                                firstOptions={classOfCourses}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </FormFilterAdvanced>
    );
};
export default FormFilterAdvancedLessonV2;
