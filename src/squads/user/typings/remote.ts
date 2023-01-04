import { Country, Subject } from "manabie-bob/enum_pb";
// TODO: We need `otifications_pb`?
import {
    NotificationStatus,
    NotificationTargetGroup,
    NotificationType,
    NotificationEvent,
} from "manabuf/common/v1/notifications_pb";
import { UserGroup } from "manabuf/common/v1/profiles_pb";

export type CountryKeys = keyof typeof Country;
export type SubjectKeys = keyof typeof Subject;
export type UserGroupKeys = keyof typeof UserGroup;
export type NotificationEventKeys = keyof typeof NotificationEvent;
export type NotificationStatusKeys = keyof typeof NotificationStatus;
export type NotificationTypeKeys = keyof typeof NotificationType;
export type NotificationTargetGroupKeys = keyof typeof NotificationTargetGroup;

export type Identity = string | number;
