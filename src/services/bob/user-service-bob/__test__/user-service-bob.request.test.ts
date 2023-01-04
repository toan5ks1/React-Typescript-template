import { formInvalidErr } from "src/internals/errors";
import {
    createMockTeacher,
    createMockTeacherUsersData,
} from "src/squads/user/test-utils/mocks/staff";

import {
    validateUpdateUserProfile,
    newUpdateUserProfileRequest,
} from "../user-service-bob.request";

describe("validateUpdateUserProfile", () => {
    it("should throw error on missing data", () => {
        const teacher = createMockTeacher();
        const teacherWithNullUsersData = {
            ...teacher,
            users: null,
        };

        expect(() => validateUpdateUserProfile(teacherWithNullUsersData)).toThrowError(
            formInvalidErr
        );

        const teacherWithEmptyName = {
            ...teacher,
            users: createMockTeacherUsersData({ name: "" }),
        };

        expect(() => validateUpdateUserProfile(teacherWithEmptyName)).toThrowError(formInvalidErr);

        const teacherWithEmptyTeacherId = {
            ...teacher,
            teacher_id: "",
        };

        expect(() => validateUpdateUserProfile(teacherWithEmptyTeacherId)).toThrowError(
            formInvalidErr
        );

        //success case
        expect(() => validateUpdateUserProfile(teacher)).not.toThrow(formInvalidErr);
    });
});

describe("newUpdateUserProfileRequest", () => {
    it("should return correct Request", () => {
        const previousData = createMockTeacher();
        const data = {
            ...previousData,
            users: createMockTeacherUsersData({ name: "Teacher Name Editted" }),
        };
        const result = newUpdateUserProfileRequest(data).toObject();
        expect(result?.profile?.name).toEqual("Teacher Name Editted");
    });
});
