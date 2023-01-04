import { EditorState } from "draft-js";
import { KeyNotificationStatus } from "src/common/constants/const";
import { ArrayElement } from "src/common/constants/types";
import { Grade } from "src/models/grade";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";
import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";
import {
    Communication_GetInfoNotificationByNotificationIdV2Query,
    Communication_GetTagsManyReferenceQuery,
    Communication_UsersInfoNotificationsListQuery,
    CoursesManyQuery,
    InfoNotificationMsgsOneQuery,
    InfoNotificationsGetStatusByIdQuery,
    StudentsManyQuery,
} from "src/squads/communication/service/bob/bob-types";
import { QuestionnaireStatusKeys } from "src/squads/communication/typings/remote";
import { NotificationStatusKeys } from "src/typings/remote";

import { GetAnswersByFilterResponse } from "manabuf/bob/v1/notifications_pb";
import {
    Notification,
    NotificationMessage as NotificationMessageInformation,
    NotificationTargetGroup,
    Question,
    Questionnaire as QuestionnaireType,
} from "manabuf/common/v1/notifications_pb";
import { GetNotificationsByFilterResponse } from "manabuf/notificationmgmt/v1/notifications_pb";
import {
    DiscardNotificationRequest,
    NotifyUnreadUserRequest,
    SendNotificationRequest,
} from "manabuf/yasuo/v1/notifications_pb";

import { Media as MediaRoot } from "src/squads/communication/__generated__/bob/root-types";

export interface SendNotification extends SendNotificationRequest.AsObject {}

export interface DiscardNotification extends DiscardNotificationRequest.AsObject {}

export interface NotifyUnreadUser extends NotifyUnreadUserRequest.AsObject {}

export interface NotificationMessage extends NotificationMessageInformation.AsObject {}

export interface NotificationTypes extends Notification.AsObject {}

export interface NotificationTargetGroupGradeFilter
    extends NotificationTargetGroup.GradeFilter.AsObject {}

export interface NotificationTargetGroupCourseFilter
    extends NotificationTargetGroup.CourseFilter.AsObject {}

export interface Questionnaire extends QuestionnaireType.AsObject {}

export interface QuestionnaireQuestion extends Question.AsObject {}

export type CoursesMany = CoursesManyQuery["courses"];
export type StudentsMany = StudentsManyQuery["users"];
export type NotificationStatusType = keyof typeof KeyNotificationStatus;
export type NotificationStatus = InfoNotificationsGetStatusByIdQuery["info_notifications"];
export type QuestionnaireQuestionType = keyof typeof KeyQuestionTypes;
export type Communication_UsersInfoNotifications = ArrayElement<
    Communication_UsersInfoNotificationsListQuery["users_info_notifications"]
>;
export interface NotificationCategories {
    all: number;
    draft: number;
    sent: number;
    schedule: number;
}

export interface InfoNotification
    extends Omit<
        ArrayElement<
            Communication_GetInfoNotificationByNotificationIdV2Query["info_notifications"]
        >,
        "status"
    > {
    status?: NotificationStatusKeys;
}

export interface InfoNotificationsByFilter
    extends GetNotificationsByFilterResponse.Notification.AsObject {}

export interface RecipientInfoNotification
    extends Omit<Communication_UsersInfoNotifications, "qn_status"> {
    qn_status: QuestionnaireStatusKeys;
}

export interface AnswerFormValue {
    content: ArrayElement<QuestionnaireQuestion["choicesList"]>;
}

export interface QuestionFormValue {
    questionType: QuestionnaireQuestionType;
    isRequiredQuestion: QuestionnaireQuestion["required"];
    order?: QuestionnaireQuestion["orderIndex"];
    content: QuestionnaireQuestion["title"];
    answerFieldArrayItem: AnswerFormValue[];
}

export interface NotificationFormData {
    notificationId?: InfoNotification["notification_id"];
    notificationMsgId: InfoNotification["notification_msg_id"];
    title: ArrayElement<InfoNotificationMsgsOneQuery["info_notification_msgs"]>["title"];
    grades: Grade[];
    courses: CoursesMany;
    students: StudentsMany;
    tags?: Communication_GetTagsManyReferenceQuery["tags"];

    targetGroup: InfoNotification["target_groups"];
    scheduledAt?: InfoNotification["scheduled_at"];
    isAllCourses: boolean;
    isAllGrades: boolean;
    content: EditorState;
    mediaIds: string[];
    status: string; // KeyNotificationStatus
    //support types
    scheduleDate?: Date;
    scheduleTime?: TimeAutocompleteOption;
    questionFieldArrayItem?: QuestionFormValue[];
    expirationDate?: Date;
    expirationTime?: TimeAutocompleteOption;
    isAllowResubmission?: Questionnaire["resubmitAllowed"];
    isImportantNotification: InfoNotification["is_important"];
}

export interface OptionSelectType {
    id: string | number;
    value: string;
    label?: string | JSX.Element; // add a label for more descriptive item when map to element
}

export interface UpsertNotificationProps
    extends Omit<
        NotificationTypes,
        | "data"
        | "editorId"
        | "type"
        | "event"
        | "status"
        | "targetGroup"
        | "schoolId"
        | "genericReceiverIdsList"
    > {
    notificationId: NotificationTypes["notificationId"];
    content: {
        raw: EditorState;
        contentHTML: string;
    };
    title: NotificationMessage["title"];
    gradeIds: NotificationTargetGroupGradeFilter["gradesList"];
    courseIds: NotificationTargetGroupCourseFilter["courseIdsList"];
    receiverIdsList: NotificationTypes["receiverIdsList"];

    status: string; // NotificationStatusKeys
    type: string; // NotificationTypeKeys
    event: string; // NotificationEventKeys
    targetGroup: string[]; // NotificationTargetGroupKeys

    files?: File[];
    data?: string;
    editorId?: string;

    scheduledAt?: NotificationTypes["scheduledAt"];
    mediaIds?: NotificationMessage["mediaIdsList"];

    isAllCourses: boolean;
    isAllGrades: boolean;

    questionnaire?: Questionnaire;
    tagIdsList?: string[]; //TODO: Toan updates type after merge hasura query Tag selected
}

export type QuestionnaireQuestionIdOfFilter = ArrayElement<
    ArrayElement<GetAnswersByFilterResponse.AsObject["userAnswersList"]>["answersList"]
>["questionnaireQuestionId"];

export type AnswerOfFilter = ArrayElement<
    ArrayElement<GetAnswersByFilterResponse.AsObject["userAnswersList"]>["answersList"]
>["answer"];

export type QuestionnaireIdAndAnswerMap = Map<QuestionnaireQuestionIdOfFilter, AnswerOfFilter>;

export type Array2D<T> = Array<Array<T>>;

export interface QuestionnaireResultTableData
    extends Pick<
        GetAnswersByFilterResponse.UserAnswer.AsObject,
        "isParent" | "responderName" | "submittedAt" | "userId"
    > {
    studentName: string;
    answers: string[];
}

export type FormFilterNotificationListValues = {
    fromDate: Date | null;
    toDate: Date | null;
    fromTime: TimeAutocompleteOption | null;
    toTime: TimeAutocompleteOption | null;
    tags: Communication_GetTagsManyReferenceQuery["tags"];
};

export type NonNullableObject<T extends object> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};

export type Media = Omit<MediaRoot, "resource_path">;
