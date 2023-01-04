import { KeyNotificationStatus, UserRoles } from "src/common/constants/const";
import { firstOptionsChoice } from "src/common/helpers/helpers";
import { generateMockDateForTests } from "src/common/utils/time";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import {
    checkDraftStatus,
    checkParamsAndConvertToDate,
    checkScheduleStatus,
    checkSentStatus,
    getConvertedStatus,
    getDateAfterDuration,
    getMappedNotificationUpsertData,
    joinArrayObjectString,
} from "src/squads/communication/common/utils/utils";
import { createMockNotificationFormData } from "src/squads/communication/test-utils/notification";
import {
    createMockTagsByTagIds,
    createMockTagsSelectedByNotificationIdQueryReturn,
} from "src/squads/communication/test-utils/query-data";
import {
    createMockQuestionAnswerItems,
    createMockQuestionnaireFormData,
} from "src/squads/communication/test-utils/questionnaire";

import { ChoiceType } from "src/squads/communication/hooks/useAutocompleteReference";
import { IMapperNotificationInfoData } from "src/squads/communication/pages/Notification/hooks/useNotificationFormData";

describe(getConvertedStatus.name, () => {
    it("should return undefined", () => {
        expect(getConvertedStatus(null)).toBeUndefined();
    });
    it("should return correct NOTIFICATION_STATUS_DRAFT", () => {
        expect(getConvertedStatus("NOTIFICATION_STATUS_DRAFT")).toEqual(
            KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT
        );
    });
    it("should return only one status with pick1stElement NOTIFICATION_STATUS_DRAFT", () => {
        expect(
            getConvertedStatus(["NOTIFICATION_STATUS_DRAFT", "NOTIFICATION_STATUS_SENT"])
        ).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT);
    });
});

describe(checkDraftStatus.name, () => {
    it("is draft status", () => {
        expect(checkDraftStatus(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT)).toEqual(true);
    });
    it("is not draft status", () => {
        expect(checkDraftStatus(KeyNotificationStatus.NOTIFICATION_STATUS_SENT)).toEqual(false);
    });
});

describe(checkScheduleStatus.name, () => {
    it("is schedule status", () => {
        expect(checkScheduleStatus(KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED)).toEqual(
            true
        );
    });
    it("is not schedule status", () => {
        expect(checkScheduleStatus(KeyNotificationStatus.NOTIFICATION_STATUS_SENT)).toEqual(false);
    });
});

describe(checkSentStatus.name, () => {
    it("is sent status", () => {
        expect(checkSentStatus(KeyNotificationStatus.NOTIFICATION_STATUS_SENT)).toEqual(true);
    });
    it("is not sent status", () => {
        expect(checkSentStatus(KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED)).toEqual(false);
    });
});

const mockNotificationFormData: NotificationFormData = createMockNotificationFormData();

describe(getMappedNotificationUpsertData.name, () => {
    it("mapped correct notification submit data", () => {
        const notificationValues: NotificationFormData = {
            ...mockNotificationFormData,
            targetGroup: [UserRoles.USER_GROUP_PARENT, UserRoles.USER_GROUP_STUDENT],
        };

        const result = getMappedNotificationUpsertData(notificationValues);

        expect(result.notificationId).toEqual(notificationValues.notificationId);
        expect(result.receiverIdsList[0]).toEqual(notificationValues.students[0].user_id);
        expect(result.courseIds[0]).toEqual(notificationValues.courses[0].course_id);
        expect(result.event).toEqual("NOTIFICATION_EVENT_NONE");
        expect(result.type).toEqual("NOTIFICATION_TYPE_COMPOSED");
        expect(result.title).toEqual(notificationValues.title);

        expect(result.targetGroup).toEqual([notificationValues.targetGroup]);
    });
    it("isAllCourses=true should return courseIds empty", () => {
        const notificationValues: NotificationFormData = {
            ...createMockNotificationFormData(),
            courses: [
                {
                    ...firstOptionsChoice<ChoiceType<IMapperNotificationInfoData["courses"][0]>>({
                        firstChoiceLabel: "All Courses",
                        keyValue: "name",
                        key: "course_id",
                    }),
                    grade: 1,
                    school_id: 1,
                },
            ],
        };

        const result = getMappedNotificationUpsertData(notificationValues);

        expect(result.courseIds).toEqual([]);
    });

    it("notificationId update id", () => {
        const result = getMappedNotificationUpsertData(mockNotificationFormData);

        expect(result.notificationId).not.toEqual("");
    });
    it("targetGroup should be [UserRoles.USER_GROUP_PARENT, UserRoles.USER_GROUP_STUDENT]", () => {
        const result = getMappedNotificationUpsertData(mockNotificationFormData);

        expect(result.targetGroup).toEqual([
            UserRoles.USER_GROUP_PARENT,
            UserRoles.USER_GROUP_STUDENT,
        ]);
    });

    it("isAllGrades=false should return gradeIds", () => {
        const notificationValues: NotificationFormData = {
            ...mockNotificationFormData,
            grades: [{ name: "grade 1", id: 1 }],
        };

        const result = getMappedNotificationUpsertData(notificationValues);

        expect(result.gradeIds).toEqual([1]);
    });

    it("should return notificationId empty id", () => {
        const notificationValues: NotificationFormData = {
            ...mockNotificationFormData,
            notificationId: undefined,
        };
        const result = getMappedNotificationUpsertData(notificationValues);

        expect(result.notificationId).toEqual("");
    });

    it("should return tag id list", () => {
        const mockQueryTagsSelectedByNotificationId =
            createMockTagsSelectedByNotificationIdQueryReturn();

        const notificationValues: NotificationFormData = {
            ...mockNotificationFormData,
            tags: mockQueryTagsSelectedByNotificationId,
        };
        const result = getMappedNotificationUpsertData(notificationValues);

        const tagIdsExpected = mockQueryTagsSelectedByNotificationId.map((tag) => tag.tag_id);
        expect(result.tagIdsList).toEqual(tagIdsExpected);
    });
});

describe(getMappedNotificationUpsertData.name, () => {
    const testDate = "2020-01-01T07:03:00.000Z";

    generateMockDateForTests(testDate, Date);

    it("scheduledAt should have data with scheduleDate and scheduleTime", () => {
        const notificationValues = {
            ...mockNotificationFormData,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
            scheduleDate: new Date(testDate),
            scheduleTime: { label: "03:00", value: new Date(testDate) },
        };

        const result = getMappedNotificationUpsertData(notificationValues);

        expect(result.scheduledAt).toEqual(new Date("2020-01-01T00:03:00.000Z"));
    });

    it("should have questionnaire field with correct data", () => {
        const mockQuestionsFieldArray = createMockQuestionAnswerItems({
            numberOfQuestions: 1,
            numberOfAnswer: 2,
        });

        const notificationValues: NotificationFormData = {
            ...mockNotificationFormData,
            questionFieldArrayItem: mockQuestionsFieldArray,
            expirationDate: new Date(testDate),
            expirationTime: { label: "12:00", value: new Date(testDate) },
        };

        const questionnaireFormData = createMockQuestionnaireFormData();

        const result = getMappedNotificationUpsertData(notificationValues);

        expect(result.questionnaire).toEqual(questionnaireFormData);
    });
});

describe(checkParamsAndConvertToDate.name, () => {
    it("should return date type when param is valid date", () => {
        const validDate = "2021-10-10T09:30:09+00:00";
        expect(checkParamsAndConvertToDate(validDate)).toEqual(new Date(validDate));
    });

    it("should return undefined when param is undefined", () => {
        expect(checkParamsAndConvertToDate(undefined)).toEqual(undefined);
    });

    it("should return default value when param is undefined", () => {
        const defaultExpirationDate = getDateAfterDuration(7);
        expect(checkParamsAndConvertToDate(undefined, defaultExpirationDate)).toEqual(
            defaultExpirationDate
        );
    });
});

describe(joinArrayObjectString.name, () => {
    it("should return list name of array object", () => {
        const mockTags = createMockTagsByTagIds();

        expect(joinArrayObjectString(mockTags, "tag_name")).toEqual("tagName1, tagName2, tagName3");
    });

    it("should return undefined when param is undefined", () => {
        expect(joinArrayObjectString([], "tag_name")).toEqual("");
    });
});
