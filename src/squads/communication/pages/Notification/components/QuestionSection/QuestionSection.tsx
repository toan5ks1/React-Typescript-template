import { useMemo, useState } from "react";

import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import {
    AnswerFormValue,
    NotificationFormData,
    OptionSelectType,
    QuestionnaireQuestionType,
} from "src/squads/communication/common/constants/types";
import { questionTypeChoice } from "src/squads/communication/common/utils/choice";
import { getDefaultAnswerItems } from "src/squads/communication/common/utils/questionnaire-table-utils";
import {
    getQuestionnaireQuestionNameByIndex,
    isShortAnswerTypeQuestion,
} from "src/squads/communication/common/utils/questionnaire-utils";

import { Box, Grid, SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import DynamicAnswerSection from "src/squads/communication/pages/Notification/components/DynamicAnswerSection";
import IconButtonDelete from "src/squads/communication/pages/Notification/components/IconButtonDelete";
import SwitchLabelHF from "src/squads/communication/pages/Notification/components/Switch/SwitchLabelHF";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useQuestionnaireValidationRules from "src/squads/communication/pages/Notification/hooks/useQuestionnaireValidationRules";

export interface QuestionSectionProps {
    questionIndex: number;
    questionType: QuestionnaireQuestionType;
    onDeleteQuestion: () => void;
    minimumAnswers: number;
    maximumAnswers: number;
}
const QuestionSection = ({
    questionIndex,
    questionType,
    onDeleteQuestion,
    minimumAnswers,
    maximumAnswers,
}: QuestionSectionProps) => {
    const [shouldShowAnswerSection, setShouldShowAnswerSection] = useState(
        !isShortAnswerTypeQuestion(questionType)
    );

    const theme = useTheme();

    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const t = useTranslate();

    const validationRules = useQuestionnaireValidationRules();

    const optionsQuestionType: OptionSelectType[] = useMemo(
        () =>
            questionTypeChoice.map((questionType) => ({
                id: questionType.id,
                value: t(questionType.value),
            })),
        [t]
    );

    const { setValue } = useFormContext<NotificationFormData>();

    const handleQuestionTypeChange = (event: SelectChangeEvent<unknown>) => {
        const questionType = event.target.value as QuestionnaireQuestionType;
        const isShortAnswerType = isShortAnswerTypeQuestion(questionType);
        const answerItems: AnswerFormValue[] =
            questionType === "QUESTION_TYPE_FREE_TEXT" ? [] : getDefaultAnswerItems(minimumAnswers);

        setValue(`questionFieldArrayItem.${questionIndex}.answerFieldArrayItem`, answerItems);
        setShouldShowAnswerSection(!isShortAnswerType);
    };

    return (
        <PaperRoundedBorders data-testid="QuestionSection__root">
            <Box px={2} py={1} borderBottom={`1px solid ${theme.palette.grey[200]}`}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <TypographyShortenStr
                            maxLength={30}
                            data-testid="QuestionSection__questionTitle"
                        >
                            {`${tNotification("label.question")} ${questionIndex + 1}`}
                        </TypographyShortenStr>
                    </Grid>
                    <Grid item>
                        <IconButtonDelete
                            color="error"
                            onClick={onDeleteQuestion}
                            data-testid="QuestionSection__buttonDeleteQuestion"
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box px={2} py={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextFieldHF
                            inputProps={{ "data-testid": "QuestionSection__inputQuestion" }}
                            name={`${getQuestionnaireQuestionNameByIndex(questionIndex)}.content`}
                            placeholder={tNotification("label.placeholder.question")}
                            rules={validationRules.questionContent}
                            onBlur={(event) => (event.target.value = event.target.value.trim())}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SwitchLabelHF
                            data-testid="QuestionSection__switchRequiredQuestion"
                            label={tNotification("label.requiredQuestion")}
                            name={`${getQuestionnaireQuestionNameByIndex(
                                questionIndex
                            )}.isRequiredQuestion`}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectHF
                            data-testid="QuestionSection__selectQuestionType"
                            name={`${getQuestionnaireQuestionNameByIndex(
                                questionIndex
                            )}.questionType`}
                            label={tNotification("label.questionType")}
                            options={optionsQuestionType}
                            onChange={handleQuestionTypeChange}
                        />
                    </Grid>

                    {shouldShowAnswerSection && (
                        <DynamicAnswerSection
                            questionIndex={questionIndex}
                            minimumAnswers={minimumAnswers}
                            maximumAnswers={maximumAnswers}
                        />
                    )}
                </Grid>
            </Box>
        </PaperRoundedBorders>
    );
};

export default QuestionSection;
