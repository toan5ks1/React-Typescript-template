import { EurekaEntities } from "src/common/constants/enum";

import { Box, Grid } from "@mui/material";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const ExamUpsertForm = () => {
    const tExam = useResourceTranslate(EurekaEntities.EXAM_LO);

    return (
        <PaperSectionWrapper data-testid="ExamUpsertForm__form">
            <TypographyBase variant="h6">{tExam("examInformation")}</TypographyBase>
            <Box mt={2} mb={2}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <TextFieldHF
                            required
                            name="name"
                            label={tExam("label.name")}
                            inputProps={{
                                id: "name",
                                "data-testid": "ExamUpsertForm__name",
                            }}
                            rules={{
                                required: {
                                    value: true,
                                    message: tExam("resources.input.error.required"),
                                },
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextFieldHF
                            multiline
                            minRows={6}
                            name="instruction"
                            label={tExam("instruction")}
                            inputProps={{
                                id: "instruction",
                                "data-testid": "ExamUpsertForm__instruction",
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </PaperSectionWrapper>
    );
};

export default ExamUpsertForm;
