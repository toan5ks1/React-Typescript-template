import { ArrayElement } from "src/common/constants/types";
import {
    LessonMemberByUserIdAndCourseIdAndLessonIdV2Query,
    LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { lessonMembersService } from "src/squads/lesson/service/bob/lesson-members-service/lesson-members-service";

import lessonMembersQueriesBob from "src/squads/lesson/service/bob/lesson-members-service/lesson-members-bob.query";

jest.mock("src/squads/lesson/service/bob/lesson-members-service/lesson-members-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOneByUserIdAndCourseIdAndLessonId: jest.fn(),
        },
    };
});

describe("lesson-members-service", () => {
    const lessonMemberOneQueryReturn: ArrayElement<
        LessonMemberByUserIdAndCourseIdAndLessonIdV2Query["lesson_members"]
    > = {
        attendance_remark: "Attendance_Remark",
        attendance_status: "STUDENT_ATTEND_STATUS_ATTEND",
    };

    beforeEach(() => {
        (
            lessonMembersQueriesBob.getOneByUserIdAndCourseIdAndLessonId as jest.Mock
        ).mockResolvedValue(lessonMemberOneQueryReturn);
    });

    it("should call getOneByUserIdAndCourseIdAndLessonId with correct parameters", async () => {
        const queryVariable: LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables = {
            course_id: "Course_Id",
            lesson_id: "Lesson_Id",
            user_id: "User_Id",
        };

        const response =
            await lessonMembersService.query.lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId(
                queryVariable
            );

        expect(lessonMembersQueriesBob.getOneByUserIdAndCourseIdAndLessonId).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(lessonMemberOneQueryReturn);
    });

    it("should not call getOneByUserIdAndCourseIdAndLessonId with invalid parameters", async () => {
        const invalidQueryVariable: LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables = {
            course_id: "",
            lesson_id: "",
            user_id: "",
        };

        await expect(async () => {
            await lessonMembersService.query.lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId(
                invalidQueryVariable
            );
        }).rejects.toMatchObject({
            name: "InvalidParamError",
            serviceName: "bobGraphQL",
            action: "lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId",
            errors: [{ field: "course_id" }, { field: "lesson_id" }, { field: "user_id" }],
        });

        expect(lessonMembersQueriesBob.getOneByUserIdAndCourseIdAndLessonId).not.toBeCalled();
    });
});
