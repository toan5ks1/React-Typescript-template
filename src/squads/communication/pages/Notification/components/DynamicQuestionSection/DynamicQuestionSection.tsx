import { useFieldArray, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";
import {
    MAX_ANSWER_NUMBER,
    MAX_QUESTION_NUMBER,
    MIN_ANSWER_NUMBER,
} from "src/squads/communication/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { getDefaultAnswerItems } from "src/squads/communication/common/utils/questionnaire-table-utils";
import { checkScheduleStatus } from "src/squads/communication/common/utils/utils";

import { Add } from "@mui/icons-material";
import { Grid } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import DeliveryDateInputs from "src/squads/communication/pages/Notification/components/DeliveryDateInputs";
import QuestionSection from "src/squads/communication/pages/Notification/components/QuestionSection";
import SwitchLabelHF from "src/squads/communication/pages/Notification/components/Switch/SwitchLabelHF";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useQuestionnaireValidationRules from "src/squads/communication/pages/Notification/hooks/useQuestionnaireValidationRules";

interface DynamicQuestionSectionProps {
    maximumQuestions?: number;
    minimumAnswers?: number;
    maximumAnswers?: number;
}

const DynamicQuestionSection = ({
    maximumQuestions: maxQuestion = MAX_QUESTION_NUMBER,
    minimumAnswers = MIN_ANSWER_NUMBER,
    maximumAnswers = MAX_ANSWER_NUMBER,
}: DynamicQuestionSectionProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const {
        fields: questionFields,
        append: addQuestionSection,
        remove: removeQuestionSection,
    } = useFieldArray<NotificationFormData, "questionFieldArrayItem">({
        name: "questionFieldArrayItem",
    });

    const [status, scheduleDate, scheduleTime, expirationDate] = useWatch({
        name: ["status", "scheduleDate", "scheduleTime", "expirationDate"],
    });

    const validationRules = useQuestionnaireValidationRules();

    return (
        <Grid container spacing={2} data-testid="DynamicQuestionSection__root">
            {arrayHasItem(questionFields) && (
                <>
                    <Grid item container xs={12} spacing={2} justifyContent="space-between">
                        <Grid item xs={6}>
                            <DeliveryDateInputs
                                dateFieldProps={{
                                    disablePast: true,
                                    name: "expirationDate",
                                    toolbarTitle: tNotification("label.notificationDate"),
                                    InputProps: {
                                        "data-testid":
                                            "DynamicQuestionSection__datePickerExpiration",
                                    },
                                    label: tNotification("label.expirationDate"),
                                    rules: validationRules.expirationDate({
                                        isSchedule: checkScheduleStatus(status),
                                        scheduleDate,
                                    }),
                                }}
                                timeFieldProps={{
                                    name: "expirationTime",
                                    placeholder: tNotification("label.placeholder.selectTime"),
                                    getOptionSelectedField: "value",
                                    label: tNotification("label.expirationTime"),
                                    rules: validationRules.expirationTime({
                                        isSchedule: checkScheduleStatus(status),
                                        scheduleDate,
                                        expirationDate,
                                        scheduleTime,
                                    }),
                                    "data-testid": "DynamicQuestionSection__timePickerExpiration",
                                }}
                                rateOfLayout={{ datePicker: 6, timePicker: 6 }}
                            />
                        </Grid>
                        <SwitchLabelHF
                            data-testid="DynamicQuestionSection__switchAllowResubmission"
                            label={tNotification("label.allowResubmission")}
                            disableMarginRight
                            name="isAllowResubmission"
                        />
                    </Grid>
                    {questionFields.map((questionField, index) => {
                        return (
                            <Grid
                                item
                                xs={12}
                                key={questionField.id}
                                data-testid="DynamicQuestionSection__questionSection"
                            >
                                <QuestionSection
                                    questionIndex={index}
                                    questionType={questionField.questionType}
                                    onDeleteQuestion={() => removeQuestionSection(index)}
                                    minimumAnswers={minimumAnswers}
                                    maximumAnswers={maximumAnswers}
                                />
                            </Grid>
                        );
                    })}
                </>
            )}

            {questionFields.length < maxQuestion && (
                <Grid item xs={12}>
                    <ButtonPrimaryOutlined
                        data-testid="DynamicQuestionSection__buttonAddQuestion"
                        startIcon={<Add />}
                        fullWidth
                        onClick={() =>
                            addQuestionSection({
                                questionType: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
                                answerFieldArrayItem: getDefaultAnswerItems(minimumAnswers),
                                order: questionFields.length,
                            })
                        }
                    >
                        {tNotification("button.addQuestion")}
                    </ButtonPrimaryOutlined>
                </Grid>
            )}
        </Grid>
    );
};

export default DynamicQuestionSection;
