import { UserRoles } from "src/common/constants/const";
import { Entities } from "src/common/constants/enum";
import permission, { isSchoolAdmin, isTeacher } from "src/squads/syllabus/internals/permission";
import { SyllabusRules } from "src/squads/syllabus/internals/permission/rules";
import { UserGroupKeys } from "src/squads/syllabus/typings/remote";
import { TypeEntity } from "src/typings/react-admin";

//only role on roleMatches will expect return true, other role false
function enumMatch(roleMatches: UserGroupKeys[], fn: (x: UserGroupKeys[]) => boolean) {
    Object.values(UserRoles).forEach((value) => {
        const expectTrueOrFalse = roleMatches.includes(value);

        expect(fn([value])).toEqual(expectTrueOrFalse);
    });
}

describe("isSchoolAdmin", () => {
    it("should return correct result", () => {
        enumMatch([UserRoles.USER_GROUP_SCHOOL_ADMIN], isSchoolAdmin);

        // @ts-expect-error add an typescript demo here to make sure it do correctly even when our dev add ts-ignore
        expect(isSchoolAdmin("ko phai school admin :)")).toEqual(false);
    });
});

describe("isTeacherAdmin", () => {
    it("should return correct result", () => {
        enumMatch([UserRoles.USER_GROUP_TEACHER], isTeacher);

        // @ts-expect-error add an typescript demo here to make sure it do correctly even when our dev add ts-ignore
        expect(isTeacher("ko phai teacher admin :)")).toEqual(false);
    });
});

describe("Show permission for different roles", () => {
    const adminModuleKeys: TypeEntity[] = [Entities.COURSES, Entities.BOOKS];

    it("Show permission for School Admin", async () => {
        await permission.update("USER_GROUP_SCHOOL_ADMIN");
        for (const module of adminModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });

    it("Show permission for HQ Staff", async () => {
        await permission.update("USER_GROUP_HQ_STAFF");
        for (const module of adminModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });

    it("Show permission for Teacher and Teacher Lead", async () => {
        const showModuleKeys: TypeEntity[] = [];
        const hideModuleKeys: TypeEntity[] = adminModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );
        await permission.update(["USER_GROUP_TEACHER", "USER_GROUP_TEACHER_LEAD"]);

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });

    it("Show permission for Centre Lead", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.BOOKS, Entities.COURSES];
        const hideModuleKeys: TypeEntity[] = adminModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update("USER_GROUP_CENTRE_LEAD");

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });

    it("Show permission for Centre Staff and Centre Manager", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.COURSES];
        const hideModuleKeys: TypeEntity[] = adminModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update("USER_GROUP_CENTRE_MANAGER");

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });

    it("Show union permission for Teacher Lead and Centre Lead", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.COURSES, Entities.BOOKS]; // Teacher Lead can't view Courses but Centre lead can
        const hideModuleKeys = adminModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update(["USER_GROUP_TEACHER_LEAD", "USER_GROUP_CENTRE_LEAD"]);

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });

    it("Show union permission for Shool Admin and Teacher", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.COURSES, Entities.BOOKS];
        const hideModuleKeys = adminModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );
        await permission.update(["USER_GROUP_TEACHER", "USER_GROUP_SCHOOL_ADMIN"]);

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof SyllabusRules, "show")).toEqual(true);
        }
    });
});
