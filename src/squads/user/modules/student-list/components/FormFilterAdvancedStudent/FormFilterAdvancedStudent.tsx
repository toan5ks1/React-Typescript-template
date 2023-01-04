import { useMemo } from "react";

import { DeepPartial, FormProvider, UnpackNestedValue, useForm, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { FilterAppliedObjectsMap } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { Grade } from "src/squads/user/models/grade";
import { CoursesManyQuery } from "src/squads/user/service/bob/bob-types";

import { Grid, Box } from "@mui/material";
import CoursesAutocompleteHF from "src/components/Autocompletes/CoursesAutocompleteHF";
import GradesAutocompleteHF from "src/components/Autocompletes/GradesAutocompleteHF";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import DividerDashed from "src/components/Divider/DividerDashed";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";
import TypographyBase from "src/components/Typographys/TypographyBase";

import isEqual from "lodash/isEqual";
import useResourceTranslate, {
    UseResourceTranslateReturn,
} from "src/squads/user/hooks/useResourceTranslate";
import useFormFilterAdvanced from "src/squads/user/modules/student-list/hooks/useFormFilterAdvanced";

export type FormFilterStudentValues = {
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
    isNotLogged: boolean;
};

export const formFilterStudentDefaultValues: FormFilterStudentValues = {
    grades: [],
    courses: [],
    isNotLogged: false,
};

const convertFilterFieldsObjects = (
    t: UseResourceTranslateReturn
): FilterAppliedObjectsMap<FormFilterStudentValues> => ({
    grades: {
        name: "grades",
        inputLabel: t("labels.colGrade"),
        isApplied: false,
        defaultValue: [],
    },
    courses: {
        name: "courses",
        inputLabel: t("labels.colCourse"),
        isApplied: false,
        defaultValue: [],
    },
    isNotLogged: {
        name: "isNotLogged",
        inputLabel: t("labels.neverLoggedIn"),
        isApplied: false,
        defaultValue: false,
    },
});

const convertDefaultFilterAppliedObjects = (
    defaultFilters: FormFilterStudentValues,
    filterFieldObjects: FilterAppliedObjectsMap<FormFilterStudentValues>
) => {
    const result = Object.values(filterFieldObjects).filter(
        (filterField) => !isEqual(filterField.defaultValue, defaultFilters[filterField.name])
    );

    return result.map((_) => ({ ..._, isApplied: true }));
};

export interface FormFilterAdvancedStudentProps {
    defaultFilters?: FormFilterStudentValues;
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: UnpackNestedValue<DeepPartial<FormFilterStudentValues>>) => void;
}

const FormFilterAdvancedStudent = (props: FormFilterAdvancedStudentProps) => {
    const {
        defaultFilters = formFilterStudentDefaultValues,
        onEnterSearchBar,
        onApplySubmit,
    } = props;
    const tStudentErp = useResourceTranslate(ERPModules.STUDENTS);

    const methods = useForm<FormFilterStudentValues>({
        defaultValues: defaultFilters,
    });

    const { courses, grades, isNotLogged } = useWatch({ ...methods });

    const filterFieldObjects = convertFilterFieldsObjects(tStudentErp);
    const defaultFilterAppliedObjects = useMemo(() => {
        return convertDefaultFilterAppliedObjects(defaultFilters, filterFieldObjects);
    }, [defaultFilters, filterFieldObjects]);

    const isNoData = useMemo(
        () => !(arrayHasItem(courses) || arrayHasItem(grades) || isNotLogged),
        [courses, grades, isNotLogged]
    );

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterStudentValues>({
            defaultValue: formFilterStudentDefaultValues,
            isNoData,
            filterFieldObjects,
            filterAppliedFieldObjects: defaultFilterAppliedObjects,
            onApplySubmit,
            ...methods,
        });

    return (
        <FormProvider {...methods}>
            <FormFilterAdvanced<FormFilterStudentValues>
                isDisableReset={isNoData}
                filterNameApplied={filterApplied}
                onEnterSearchBar={onEnterSearchBar}
                onDelete={onDelete}
                onReset={onReset}
                onApply={methods.handleSubmit(onApply)}
                onClosePopover={onClosePopover}
                inputSearchPlaceholder={tStudentErp("placeholder.enterYourKeyword")}
            >
                {/* Width 350px follow design */}
                <Box width={350} data-testid="FormFilterAdvancedStudent__root">
                    <Grid container spacing={2}>
                        <Grid item container spacing={1}>
                            <Grid item xs={12}>
                                <TypographyBase variant="subtitle2">
                                    {tStudentErp(`labels.colGrade`)}
                                </TypographyBase>
                            </Grid>
                            <Grid item xs={12}>
                                <GradesAutocompleteHF
                                    label={filterFieldObjects.grades.inputLabel}
                                    name={filterFieldObjects.grades.name}
                                    size="small"
                                    disableCloseOnSelect
                                    filterSelectedOptions
                                    multiple
                                    getOptionSelectedField="id"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CheckboxLabelHF
                                    name={filterFieldObjects.isNotLogged.name}
                                    label={tStudentErp("labels.showNeverLoggedIn")}
                                    data-testid="CheckboxLabelHF_isNotLogged"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <DividerDashed />
                        </Grid>
                        <Grid item container spacing={1}>
                            <Grid item xs={12}>
                                <TypographyBase variant="subtitle2">
                                    {tStudentErp(`labels.colCourse`)}
                                </TypographyBase>
                            </Grid>
                            <Grid item xs={12}>
                                <CoursesAutocompleteHF
                                    label={filterFieldObjects.courses.inputLabel}
                                    name={filterFieldObjects.courses.name}
                                    size="small"
                                    disableCloseOnSelect
                                    filterSelectedOptions
                                    getOptionSelectedField="course_id"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </FormFilterAdvanced>
        </FormProvider>
    );
};

export default FormFilterAdvancedStudent;
