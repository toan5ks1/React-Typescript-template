import graphqlClient from "src/squads/syllabus/internals/hasura-client";
import { Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables } from "src/squads/syllabus/services/bob/bob-types";

import lessonGroupsQueriesBob from "src/squads/syllabus/services/bob/lesson-groups-bob/lesson-groups-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

jest.mock("src/internals/feature-controller");

describe("lesson-groups-bob.query", () => {
    it("getListWithFilter method", async () => {
        const variables: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables = {
            lesson_group_ids: ["Lesson_Group_Id"],
        };

        const mockLocation = [
            {
                media_ids: "media_ids",
                lesson_group_id: "lesson group id",
            },
        ];

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                lesson_groups: mockLocation,
            },
        });

        const _callSpy = jest.spyOn(lessonGroupsQueriesBob, "_call");
        const result = await lessonGroupsQueriesBob.getListWithFilter(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLocation);
    });
});
