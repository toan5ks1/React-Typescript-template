import {
    MediaType,
    TopicStatus,
    TopicType,
    UserGroup,
    UserNotificationStatus,
} from "manabie-bob/enum_pb";
import { QuizOptionConfig } from "manabie-yasuo/quiz_pb";
import { MediaType as MediaTypeV1 } from "manabuf/bob/v1/enums_pb";
import { ConversionTaskStatus } from "manabuf/bob/v1/media_pb";
import { LessonStatus } from "manabuf/common/v1/contents_pb";
import { Country, LearningObjectiveType, Subject } from "manabuf/common/v1/enums_pb";
import {
    NotificationEvent,
    NotificationStatus,
    NotificationTargetGroupSelect,
    NotificationType,
} from "manabuf/common/v1/notifications_pb";
import { StudyPlanTaskStatus, StudyPlanType } from "manabuf/eureka/v1/enums_pb";

import { convertEnumKeys } from "./helper";

export enum ExtendedUserGroup {
    USER_GROUP_HQ_STAFF = 16,
    USER_GROUP_TEACHER_LEAD = 17,
    USER_GROUP_CENTRE_LEAD = 18,
    USER_GROUP_CENTRE_MANAGER = 19,
    USER_GROUP_CENTRE_STAFF = 20,
}

export const UserGroupUnion = Object.assign({}, UserGroup, ExtendedUserGroup);
export const KeyStudyPlanTypes = convertEnumKeys(StudyPlanType);
export const UserRoles = convertEnumKeys(UserGroupUnion); // this is used frequently, so I dont change it naming now
export const KeyMediaTypes = convertEnumKeys(MediaType);
export const KeyMediaTypesV1 = convertEnumKeys(MediaTypeV1);
export const KeyLOTypes = convertEnumKeys(LearningObjectiveType);
export const KeyQuizOptionConfigs = convertEnumKeys(QuizOptionConfig);
export const KeyStudyPlanTaskStatusTypes = convertEnumKeys(StudyPlanTaskStatus);
export const KeyConversionTaskStatusTypes = convertEnumKeys(ConversionTaskStatus);
export const KeyNotificationType = convertEnumKeys(NotificationType);
export const KeyNotificationTargetGroupSelect = convertEnumKeys(NotificationTargetGroupSelect);
export const KeyNotificationStatus = convertEnumKeys(NotificationStatus);
export const KeyNotificationEvent = convertEnumKeys(NotificationEvent);
export const KeyUserNotificationStatus = convertEnumKeys(UserNotificationStatus);

export const KeyTopicTypes = convertEnumKeys(TopicType);
export const KeyTopicStatuses = convertEnumKeys(TopicStatus);

export const KeyCountries = convertEnumKeys(Country);
export const KeySubjects = convertEnumKeys(Subject);
export const KeyLiveLessonStatus = convertEnumKeys(LessonStatus);

export const REGEX_VALIDATE_EMAIL =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const COUNTRY_INFO = {
    [Country.COUNTRY_JP]: {
        code: "+81",
        countryCode: "JP",
    },
    [Country.COUNTRY_VN]: {
        code: "+84",
        countryCode: "VN",
    },
};

export const KEY_CODE = {
    KEY_0: 48,
    KEY_9: 57,
    KEY_BACKSPACE: 8,
    KEY_ENTER: 13,
};

export const StudentKeys = {
    RELATIONSHIP: "relationship",
    STUDENTS_STATUS: "studentsEnrollmentStatus",
    ADD_PARENT: "addParent",
};

export const DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME = 200;
export const DEFAULT_MAX_SNACK = 2;

export const mappedRoles = {
    ["Teacher"]: UserRoles.USER_GROUP_TEACHER,
    ["School Admin"]: UserRoles.USER_GROUP_SCHOOL_ADMIN,
    ["HQ Staff"]: UserRoles.USER_GROUP_HQ_STAFF,
    ["Teacher Lead"]: UserRoles.USER_GROUP_TEACHER_LEAD,
    ["Centre Lead"]: UserRoles.USER_GROUP_CENTRE_LEAD,
    ["Centre Manager"]: UserRoles.USER_GROUP_CENTRE_MANAGER,
    ["Centre Staff"]: UserRoles.USER_GROUP_CENTRE_STAFF,
};
