import { Entities } from "src/common/constants/enum";

import { Box, Grid } from "@mui/material";
import GradesAutocompleteHF from "src/components/Autocompletes/GradesAutocompleteHF";
import CheckboxLabelHF from "src/components/Checkboxes/CheckboxLabelHF";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import BooksAutocompleteHF from "src/squads/syllabus/components/Autocompletes/BooksAutocompleteHF";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface StudyPlanFormProps {
    isAddMode: boolean;
}

const StudyPlanForm = (props: StudyPlanFormProps) => {
    const { isAddMode } = props;
    const t = useTranslate();

    const tCourse = useResourceTranslate(Entities.COURSES);

    return (
        <PaperRoundedBorders data-testid="StudyPlanForm__root">
            <Box pt={3} p={4}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <BooksAutocompleteHF
                            required
                            name="book"
                            label={tCourse("studyPlan.bookAssociation")}
                            multiple={false}
                            rules={{ required: t("resources.input.error.required") }}
                            disabled={!isAddMode}
                            limitChipText="Ellipsis"
                            getOptionSelectedField="book_id"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldHF
                            name="name"
                            label={tCourse("studyPlan.studyPlanName")}
                            required
                            rules={{ required: t("resources.input.error.required") }}
                            data-testid="StudyPlanForm__studyPlanName"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <GradesAutocompleteHF
                            label={tCourse("grade")}
                            name="grades"
                            disableCloseOnSelect
                            filterSelectedOptions
                            multiple
                            getOptionSelectedField="id"
                        />
                    </Grid>
                </Grid>
                <Box mt={2} display="flex">
                    <CheckboxLabelHF
                        name="trackSchoolProgress"
                        label={tCourse("studyPlan.trackSchoolProgressCheckbox")}
                        data-testid="StudyPlanForm__trackSchoolProgress"
                        disableMarginLeft
                        checkBoxProps={{
                            variant: "selector",
                            size: "small",
                            name: "trackSchoolProgress",
                        }}
                    />
                </Box>
            </Box>
        </PaperRoundedBorders>
    );
};

export default StudyPlanForm;
