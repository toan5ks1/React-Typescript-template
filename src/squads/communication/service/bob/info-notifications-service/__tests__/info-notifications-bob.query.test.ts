import { pick1stElement } from "src/common/utils/other";
import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetInfoNotificationByNotificationIdQuery,
    Communication_GetInfoNotificationByNotificationIdQueryVariables,
    Communication_GetInfoNotificationByNotificationIdV2QueryVariables,
    Communication_GetListInfoNotificationsQueryVariables,
    InfoNotificationCountsByStatusV2Query,
    InfoNotificationCountsByStatusV2QueryVariables,
    InfoNotificationsCountReadQuery,
    InfoNotificationsCountReadQueryVariables,
    InfoNotificationsGetStatusByIdQuery,
    InfoNotificationsGetStatusByIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
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

import infoNotificationsQueriesBob, {
    CustomCommunication_GetInfoNotificationByNotificationIdQuery,
} from "src/squads/communication/service/bob/info-notifications-service/info-notifications-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockNotificationInfo = createMockNotificationInfo();
const mockNotificationInfoWithQuestionnaire = createMockNotificationInfoWithQuestionnaire();
const mockInfoNotificationsCountReadQuery = createMockInfoNotificationsCountReadQuery();
const mockInfoNotificationsGetStatusByIdQuery = createMockInfoNotificationsGetStatusByIdQuery();
const mockListInfoNotificationsId = createMockListInfoNotifications();
const mockInfoNotificationCountsByStatusV2Query = createMockInfoNotificationCountsByStatusV2Query();
const mockInfoNotificationList = createMockInfoNotificationList();

describe("getInfoNotificationByNotificationId get info notification by notification id", () => {
    it("should return info notification successfully", async () => {
        const variables: Communication_GetInfoNotificationByNotificationIdQueryVariables = {
            notification_id: mockNotificationInfo.notification_id,
        };
        const getOneInfoNotificationReturnData: HasuraAndDefaultResponse<CustomCommunication_GetInfoNotificationByNotificationIdQuery> =
            {
                data: {
                    info_notifications: [mockNotificationInfo],
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getOneInfoNotificationReturnData);

        const result = await infoNotificationsQueriesBob.getInfoNotificationByNotificationId(
            variables
        );

        expect(result).toEqual(mockNotificationInfo);
    });
});

describe("getInfoNotificationWithQuestionnaireByNotificationId get info notification with questionnaire by notification id", () => {
    it("should return info notification with questionnaire successfully", async () => {
        const variables: Communication_GetInfoNotificationByNotificationIdV2QueryVariables = {
            notification_id: mockNotificationInfoWithQuestionnaire.notification_id,
        };

        const getInfoNotificationWithQuestionnaireByNotificationIdReturnData: HasuraAndDefaultResponse<CustomCommunication_GetInfoNotificationByNotificationIdQuery> =
            {
                data: {
                    info_notifications: [mockNotificationInfoWithQuestionnaire],
                },
            };

        (doQuery as jest.Mock).mockReturnValue(
            getInfoNotificationWithQuestionnaireByNotificationIdReturnData
        );

        const result =
            await infoNotificationsQueriesBob.getInfoNotificationWithQuestionnaireByNotificationId(
                variables
            );

        expect(result).toEqual(mockNotificationInfoWithQuestionnaire);
    });
});

describe("get status info notification by notification Id, with infoNotificationQueriesBob.getStatusById", () => {
    it("get status info notification by id successfully", async () => {
        const variables: InfoNotificationsGetStatusByIdQueryVariables = {
            notification_id: "notification_id1",
        };

        const getStatusInfoNotificationsReturnData: HasuraAndDefaultResponse<InfoNotificationsGetStatusByIdQuery> =
            {
                data: {
                    info_notifications: mockInfoNotificationsGetStatusByIdQuery,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getStatusInfoNotificationsReturnData);

        const result = await infoNotificationsQueriesBob.getStatusById(variables);

        expect(result).toEqual(mockInfoNotificationsGetStatusByIdQuery[0]);
    });
});

describe("get list info notifications by infoNotificationQueriesBob.getList", () => {
    it("get list info notifications successfully", async () => {
        const variables: Communication_GetListInfoNotificationsQueryVariables =
            mockInfoNotificationList;

        const getListInfoNotificationsReturnData: HasuraAndDefaultResponse<Communication_GetInfoNotificationByNotificationIdQuery> =
            {
                data: {
                    info_notifications: mockListInfoNotificationsId?.data,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListInfoNotificationsReturnData);

        const result = await infoNotificationsQueriesBob.getList(variables);

        expect(result).toEqual(mockListInfoNotificationsId);
    });
});

describe("count read of notifications by infoNotificationQueriesBob.countReadOfNotifications", () => {
    it("should return count read of notifications", async () => {
        const infoNotificationsCountReadQuery = pick1stElement(mockInfoNotificationsCountReadQuery);

        const variables: InfoNotificationsCountReadQueryVariables = {
            notification_id: infoNotificationsCountReadQuery!.notification_id,
        };

        const countReadOfNotificationsReturnData: HasuraAndDefaultResponse<InfoNotificationsCountReadQuery> =
            {
                data: {
                    info_notifications: mockInfoNotificationsCountReadQuery,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(countReadOfNotificationsReturnData);

        const result = await infoNotificationsQueriesBob.countReadOfNotifications(variables);

        expect(result).toEqual(mockInfoNotificationsCountReadQuery);
    });
});

describe("count info notifications by status with infoNotificationQueriesBob.countByStatusV2", () => {
    it("should return count info notifications by status", async () => {
        const variables: InfoNotificationCountsByStatusV2QueryVariables = {};

        const countByStatusV2ReturnData: HasuraAndDefaultResponse<InfoNotificationCountsByStatusV2Query> =
            {
                data: mockInfoNotificationCountsByStatusV2Query,
            };

        (doQuery as jest.Mock).mockReturnValue(countByStatusV2ReturnData);

        const result = await infoNotificationsQueriesBob.countByStatusV2(variables);

        expect(result).toEqual(mockInfoNotificationCountsByStatusV2Query);
    });
});
