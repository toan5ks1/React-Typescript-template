import { EditorState } from "draft-js";
import {
    KeyConversionTaskStatusTypes,
    KeyMediaTypes,
    KeyNotificationEvent,
    KeyNotificationStatus,
    KeyNotificationTargetGroupSelect,
    KeyNotificationType,
    KeyUserNotificationStatus,
    UserRoles,
} from "src/common/constants/const";
import { MIMETypes } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { firstOptionsChoice } from "src/common/helpers/helpers";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";
import { KeyQuestionnaireStatus } from "src/squads/communication/common/constants/const";
import {
    InfoNotification,
    InfoNotificationsByFilter,
    Media,
    NotificationCategories,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import { getDateAfterDuration } from "src/squads/communication/common/utils/utils";
import {
    Communication_GetListTagsByTagIdsQuery,
    Communication_UsersInfoNotificationsListQuery,
    InfoNotificationCountsByStatusV2Query,
    InfoNotificationsCountReadQuery,
    UsersInfoNotificationsListQuery,
} from "src/squads/communication/service/bob/bob-types";

import { getOptionTimePickerByDate } from "src/components/Autocompletes/TimePickerAutocompleteHF";
import { DeliveryDateFieldProps } from "src/squads/communication/pages/Notification/components/DeliveryDateInputs";

import { Grade } from "../models/grade";
import { getExampleDraftContent } from "./draft-js";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import { ChoiceType } from "src/squads/communication/hooks/useAutocompleteReference";
import { UseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import {
    IMapperNotificationInfoData,
    UseNotificationFormDataReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationFormData";
import {
    MappedUseNotificationListIDsReturn,
    UseNotificationListReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationList";
import { UseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";
import { UseNotificationReceiptReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationReceipt";

const notificationCategories: NotificationCategories = { all: 13, draft: 4, sent: 6, schedule: 3 };

export const createCategoryOptions = () => {
    return [
        {
            label: "All",
            count: notificationCategories.all,
            testid: "NotificationCategory__NOTIFICATION_STATUS_NONE",
        },
        {
            label: "Sent",
            count: notificationCategories.sent,
            testid: `NotificationCategory__NOTIFICATION_STATUS_SENT`,
        },
        {
            label: "Scheduled",
            count: notificationCategories.schedule,
            testid: `NotificationCategory__NOTIFICATION_STATUS_SCHEDULED`,
        },
        {
            label: "Draft",
            count: notificationCategories.draft,
            testid: `NotificationCategory__NOTIFICATION_STATUS_DRAFT`,
        },
    ];
};

export const mockNotificationCategoriesQuery: InfoNotificationCountsByStatusV2Query = {
    draft: {
        aggregate: { count: 4 },
    },
    sent: {
        aggregate: {
            count: 6,
        },
    },
    schedule: {
        aggregate: {
            count: 3,
        },
    },
};

const choiceGrades: Grade[] = [
    { id: 0, name: "Other" },
    { id: 1, name: "Grade 1" },
];

const draftNotificationInfo: UseNotificationDetailReturn["notificationInfo"] = {
    notification_id: "notification_id1",
    notification_msg_id: "info_notification_msgs1",
    receiver_ids: ["student1", "student2"],
    status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
    target_groups: {
        grade_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
            grades: [9, 3],
        },
        course_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
            course_ids: ["course1", "course2"],
        },
        user_group_filter: {
            user_group: [UserRoles.USER_GROUP_STUDENT, UserRoles.USER_GROUP_PARENT],
        },
    },
    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
    updated_at: new Date("2021/05/12, 07:15"),
    created_at: new Date("2021/05/12, 07:15"),
};

const scheduleNotificationInfo = (
    scheduledAt: Date
): UseNotificationDetailReturn["notificationInfo"] => ({
    notification_id: "notification_id3",
    notification_msg_id: "info_notification_msgs3",
    receiver_ids: ["student1", "student2"],
    status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
    target_groups: {
        grade_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
            grades: [9, 3],
        },
        course_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
            course_ids: ["course1", "course2"],
        },
        user_group_filter: {
            user_group: [UserRoles.USER_GROUP_STUDENT, UserRoles.USER_GROUP_PARENT],
        },
    },
    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
    updated_at: new Date("2021/05/12, 07:15"),
    created_at: new Date("2021/05/12, 07:15"),
    scheduled_at: scheduledAt,
});

const notificationInfo: InfoNotification = {
    notification_id: "notification_id2",
    notification_msg_id: "info_notification_msgs2",
    receiver_ids: ["student1", "student2"],
    status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
    target_groups: {
        grade_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
            grades: [9, 3],
        },
        course_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
            course_ids: ["course1", "course2"],
        },
        user_group_filter: {
            user_group: [UserRoles.USER_GROUP_STUDENT, UserRoles.USER_GROUP_PARENT],
        },
    },
    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
    updated_at: new Date("2021/05/12, 07:15"),
    created_at: new Date("2021/05/12, 07:15"),
    questionnaire_id: "questionnaire_id",
};

const courses: UseNotificationDetailReturn["courses"] = [
    {
        course_id: "course1",
        name: "Course 1",
        grade: 1,
        school_id: 1,
    },
    {
        course_id: "course2",
        name: "Course 2",
        grade: 2,
        school_id: 1,
    },
];

const receivers: UseNotificationDetailReturn["receivers"] = [
    {
        name: "Student A",
        user_id: "student1",
        avatar: "avatarStudent1",
    },
    {
        name: "Student B",
        user_id: "student2",
        avatar: "avatarStudent2",
    },
];

const courseChoices = courses.map(
    (course: ArrayElement<UseNotificationDetailReturn["courses"]>) => ({
        ...course,
        value: course.course_id,
    })
);

const studentChoices = receivers.map(
    (receiver: ArrayElement<UseNotificationDetailReturn["receivers"]>) => ({
        ...receiver,
        value: receiver.name,
    })
);

export const mapperNotificationInfoData = (
    status: keyof typeof KeyNotificationStatus = KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT
): IMapperNotificationInfoData => {
    return {
        notificationId: "notification_id1",
        notificationMsgId: "info_notification_msgs1",
        grades: [
            firstOptionsChoice<ChoiceType<IMapperNotificationInfoData["grades"][0]>>({
                firstChoiceLabel: "label.allGrades",
                keyValue: "name",
            }),
        ],
        courses: courseChoices,
        students: studentChoices,
        targetGroup: "",
        isAllCourses: false,
        isAllGrades: true,
        status,
        scheduleDate: new Date(),
        scheduleTime: getOptionTimePickerByDate(),
        isImportantNotification: false,
        tags: [],
    };
};

const formData: UseNotificationFormDataReturn["formData"] = {
    ...mapperNotificationInfoData(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT),
    title: "info notification msgs 1",
    content: getExampleDraftContent("notification content"),
    mediaIds: ["media1", "media2"],
};

const emptyFormData: UseNotificationFormDataReturn["formData"] = {
    ...mapperNotificationInfoData(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT),
    courses: [],
    grades: [],
    students: [],
    title: "",
    content: EditorState.createEmpty(),
    mediaIds: [],
    isAllCourses: false,
    isAllGrades: false,
    notificationId: "",
    notificationMsgId: "",
    expirationDate: getDateAfterDuration(7),
    expirationTime: getOptionTimePickerByDate(),
    isAllowResubmission: false,
};

const notificationInfoList: UseNotificationListReturn["notificationInfoList"] = [
    {
        editor_id: "student1",
        notification_id: "notification_id1",
        notification_msg_id: "notification_msg_id1",
        status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
        type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
        updated_at: new Date("2021/05/12, 07:15"),
        created_at: new Date("2021/05/12, 07:15"),
        scheduled_at: "",
        sent_at: "",
        target_groups: {
            grade_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
                grades: [9, 3],
            },
            course_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
                course_ids: ["course1", "course2"],
            },
            user_group_filter: {
                user_group: [UserRoles.USER_GROUP_STUDENT, UserRoles.USER_GROUP_PARENT],
            },
        },
    },
    {
        editor_id: "student2",
        notification_id: "notification_id2",
        notification_msg_id: "notification_msg_id2",
        status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
        updated_at: new Date("2021/05/12, 08:15"),
        created_at: new Date("2021/05/12, 08:15"),
        scheduled_at: new Date("2021/05/12, 08:15"),
        sent_at: new Date("2021/05/12, 08:15"),
        target_groups: {
            grade_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
                grades: [0],
            },
            course_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
                course_ids: ["course1"],
            },
            user_group_filter: {
                user_group: [UserRoles.USER_GROUP_STUDENT, UserRoles.USER_GROUP_PARENT],
            },
        },
    },
    {
        editor_id: "student3",
        notification_id: "notification_id3",
        notification_msg_id: "notification_msg_id3",
        status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
        type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
        updated_at: new Date("2021/05/12, 08:15"),
        created_at: new Date("2021/05/12, 08:15"),
        scheduled_at: new Date("2021/05/12, 08:15"),
        sent_at: new Date("2021/05/12, 08:15"),
        target_groups: {
            grade_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
                grades: [0],
            },
            course_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
                course_ids: ["course1"],
            },
            user_group_filter: {
                user_group: [UserRoles.USER_GROUP_STUDENT],
            },
        },
    },
];

const notificationInfoListV2: Array<InfoNotificationsByFilter> = [
    {
        composerId: "student1",
        notificationId: "notification_id1",
        notificationMgsId: "notification_msg_id1",
        sentAt: {
            seconds: 1642460400,
            nanos: 0,
        },
        status: 3,
        tagIdsList: ["tagId1", "tagId2"],
        title: "Notification test 01",
        updatedAt: {
            seconds: 1642460410,
            nanos: 0,
        },
        userGroupFilter: {
            userGroupsList: [1, 7],
        },
    },
    {
        composerId: "student2",
        notificationId: "notification_id2",
        notificationMgsId: "notification_msg_id2",
        sentAt: "",
        status: 1,
        tagIdsList: ["tagId3", "tagId4"],
        title: "Notification test 02",
        updatedAt: {
            seconds: 1642460430,
            nanos: 0,
        },
        userGroupFilter: {
            userGroupsList: [1, 7],
        },
    },
    {
        composerId: "student3",
        notificationId: "notification_id3",
        notificationMgsId: "notification_msg_id3",
        sentAt: "",
        status: 2,
        tagIdsList: ["tagId2"],
        title: "Notification test 03",
        updatedAt: {
            seconds: 1642460430,
            nanos: 0,
        },
        userGroupFilter: {
            userGroupsList: [1, 7],
        },
    },
];

const listTag: Communication_GetListTagsByTagIdsQuery["tags"] = [
    {
        tag_id: "tagId1",
        tag_name: "tagName1",
        created_at: "2022-07-04T00:00:00",
        updated_at: "2022-07-05T00:00:00",
    },
    {
        tag_id: "tagId2",
        tag_name: "I want user's name to have > 24 characters, so I write more",
        created_at: "2022-07-06T00:00:00",
        updated_at: "2022-07-07T00:00:00",
    },
    {
        tag_id: "tagId3",
        tag_name: "tagName3 is 20 chars",
        created_at: "2022-07-07T00:00:00",
        updated_at: "2022-07-08T00:00:00",
    },
    {
        tag_id: "tagId4",
        tag_name: "tagName4",
        created_at: "2022-07-09T00:00:00",
        updated_at: "2022-07-10T00:00:00",
    },
];

const composerList: UseNotificationListReturn["composerList"] = [
    {
        user_id: "student1",
        name: "I want user's name to have > 24 characters, so I write more",
    },
    {
        user_id: "student2",
        name: "name 2",
    },
    {
        user_id: "student3",
        name: "name 3",
    },
];

const readCountOfNotifications: InfoNotificationsCountReadQuery["info_notifications"] = [
    {
        notification_id: "notification_id1",
        all_receiver_aggregate: {
            aggregate: {
                count: 3,
            },
        },
        read_aggregate: {
            aggregate: {
                count: 1,
            },
        },
    },
    {
        notification_id: "notification_id2",
        all_receiver_aggregate: {
            aggregate: {
                count: 2,
            },
        },
        read_aggregate: {
            aggregate: {
                count: 2,
            },
        },
    },
    {
        notification_id: "notification_id3",
        all_receiver_aggregate: {
            aggregate: {
                count: 0,
            },
        },
        read_aggregate: {
            aggregate: {
                count: 0,
            },
        },
    },
];

const pagination: PaginationWithTotal = {
    offset: 0,
    page: 0,
    limit: 10,
    rowsPerPage: 10,
    count: 0,
    onPageChange: jest.fn(),
    onRowsPerPageChange: jest.fn(),
};

export const notificationMsgTitles: UseNotificationListReturn["notificationMsgTitles"] = [
    {
        notification_msg_id: "notification_msg_id1",
        title: "I want notification's title to have > 24 characters, so I write more",
    },
    {
        notification_msg_id: "notification_msg_id2",
        title: "Msg 2",
    },
    {
        notification_msg_id: "notification_msg_id3",
        title: "Msg 3",
    },
];

const notificationMsgDetail: UseNotificationMsgDetailReturn["notificationMsgDetail"] = {
    content: {
        // We need this mock JSON string to assert colored styled content
        raw: '{"blocks":[{"key":"2e0hr","text":"Link","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":4,"key":0}],"data":{}},{"key":"bp3no","text":"Bold","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1s9or","text":"Italic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9icl","text":"Underlined","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"dmgnl","text":"Colored","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"success"}],"entityRanges":[],"data":{}},{"key":"7f0af","text":"item1","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"text"}],"entityRanges":[],"data":{}},{"key":"cep2o","text":"item2","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"text"}],"entityRanges":[],"data":{}},{"key":"52hs1","text":"item1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"text"}],"entityRanges":[],"data":{}},{"key":"8u9ss","text":"item2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"text"}],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://github.com/manabie-com"}}}}',
        rendered_url: "https://rendered_url.com/",
    },
    media_ids: ["media1", "media2"],
    notification_msg_id: "info_notification_msg1",
    title: "info notification msgs 1",
    updated_at: new Date("2021/05/12, 07:15"),
    created_at: new Date("2021/05/12, 07:15"),
};

const mediaList: UseNotificationMsgDetailReturn["mediaList"] = [
    {
        media_id: "media1",
        name: "Media 1",
        created_at: "2021-05-1T14:50:17.74564+00:00",
        updated_at: "2021-05-2T14:50:17.74564+00:00",
        conversion_tasks: [
            {
                resource_url: "https://rendered_url.com/",
                task_uuid: "task_uuid1",
                created_at: "2020-12-30T09:34:07.910865+00:00",
                updated_at: "2020-12-30T09:34:21.583715+00:00",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
        resource: "https://rendered_url.com/",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
    },
];

export const mockMedias: Media[] = [
    {
        name: "The Wonders of Nature",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "01",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Volcano Eruption",
        type: MIMETypes.IMAGE,
        resource: "https://green-school-portal.web.app/",
        media_id: "02",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Evolutionary Psychology",
        type: KeyMediaTypes.MEDIA_TYPE_VIDEO,
        resource: "6251025034001",
        media_id: "03",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Material 1",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "04",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Material 2",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "05",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_CONVERTING,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Material 3",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "06",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
];

const notificationReceipt: UsersInfoNotificationsListQuery["users_info_notifications"] = [
    {
        course_ids: ["course_id1", "course_id2"],
        current_grade: 13,
        notification_id: "notification_id1",
        status: KeyUserNotificationStatus.USER_NOTIFICATION_STATUS_NEW,
        student_id: "student_1",
        parent_id: "parent_id_1",
        user_id: "student1",
        user_notification_id: "user_notification_id1",
        user_group: UserRoles.USER_GROUP_STUDENT,
    },
];

const notificationReceiptWithQuestionnaireStatus: Communication_UsersInfoNotificationsListQuery["users_info_notifications"] =
    [
        {
            course_ids: ["course_id1", "course_id2"],
            current_grade: 13,
            notification_id: "notification_id1",
            status: KeyUserNotificationStatus.USER_NOTIFICATION_STATUS_NEW,
            student_id: "student_1",
            parent_id: "parent_id_1",
            user_id: "student1",
            user_notification_id: "user_notification_id1",
            user_group: UserRoles.USER_GROUP_STUDENT,
            qn_status: KeyQuestionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_ANSWERED,
        },
    ];

const parentNames: UseNotificationReceiptReturn["parentNames"] = [
    {
        user_id: "parent1",
        name: "Parent 1",
    },
    {
        user_id: "parent2",
        name: "Parent 2",
    },
    {
        user_id: "parent3",
        name: "Parent 3",
    },
];

const studentNames: UseNotificationReceiptReturn["studentNames"] = [
    {
        user_id: "student1",
        name: "Student 1",
    },
    {
        user_id: "student2",
        name: "Student 2",
    },
    {
        user_id: "student3",
        name: "Student 3",
    },
];

export const deliveryDateInputsProps: DeliveryDateFieldProps = {
    dateFieldProps: {
        name: "scheduleDate",
        InputProps: {
            value: "1999/06/06",
            "data-testid": "DeliveryDate__scheduledDate",
        },
    },
    timeFieldProps: {
        name: "scheduleTime",
        placeholder: "Time",
        getOptionSelectedField: "value",
    },
};

export const scheduleTimeLabel = "12:45";

export const deliveryDate = new Date(`1999/06/06, ${scheduleTimeLabel}`);

export const scheduleTime: TimeAutocompleteOption = {
    label: scheduleTimeLabel,
    value: deliveryDate,
};

const notificationDraftCreated: UpsertNotificationProps = {
    notificationId: "",
    courseIds: [],
    gradeIds: [],
    receiverIdsList: [],
    isAllCourses: createMockNotificationFormData().isAllCourses,
    isAllGrades: createMockNotificationFormData().isAllGrades,
    targetGroup: createMockNotificationFormData().targetGroup,
    title: createMockNotificationFormData().title,
    content: {
        raw: createMockNotificationFormData().content,
        contentHTML: "content",
    },
    status: createMockNotificationFormData().status,
    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
    event: KeyNotificationEvent.NOTIFICATION_EVENT_NONE,
    isImportant: false,
};

export function createMockNotificationScheduleField() {
    return {
        scheduleTimeLabel,
        deliveryDate,
        scheduleTime,
    };
}

export function createMockNotificationCategories() {
    return notificationCategories;
}

export function createMockNotificationDraft() {
    return draftNotificationInfo;
}

export function createMockNotificationSchedule(scheduledAt: Date) {
    return scheduleNotificationInfo && scheduleNotificationInfo(scheduledAt);
}

export function createMockNotificationMsgDetail() {
    return notificationMsgDetail;
}

export function createMockNotificationMedia() {
    return mediaList;
}

export function createMockChoiceGrades() {
    return choiceGrades;
}

export function createMockNotificationReceivers() {
    return receivers;
}

export function createMockNotificationCourses() {
    return courses;
}

export function createMockNotificationInfo() {
    return notificationInfo;
}

export function createMockNotificationInfoWithQuestionnaire(): InfoNotification {
    return {
        ...notificationInfo,
        is_important: false,
        questionnaire_id: "questionnaire_id_1",
    };
}

export function createMockNotificationFormData() {
    return formData;
}

export function createMockEmptyNotificationFormData() {
    return emptyFormData;
}

export function createMockReadCountOfNotifications() {
    return readCountOfNotifications;
}

export function createMockNotificationInfoList() {
    return notificationInfoList;
}

export function createMockNotificationsComposerList() {
    return composerList;
}

export function createMockNotificationPagination() {
    return pagination;
}

export function createMockNotificationInfoListV2() {
    return notificationInfoListV2;
}

export function createMockNotificationsTagList() {
    return listTag;
}

export function createMockNotificationReceipt() {
    return notificationReceipt;
}

export function createMockNotificationReceiptWithQuestionnaireStatus() {
    return notificationReceiptWithQuestionnaireStatus;
}

export function createMockNotificationStudentNames() {
    return studentNames;
}

export function createMockNotificationParentNames() {
    return parentNames;
}

export function createMockNotificationDraftCreated() {
    return notificationDraftCreated;
}

export function createMockNotificationListData() {
    const notificationInfoList = createMockNotificationInfoList();

    const notificationIds = new Set<
        ArrayElement<MappedUseNotificationListIDsReturn["notificationIds"]>
    >();

    const notificationEditorIds = new Set<
        ArrayElement<MappedUseNotificationListIDsReturn["notificationIds"]>
    >();

    const notificationMsgIds = new Set<
        ArrayElement<MappedUseNotificationListIDsReturn["notificationMsgIds"]>
    >();

    notificationInfoList.forEach((notificationInfo) => {
        notificationIds.add(notificationInfo.notification_id);

        if (notificationInfo.editor_id) notificationEditorIds.add(notificationInfo.editor_id);

        if (notificationInfo.notification_msg_id)
            notificationMsgIds.add(notificationInfo.notification_msg_id);
    });

    return {
        notificationInfoList: createMockNotificationInfoList(),
        notificationIds: [...notificationIds],
        notificationEditorIds: [...notificationEditorIds],
        notificationMsgIds: [...notificationMsgIds],
    };
}
