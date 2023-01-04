import { KeyUserNotificationStatus, UserRoles } from "src/common/constants/const";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import {
    Communication_UsersInfoNotificationsListQuery,
    UserNameByIdsQuery,
    UsersInfoNotificationsListQuery,
} from "src/squads/communication/service/bob/bob-types";
import { usersInfoNotificationsServices } from "src/squads/communication/service/bob/users-info-notifications-service/users-info-notifications-service";
import { usersService } from "src/squads/communication/service/bob/users-service/users-service";
import { inferQuery, inferQueryPagination } from "src/squads/communication/service/infer-query";
import {
    createMockNotificationPagination,
    createMockNotificationParentNames,
    createMockNotificationReceipt,
    createMockNotificationReceiptWithQuestionnaireStatus,
    createMockNotificationStudentNames,
} from "src/squads/communication/test-utils/notification";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useNotificationReceipt, {
    UseNotificationReceiptReturn,
    MappedUseNotificationReceiptIDsReturn,
    mappedUseNotificationReceipt,
} from "../useNotificationReceipt";

import {
    UseQueryBaseOptions,
    DataWithTotal,
    UseQueryPaginationOptions,
} from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const notificationReceipt = createMockNotificationReceipt();
const notificationReceiptWithQuestionnaireStatus =
    createMockNotificationReceiptWithQuestionnaireStatus();
const studentNames = createMockNotificationStudentNames();
const parentNames = createMockNotificationParentNames();
const pagination = createMockNotificationPagination();

const mockUseFeatureToggle = (isShowQuestionnaire = false) => {
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
            return {
                isEnabled: isShowQuestionnaire,
            };
        }
    });
};

function mockInferQueryPagination({
    recipientData = {
        data: notificationReceipt,
        total: notificationReceipt.length,
    },
    recipientWithStatusData = {
        data: notificationReceiptWithQuestionnaireStatus,
        total: notificationReceiptWithQuestionnaireStatus.length,
    },
} = {}) {
    let callbackRecipientRan = false;
    let callbackRecipientWithStatusRan = false;

    (inferQueryPagination as jest.Mock).mockImplementation(
        (resource: {
                entity: "usersInfoNotifications";
                action: keyof typeof usersInfoNotificationsServices["query"];
            }) =>
            (
                options: UseQueryPaginationOptions<
                    DataWithTotal<
                        | UsersInfoNotificationsListQuery["users_info_notifications"]
                        | Communication_UsersInfoNotificationsListQuery["users_info_notifications"]
                        | undefined
                    >,
                    DataWithTotal<MappedUseNotificationReceiptIDsReturn>
                >
            ) => {
                if (!callbackRecipientRan) {
                    if (resource.action === "communicationGetRecipientList") {
                        callbackRecipientRan = true;

                        const mappedRecipient = mappedUseNotificationReceipt(recipientData);

                        options.selector?.(recipientData);

                        return {
                            result: {
                                isLoading: false,
                            },
                            data: mappedRecipient,
                            pagination,
                        };
                    }
                }
                if (!callbackRecipientWithStatusRan) {
                    if (
                        resource.action === "communicationGetRecipientListWithQuestionnaireStatus"
                    ) {
                        callbackRecipientWithStatusRan = true;

                        const mappedRecipientWithStatus =
                            mappedUseNotificationReceipt(recipientWithStatusData);

                        options.selector?.(recipientWithStatusData);

                        return {
                            result: {
                                isLoading: false,
                            },
                            data: mappedRecipientWithStatus,
                            pagination,
                        };
                    }
                }
                return {
                    result: {
                        isLoading: false,
                    },
                    data: {
                        data: {
                            notificationReceipt: [],
                            studentIds: [],
                            parentIds: [],
                        },
                        total: 0,
                    },
                    pagination,
                };
            }
    );
}

function mockInferQuery(
    studentNames?: UseNotificationReceiptReturn["studentNames"],
    parentNames?: UseNotificationReceiptReturn["parentNames"]
) {
    let callbackStudentsNamesRan = false;
    let callbackParentNamesRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: { entity: "users"; action: keyof typeof usersService["query"] }) => () => {
            switch (resource.action) {
                case "communicationGetUsernames":
                    if (!callbackStudentsNamesRan) {
                        callbackStudentsNamesRan = true;

                        return {
                            data: studentNames,
                        };
                    }

                    if (!callbackParentNamesRan) {
                        callbackParentNamesRan = true;

                        return {
                            data: parentNames,
                        };
                    }

                    break;

                default:
                    break;
            }

            return {
                data: null,
            };
        }
    );
}

describe("useNotificationReceipt", () => {
    const std = mockWarner();

    it("should return correct value of data", () => {
        mockUseFeatureToggle();
        mockInferQueryPagination();

        mockInferQuery(studentNames, parentNames);

        const { result } = renderHook(() =>
            useNotificationReceipt({
                id: "notificationId1",
            })
        );

        expect(result.current.notificationReceipt).toEqual(notificationReceipt);
        expect(result.current.studentNames).toEqual(studentNames);
        expect(result.current.parentNames).toEqual(parentNames);
    });

    it("should return default value without student_id and parent_id of receiptData", () => {
        const notificationWithoutReceipt: UseNotificationReceiptReturn["notificationReceipt"] = [
            {
                course_ids: ["course_id1", "course_id2"],
                current_grade: 13,
                notification_id: "notification_id1",
                status: KeyUserNotificationStatus.USER_NOTIFICATION_STATUS_NEW,
                student_id: "",
                parent_id: "",
                user_id: "student1",
                user_notification_id: "user_notification_id1",
                user_group: UserRoles.USER_GROUP_STUDENT,
            },
        ];
        mockUseFeatureToggle();

        mockInferQueryPagination({
            recipientData: {
                data: notificationWithoutReceipt,
                total: notificationWithoutReceipt.length,
            },
        });

        mockInferQuery([], []);

        const { result } = renderHook(() =>
            useNotificationReceipt({
                id: "notificationId1",
            })
        );

        expect(result.current.notificationReceipt).toEqual(notificationWithoutReceipt);
        expect(result.current.studentNames).toEqual([]);
        expect(result.current.parentNames).toEqual([]);
    });

    it("should return empty array of receipt when request fail", () => {
        mockUseFeatureToggle();
        mockInferQueryPagination({
            recipientData: { data: [], total: 0 },
        });

        let callbackStudentsRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "users"; action: keyof typeof usersService["query"] }) =>
                (
                    _params: UserNameByIdsQuery["users"],
                    options: UseQueryBaseOptions<UserNameByIdsQuery["users"] | undefined>
                ) => {
                    if (resource.action === "communicationGetUsernames") {
                        if (!callbackStudentsRan) {
                            callbackStudentsRan = true;

                            options.onError?.(Error("ERROR StudentNames GET_RECEIPT"));
                        }
                    }

                    return { data: [] };
                }
        );

        const { result } = renderHook(() =>
            useNotificationReceipt({
                id: "notificationId1",
            })
        );

        expect(result.current.notificationReceipt).toEqual([]);
        expect(std.warn).toBeCalledWith(
            `useNotificationReceipt notification studentNames`,
            Error("ERROR StudentNames GET_RECEIPT")
        );
        expect(result.current.parentNames).toEqual([]);
        expect(result.current.studentNames).toEqual([]);
    });

    it("should return empty array of receipt when request fail", () => {
        mockUseFeatureToggle();
        mockInferQueryPagination({
            recipientData: { data: [], total: 0 },
        });

        let callbackStudentsRan = false;
        let callbackParentsRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "users"; action: keyof typeof usersService["query"] }) =>
                (
                    _params: UserNameByIdsQuery["users"],
                    options: UseQueryBaseOptions<UserNameByIdsQuery["users"] | undefined>
                ) => {
                    if (resource.action === "communicationGetUsernames") {
                        if (!callbackStudentsRan) {
                            callbackStudentsRan = true;

                            return {
                                data: studentNames,
                            };
                        }

                        if (callbackStudentsRan && !callbackParentsRan) {
                            callbackParentsRan = true;

                            options.onError?.(Error("ERROR ParentNames GET_RECEIPT"));
                        }
                    }

                    return { data: [] };
                }
        );

        const { result } = renderHook(() =>
            useNotificationReceipt({
                id: "notificationId1",
            })
        );

        expect(result.current.notificationReceipt).toEqual([]);

        expect(std.warn).toBeCalledWith(
            `useNotificationReceipt notification parentNames`,
            Error("ERROR ParentNames GET_RECEIPT")
        );
        expect(result.current.parentNames).toEqual([]);
        expect(result.current.studentNames).toEqual(studentNames);
    });
});

describe("useNotificationReceipt with questionnaire feature on", () => {
    it("should return correct data when questionnaire feature is turned on", () => {
        mockUseFeatureToggle(true);
        mockInferQueryPagination();

        mockInferQuery(studentNames, parentNames);

        const { result } = renderHook(() =>
            useNotificationReceipt({
                id: "notificationId1",
            })
        );

        expect(result.current.notificationReceipt).toEqual(
            notificationReceiptWithQuestionnaireStatus
        );
        expect(result.current.studentNames).toEqual(studentNames);
        expect(result.current.parentNames).toEqual(parentNames);
    });
});
