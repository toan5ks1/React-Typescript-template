import { getQueryFields } from "src/squads/lesson/test-utils/graphql";

import lessonMembersQueriesBob from "src/squads/lesson/service/bob/lesson-members-service/lesson-members-bob.query";

describe("lesson-members-bob.query", () => {
    it("getOneByUserIdAndCourseIdAndLessonId query should return the correct properties", async () => {
        const _callSpy = jest.spyOn(lessonMembersQueriesBob, "_call");
        await lessonMembersQueriesBob.getOneByUserIdAndCourseIdAndLessonId({
            course_id: "Course_Id",
            lesson_id: "Lesson_Id",
            user_id: "User_Id",
        });

        const [payload] = _callSpy.mock.calls[0];

        const { operation } = getQueryFields(payload.query);
        expect(operation?.definitionNode.name?.value).toEqual(
            "LessonMemberByUserIdAndCourseIdAndLessonIdV2"
        );

        const queryString = operation?.values;
        expect(queryString).toMatchObject([
            { lesson_members: ["attendance_remark", "attendance_status"] },
        ]);
    });
});
