import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { dateIsAfter, dateIsSame, timeIsAfter } from "src/common/utils/time";
import {
    MAX_LENGTH_ANSWER_CONTENT,
    MAX_LENGTH_QUESTION_CONTENT,
} from "src/squads/communication/common/constants/enum";
import {
    AnswerFormValue,
    NotificationFormData,
} from "src/squads/communication/common/constants/types";
import { getDateBasedOnCheckSchedule } from "src/squads/communication/common/utils/utils";
import { TimeAutocompleteOption } from "src/squads/communication/models/time-autocomplete";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";

interface ValidateExpirationDateProps {
    isSchedule: boolean;
    scheduleDate?: NotificationFormData["scheduleDate"];
}

interface ValidateExpirationTimeProps {
    isSchedule: boolean;
    expirationDate?: NotificationFormData["expirationDate"];
    scheduleTime?: NotificationFormData["scheduleTime"];
    scheduleDate?: NotificationFormData["scheduleDate"];
}

const useQuestionnaireValidationRules = () => {
    const tCommon = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    return {
        questionContent: {
            validate: (questionContent: string) => {
                const questionContentValue = convertString(questionContent).trim();

                if (!questionContentValue) return tCommon("resources.input.error.required");

                if (questionContent.length > MAX_LENGTH_QUESTION_CONTENT)
                    return tCommon("resources.input.error.limitLength", {
                        field: tNotification("label.question"),
                        length: MAX_LENGTH_QUESTION_CONTENT,
                    });
            },
        },
        answerContent: (answers: AnswerFormValue[]) => ({
            validate: (answerContent: string) => {
                const answerContentValue = convertString(answerContent).trim();

                if (!answerContentValue) return tCommon("resources.input.error.required");

                if (answerContentValue.length > MAX_LENGTH_ANSWER_CONTENT)
                    return tCommon("resources.input.error.limitLength", {
                        field: tNotification("label.placeholder.answer"),
                        length: MAX_LENGTH_ANSWER_CONTENT,
                    });

                const isDuplicated =
                    answers.filter((answer) => answer.content.trim() === answerContentValue)
                        .length > 1;

                if (answerContentValue && isDuplicated)
                    return tCommon("resources.input.error.duplicatedAnswer");
            },
        }),
        expirationDate: ({ isSchedule, scheduleDate }: ValidateExpirationDateProps) => ({
            validate: (expirationDate: Date) => {
                const comparedDate = getDateBasedOnCheckSchedule(isSchedule, scheduleDate);

                if (comparedDate && dateIsAfter(comparedDate, expirationDate)) {
                    return tCommon("resources.input.error.invalidExpirationDate");
                }
            },
        }),
        expirationTime: ({
            isSchedule,
            expirationDate,
            scheduleTime,
            scheduleDate,
        }: ValidateExpirationTimeProps) => ({
            validate: (expirationTime?: TimeAutocompleteOption) => {
                const comparedDate = getDateBasedOnCheckSchedule(isSchedule, scheduleDate);
                const comparedTime = getDateBasedOnCheckSchedule(isSchedule, scheduleTime?.value);

                if (!expirationTime) return tCommon("resources.input.error.required");

                if (!(comparedDate && expirationDate && comparedTime && expirationTime.value))
                    return;

                if (
                    dateIsSame(comparedDate, expirationDate) &&
                    timeIsAfter(comparedTime, expirationTime.value)
                )
                    return tCommon("resources.input.error.invalidExpirationTime");
            },
        }),
    };
};

export default useQuestionnaireValidationRules;
