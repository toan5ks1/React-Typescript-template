import {
    createMockNotificationCourses,
    createMockNotificationInfo,
    createMockNotificationReceivers,
} from "src/squads/communication/test-utils/notification";
import {
    createMockQuestionnaireQuestionsList,
    createMockQuestionnaire,
    createMockGroupedQuestionnaireUserAnswers,
} from "src/squads/communication/test-utils/query-data";

import { UseNotificationDetailReturn } from "../useNotificationDetail";

export const mockUseNotificationDetailReturn: UseNotificationDetailReturn = {
    courses: createMockNotificationCourses(),
    receivers: createMockNotificationReceivers(),
    notificationInfo: createMockNotificationInfo(),
    questionnaire: createMockQuestionnaire(),
    questionnaireQuestions: createMockQuestionnaireQuestionsList(),
    questionnaireUserAnswers: createMockGroupedQuestionnaireUserAnswers(),
    isFetching: false,
};

export default (): UseNotificationDetailReturn => mockUseNotificationDetailReturn;
