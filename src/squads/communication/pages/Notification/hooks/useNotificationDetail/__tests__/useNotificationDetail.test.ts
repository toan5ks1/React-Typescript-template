import { useHistory } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { CoursesMany } from "src/squads/communication/common/constants/types";
import {
    Communication_GetInfoNotificationByNotificationIdV2Query,
    Communication_GetInfoNotificationByNotificationIdV2QueryVariables,
    CoursesManyQueryVariables,
    StudentsManyQuery,
    StudentsManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { coursesService } from "src/squads/communication/service/bob/courses-service/courses-service";
import { infoNotificationsService } from "src/squads/communication/service/bob/info-notifications-service/info-notifications-service";
import { usersService } from "src/squads/communication/service/bob/users-service/users-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import {
    createMockNotificationCourses,
    createMockNotificationInfo,
    createMockNotificationInfoWithQuestionnaire,
    createMockNotificationReceivers,
} from "src/squads/communication/test-utils/notification";
import {
    createMockQuestionnaire,
    createMockQuestionnaireQuestionsList,
} from "src/squads/communication/test-utils/query-data";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useNotificationDetail, { UseNotificationDetailReturn } from "../useNotificationDetail";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useQuestionnaireQuestionDetail from "src/squads/communication/pages/Notification/hooks/useQuestionnaireQuestionDetail";

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
    };
});

jest.mock("src/squads/communication/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock(
    "src/squads/communication/pages/Notification/hooks/useQuestionnaireQuestionDetail",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockNotificationInfo = createMockNotificationInfo();
const mockNotificationInfoWithQuestionnaire = createMockNotificationInfoWithQuestionnaire();
const mockCourses = createMockNotificationCourses();
const mockReceivers = createMockNotificationReceivers();
const mockQuestionnaire = createMockQuestionnaire();
const mockQuestionnaireQuestions = createMockQuestionnaireQuestionsList();

const historyPush = jest.fn();

function mockInferQuery(
    infoNotification?: UseNotificationDetailReturn["notificationInfo"],
    infoNotificationWithQuestionnaire?: UseNotificationDetailReturn["notificationInfo"],
    courses?: UseNotificationDetailReturn["courses"],
    receivers?: UseNotificationDetailReturn["receivers"]
) {
    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotifications" | "users" | "courses";
                action:
                    | keyof typeof infoNotificationsService.query
                    | keyof typeof usersService.query
                    | keyof typeof coursesService.query;
            }) =>
            () => {
                switch (resource.entity) {
                    case "infoNotifications":
                        if (
                            resource.action === "communicationGetInfoNotificationByNotificationId"
                        ) {
                            return {
                                data: infoNotification,
                                isFetching: false,
                            };
                        }

                        return {
                            data: infoNotificationWithQuestionnaire,
                            isFetching: false,
                        };

                    case "courses":
                        return {
                            data: courses,
                            isFetching: false,
                        };

                        break;

                    case "users":
                        return {
                            data: receivers,
                            isFetching: false,
                        };

                    default:
                        return {
                            data: [],
                            isFetching: false,
                        };
                }
            }
    );
}

const mockUseQuestionnaireQuestionDetail = (
    questionnaire?: UseNotificationDetailReturn["questionnaire"],
    questionnaireQuestions?: UseNotificationDetailReturn["questionnaireQuestions"]
) => {
    (useQuestionnaireQuestionDetail as jest.Mock).mockReturnValue({
        questionnaire,
        questionnaireQuestions,
        isFetchingQuestionnaire: false,
    });
};

const mockUseFeatureToggle = (isShowQuestionnaire = false) => {
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
            return {
                isEnabled: isShowQuestionnaire,
            };
        }
    });
};

describe("useNotificationDetail", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    beforeEach(() => {
        mockUseFeatureToggle();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should get notification detail data", () => {
        mockInferQuery(
            mockNotificationInfo,
            mockNotificationInfoWithQuestionnaire,
            mockCourses,
            mockReceivers
        );
        mockUseQuestionnaireQuestionDetail(mockQuestionnaire, mockQuestionnaireQuestions);

        const { result } = renderHook(() => useNotificationDetail("notification_id1"));

        expect(result.current.notificationInfo).toEqual(mockNotificationInfo!);
        expect(result.current.courses).toEqual(mockCourses);
        expect(result.current.receivers).toEqual(mockReceivers);
        expect(result.current.questionnaire).toEqual(mockQuestionnaire);
        expect(result.current.questionnaireQuestions).toEqual(mockQuestionnaireQuestions);
    });

    it("should show default value", () => {
        mockInferQuery();
        mockUseQuestionnaireQuestionDetail();

        const { result } = renderHook(() => useNotificationDetail());

        expect(result.current.notificationInfo).toBeUndefined();
        expect(result.current.receivers).toEqual([]);
        expect(result.current.courses).toEqual([]);
        expect(result.current.questionnaire).toBeUndefined();
        expect(result.current.questionnaireQuestions).toBeUndefined();
    });

    it("should call onError when fetching notificationInfo", () => {
        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotifications";
                    action: keyof typeof infoNotificationsService["query"];
                }) =>
                (
                    _params: Communication_GetInfoNotificationByNotificationIdV2QueryVariables,
                    options: UseQueryBaseOptions<
                        | Communication_GetInfoNotificationByNotificationIdV2Query["info_notifications"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                                "communicationGetInfoNotificationByNotificationIdV2" ||
                            resource.action === "communicationGetInfoNotificationByNotificationId"
                        ) {
                            callbackRan = true;
                            options.onError?.(
                                Error("ERROR communicationGetInfoNotificationByNotificationId")
                            );

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() => useNotificationDetail("errorId"));

        expect(showSnackbar).toBeCalledWith("ra.notification.item_doesnt_exist", "error");

        //log function
        expect(std.warn).toBeCalledWith(
            `useNotificationDetail notification info`,
            Error("ERROR communicationGetInfoNotificationByNotificationId")
        );

        // Redirect call
        expect(historyPush).toBeCalledWith(`/communication/${ERPModules.NOTIFICATIONS}`);
    });

    it("should call onError when fetching courses", () => {
        mockInferQuery(mockNotificationInfo, mockNotificationInfoWithQuestionnaire);
        mockUseQuestionnaireQuestionDetail();

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "courses"; action: keyof typeof coursesService["query"] }) =>
                (
                    _params: CoursesManyQueryVariables,
                    options: UseQueryBaseOptions<CoursesMany | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationGetManyCourses") {
                            callbackRan = true;
                            options.onError?.(Error("ERROR COURSES"));
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() => useNotificationDetail());

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");

        //log function
        expect(std.warn).toBeCalledWith(
            `useNotificationDetail notification courses`,
            Error("ERROR COURSES")
        );
    });

    it("should call onError when fetching receivers", () => {
        mockInferQuery(mockNotificationInfo, mockNotificationInfoWithQuestionnaire);
        mockUseQuestionnaireQuestionDetail();

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "users"; action: keyof typeof usersService["query"] }) =>
                (
                    _params: StudentsManyQueryVariables,
                    options: UseQueryBaseOptions<StudentsManyQuery | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationGetManyStudents") {
                            callbackRan = true;
                            options.onError?.(Error("ERROR STUDENTS"));
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() => useNotificationDetail());

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");

        //log function
        expect(std.warn).toBeCalledWith(
            `useNotificationDetail notification receiver`,
            Error("ERROR STUDENTS")
        );
    });

    it("should return correct data when questionnaire feature is turned on", () => {
        mockUseFeatureToggle(true);

        mockInferQuery(
            mockNotificationInfo,
            mockNotificationInfoWithQuestionnaire,
            mockCourses,
            mockReceivers
        );
        mockUseQuestionnaireQuestionDetail(mockQuestionnaire, mockQuestionnaireQuestions);

        const { result } = renderHook(() => useNotificationDetail("notification_id1"));

        expect(result.current.notificationInfo).toEqual(mockNotificationInfoWithQuestionnaire);
        expect(result.current.courses).toEqual(mockCourses);
        expect(result.current.receivers).toEqual(mockReceivers);
        expect(result.current.questionnaire).toEqual(mockQuestionnaire);
        expect(result.current.questionnaireQuestions).toEqual(mockQuestionnaireQuestions);
        expect(result.current.isFetching).toEqual(false);
    });
});
