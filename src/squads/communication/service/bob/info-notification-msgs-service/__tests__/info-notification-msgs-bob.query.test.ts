import { pick1stElement } from "src/common/utils/other";
import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    InfoNotificationMsgsOneQuery,
    InfoNotificationMsgsOneQueryVariables,
    InfoNotificationMsgsTitlesQuery,
    InfoNotificationMsgsTitlesQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import {
    createMockInfoNotificationMsgs,
    createMockInfoNotificationMsgsTitles,
} from "src/squads/communication/test-utils/query-data";

import infoNotificationMsgsQueriesBob from "src/squads/communication/service/bob/info-notification-msgs-service/info-notification-msgs-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockInfoNotificationMsgs = createMockInfoNotificationMsgs();
const mockInfoNotificationMsgsTitles = createMockInfoNotificationMsgsTitles();

describe("get info notification msgs by infoNotificationMsgsQueriesBob.getOne", () => {
    it("get info notification msgs successfully", async () => {
        const infoNotificationMsgs = pick1stElement(mockInfoNotificationMsgs);

        const variables: InfoNotificationMsgsOneQueryVariables = {
            notification_msg_id: infoNotificationMsgs!.notification_msg_id,
        };
        const getOneInfoNotificationMsgsReturnData: HasuraAndDefaultResponse<InfoNotificationMsgsOneQuery> =
            {
                data: {
                    info_notification_msgs: mockInfoNotificationMsgs,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getOneInfoNotificationMsgsReturnData);

        const result = await infoNotificationMsgsQueriesBob.getOne(variables);

        expect(result).toEqual(infoNotificationMsgs);
    });
});

describe("get info notification msgs titles by infoNotificationMsgsQueriesBob.getTitles", () => {
    it("get info notification msgs titles successfully", async () => {
        const infoNotificationMsgsTitles = pick1stElement(mockInfoNotificationMsgsTitles);

        const variables: InfoNotificationMsgsTitlesQueryVariables = {
            notification_msg_id: infoNotificationMsgsTitles!.notification_msg_id,
        };
        const getInfoNotificationMsgsTitlesReturnData: HasuraAndDefaultResponse<InfoNotificationMsgsTitlesQuery> =
            {
                data: {
                    info_notification_msgs: mockInfoNotificationMsgsTitles,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getInfoNotificationMsgsTitlesReturnData);

        const result = await infoNotificationMsgsQueriesBob.getTitles(variables);

        expect(result).toEqual(mockInfoNotificationMsgsTitles);
    });
});
