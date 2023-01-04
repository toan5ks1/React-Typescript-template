import { Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables } from "src/squads/syllabus/services/bob/bob-types";
import { lessonGroupsService } from "src/squads/syllabus/services/bob/lesson-groups-bob/lesson-groups-service";

import lessonGroupsQueriesBob from "src/squads/syllabus/services/bob/lesson-groups-bob/lesson-groups-bob.query";

jest.mock("src/squads/syllabus/services/bob/lesson-groups-bob/lesson-groups-bob.query");

jest.mock("src/internals/feature-controller");

describe(`test for lesson groups ${lessonGroupsService.query.lessonGroupGetListWithFilter.name}`, () => {
    it("should return undefined when pass lesson groups empty", async () => {
        const invalidParams: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables = {
            lesson_group_ids: [],
        };

        const resp = await lessonGroupsService.query.lessonGroupGetListWithFilter(invalidParams);

        expect(lessonGroupsQueriesBob.getListWithFilter).not.toBeCalled();
        expect(resp).toEqual(undefined);
    });

    it("should call lessonGroupGetListWithFilter correctly", async () => {
        const validParams: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables = {
            lesson_group_ids: ["id"],
        };

        await lessonGroupsService.query.lessonGroupGetListWithFilter(validParams);
        expect(lessonGroupsQueriesBob.getListWithFilter).toBeCalledWith(validParams);
    });
});
