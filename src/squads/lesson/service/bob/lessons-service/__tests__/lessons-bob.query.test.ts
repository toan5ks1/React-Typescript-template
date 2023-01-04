import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import {
    Lesson_LessonByLessonIdForLessonManagementV3Query,
    Lesson_LessonByLessonIdForLessonManagementV3QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import { lessonData } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import lessonsQueriesBob from "src/squads/lesson/service/bob/lessons-service/lessons-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});
const user = getFakeLocalUser();
const mockLessonData: Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"] = [lessonData];

describe("lessons-bob.query", () => {
    it("getOneForLessonManagement method", async () => {
        const variables: Lesson_LessonByLessonIdForLessonManagementV3QueryVariables = {
            lesson_id: "Lesson ID 1",
        };
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                lessons: mockLessonData,
            },
        });

        const _callSpy = jest.spyOn(lessonsQueriesBob, "_call");
        const result = await lessonsQueriesBob.getOneForLessonManagement(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLessonData[0]);
    });
});
