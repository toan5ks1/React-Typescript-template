import { convertEnumKeys } from "src/common/constants/helper";

import { MediaType, UserGroup, UserNotificationStatus } from "manabie-bob/enum_pb";
import { ConversionTaskStatus } from "manabuf/bob/v1/media_pb";
import {
    NotificationEvent,
    NotificationStatus,
    NotificationTargetGroupSelect,
    NotificationType,
    UserNotificationQuestionnaireStatus,
    QuestionType,
} from "manabuf/common/v1/notifications_pb";

// TODO: Remove and replace the real roles after finish AC Roles phase
// https://manabie.atlassian.net/wiki/spaces/LT/pages/463604245/FE+hardcoded+logic+for+AC+Roles
export enum ExtendedUserGroup {
    USER_GROUP_HQ_STAFF = 16,
    USER_GROUP_TEACHER_LEAD = 17,
    USER_GROUP_CENTRE_LEAD = 18,
    USER_GROUP_CENTRE_MANAGER = 19,
    USER_GROUP_CENTRE_STAFF = 20,
}

export const UserGroupUnion = Object.assign({}, UserGroup, ExtendedUserGroup);

export const UserRoles = convertEnumKeys(UserGroupUnion); // this is used frequently, so I dont change it naming now
export const KeyMediaTypes = convertEnumKeys(MediaType);
export const KeyConversionTaskStatusTypes = convertEnumKeys(ConversionTaskStatus);
export const KeyNotificationType = convertEnumKeys(NotificationType);
export const KeyNotificationTargetGroupSelect = convertEnumKeys(NotificationTargetGroupSelect);
export const KeyNotificationStatus = convertEnumKeys(NotificationStatus);
export const KeyNotificationEvent = convertEnumKeys(NotificationEvent);
export const KeyUserNotificationStatus = convertEnumKeys(UserNotificationStatus);
export const KeyQuestionnaireStatus = convertEnumKeys(UserNotificationQuestionnaireStatus);
export const KeyQuestionTypes = convertEnumKeys(QuestionType);

export const DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME = 200;
