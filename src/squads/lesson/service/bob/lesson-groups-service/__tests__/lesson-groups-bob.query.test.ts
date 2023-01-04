import { getQueryFields } from "src/squads/lesson/test-utils/graphql";

import lessonGroupsQueriesBob from "src/squads/lesson/service/bob/lesson-groups-service/lesson-groups-bob.query";

describe("lesson-groups-bob.query", () => {
    it("getOne query should return the correct properties", async () => {
        const _callSpy = jest.spyOn(lessonGroupsQueriesBob, "_call");
        await lessonGroupsQueriesBob.getOne({ lesson_group_id: "Lesson_Group_Id" });

        const [payload] = _callSpy.mock.calls[0];

        const { operation } = getQueryFields(payload.query);
        expect(operation?.definitionNode.name?.value).toEqual("LessonGroupById");

        const queryString = operation?.values;
        expect(queryString).toMatchObject([{ lesson_groups: ["LessonGroupAttrs"] }]);
    });
});
