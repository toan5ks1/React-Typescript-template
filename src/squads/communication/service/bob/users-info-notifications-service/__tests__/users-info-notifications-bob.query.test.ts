import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_UsersInfoNotificationsListQuery,
    Communication_UsersInfoNotificationsListQueryVariables,
    UsersInfoNotificationsListQuery,
    UsersInfoNotificationsListQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import {
    createMockUsersInfoNotificationsListQuery,
    createMockUsersInfoNotificationsListQueryWithQuestionnaireStatus,
    createNoDataUsersInfoNotificationsListQuery,
    createNoDataUsersInfoNotificationsListQueryWithQuestionnaireStatus,
} from "src/squads/communication/test-utils/query-data";

import usersInfoNotificationsQueriesBob from "src/squads/communication/service/bob/users-info-notifications-service/users-info-notifications-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockUsersInfoNotificationsListQuery = createMockUsersInfoNotificationsListQuery();
const noDataUsersInfoNotificationsListQuery = createNoDataUsersInfoNotificationsListQuery();

const mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus =
    createMockUsersInfoNotificationsListQueryWithQuestionnaireStatus();
const noDataUsersInfoNotificationsListQueryWithQuestionnaireStatus =
    createNoDataUsersInfoNotificationsListQueryWithQuestionnaireStatus();

describe("get list users info notifications by usersInfoNotificationsQueriesBob.getList", () => {
    it("get list users info notifications successfully", async () => {
        const variables: UsersInfoNotificationsListQueryVariables = {
            notification_id: "notification_id1",
        };

        const getListUsersInfoNotificationsReturnData: HasuraAndDefaultResponse<UsersInfoNotificationsListQuery> =
            {
                data: {
                    users_info_notifications: mockUsersInfoNotificationsListQuery?.data,
                    users_info_notifications_aggregate: {
                        aggregate: {
                            count: mockUsersInfoNotificationsListQuery!.total,
                        },
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListUsersInfoNotificationsReturnData);

        const result = await usersInfoNotificationsQueriesBob.getList(variables);

        expect(result).toEqual(mockUsersInfoNotificationsListQuery);
    });

    it("should return empty data when get list users info notifications", async () => {
        const variables: UsersInfoNotificationsListQueryVariables = {
            notification_id: "notification_id1",
        };

        const getListUsersInfoNotificationsReturnData: HasuraAndDefaultResponse<UsersInfoNotificationsListQuery> =
            {
                data: {
                    users_info_notifications: noDataUsersInfoNotificationsListQuery?.data,
                    users_info_notifications_aggregate: {
                        aggregate: {
                            count: noDataUsersInfoNotificationsListQuery!.total,
                        },
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListUsersInfoNotificationsReturnData);

        const result = await usersInfoNotificationsQueriesBob.getList(variables);

        expect(result).toEqual(noDataUsersInfoNotificationsListQuery);
    });
});

describe("get list users info notifications by usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus", () => {
    it("get list users info notifications successfully", async () => {
        const variables: Communication_UsersInfoNotificationsListQueryVariables = {
            notification_id: "notification_id1",
        };

        const getListUsersInfoNotificationsReturnData: HasuraAndDefaultResponse<Communication_UsersInfoNotificationsListQuery> =
            {
                data: {
                    users_info_notifications:
                        mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus?.data,
                    users_info_notifications_aggregate: {
                        aggregate: {
                            count: mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus!
                                .total,
                        },
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListUsersInfoNotificationsReturnData);

        const result = await usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus(
            variables
        );

        expect(result).toEqual(mockUsersInfoNotificationsGetListQueryWithQuestionnaireStatus);
    });

    it("should return empty data when get list users info notifications", async () => {
        const variables: Communication_UsersInfoNotificationsListQueryVariables = {
            notification_id: "notification_id1",
        };

        const getListUsersInfoNotificationsReturnData: HasuraAndDefaultResponse<Communication_UsersInfoNotificationsListQuery> =
            {
                data: {
                    users_info_notifications:
                        noDataUsersInfoNotificationsListQueryWithQuestionnaireStatus?.data,
                    users_info_notifications_aggregate: {
                        aggregate: {
                            count: noDataUsersInfoNotificationsListQueryWithQuestionnaireStatus!
                                .total,
                        },
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListUsersInfoNotificationsReturnData);

        const result = await usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus(
            variables
        );

        expect(result).toEqual(noDataUsersInfoNotificationsListQueryWithQuestionnaireStatus);
    });
});
