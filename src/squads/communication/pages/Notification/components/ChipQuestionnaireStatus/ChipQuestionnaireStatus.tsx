import { KeyQuestionnaireStatus } from "src/squads/communication/common/constants/const";
import { QuestionnaireStatusKeys } from "src/squads/communication/typings/remote";

import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

type QuestionnaireChipStatusStyles = {
    [key: string]: ChipStatusProps["status"];
};

const QuestionnaireChipStatus: QuestionnaireChipStatusStyles = {
    [KeyQuestionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_ANSWERED]: "success",
    [KeyQuestionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_UNANSWERED]: "default",
};

export interface ChipQuestionnaireStatusProps extends ChipBaseProps {
    status: QuestionnaireStatusKeys;
}

const ChipQuestionnaireStatus = ({ status, ...rest }: ChipQuestionnaireStatusProps) => {
    const chipStatus = QuestionnaireChipStatus[status];
    return (
        <ChipStatus
            size="small"
            status={chipStatus}
            data-testid="ChipQuestionnaireStatus"
            {...rest}
        />
    );
};

export default ChipQuestionnaireStatus;
