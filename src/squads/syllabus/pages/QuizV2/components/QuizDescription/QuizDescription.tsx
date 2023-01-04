import { FC } from "react";

import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import QuizDifficultySelect from "src/squads/syllabus/pages/QuizV2/components/QuizDifficultySelect";
import QuizLOsAutocomplete from "src/squads/syllabus/pages/QuizV2/components/QuizLOsAutocomplete";
import QuizQuestion from "src/squads/syllabus/pages/QuizV2/components/QuizQuestion";
import QuizSection from "src/squads/syllabus/pages/QuizV2/components/QuizSection";
import QuizTypeSelect from "src/squads/syllabus/pages/QuizV2/components/QuizTypeSelect";

import Can from "src/contexts/Can";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { useQuizContext } from "src/squads/syllabus/pages/QuizV2/contexts/QuizContext";
import useQuizValidation from "src/squads/syllabus/pages/QuizV2/hooks/useQuizValidation";

const QuizDescription: FC = () => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const { mode } = useQuizContext();
    const rules = useQuizValidation();

    return (
        <QuizSection title={t("description")}>
            <Grid container spacing={3}>
                <Grid item xs={7} data-testid="QuizDescription__questionType">
                    <QuizTypeSelect />
                </Grid>

                <Can I="show.external_id" a="quizzes">
                    <Grid item xs={5}>
                        <TextFieldHF
                            name="externalId"
                            rules={rules.externalId}
                            required
                            disabled={mode === "edit"}
                            label={t("mappedID")}
                            data-testid="QuizDescription__externalId"
                        />
                    </Grid>
                </Can>

                <Can I="show.tag_lo" a="quizzes">
                    <Grid item xs={7} data-testid="QuizDescription__lo">
                        <QuizLOsAutocomplete />
                    </Grid>
                </Can>

                <Can I="show.difficulty" a="quizzes">
                    <Grid item xs={5} data-testid="QuizDescription__difficulty">
                        <QuizDifficultySelect />
                    </Grid>
                </Can>

                <Grid item xs={12} data-testid="QuizDescription__question">
                    <QuizQuestion />
                </Grid>
            </Grid>
        </QuizSection>
    );
};

export default QuizDescription;
