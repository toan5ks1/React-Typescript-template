import {
    Communication_UsersInfoNotificationsListQueryVariables,
    UsersInfoNotificationsListQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { usersInfoNotificationsServices } from "src/squads/communication/service/bob/users-info-notifications-service/users-info-notifications-service";
import {
    createMockUsersInfoNotificationsListQuery,
    createMockUsersInfoNotificationsListQueryWithQuestionnaireStatus,
} from "src/squads/communication/test-utils/query-data";

import usersInfoNotificationsQueriesBob from "src/squads/communication/service/bob/users-info-notifications-service/users-info-notifications-bob.query";

jest.mock(
    "src/squads/communication/service/bob/users-info-notifications-service/users-info-notifications-bob.query",
    () => {
        return {
            __esModule: true,
            default: {
                getList: jest.fn(),
                getListWithQuestionnaireStatus: jest.fn(),
            },
        };
    }
);

const mockUsersInfoNotificationsListQuery = createMockUsersInfoNotificationsListQuery();
const mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus =
    createMockUsersInfoNotificationsListQueryWithQuestionnaireStatus();

describe("list users info notifications by usersInfoNotificationsQueriesBob.getList", () => {
    it("should return list users info notifications", async () => {
        const queryVariable: UsersInfoNotificationsListQueryVariables = {
            notification_id: "notification_id1",
        };

        (usersInfoNotificationsQueriesBob.getList as jest.Mock).mockResolvedValue(
            mockUsersInfoNotificationsListQuery
        );

        const response = await usersInfoNotificationsServices.query.communicationGetRecipientList(
            queryVariable
        );

        expect(usersInfoNotificationsQueriesBob.getList).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockUsersInfoNotificationsListQuery);
    });
});

describe("list users info notifications by usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus", () => {
    it("should return list users info notifications", async () => {
        const queryVariable: Communication_UsersInfoNotificationsListQueryVariables = {
            notification_id: "notification_id1",
        };

        (
            usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus as jest.Mock
        ).mockResolvedValue(mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus);

        const response =
            await usersInfoNotificationsServices.query.communicationGetRecipientListWithQuestionnaireStatus(
                queryVariable
            );

        expect(usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus);
    });
});
