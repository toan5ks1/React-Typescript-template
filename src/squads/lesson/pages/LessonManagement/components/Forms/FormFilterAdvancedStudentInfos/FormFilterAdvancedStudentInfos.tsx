import { useMemo } from "react";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FilterAppliedObjectsMap } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";

import { Box, Grid } from "@mui/material";
import AutocompleteCoursesHF from "src/squads/lesson/components/Autocompletes/AutocompleteCoursesHF";
import AutocompleteGradesHF from "src/squads/lesson/components/Autocompletes/AutocompleteGradesHF";
import AutocompleteLowestLevelLocationsHF from "src/squads/lesson/components/Autocompletes/AutocompleteLowestLevelLocationsHF";
import FormFilterAdvanced from "src/squads/lesson/components/Forms/FormFilterAdvanced";
import AutocompleteClassesOfManyCoursesHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteClassesOfManyCoursesHF";

import useFormFilterAdvanced from "src/squads/lesson/hooks/useFormFilterAdvanced";
import { FilterAdvancedLessonStudentInfo } from "src/squads/lesson/pages/LessonManagement/common/types";

const filterFieldObjects: FilterAppliedObjectsMap<FilterAdvancedLessonStudentInfo> = {
    courses: {
        name: "courses",
        inputLabel: "resources.lesson_management.course",
        isApplied: false,
        defaultValue: [],
    },
    classes: {
        name: "classes",
        inputLabel: "resources.lesson_management.columns.class",
        isApplied: false,
        defaultValue: [],
    },
    grades: {
        name: "grades",
        inputLabel: "resources.lesson_management.columns.grade",
        isApplied: false,
        defaultValue: [],
    },
    locations: {
        name: "locations",
        inputLabel: "resources.lesson_management.columns.location",
        isApplied: false,
        defaultValue: [],
    },
};

export interface FormFilterAdvancedStudentInfosProps {
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: FilterAdvancedLessonStudentInfo) => void;
}

const FormFilterAdvancedStudentInfos = (props: FormFilterAdvancedStudentInfosProps) => {
    const { onApplySubmit, onEnterSearchBar } = props;

    const defaultFilterValues: FilterAdvancedLessonStudentInfo = {
        courses: filterFieldObjects.courses.defaultValue,
        grades: filterFieldObjects.grades.defaultValue,
        locations: filterFieldObjects.locations.defaultValue,
        classes: filterFieldObjects.classes.defaultValue,
    };

    const methods = useForm<FilterAdvancedLessonStudentInfo>({
        defaultValues: defaultFilterValues,
    });

    const [courses, grades, locations, classes] = useWatch<
        FilterAdvancedLessonStudentInfo,
        ["courses", "grades", "locations", "classes"]
    >({
        control: methods.control,
        name: ["courses", "grades", "locations", "classes"],
    });

    const isNoData = useMemo(
        () =>
            !(
                arrayHasItem(courses) ||
                arrayHasItem(grades) ||
                arrayHasItem(locations) ||
                arrayHasItem(classes)
            ),
        [classes, courses, grades, locations]
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FilterAdvancedLessonStudentInfo>({
            defaultValue: defaultFilterValues,
            isNoData,
            filterFieldObjects,
            onApplySubmit,
            ...methods,
        });

    return (
        <FormProvider {...methods}>
            <FormFilterAdvanced<FilterAdvancedLessonStudentInfo>
                isDisableReset={isNoData}
                filterNameApplied={filterApplied}
                onEnterSearchBar={onEnterSearchBar}
                onDelete={onDelete}
                onReset={onReset}
                onApply={methods.handleSubmit(onApply)}
                onClosePopover={onClosePopover}
            >
                <Box width="512px">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AutocompleteCoursesHF
                                label={filterFieldObjects.courses.inputLabel}
                                name={filterFieldObjects.courses.name}
                                multiple
                                disableCloseOnSelect
                                filterSelectedOptions
                                getOptionSelectedField="course_id"
                                firstOptions={courses.map((course) => ({
                                    ...course,
                                    value: course.name,
                                }))}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <AutocompleteClassesOfManyCoursesHF
                                label={filterFieldObjects.classes.inputLabel}
                                name={filterFieldObjects.classes.name}
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                fullWidth
                                courses={courses}
                                firstOptions={classes}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <AutocompleteGradesHF
                                label={filterFieldObjects.grades.inputLabel}
                                name={filterFieldObjects.grades.name}
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                fullWidth
                                getOptionSelectedField="id"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <AutocompleteLowestLevelLocationsHF
                                label={filterFieldObjects.locations.inputLabel}
                                name={filterFieldObjects.locations.name}
                                multiple
                                disableCloseOnSelect
                                filterSelectedOptions
                                getOptionSelectedField="locationId"
                                firstOptions={locations.map((location) => ({
                                    ...location,
                                    value: location.name,
                                }))}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </FormFilterAdvanced>
        </FormProvider>
    );
};

export default FormFilterAdvancedStudentInfos;
