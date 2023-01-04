import { DateTime, DurationLikeObject } from "luxon";
import {
    KeyNotificationEvent,
    KeyNotificationStatus,
    KeyNotificationType,
    UserRoles,
} from "src/common/constants/const";
import { ArrayElement, FilterAppliedObjectsMap } from "src/common/constants/types";
import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import { combineDateAndTime } from "src/common/utils/time";
import {
    NotificationFormData,
    NotificationStatusType,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import { getAlphabetArray } from "src/squads/communication/common/utils/other";
import { createQuestionsListFromQuestionFieldArray } from "src/squads/communication/common/utils/questionnaire-utils";
import { Grade } from "src/squads/communication/models/grade";
import { NotificationSelectors } from "src/squads/communication/models/notification";
import { CoursesManyReferenceQuery } from "src/squads/communication/service/bob/bob-types";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import { Paging } from "manabuf/common/v1/requests_pb";

import { UseResourceTranslateReturn } from "src/squads/communication/hooks/useResourceTranslate";

interface GetQuestionnaireUpsertDataParams
    extends Pick<
        NotificationFormData,
        "expirationDate" | "expirationTime" | "questionFieldArrayItem" | "isAllowResubmission"
    > {}

interface GetScheduleUpsertDataParams
    extends Pick<NotificationFormData, "scheduleDate" | "scheduleTime" | "status"> {}

const isNotificationStatusType = (status: string): status is NotificationStatusType => {
    return Object.keys(KeyNotificationStatus).includes(status);
};

export function getConvertedStatus(
    status: string | (string | null)[] | null
): NotificationStatusType | undefined {
    if (!status || status === null) return undefined;

    if (Array.isArray(status)) {
        const firstNotificationStatus = pick1stElement(status);

        if (firstNotificationStatus && isNotificationStatusType(firstNotificationStatus)) {
            return firstNotificationStatus;
        }
    } else if (isNotificationStatusType(status)) return status;
}

//TODO: @communication remove checkDraftStatus after Notification V2 release and Notification V1 removed
export function checkDraftStatus(status?: string): boolean {
    return status === KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT;
}
//TODO: @communication remove checkScheduleStatus after Notification V2 release and Notification V1 removed
export function checkScheduleStatus(status?: string): boolean {
    return status === KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED;
}
//TODO: @communication remove checkSentStatus after Notification V2 release and Notification V1 removed
export function checkSentStatus(status?: string): boolean {
    return status === KeyNotificationStatus.NOTIFICATION_STATUS_SENT;
}

export function checkDraftStatusV2(status?: NotificationStatus): boolean {
    return status === NotificationStatus.NOTIFICATION_STATUS_DRAFT;
}

export function checkSentStatusV2(status?: NotificationStatus): boolean {
    return status === NotificationStatus.NOTIFICATION_STATUS_SENT;
}

export function checkScheduleStatusV2(status?: NotificationStatus): boolean {
    return status === NotificationStatus.NOTIFICATION_STATUS_SCHEDULED;
}

export const toDraftSelector = (selector: string) => {
    return `[data-js="${selector}"] .public-DraftEditor-content`;
};

export function selectInnerHTMLContentField(): { contentHTML: string } {
    const draftSelector = toDraftSelector(NotificationSelectors.content);
    const contentHTML = document.querySelector(draftSelector)?.innerHTML || "";

    return { contentHTML };
}

const getCoursesUpsertData = (courses: NotificationFormData["courses"]) => {
    let courseIds: UpsertNotificationProps["courseIds"] = [];

    const isAllCourses =
        courses.findIndex(
            (course: ArrayElement<CoursesManyReferenceQuery["courses"]>) =>
                typeof course.course_id === "undefined"
        ) >= 0;

    if (!isAllCourses) {
        courseIds = courses
            .filter((course) => Boolean(course.course_id))
            .map((course) => course.course_id);
    }

    return { isAllCourses, courseIds };
};

const getGradesUpsertData = (grades: NotificationFormData["grades"]) => {
    let gradeIds: UpsertNotificationProps["gradeIds"] = [];

    const isAllGrades = grades.findIndex((grade: Grade) => typeof grade.id === "undefined") >= 0;

    if (!isAllGrades) {
        gradeIds = grades.map(({ id }) => Number(id));
    }

    return { isAllGrades, gradeIds };
};

const getQuestionnaireUpsertData = ({
    expirationDate,
    expirationTime,
    questionFieldArrayItem,
    isAllowResubmission,
}: GetQuestionnaireUpsertDataParams) => {
    if (
        expirationDate &&
        expirationTime &&
        expirationTime.value &&
        questionFieldArrayItem &&
        arrayHasItem(questionFieldArrayItem)
    ) {
        const questionsList = createQuestionsListFromQuestionFieldArray(questionFieldArrayItem);

        return {
            questionnaireId: "",
            questionsList,
            resubmitAllowed: Boolean(isAllowResubmission),
            expirationDate: combineDateAndTime(expirationDate, expirationTime.value),
        };
    }
};

const getScheduleUpsertData = ({
    scheduleDate,
    scheduleTime,
    status,
}: GetScheduleUpsertDataParams) => {
    if (
        scheduleDate &&
        scheduleTime &&
        scheduleTime.value &&
        status === KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED
    ) {
        return combineDateAndTime(scheduleDate, scheduleTime.value);
    }
};

export const getMappedNotificationUpsertData = (
    formValues: NotificationFormData
): UpsertNotificationProps => {
    const trimmedTitle = formValues.title.trim();

    const mappedContent = {
        raw: formValues.content,
        contentHTML: selectInnerHTMLContentField().contentHTML,
    };

    const { isAllCourses, courseIds } = getCoursesUpsertData(formValues.courses);
    const { isAllGrades, gradeIds } = getGradesUpsertData(formValues.grades);

    const checkedTargetGroup = formValues.targetGroup
        ? [formValues.targetGroup]
        : [UserRoles.USER_GROUP_PARENT, UserRoles.USER_GROUP_STUDENT];

    const receiverIdsList: UpsertNotificationProps["receiverIdsList"] = formValues.students.map(
        (student: { user_id: ArrayElement<UpsertNotificationProps["receiverIdsList"]> }) =>
            student.user_id
    );

    const scheduledAt: UpsertNotificationProps["scheduledAt"] = getScheduleUpsertData({
        scheduleDate: formValues.scheduleDate,
        scheduleTime: formValues.scheduleTime,
        status: formValues.status,
    });

    const questionnaire: UpsertNotificationProps["questionnaire"] = getQuestionnaireUpsertData({
        expirationDate: formValues.expirationDate,
        expirationTime: formValues.expirationTime,
        isAllowResubmission: formValues.isAllowResubmission,
        questionFieldArrayItem: formValues.questionFieldArrayItem,
    });

    const tagIdsList = formValues.tags?.map((tag) => tag.tag_id);

    return {
        notificationId: formValues.notificationId || "",
        status: formValues.status,
        type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
        event: KeyNotificationEvent.NOTIFICATION_EVENT_NONE,
        title: trimmedTitle,
        content: mappedContent,
        gradeIds,
        isAllGrades,
        courseIds,
        isAllCourses,
        receiverIdsList,
        targetGroup: checkedTargetGroup,
        isImportant: Boolean(formValues.isImportantNotification),
        mediaIds: formValues.mediaIds,
        scheduledAt,
        questionnaire,
        tagIdsList,
    };
};

// Because the case cantSchedulePastTimeNotification:

// Error message when upsert scheduled notification with invalid scheduled time
// scheduled time is in the past

// => Should not close the dialog to keep user data
export function checkErrorIfShouldCloseComposeDialog(error: Error) {
    return !Boolean(
        error.message.match("ra.manabie-error.specified.cantSchedulePastTimeNotification")
    );
}

/**
 * @param arr array of string(max length = 26)
 * @param charInMiddle character between array items
 * @description convert from array string into array with alphabet, example: ["2022","Manabie"] => ["A. 2022","B. Manabie"]
 * @returns array of string, begin by alphabet
 */
export function addAlphabetToArrayString(
    arr: Array<string>,
    charInMiddle: "." | "/" | "," = "."
): Array<string> {
    return arr.map(
        (item, index) => `${getAlphabetArray("uppercase")[index]}${charInMiddle} ${item}`
    );
}

export function getDateBasedOnCheckSchedule(
    isSchedule: boolean,
    dateValue: Date | undefined | null
) {
    return isSchedule ? dateValue : new Date();
}

export function checkParamsAndConvertToDate(
    params: string | number | undefined,
    defaultValue: Date | undefined = undefined
): Date | undefined {
    return params ? new Date(params) : defaultValue;
}

/**
 * @param durations durations
 * @param durationUnit duration unit
 * @returns Date() after days, calculate from now.
 */
export const getDateAfterDuration = (
    durations: number,
    durationUnit: keyof DurationLikeObject = "days"
): Date => {
    return DateTime.local()
        .plus({ [durationUnit]: durations })
        .toJSDate();
};

/**
 * @param timeValue timeValue example: 10:00
 * @returns Date with new hour
 */
export const getCurrentDateWithSpecificHour = (timeValue: string) => {
    const [hour, minute] = timeValue.split(":").map(Number);
    return DateTime.local().set({ hour, minute }).toJSDate();
};

/**
 * Convert to "Paging" proto with only limit and offset
 *
 * @param paging paging object {limit: number; offsetInteger: number; offsetString: string; ...}
 * @returns proto class "Paging"
 */
export const toBasicPagingProto = (paging: Paging.AsObject) => {
    const result = new Paging();

    result.setLimit(paging.limit);

    // We only set the offset by one of 2 things, string or integer
    if (Boolean(paging.offsetString)) result.setOffsetString(paging.offsetString);
    else result.setOffsetInteger(paging.offsetInteger);

    return result;
};

export const covertReactNodeToString = (title: React.ReactNode) =>
    typeof title === "string" ? title : "";

/**
 * Convert "Filter default form value" to "Filter field object" with translation
 *
 * @param filterDefaultValues Form filter value by default
 * @returns object after convert with proper format & translation
 */
export const convertFilterFieldsObjects = <T>(
    tNotification: UseResourceTranslateReturn,
    filterDefaultValues: T
): FilterAppliedObjectsMap<T> => {
    const results = Object.keys(filterDefaultValues).map((key) => {
        return [
            key,
            {
                name: key,
                inputLabel: tNotification(`filters.${key}`),
                isApplied: false,
                defaultValue: filterDefaultValues[key],
            },
        ];
    });
    return Object.fromEntries(results);
};

/**
 * @param arr array of object
 * @param
 *      key: props of object wi
 *      charInMiddle character between array items
 * @description convert from array string into array with alphabet, example: ["Tag Name A","Tag Name B"] => ["Tag Name A","Tag Name B"]
 * @returns array of string with string join
 */
export function joinArrayObjectString<T>(
    arr: T[],
    key: keyof T,
    charInMiddle: "." | "/" | "," = ","
): string {
    return arr.map((item: T) => item[String(key)]).join(`${charInMiddle} `);
}
