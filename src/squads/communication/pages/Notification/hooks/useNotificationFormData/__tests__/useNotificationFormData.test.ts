import {
    KeyNotificationStatus,
    KeyNotificationTargetGroupSelect,
} from "src/common/constants/const";
import { formatDate, generateMockDateForTests } from "src/common/utils/time";
import { getDateAfterDuration } from "src/squads/communication/common/utils/utils";
import {
    createMockNotificationCourses,
    createMockNotificationDraft,
    createMockNotificationMsgDetail,
    createMockNotificationReceivers,
    createMockNotificationSchedule,
    mapperNotificationInfoData,
} from "src/squads/communication/test-utils/notification";
import { createMockQuestionnaire } from "src/squads/communication/test-utils/query-data";

import useNotificationFormData, { emptyFormData } from "../useNotificationFormData";

import { renderHook } from "@testing-library/react-hooks";
import { UseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import { UseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";

jest.mock("src/squads/communication/hooks/useTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

jest.mock("src/squads/communication/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

const draftNotificationInfo = createMockNotificationDraft();
const notificationMsgDetail = createMockNotificationMsgDetail();
const receivers = createMockNotificationReceivers();
const courses = createMockNotificationCourses();
const mockQuestionnaire = createMockQuestionnaire();

describe("useNotificationFormData", () => {
    const mockDate = "2020-01-01T02:45:00.000Z";

    generateMockDateForTests(mockDate, Date);

    it("should get draft notification form data without notificationInfo", () => {
        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers: [],
                courses: [],
                notificationInfo: undefined,
                notificationMsgDetail: undefined,
                tags: [],
            })
        );

        expect(result.current.formData).toMatchObject(emptyFormData);
        expect(result.current.status).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT);
    });

    it("should get notification form data with notificationInfo and status = draft", () => {
        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers,
                courses,
                notificationInfo: draftNotificationInfo,
                notificationMsgDetail,
                tags: [],
            })
        );

        expect(result.current.formData).toMatchObject(
            mapperNotificationInfoData(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT)
        );
        expect(result.current.status).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT);
    });

    it("should get notification form data with notificationInfo and status = schedule", () => {
        const deliveryDate = new Date();
        const scheduleNotificationInfo = createMockNotificationSchedule(deliveryDate);

        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers,
                courses,
                notificationInfo: scheduleNotificationInfo,
                notificationMsgDetail,
                tags: [],
            })
        );

        expect(result.current.formData).toMatchObject({
            ...mapperNotificationInfoData(KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED),
            notificationId: scheduleNotificationInfo?.notification_id,
            notificationMsgId: scheduleNotificationInfo?.notification_msg_id,
            scheduleDate: deliveryDate,
            scheduleTime: {
                label: formatDate(deliveryDate, "HH:mm"),
                value: deliveryDate,
            },
        });
        expect(result.current.status).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED);
    });

    it("should return empty data when notification_id is empty", () => {
        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers: [],
                courses: [],
                notificationInfo: {
                    ...draftNotificationInfo,
                    notification_id: "",
                } as UseNotificationDetailReturn["notificationInfo"],
                notificationMsgDetail: notificationMsgDetail,
                tags: [],
            })
        );

        expect(result.current.formData).toMatchObject(emptyFormData);
        expect(result.current.status).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT);
    });

    it("should return empty data when notificationMsgDetail has empty content", () => {
        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers: [],
                courses: [],
                notificationInfo: draftNotificationInfo,
                notificationMsgDetail: {
                    ...notificationMsgDetail,
                    content: null,
                } as UseNotificationMsgDetailReturn["notificationMsgDetail"],
                tags: [],
            })
        );

        expect(result.current.formData).toMatchObject(emptyFormData);
        expect(result.current.status).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT);
    });
});

describe("useNotificationFormData expiration date", () => {
    it("should return expiration date after 7 day when expiration date is undefined", () => {
        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers: [],
                courses: [],
                notificationInfo: draftNotificationInfo,
                notificationMsgDetail: {
                    ...notificationMsgDetail,
                    content: null,
                } as UseNotificationMsgDetailReturn["notificationMsgDetail"],
                questionnaire: {
                    ...mockQuestionnaire,
                    expiration_date: undefined,
                },
                tags: [],
            })
        );

        // TODO: @notification will check expirationDate type later
        const expirationDateWithoutTime = formatDate(
            result.current.formData.expirationDate!,
            "yyyy/LL/dd"
        );
        const expectedExpirationDate = formatDate(getDateAfterDuration(7), "yyyy/LL/dd");

        expect(expirationDateWithoutTime).toEqual(expectedExpirationDate);
    });
});

describe("useNotificationFormData with missing data", () => {
    const notificationInfoMissingData: UseNotificationDetailReturn["notificationInfo"] = {
        ...draftNotificationInfo!,
        target_groups: {
            grade_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
                grades: [2],
            },
            course_filter: {
                type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
                course_ids: [],
            },
            user_group_filter: {
                user_group: [],
            },
        },
    };

    const notificationMsgDetailMissingData: UseNotificationMsgDetailReturn["notificationMsgDetail"] =
        {
            ...notificationMsgDetail!,
            media_ids: undefined,
        };

    it("should get notification form data ", () => {
        const { result } = renderHook(() =>
            useNotificationFormData({
                receivers: [],
                courses: [],
                notificationInfo: notificationInfoMissingData,
                notificationMsgDetail: notificationMsgDetailMissingData,
                tags: [],
            })
        );

        expect(result.current.formData).toMatchObject({
            courses: [
                {
                    course_id: undefined,
                },
            ],
            targetGroup: undefined,
        });
        expect(result.current.status).toEqual(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT);
    });
});
