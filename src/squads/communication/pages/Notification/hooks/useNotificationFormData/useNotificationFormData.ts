import { EditorState } from "draft-js";
import {
    KeyNotificationStatus,
    KeyNotificationTargetGroupSelect,
} from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { firstOptionsChoice } from "src/common/helpers/helpers";
import { convertRawToState } from "src/common/utils/draft-js";
import { arrayHasItem } from "src/common/utils/other";
import {
    CoursesMany,
    InfoNotification,
    NotificationFormData,
    StudentsMany,
} from "src/squads/communication/common/constants/types";
import { createMapQuestionFieldArrayItem } from "src/squads/communication/common/utils/questionnaire-table-utils";
import {
    checkParamsAndConvertToDate,
    getDateAfterDuration,
} from "src/squads/communication/common/utils/utils";
import { Grade } from "src/squads/communication/models/grade";
import {
    CoursesManyReferenceQuery,
    InfoNotificationMsgsOneQuery,
    StudentsManyReferenceQuery,
} from "src/squads/communication/service/bob/bob-types";
import { TypeEntity } from "src/squads/communication/typings/react-admin";

import { getOptionTimePickerByDate } from "src/components/Autocompletes/TimePickerAutocompleteHF";

import { ChoiceType } from "src/squads/communication/hooks/useAutocompleteReference";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate, { UseTranslateReturn } from "src/squads/communication/hooks/useTranslate";
import { UseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import { UseTagsSelectedByNotificationIdReturn } from "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId";

export interface IMapperNotificationInfoData
    extends Omit<
        NotificationFormData,
        "files" | "title" | "content" | "mediaList" | "mediaIds" | "courses" | "students" | "grades"
    > {
    courses: ChoiceType<ArrayElement<CoursesManyReferenceQuery["courses"]>>[];
    students: ChoiceType<ArrayElement<StudentsManyReferenceQuery["users"]>>[];
    grades: ChoiceType<Grade>[];
}

export const emptyFormData: NotificationFormData = {
    courses: [],
    grades: [],
    students: [],
    targetGroup: "",
    title: "",
    content: EditorState.createEmpty(),
    mediaIds: [],
    isAllCourses: false,
    isAllGrades: false,
    notificationId: "",
    notificationMsgId: "",
    scheduleDate: new Date(),
    scheduleTime: getOptionTimePickerByDate(),
    status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
    expirationDate: getDateAfterDuration(7),
    expirationTime: getOptionTimePickerByDate(),
    isAllowResubmission: false,
    isImportantNotification: false,
    tags: [],
};

export interface UseNotificationFormDataReturn {
    formData: NotificationFormData;
    status: InfoNotification["status"];
}

export interface UseNotificationFormDataProps {
    receivers: StudentsMany;
    courses: CoursesMany;
    notificationInfo?: InfoNotification;
    notificationMsgDetail?: ArrayElement<InfoNotificationMsgsOneQuery["info_notification_msgs"]>;
    questionnaire?: UseNotificationDetailReturn["questionnaire"];
    questionnaireQuestions?: UseNotificationDetailReturn["questionnaireQuestions"];
    tags?: UseTagsSelectedByNotificationIdReturn["data"];
}

export interface MapperNotificationInfoDataProps extends UseNotificationFormDataProps {
    tCommon: UseTranslateReturn;
    tNotification: (resourceName: TypeEntity | string) => string;
}

const defaultValues: UseNotificationFormDataReturn = {
    formData: emptyFormData,
    status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
};

const useNotificationFormData = ({
    receivers,
    courses,
    notificationInfo,
    notificationMsgDetail,
    questionnaire,
    questionnaireQuestions,
    tags,
}: UseNotificationFormDataProps): UseNotificationFormDataReturn => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const tCommon = useTranslate();

    if (!notificationInfo?.notification_id || !notificationMsgDetail) return defaultValues;

    const mappedNotificationInfoDetail = mapperNotificationResult({
        receivers,
        courses,
        notificationInfo,
        questionnaire,
        questionnaireQuestions,
        tCommon,
        tNotification,
        tags,
    });

    const { content, media_ids = [], title } = notificationMsgDetail;

    if (!content || !content.raw) return defaultValues;

    let mediaIds = [];

    if (arrayHasItem(media_ids)) {
        mediaIds = media_ids;
    }

    const data: NotificationFormData = {
        ...mappedNotificationInfoDetail,
        mediaIds,
        title,
        content: convertRawToState(content.raw) || EditorState.createEmpty(),
    };

    return { formData: data, status: notificationInfo.status };
};

const setNotificationTargetGroups = (targetGroup: InfoNotification["target_groups"]) => {
    const { course_filter, grade_filter, user_group_filter } = targetGroup;

    return {
        targetGroup: user_group_filter.user_group.length > 1 ? "" : user_group_filter.user_group[0],
        isAllCourses:
            course_filter.type ===
            KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
        isAllGrades:
            grade_filter.type ===
            KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
    };
};

// TODO: Communication will refactor this function
const mapperNotificationResult = ({
    receivers,
    courses,
    notificationInfo,
    questionnaire,
    questionnaireQuestions,
    tCommon,
    tNotification,
    tags,
}: MapperNotificationInfoDataProps): IMapperNotificationInfoData => {
    const { target_groups, notification_id, notification_msg_id, scheduled_at, is_important } =
        notificationInfo || {};
    const { grade_filter } = target_groups;
    const { isAllCourses, isAllGrades, targetGroup } = setNotificationTargetGroups(target_groups);

    const deliveryDate = checkParamsAndConvertToDate(scheduled_at);
    const expirationDate = checkParamsAndConvertToDate(
        questionnaire?.expiration_date,
        getDateAfterDuration(7)
    );

    let mapResult: IMapperNotificationInfoData = {
        notificationId: notification_id,
        notificationMsgId: notification_msg_id,
        grades: isAllGrades
            ? [
                  firstOptionsChoice<ChoiceType<IMapperNotificationInfoData["grades"][0]>>({
                      firstChoiceLabel: tNotification("label.allGrades"),
                      keyValue: "name",
                  }),
              ]
            : [],
        courses: isAllCourses
            ? [
                  firstOptionsChoice<ChoiceType<IMapperNotificationInfoData["courses"][0]>>({
                      firstChoiceLabel: tNotification("label.allCourses"),
                      key: "course_id",
                      keyValue: "name",
                  }),
              ]
            : [],
        students: [],
        targetGroup,
        isAllCourses,
        isAllGrades,
        status: notificationInfo?.status || KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
        scheduleDate: deliveryDate || new Date(),
        scheduleTime: getOptionTimePickerByDate(deliveryDate),
        isImportantNotification: Boolean(is_important),
        expirationDate,
        expirationTime: getOptionTimePickerByDate(questionnaire?.expiration_date),
        isAllowResubmission: Boolean(questionnaire?.resubmit_allowed),
        questionFieldArrayItem: createMapQuestionFieldArrayItem(questionnaireQuestions),
        tags,
    };

    if (!isAllGrades && arrayHasItem(grade_filter.grades)) {
        mapResult.grades = grade_filter.grades.map(
            (grade: number) =>
                ({
                    id: grade,
                    name: tCommon(`resources.choices.grades.${grade}`),
                } as ChoiceType<Grade>)
        );
    }

    if (!isAllCourses && arrayHasItem(courses)) {
        mapResult.courses = courses.map((course) => ({
            ...course,
            value: course.course_id,
        }));
    }

    if (arrayHasItem(receivers)) {
        mapResult.students = receivers.map((student) => ({
            ...student,
            value: student.name,
        }));
    }

    return mapResult;
};

export default useNotificationFormData;
