import { EditorState } from "draft-js";
import {
    KeyConversionTaskStatusTypes,
    KeyNotificationEvent,
    KeyNotificationStatus,
    KeyNotificationType,
    UserRoles,
} from "src/common/constants/const";
import { ArrayElement } from "src/common/constants/types";
import {
    KeyQuestionnaireStatus,
    KeyQuestionTypes,
} from "src/squads/communication/common/constants/const";
import {
    DiscardNotification,
    NotifyUnreadUser,
    SendNotification,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import {
    Communication_GetInfoNotificationByNotificationIdV2Query,
    CoursesManyQuery,
    InfoNotificationCountsByStatusV2Query,
    InfoNotificationMsgsOneQuery,
    InfoNotificationMsgsTitlesQuery,
    InfoNotificationsCountReadQuery,
    InfoNotificationsGetStatusByIdQuery,
    MediasManyQuery,
    StudentsManyQuery,
    UserNameByIdsQuery,
    UsersInfoNotificationsListQuery,
    Communication_UsersInfoNotificationsListQuery,
    Communication_GetListInfoNotificationsQueryVariables,
    Communication_GetQuestionnaireByQuestionnaireIdQuery,
    Communication_GetTagsManyReferenceQuery,
    CoursesManyReferenceQuery,
    Communication_GetListTagNameByTagIdsQuery,
    Communication_GetListTagsByTagIdsQuery,
    Communication_GetTagsSelectedByNotificationIdQuery,
    Communication_GetUserAnswersByQuestionIdsQuery,
    Communication_GetUserAnswersByQuestionIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";

import { UserGroup } from "manabie-bob/enum_pb";
import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import { GetNotificationsByFilterResponse } from "manabuf/notificationmgmt/v1/notifications_pb";
import { UpsertTagRequest } from "manabuf/notificationmgmt/v1/tags_pb";
import {
    DiscardNotificationResponse,
    NotifyUnreadUserResponse,
    SendNotificationResponse,
    UpsertNotificationResponse,
} from "manabuf/yasuo/v1/notifications_pb";

import { DataWithTotal } from "@manabie-com/react-utils";
import groupBy from "lodash/groupBy";
import { CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery } from "src/squads/communication/service/bob/questionnaire-questions-service/questionnaire-questions-bob.query";

export function createMockCoursesMany(): CoursesManyQuery["courses"] {
    return [
        {
            course_id: "course_id1",
            name: "",
            school_id: 1,
        },
    ];
}

export function createMockMediaMany(): MediasManyQuery["media"] {
    return [
        {
            media_id: "media_id1",
            conversion_tasks: [
                {
                    status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                },
            ],
        },
        {
            media_id: "media_id2",
            conversion_tasks: [
                {
                    status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                },
            ],
        },
    ];
}

export function createMockStudentMany(): StudentsManyQuery["users"] {
    return [
        {
            user_id: "student_id1",
            name: "",
        },
    ];
}

export function createMockUserNames(): UserNameByIdsQuery["users"] {
    return [
        {
            user_id: "student_id1",
            name: "student_name",
        },
    ];
}

export function createMockInfoNotificationMsgs(): InfoNotificationMsgsOneQuery["info_notification_msgs"] {
    return [
        {
            notification_msg_id: "notification_msg_id1",
            title: "notification_msg_title",
            created_at: "2021-10-10T09:30:09+00:00",
            updated_at: "2021-10-10T09:30:09+00:00",
        },
    ];
}

export function createMockInfoNotificationMsgsTitles(): InfoNotificationMsgsTitlesQuery["info_notification_msgs"] {
    return [
        {
            notification_msg_id: "notification_msg_id1",
            title: "notification_msg_title",
        },
    ];
}

export function createMockListInfoNotifications(): DataWithTotal<
    Communication_GetInfoNotificationByNotificationIdV2Query["info_notifications"]
> {
    return {
        data: [
            {
                notification_id: "notification_id1",
                type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
                created_at: "2021-10-10T09:30:09+00:00",
                updated_at: "2021-10-10T09:30:09+00:00",
            },
            {
                notification_id: "notification_id1",
                type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
                created_at: "2021-10-10T09:30:09+00:00",
                updated_at: "2021-10-10T09:30:09+00:00",
            },
        ],
        total: 0,
    };
}

export function createMockInfoNotificationsGetStatusByIdQuery(): InfoNotificationsGetStatusByIdQuery["info_notifications"] {
    return [
        {
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        },
    ];
}

export function createMockInfoNotificationsCountReadQuery(): InfoNotificationsCountReadQuery["info_notifications"] {
    return [
        {
            notification_id: "notification_id1",
            all_receiver_aggregate: {
                aggregate: {
                    count: 1,
                },
            },
            read_aggregate: {
                aggregate: {
                    count: 1,
                },
            },
        },
    ];
}

export function createMockInfoNotificationCountsByStatusV2Query(): InfoNotificationCountsByStatusV2Query {
    return {
        schedule: {},
        draft: {},
        sent: {},
    };
}

export function createMockUsersInfoNotificationsListQuery(): DataWithTotal<
    UsersInfoNotificationsListQuery["users_info_notifications"]
> {
    return {
        data: [
            {
                user_id: "user_id1",
                user_notification_id: "user_notification_id1",
                notification_id: "notification_id1",
                status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
            },
        ],

        total: 1,
    };
}

export function createMockUsersInfoNotificationsListQueryWithQuestionnaireStatus(): DataWithTotal<
    Communication_UsersInfoNotificationsListQuery["users_info_notifications"]
> {
    return {
        data: [
            {
                user_id: "user_id1",
                user_notification_id: "user_notification_id1",
                notification_id: "notification_id1",
                status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
                qn_status: KeyQuestionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_ANSWERED,
            },
        ],

        total: 1,
    };
}

export function createNoDataUsersInfoNotificationsListQuery(): DataWithTotal<
    UsersInfoNotificationsListQuery["users_info_notifications"]
> {
    return {
        data: [],
        total: 0,
    };
}

export function createNoDataUsersInfoNotificationsListQueryWithQuestionnaireStatus(): DataWithTotal<
    Communication_UsersInfoNotificationsListQuery["users_info_notifications"]
> {
    return {
        data: [],
        total: 0,
    };
}

export const queryRetrieveNotifyUnreadUserVariable: NotifyUnreadUser = {
    notificationId: "notificationId1",
};

export const queryRetrieveSendNotificationVariable: SendNotification = {
    notificationId: "notificationId1",
};

export const queryRetrieveDiscardNotificationVariable: DiscardNotification = {
    notificationId: "notificationId1",
};

export const queryRetrieveUpsertNotificationPropsVariable: UpsertNotificationProps = {
    notificationId: "notificationId1",
    content: {
        raw: EditorState.createEmpty(),
        contentHTML: "contentHTML demo",
    },
    title: "title1",
    gradeIds: [1],
    courseIds: ["courseIds1"],
    receiverIdsList: ["receiverIdsList1"],
    status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
    event: KeyNotificationEvent.NOTIFICATION_EVENT_NONE,
    targetGroup: [UserRoles.USER_GROUP_PARENT, UserRoles.USER_GROUP_STUDENT],
    isAllCourses: true,
    isAllGrades: true,
    mediaIds: ["mediaIds"],
    isImportant: false,
};

export const upsertNotificationTagParams: UpsertTagRequest.AsObject = {
    tagId: "tag_id_1",
    name: "tag_name_1",
};

export const retrieveNotifyUnreadUserReturn: NotifyUnreadUserResponse.AsObject = {};

export const retrieveSendNotificationResponseReturn: SendNotificationResponse.AsObject = {};

export const retrieveDiscardNotificationResponseReturn: DiscardNotificationResponse.AsObject = {};

export const retrieveUpsertNotificationResponseReturn: UpsertNotificationResponse.AsObject = {
    notificationId: "notificationId1",
};

export function createMockInfoNotificationList(): Communication_GetListInfoNotificationsQueryVariables {
    return {
        status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        limit: 10,
        offset: 0,
    };
}

export function createMockQuestionnaire(): ArrayElement<
    Communication_GetQuestionnaireByQuestionnaireIdQuery["questionnaires"]
> {
    return {
        questionnaire_id: "questionnaire_id_1",
        resubmit_allowed: false,
        expiration_date: new Date("2022-12-01T00:00:00+00:00"),
        created_at: "2022-05-06T06:21:26.89649+00:00",
        updated_at: "2022-05-06T06:23:55.226562+00:00",
    };
}

export function createMockQuestionnaireQuestionsList(): CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery["questionnaire_questions"] {
    return [
        {
            questionnaire_question_id: "questionnaire_question_id_1",
            questionnaire_id: "questionnaire_id_1",
            order_index: 0,
            type: KeyQuestionTypes.QUESTION_TYPE_CHECK_BOX,
            title: "Question 1",
            choices: ["Answer 1", "Answer 2"],
            is_required: false,
            created_at: "2022-05-06T06:39:15.483297+00:00",
            updated_at: "2022-05-06T06:39:15.483297+00:00",
        },
        {
            questionnaire_question_id: "questionnaire_question_id_2",
            questionnaire_id: "questionnaire_id_1",
            order_index: 1,
            type: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
            title: "Question 2",
            choices: ["Answer 1", "Answer 2"],
            is_required: true,
            created_at: "2022-05-06T06:39:15.483297+00:00",
            updated_at: "2022-05-06T06:39:15.483297+00:00",
        },
        {
            questionnaire_question_id: "questionnaire_question_id_3",
            questionnaire_id: "questionnaire_id_1",
            order_index: 2,
            type: KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT,
            title: "Question 3",
            is_required: false,
            created_at: "2022-05-06T06:39:15.483297+00:00",
            updated_at: "2022-05-06T06:39:15.483297+00:00",
        },
    ];
}

export function createMockTagsManyReferenceQueryReturn(): Communication_GetTagsManyReferenceQuery {
    const tags: Communication_GetTagsManyReferenceQuery["tags"] = [
        {
            tag_id: "tagId",
            tag_name: "tagName",
            created_at: "2022-07-05T00:00:00",
            updated_at: "2022-07-05T00:00:00",
        },
    ];

    return {
        tags,
        tags_aggregate: {
            aggregate: {
                count: tags.length,
            },
        },
    };
}

export function createMockTagNameByTagIds(): Communication_GetListTagNameByTagIdsQuery["tags"] {
    return [
        {
            name: "tag name_1 with tag id = 1",
        },
        {
            name: "tag name_2 with tag id = 2",
        },
        {
            name: "tag name_3 with tag id = 3",
        },
    ];
}

export function createMockTagsByTagIds(): Communication_GetListTagsByTagIdsQuery["tags"] {
    return [
        {
            tag_id: "tagId1",
            tag_name: "tagName1",
            created_at: "2022-07-05T00:00:00",
            updated_at: "2022-07-05T00:00:00",
        },
        {
            tag_id: "tagId2",
            tag_name: "tagName2",
            created_at: "2022-07-06T00:00:00",
            updated_at: "2022-07-06T00:00:00",
        },
        {
            tag_id: "tagId3",
            tag_name: "tagName3",
            created_at: "2022-07-07T00:00:00",
            updated_at: "2022-07-08T00:00:00",
        },
    ];
}

export function createMockTagsSelectedByNotificationIdQueryReturn(): Communication_GetTagsSelectedByNotificationIdQuery["tags"] {
    return [
        {
            tag_id: "tag_id_1",
            created_at: "2022-07-05T00:00:00",
            updated_at: "2022-07-05T00:00:00",
            tag_name: "tag_name_1",
        },
        {
            tag_id: "tag_id_2",
            created_at: "2022-07-05T00:00:00",
            updated_at: "2022-07-05T00:00:00",
            tag_name: "tag_name_2",
        },
    ];
}

export function createMockInfoNotificationByFilter(): GetNotificationsByFilterResponse.AsObject["notificationsList"] {
    return [
        {
            composerId: "composer_id_1",
            notificationId: "notification_id_1",
            notificationMgsId: "notification_mgs_id_1",
            sentAt: { seconds: 1629756379, nanos: 370825000 },
            status: NotificationStatus.NOTIFICATION_STATUS_SENT,
            tagIdsList: ["tagId1"],
            title: "Notification Title 1",
            updatedAt: { seconds: 1629756379, nanos: 103463000 },
            userGroupFilter: { userGroupsList: [UserGroup.USER_GROUP_SCHOOL_ADMIN] },
        },
        {
            composerId: "composer_id_1",
            notificationId: "notification_id_2",
            notificationMgsId: "notification_mgs_id_2",
            sentAt: { seconds: 1629756379, nanos: 370825000 },
            status: NotificationStatus.NOTIFICATION_STATUS_DRAFT,
            tagIdsList: ["tagId2"],
            title: "Notification Title 2",
            updatedAt: { seconds: 1629756379, nanos: 103463000 },
            userGroupFilter: { userGroupsList: [UserGroup.USER_GROUP_SCHOOL_ADMIN] },
        },
        {
            composerId: "composer_id_1",
            notificationId: "notification_id_3",
            notificationMgsId: "notification_mgs_id_3",
            sentAt: { seconds: 1629756379, nanos: 370825000 },
            status: NotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
            tagIdsList: ["tagId3"],
            title: "Notification Title 3",
            updatedAt: { seconds: 1629756379, nanos: 103463000 },
            userGroupFilter: { userGroupsList: [UserGroup.USER_GROUP_SCHOOL_ADMIN] },
        },
    ];
}

export function createMockInfoNotificationByFilterResponse(): GetNotificationsByFilterResponse.AsObject {
    return {
        notificationsList: createMockInfoNotificationByFilter(),
        totalItems: 3,
        totalItemsForStatusList: [
            { status: NotificationStatus.NOTIFICATION_STATUS_NONE, totalItems: 1 },
            { status: NotificationStatus.NOTIFICATION_STATUS_SENT, totalItems: 1 },
            { status: NotificationStatus.NOTIFICATION_STATUS_DRAFT, totalItems: 1 },
            { status: NotificationStatus.NOTIFICATION_STATUS_SCHEDULED, totalItems: 1 },
        ],
        nextPage: {
            limit: 10,
            offsetInteger: 1,
            offsetString: "0",
        },
        previousPage: {
            limit: 10,
            offsetInteger: 0,
            offsetString: "0",
        },
    };
}

export function createMockCoursesManyReferenceQuery(): CoursesManyReferenceQuery {
    const courses: CoursesManyReferenceQuery["courses"] = [
        {
            course_id: "course_id1",
            name: "CourseName",
            school_id: 1,
        },
    ];

    return {
        courses,
        courses_aggregate: {
            aggregate: {
                count: courses.length,
            },
        },
    };
}

export function createMockQuestionnaireUserAnswers(): Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"] {
    return [
        {
            questionnaire_question_id: "questionnaire_question_id_1",
            submitted_at: "2022-07-25T00:00:00",
            target_id: "user_id_1",
            user_id: "user_id_1",
            user_notification_id: "user_id_1",
            answer: "Answer 1",
        },
        {
            questionnaire_question_id: "questionnaire_question_id_2",
            submitted_at: "2022-07-25T00:00:00",
            target_id: "user_id_1",
            user_id: "user_id_1",
            user_notification_id: "user_id_1",
            answer: "Answer 2",
        },
        {
            questionnaire_question_id: "questionnaire_question_id_3",
            submitted_at: "2022-07-25T00:00:00",
            target_id: "user_id_1",
            user_id: "user_id_1",
            user_notification_id: "user_id_1",
            answer: "answer1 questionnaire_question_id_3",
        },
        {
            questionnaire_question_id: "questionnaire_question_id_1",
            submitted_at: "2022-07-25T00:00:00",
            target_id: "user_id_1",
            user_id: "user_id_1",
            user_notification_id: "user_id_1",
            answer: "Answer 2",
        },
    ];
}

export function createMockQuestionnaireUserAnswersResponse(): Communication_GetUserAnswersByQuestionIdsQuery {
    return {
        questionnaire_user_answers: createMockQuestionnaireUserAnswers(),
    };
}

export function createMockQuestionnaireUserAnswersQuestionIds(): Communication_GetUserAnswersByQuestionIdsQueryVariables["questionIds"] {
    return ["question_id1", "question_id2", "question_id3", "question_id4"];
}

export function createMockGroupedQuestionnaireUserAnswers(): Record<
    string,
    Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"]
> {
    return groupBy(createMockQuestionnaireUserAnswers(), "questionnaire_question_id");
}
