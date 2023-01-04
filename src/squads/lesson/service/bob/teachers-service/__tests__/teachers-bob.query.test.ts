import { TeacherManyQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { mockTeachersManyList } from "src/squads/lesson/test-utils/lesson-management";

import teachersQueriesBob from "src/squads/lesson/service/bob/teachers-service/teachers-bob.query";

describe("teachers-bob.query", () => {
    it("should getMany teachers", async () => {
        const variables: TeacherManyQueryVariables = {
            school_id: 1,
            user_id: "user_id",
        };

        const _callSpy = jest.spyOn(teachersQueriesBob, "_call").mockResolvedValue({
            data: {
                find_teacher_by_school_id: mockTeachersManyList,
            },
        });

        const result = await teachersQueriesBob.getMany(variables);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockTeachersManyList);
    });
});
