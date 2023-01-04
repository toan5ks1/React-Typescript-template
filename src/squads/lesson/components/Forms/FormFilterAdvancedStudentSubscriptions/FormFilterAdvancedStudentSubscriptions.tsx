import { useMemo } from "react";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FilterAppliedObjectsMap } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { FilterAdvancedLessonManagementStudentInfo } from "src/squads/lesson/common/types";

import { Box, Grid } from "@mui/material";
import AutocompleteCoursesHF from "src/squads/lesson/components/Autocompletes/AutocompleteCoursesHF";
import AutocompleteGradesHF from "src/squads/lesson/components/Autocompletes/AutocompleteGradesHF";
import FormFilterAdvanced from "src/squads/lesson/components/Forms/FormFilterAdvanced";

import useFormFilterAdvanced from "src/squads/lesson/hooks/useFormFilterAdvanced";

const filterFieldObjects: FilterAppliedObjectsMap<FilterAdvancedLessonManagementStudentInfo> = {
    grades: {
        name: "grades",
        inputLabel: "resources.lesson_management.columns.grade",
        isApplied: false,
        defaultValue: [],
    },
    courses: {
        name: "courses",
        inputLabel: "resources.lesson_management.course",
        isApplied: false,
        defaultValue: [],
    },
};

export interface FormFilterAdvancedStudentSubscriptionsProps {
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: FilterAdvancedLessonManagementStudentInfo) => void;
}

const FormFilterAdvancedStudentSubscriptions = (
    props: FormFilterAdvancedStudentSubscriptionsProps
) => {
    const { onApplySubmit, onEnterSearchBar } = props;

    const defaultFilterValues: FilterAdvancedLessonManagementStudentInfo = {
        courses: filterFieldObjects.courses.defaultValue,
        grades: filterFieldObjects.grades.defaultValue,
    };

    const methods = useForm<FilterAdvancedLessonManagementStudentInfo>({
        defaultValues: defaultFilterValues,
    });

    const { courses, grades } = useWatch({ ...methods });

    const isNoData = useMemo(
        () => !(arrayHasItem(courses) || arrayHasItem(grades)),
        [courses, grades]
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FilterAdvancedLessonManagementStudentInfo>({
            defaultValue: defaultFilterValues,
            isNoData,
            filterFieldObjects,
            onApplySubmit,
            ...methods,
        });

    return (
        <FormProvider {...methods}>
            <FormFilterAdvanced<FilterAdvancedLessonManagementStudentInfo>
                isDisableReset={isNoData}
                filterNameApplied={filterApplied}
                onEnterSearchBar={onEnterSearchBar}
                onDelete={onDelete}
                onReset={onReset}
                onApply={methods.handleSubmit(onApply)}
                onClosePopover={onClosePopover}
            >
                {/* TODO: Refactor form filter advance to have default children width */}
                <Box width={512}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <AutocompleteGradesHF
                                label={filterFieldObjects.grades.inputLabel}
                                name={filterFieldObjects.grades.name}
                                size="small"
                                disableCloseOnSelect
                                filterSelectedOptions
                                multiple
                                fullWidth
                                getOptionSelectedField="id"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AutocompleteCoursesHF
                                label={filterFieldObjects.courses.inputLabel}
                                name={filterFieldObjects.courses.name}
                                size="small"
                                disableCloseOnSelect
                                filterSelectedOptions
                                getOptionSelectedField="course_id"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </FormFilterAdvanced>
        </FormProvider>
    );
};

export default FormFilterAdvancedStudentSubscriptions;
