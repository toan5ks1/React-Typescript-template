import { UserGroupUnion } from "src/squads/communication/common/constants/const";

import {
    NotificationStatus,
    NotificationTargetGroup,
    NotificationType,
    NotificationEvent,
    UserNotificationQuestionnaireStatus,
} from "manabuf/common/v1/notifications_pb";

export type NotificationEventKeys = keyof typeof NotificationEvent;
export type NotificationStatusKeys = keyof typeof NotificationStatus;
export type QuestionnaireStatusKeys = keyof typeof UserNotificationQuestionnaireStatus;
export type NotificationTypeKeys = keyof typeof NotificationType;
export type NotificationTargetGroupKeys = keyof typeof NotificationTargetGroup;

export type UserGroupKeys = keyof typeof UserGroupUnion;

export type Identity = string | number;
