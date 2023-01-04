import graphqlClient from "src/squads/syllabus/internals/hasura-client";
import { LessonsByCourseIdQueryVariables } from "src/squads/syllabus/services/bob/bob-types";

import liveLessonsQueriesBob from "src/squads/syllabus/services/bob/live-lessons-bob/live-lessons-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

jest.mock("src/internals/feature-controller");

describe("live lessons bob query", () => {
    it("getMany method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                lessons: [],
            },
        });

        const variables: LessonsByCourseIdQueryVariables = { course_id: "course id" };

        const _callSpy = jest.spyOn(liveLessonsQueriesBob, "_call");
        const result = await liveLessonsQueriesBob.getMany(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });
});
