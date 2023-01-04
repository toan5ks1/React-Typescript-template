import { useHistory } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import {
    CoursesMany,
    InfoNotification,
    StudentsMany,
} from "src/squads/communication/common/constants/types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useQuestionnaireQuestionDetail, {
    UseQuestionnaireQuestionDetailReturn,
} from "src/squads/communication/pages/Notification/hooks/useQuestionnaireQuestionDetail";

export interface UseNotificationDetailReturn {
    courses: CoursesMany;
    receivers: StudentsMany;
    notificationInfo: InfoNotification | undefined;
    questionnaire: UseQuestionnaireQuestionDetailReturn["questionnaire"];
    questionnaireQuestions: UseQuestionnaireQuestionDetailReturn["questionnaireQuestions"];
    questionnaireUserAnswers: UseQuestionnaireQuestionDetailReturn["questionnaireUserAnswers"];
    isFetching: boolean;
}

const defaultValueCourses: CoursesMany = [];
const defaultValueStudents: StudentsMany = [];

const useNotificationDetail = (notificationId?: string): UseNotificationDetailReturn => {
    // TODO: remove after questionnaire is released
    const { isEnabled: isShowNotificationQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );

    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const history = useHistory();

    const { data: notificationInfo, isFetching: isFetchingNotificationDetail } = inferQuery({
        entity: "infoNotifications",
        action: isShowNotificationQuestionnaire
            ? "communicationGetInfoNotificationByNotificationIdV2"
            : "communicationGetInfoNotificationByNotificationId",
    })(
        { notification_id: notificationId || "" },
        {
            enabled: true,
            // don't use enabled: Boolean(notificationId) here because
            // it wont reset data when Compose button is clicked
            onError: (error) => {
                window.warner?.warn("useNotificationDetail notification info", error);
                showSnackbar(t("ra.notification.item_doesnt_exist"), "error");

                return history.push(
                    `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}`
                );
            },
        }
    );

    const { data: courses = defaultValueCourses, isFetching: isFetchingNotificationCourse } =
        inferQuery({
            entity: "courses",
            action: "communicationGetManyCourses",
        })(
            {
                course_id: notificationInfo?.target_groups?.course_filter?.course_ids,
            },
            {
                enabled: Boolean(notificationId),

                onError: (error) => {
                    showSnackbar(t("ra.manabie-error.unknown"), "error");

                    window.warner?.warn("useNotificationDetail notification courses", error);
                },
            }
        );

    const { data: receivers = defaultValueStudents, isFetching: isFetchingNotificationReceivers } =
        inferQuery({
            entity: "users",
            action: "communicationGetManyStudents",
        })(
            {
                user_ids: notificationInfo?.receiver_ids,
            },
            {
                enabled: Boolean(notificationId),
                onError: (error) => {
                    showSnackbar(t("ra.manabie-error.unknown"), "error");
                    window.warner?.warn("useNotificationDetail notification receiver", error);
                },
            }
        );

    const {
        questionnaire,
        questionnaireQuestions,
        questionnaireUserAnswers,
        isFetchingQuestionnaire,
    } = useQuestionnaireQuestionDetail({
        questionnaireId: notificationInfo?.questionnaire_id,
    });

    const isFetching =
        isFetchingNotificationDetail ||
        isFetchingNotificationCourse ||
        isFetchingNotificationReceivers;

    // TODO: remove this and use isFetching after questionnaire is released
    const isFetchingWithQuestionnaire = isShowNotificationQuestionnaire
        ? isFetching || isFetchingQuestionnaire
        : isFetching;

    return {
        courses,
        receivers,
        notificationInfo,
        questionnaire,
        questionnaireQuestions,
        questionnaireUserAnswers,
        isFetching: isFetchingWithQuestionnaire,
    };
};

export default useNotificationDetail;
