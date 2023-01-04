import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import { MediasManyQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { mockMedias } from "src/squads/lesson/test-utils/lesson-management";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import mediaQueriesBob from "src/squads/lesson/service/bob/media-service/media-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("media-bob.query", () => {
    it("should query getMany success", async () => {
        const variables: MediasManyQueryVariables = {
            media_id: ["Media ID 01", "Media ID 02"],
        };

        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                media: mockMedias,
            },
        });

        const _callSpy = jest.spyOn(mediaQueriesBob, "_call");
        const result = await mediaQueriesBob.getMany(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockMedias);
    });
});
