import { useEffect } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { EurekaEntities } from "src/common/constants/enum";
import { FilterAppliedObjectsMap } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";

import { Box, Grid } from "@mui/material";
import GradesAutocompleteHF from "src/components/Autocompletes/GradesAutocompleteHF";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import FormFilterAdvanced, {
    FormFilterAdvancedProps,
} from "src/components/Forms/FormFilterAdvanced";
import TypographyBase from "src/components/Typographys/TypographyBase";
import BooksAutocompleteHF from "src/squads/syllabus/components/Autocompletes/BooksAutocompleteHF";

import useFormFilterAdvanced from "src/squads/syllabus/hooks/useFormFilterAdvanced";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { UseTranslateReturn } from "src/squads/syllabus/hooks/useTranslate";
import { studyPlanFilterDefaultValues } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import { FormFilterStudyPlanValues } from "src/squads/syllabus/pages/StudyPlan/common/types";

const createFilterFieldObjects = (
    t: UseTranslateReturn
): FilterAppliedObjectsMap<FormFilterStudyPlanValues> => ({
    grades: {
        name: "grades",
        inputLabel: t("grade"),
        isApplied: false,
        defaultValue: studyPlanFilterDefaultValues["grades"],
    },
    books: {
        name: "books",
        inputLabel: t("bookAssociationName"),
        isApplied: false,
        defaultValue: studyPlanFilterDefaultValues["books"],
    },
    archived: {
        name: "archived",
        inputLabel: t("showArchivedStudyPlan"),
        isApplied: false,
        defaultValue: studyPlanFilterDefaultValues["archived"],
    },
});

interface FormFilterAdvancedStudyPlanProps
    extends Pick<FormFilterAdvancedProps<FormFilterStudyPlanValues>, "onEnterSearchBar"> {
    resource: EurekaEntities.COURSE_STUDY_PLANS | EurekaEntities.STUDENT_STUDY_PLANS;
    onApplySubmit: (values: FormFilterStudyPlanValues) => void;
}

const FormFilterAdvancedStudyPlan = (props: FormFilterAdvancedStudyPlanProps) => {
    const { resource, onEnterSearchBar, onApplySubmit } = props;
    const tStudyPlan = useResourceTranslate(EurekaEntities.STUDY_PLANS);
    const methods = useFormContext<FormFilterStudyPlanValues>();
    const { archived, books, grades } = useWatch<FormFilterStudyPlanValues>({
        control: methods.control,
    });
    const isNoData = !archived && !arrayHasItem(books) && !arrayHasItem(grades);
    const filterFieldObjects = createFilterFieldObjects(tStudyPlan);
    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterStudyPlanValues>({
            defaultValue: studyPlanFilterDefaultValues,
            isNoData,
            filterFieldObjects,
            onApplySubmit,
            ...methods,
        });

    useEffect(() => {
        onReset();
    }, [resource, onReset]);

    return (
        <FormFilterAdvanced<FormFilterStudyPlanValues>
            isDisableReset={isNoData}
            filterNameApplied={filterApplied}
            onEnterSearchBar={onEnterSearchBar}
            onDelete={onDelete}
            onReset={onReset}
            onApply={methods.handleSubmit(onApply)}
            onClosePopover={onClosePopover}
        >
            <Box width={512}>
                <Box mb={1}>
                    <TypographyBase variant="subtitle2">{tStudyPlan("name")}</TypographyBase>
                </Box>
                <Grid container spacing={2}>
                    <Grid container item spacing={2}>
                        <Grid item xs={6}>
                            <GradesAutocompleteHF
                                name={filterFieldObjects.grades.name}
                                label={filterFieldObjects.grades.inputLabel}
                                multiple
                                filterSelectedOptions
                                disableCloseOnSelect
                                getOptionSelectedField="id"
                            />
                        </Grid>
                        <Grid item xs>
                            <BooksAutocompleteHF
                                name={filterFieldObjects.books.name}
                                label={filterFieldObjects.books.inputLabel}
                                filterSelectedOptions
                                disableCloseOnSelect
                                limitChipText="Ellipsis"
                                getOptionSelectedField="book_id"
                            />
                        </Grid>
                    </Grid>

                    {resource === EurekaEntities.COURSE_STUDY_PLANS && (
                        <Grid container item spacing={2}>
                            <Grid item xs={12}>
                                <CheckboxLabelHF
                                    name={filterFieldObjects.archived.name}
                                    label={filterFieldObjects.archived.inputLabel}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </FormFilterAdvanced>
    );
};

export default FormFilterAdvancedStudyPlan;
