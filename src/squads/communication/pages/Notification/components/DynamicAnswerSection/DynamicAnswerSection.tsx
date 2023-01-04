import { useFieldArray, useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import {
    MAX_ANSWER_NUMBER,
    MIN_ANSWER_NUMBER,
} from "src/squads/communication/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import {
    checkShouldDisableRemoveAnswerButton,
    checkShouldHideAddAnswerButton,
} from "src/squads/communication/common/utils/questionnaire-utils";

import { Add } from "@mui/icons-material";
import { Grid } from "@mui/material";
import ButtonPrimaryText from "src/components/Buttons/ButtonPrimaryText";
import AnswerItem from "src/squads/communication/pages/Notification/components/AnswerItem";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

export interface DynamicAnswerSectionProps {
    questionIndex: number;
    minimumAnswers?: number;
    maximumAnswers?: number;
}

const DynamicAnswerSection = ({
    questionIndex,
    minimumAnswers = MIN_ANSWER_NUMBER,
    maximumAnswers = MAX_ANSWER_NUMBER,
}: DynamicAnswerSectionProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const { control } = useFormContext<NotificationFormData>();

    const {
        fields: answerFields,
        append: addAnswerItem,
        remove: removeAnswerItem,
    } = useFieldArray<NotificationFormData>({
        control,
        name: `questionFieldArrayItem.${questionIndex}.answerFieldArrayItem`,
    });

    const shouldDisableRemoveAnswer = checkShouldDisableRemoveAnswerButton(
        answerFields.length,
        minimumAnswers
    );

    const shouldHideAddAnswer = checkShouldHideAddAnswerButton(answerFields.length, maximumAnswers);

    return (
        <Grid item container spacing={1} xs={12} data-testid="DynamicAnswerSection__root">
            <Grid item container spacing={2} direction="column">
                {arrayHasItem(answerFields) &&
                    answerFields.map((answerField, index) => {
                        return (
                            <AnswerItem
                                key={answerField.id}
                                questionIndex={questionIndex}
                                answerIndex={index}
                                onDeleteAnswer={removeAnswerItem}
                                shouldDisableRemoveAnswer={shouldDisableRemoveAnswer}
                            />
                        );
                    })}
            </Grid>
            {!shouldHideAddAnswer && (
                <Grid item>
                    <ButtonPrimaryText
                        data-testid="DynamicAnswerSection__buttonAddAnswer"
                        startIcon={<Add />}
                        onClick={() => addAnswerItem({})}
                    >
                        {tNotification("button.addAnswer")}
                    </ButtonPrimaryText>
                </Grid>
            )}
        </Grid>
    );
};

export default DynamicAnswerSection;
