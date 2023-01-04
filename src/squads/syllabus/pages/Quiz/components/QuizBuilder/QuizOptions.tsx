import { FocusEvent, memo, useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { DifficultyLevels, Quiz } from "src/squads/syllabus/models/quiz";
import { NsQuizAction } from "src/squads/syllabus/store/quiz";

import { Box, Grid } from "@mui/material";
import TextFieldBase from "src/components/TextFields/TextFieldBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import LOsAutocomplete from "src/squads/syllabus/pages/Quiz/components/Autocompletes/LOsAutocomplete";
import DifficultySelect from "src/squads/syllabus/pages/Quiz/components/Selects/DifficultySelect";
import QuizTypeSelect from "src/squads/syllabus/pages/Quiz/components/Selects/QuizTypeSelect";

import { QuizType } from "manabie-yasuo/quiz_pb";

import { ExternalIdProps } from "../../types";

import Can from "src/contexts/Can";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTextCapitalize from "src/squads/syllabus/hooks/useTextCapitalize";

export interface QuestionOptionsProps {
    readOnly?: boolean;
    difficultyLevel: Quiz["difficultyLevel"];
    externalId: Quiz["externalId"];
    questionType: Quiz["kind"];
    taggedLOs: Quiz["taggedLOs"];
    externalIdProps: ExternalIdProps;
    onChange?: (params: NsQuizAction.ChangeQuestionOption["payload"]) => void;
    onChangeQuizType?: (quizType: QuizType) => void;
}

const QuizOptions = (props: QuestionOptionsProps) => {
    const {
        difficultyLevel,
        externalId,
        questionType,
        taggedLOs,
        onChange,
        onChangeQuizType,
        externalIdProps: { editExternalIdDisabled, externalIdError, checkExternalId },
    } = props;
    const t = useResourceTranslate(Entities.QUIZZES);

    const _onChange: QuestionOptionsProps["onChange"] = (params) => {
        if (typeof onChange === "function") {
            onChange(params);
        }
    };

    const validateExternalId = useCallback(
        async ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
            checkExternalId && checkExternalId(value),
        [checkExternalId]
    );

    return (
        <div data-testid="QuizOptions__root">
            <TypographyHeader sx={useTextCapitalize}>
                <Box sx={{ mt: 1, mb: 2 }}>{t("description")}</Box>
            </TypographyHeader>
            <Grid container spacing={3}>
                <Grid item xs={7} data-testid="QuizOptions__questionType">
                    <QuizTypeSelect
                        required
                        value={questionType}
                        onChange={(e) => onChangeQuizType && onChangeQuizType(e.target.value)}
                    />
                </Grid>
                <Can I="show.external_id" a="quizzes">
                    <Grid item xs={5}>
                        <TextFieldBase
                            error={!!externalIdError}
                            helperText={externalIdError}
                            required
                            disabled={editExternalIdDisabled}
                            value={externalId}
                            label={t("mappedID")}
                            data-testid="QuizOptions__externalId"
                            onChange={(e) => _onChange({ externalId: e.target.value })}
                            onBlur={validateExternalId}
                        />
                    </Grid>
                </Can>

                <Can I="show.tag_lo" a="quizzes">
                    <Grid item xs={7} data-testid="QuizOptions__lo">
                        <LOsAutocomplete
                            value={taggedLOs}
                            onChange={(value) => {
                                _onChange({ taggedLOs: value });
                            }}
                        />
                    </Grid>
                </Can>
                <Can I="show.difficulty" a="quizzes">
                    <Grid item xs={5} data-testid="QuizOptions__difficulty">
                        <DifficultySelect
                            value={difficultyLevel}
                            onChange={(e) =>
                                _onChange({ difficultyLevel: e.target.value as DifficultyLevels })
                            }
                        />
                    </Grid>
                </Can>
            </Grid>
        </div>
    );
};

export default memo(QuizOptions);
