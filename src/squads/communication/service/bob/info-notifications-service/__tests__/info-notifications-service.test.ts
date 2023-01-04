import { pick1stElement } from "src/common/utils/other";
import {
    Communication_GetInfoNotificationByNotificationIdQueryVariables,
    Communication_GetInfoNotificationByNotificationIdV2QueryVariables,
    Communication_GetListInfoNotificationsQueryVariables,
    InfoNotificationCountsByStatusV2QueryVariables,
    InfoNotificationsCountReadQueryVariables,
    InfoNotificationsGetStatusByIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationsService } from "src/squads/communication/service/bob/info-notifications-service/info-notifications-service";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import {
    createMockNotificationInfo,
    createMockNotificationInfoWithQuestionnaire,
} from "src/squads/communication/test-utils/notification";
import {
    createMockInfoNotificationCountsByStatusV2Query,
    createMockInfoNotificationList,
    createMockInfoNotificationsCountReadQuery,
    createMockInfoNotificationsGetStatusByIdQuery,
    createMockListInfoNotifications,
} from "src/squads/communication/test-utils/query-data";

import infoNotificationsQueriesBob from "src/squads/communication/service/bob/info-notifications-service/info-notifications-bob.query";

jest.mock(
    "src/squads/communication/service/bob/info-notifications-service/info-notifications-bob.query",
    () => {
        return {
            __esModule: true,
            default: {
                getInfoNotificationByNotificationId: jest.fn(),
                getInfoNotificationWithQuestionnaireByNotificationId: jest.fn(),
                getStatusById: jest.fn(),
                getList: jest.fn(),
                countReadOfNotifications: jest.fn(),
                countByStatusV2: jest.fn(),
            },
        };
    }
);

const mockNotificationInfo = createMockNotificationInfo();
const mockNotificationInfoWithQuestionnaire = createMockNotificationInfoWithQuestionnaire();
const mockInfoNotificationsGetStatusByIdQuery = createMockInfoNotificationsGetStatusByIdQuery();
const mockListInfoNotifications = createMockListInfoNotifications();
const mockInfoNotificationsCountReadQuery = createMockInfoNotificationsCountReadQuery();
const mockInfoNotificationCountsByStatusV2Query = createMockInfoNotificationCountsByStatusV2Query();
const mockInfoNotificationList = createMockInfoNotificationList();

describe("return one info notification by communicationGetInfoNotificationByNotificationId", () => {
    it("should throw invalidParamError with notification_id is empty", async () => {
        const queryVariable: Communication_GetInfoNotificationByNotificationIdQueryVariables = {
            notification_id: "",
        };

        await expect(async () => {
            await infoNotificationsService.query.communicationGetInfoNotificationByNotificationId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetInfoNotificationByNotificationId",
                errors: [
                    {
                        field: "notification_id",
                        fieldValueIfNotSensitive: queryVariable.notification_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(infoNotificationsQueriesBob.getInfoNotificationByNotificationId).not.toBeCalled();
    });

    it("should return one info notification", async () => {
        const queryVariable: Communication_GetInfoNotificationByNotificationIdQueryVariables = {
            notification_id: mockNotificationInfo.notification_id,
        };

        (
            infoNotificationsQueriesBob.getInfoNotificationByNotificationId as jest.Mock
        ).mockResolvedValue([mockNotificationInfo]);

        const response =
            await infoNotificationsService.query.communicationGetInfoNotificationByNotificationId(
                queryVariable
            );

        expect(infoNotificationsQueriesBob.getInfoNotificationByNotificationId).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual([mockNotificationInfo]);
    });
});

describe("return one info notification by communicationGetInfoNotificationByNotificationIdV2", () => {
    it("should throw invalidParamError with notification_id is empty", async () => {
        const queryVariable: Communication_GetInfoNotificationByNotificationIdV2QueryVariables = {
            notification_id: "",
        };

        await expect(async () => {
            await infoNotificationsService.query.communicationGetInfoNotificationByNotificationIdV2(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetInfoNotificationByNotificationIdV2",
                errors: [
                    {
                        field: "notification_id",
                        fieldValueIfNotSensitive: queryVariable.notification_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(
            infoNotificationsQueriesBob.getInfoNotificationWithQuestionnaireByNotificationId
        ).not.toBeCalled();
    });

    it("should return one info notification", async () => {
        const queryVariable: Communication_GetInfoNotificationByNotificationIdV2QueryVariables = {
            notification_id: mockNotificationInfoWithQuestionnaire.notification_id,
        };

        (
            infoNotificationsQueriesBob.getInfoNotificationWithQuestionnaireByNotificationId as jest.Mock
        ).mockResolvedValue([mockNotificationInfoWithQuestionnaire]);

        const response =
            await infoNotificationsService.query.communicationGetInfoNotificationByNotificationIdV2(
                queryVariable
            );

        expect(
            infoNotificationsQueriesBob.getInfoNotificationWithQuestionnaireByNotificationId
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual([mockNotificationInfoWithQuestionnaire]);
    });
});

describe("return status info notification by id, with communicationGetStatusByNotificationId", () => {
    it("should throw invalidParamError with notification_id is empty", async () => {
        const queryVariable: InfoNotificationsGetStatusByIdQueryVariables = {
            notification_id: "",
        };

        await expect(async () => {
            await infoNotificationsService.query.communicationGetStatusByNotificationId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetStatusByNotificationId",
                errors: [
                    {
                        field: "notification_id",
                        fieldValueIfNotSensitive: queryVariable.notification_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(infoNotificationsQueriesBob.getStatusById).not.toBeCalled();
    });

    it("should return status info notification by id", async () => {
        const queryVariable: InfoNotificationsGetStatusByIdQueryVariables = {
            notification_id: "notification_id1",
        };

        (infoNotificationsQueriesBob.getStatusById as jest.Mock).mockResolvedValue(
            mockInfoNotificationsGetStatusByIdQuery
        );

        const response =
            await infoNotificationsService.query.communicationGetStatusByNotificationId(
                queryVariable
            );

        expect(infoNotificationsQueriesBob.getStatusById).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockInfoNotificationsGetStatusByIdQuery);
    });
});

describe("return list info notifications by communicationGetListOfInfoNotifications", () => {
    it("should return list info notifications", async () => {
        const queryVariable: Communication_GetListInfoNotificationsQueryVariables =
            mockInfoNotificationList;

        (infoNotificationsQueriesBob.getList as jest.Mock).mockResolvedValue(
            mockListInfoNotifications
        );

        const response =
            await infoNotificationsService.query.communicationGetListOfInfoNotifications(
                queryVariable
            );

        expect(infoNotificationsQueriesBob.getList).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockListInfoNotifications);
    });
});

describe(" return count read of notifications by communicationCountReadRecipientsByNotificationId", () => {
    it("should return count read of notifications when notification_id is string", async () => {
        const infoNotificationsCountReadQuery = pick1stElement(mockInfoNotificationsCountReadQuery);

        const queryVariable: InfoNotificationsCountReadQueryVariables = {
            notification_id: infoNotificationsCountReadQuery!.notification_id,
        };

        (infoNotificationsQueriesBob.countReadOfNotifications as jest.Mock).mockResolvedValue(
            mockInfoNotificationsCountReadQuery
        );

        const response =
            await infoNotificationsService.query.communicationCountReadRecipientsByNotificationId(
                queryVariable
            );

        expect(infoNotificationsQueriesBob.countReadOfNotifications).not.toBeCalledWith();
        expect(response).toEqual([]);
    });

    it("should return count read of notifications when notification_id is string[]", async () => {
        const queryVariable: InfoNotificationsCountReadQueryVariables = {
            notification_id: ["notification_id1"],
        };

        (infoNotificationsQueriesBob.countReadOfNotifications as jest.Mock).mockResolvedValue(
            mockInfoNotificationsCountReadQuery
        );

        const response =
            await infoNotificationsService.query.communicationCountReadRecipientsByNotificationId(
                queryVariable
            );

        expect(infoNotificationsQueriesBob.countReadOfNotifications).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockInfoNotificationsCountReadQuery);
    });
});

describe("return count info notifications by status, with communicationCountNotificationStatus", () => {
    it("should return count info notifications by status", async () => {
        const queryVariable: InfoNotificationCountsByStatusV2QueryVariables = {};

        (infoNotificationsQueriesBob.countByStatusV2 as jest.Mock).mockResolvedValue(
            mockInfoNotificationCountsByStatusV2Query
        );

        const response =
            await infoNotificationsService.query.communicationCountNotificationStatus();

        expect(infoNotificationsQueriesBob.countByStatusV2).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockInfoNotificationCountsByStatusV2Query);
    });
});
