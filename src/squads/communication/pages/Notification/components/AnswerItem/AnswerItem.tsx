import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";

import { Box, Grid } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import IconButtonDelete from "src/squads/communication/pages/Notification/components/IconButtonDelete";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useQuestionnaireValidationRules from "src/squads/communication/pages/Notification/hooks/useQuestionnaireValidationRules";

export interface AnswerItemProps {
    questionIndex: number;
    answerIndex: number;
    onDeleteAnswer: (answerIndex: number) => void;
    shouldDisableRemoveAnswer: boolean;
}
const AnswerItem = ({
    questionIndex,
    answerIndex,
    onDeleteAnswer,
    shouldDisableRemoveAnswer,
}: AnswerItemProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const { getValues } = useFormContext<NotificationFormData>();

    const validationRules = useQuestionnaireValidationRules();

    return (
        <Grid data-testid="AnswerItem__root" item display="flex">
            <TextFieldHF
                inputProps={{ "data-testid": "AnswerItem__inputAnswer" }}
                name={`questionFieldArrayItem.${questionIndex}.answerFieldArrayItem.${answerIndex}.content`}
                placeholder={tNotification("label.placeholder.answer")}
                rules={validationRules.answerContent(
                    getValues(`questionFieldArrayItem.${questionIndex}.answerFieldArrayItem`)
                )}
                onBlur={(event) => (event.target.value = event.target.value.trim())}
            />
            <Box ml={2}>
                <IconButtonDelete
                    color="error"
                    onClick={() => onDeleteAnswer(answerIndex)}
                    data-testid="AnswerItem__buttonDeleteAnswer"
                    disabled={shouldDisableRemoveAnswer}
                />
            </Box>
        </Grid>
    );
};

export default AnswerItem;
