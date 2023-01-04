import { UserRoles } from "src/common/constants/const";
import { Entities, ERPModules } from "src/common/constants/enum";
import permission, { isSchoolAdmin, isTeacher } from "src/squads/payment/internals/permission";
import { PaymentRules } from "src/squads/payment/internals/permission/rules";
import { UserGroupKeys } from "src/squads/payment/typings/remote";
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
describe("app permission", () => {
    it("school admin only have permission to right action config", async () => {
        await permission.update(UserRoles.USER_GROUP_SCHOOL_ADMIN);

        expect(permission.can("orders", "show")).toEqual(true);
        expect(permission.can("masters", "show")).toEqual(true);
    });
});

describe("Show permission for different roles", () => {
    const appModuleKeys: TypeEntity[] = [
        ERPModules.STUDENTS,
        Entities.COURSES,
        Entities.BOOKS,
        ERPModules.LESSON_MANAGEMENT,
        ERPModules.ASSIGNED_STUDENT_LIST,
        Entities.STAFF,
        ERPModules.TIMESHEET_MANAGEMENT,
        ERPModules.NOTIFICATIONS,
        ERPModules.NOTIFICATIONSV2,
        ERPModules.SCHEDULE,
        Entities.MASTERS,
        Entities.ORDERS,
        ERPModules.STUDENT_QR_SCANNER,
        Entities.USER_GROUP,
        ERPModules.INVOICE_MANAGEMENT,
    ];

    it("Show permission for HQ Staff", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.ORDERS];
        const hideModuleKeys: TypeEntity[] = appModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update("USER_GROUP_HQ_STAFF");

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(true);
        }
    });

    it("Show permission for Teacher and Teacher Lead", async () => {
        await permission.update(["USER_GROUP_TEACHER", "USER_GROUP_TEACHER_LEAD"]);

        for (const module of appModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(false);
        }
    });

    it("Show permission for Centre Lead", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.ORDERS];
        const hideModuleKeys: TypeEntity[] = appModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update("USER_GROUP_CENTRE_LEAD");

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(true);
        }
    });

    it("Show permission for Centre Staff and Centre Manager", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.ORDERS];
        const hideModuleKeys: TypeEntity[] = appModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update("USER_GROUP_CENTRE_MANAGER");

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(true);
        }
    });

    it("Show union permission for Teacher Lead and Centre Lead", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.ORDERS]; // Teacher Lead can't view orders but Centre lead can
        const hideModuleKeys = appModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );

        await permission.update(["USER_GROUP_TEACHER_LEAD", "USER_GROUP_CENTRE_LEAD"]);

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(true);
        }
    });

    it("Show union permission for Shool Admin and Teacher", async () => {
        const showModuleKeys: TypeEntity[] = [Entities.ORDERS, Entities.MASTERS];
        const hideModuleKeys = appModuleKeys.filter(
            (moduleKey) => !showModuleKeys.includes(moduleKey)
        );
        await permission.update(["USER_GROUP_TEACHER", "USER_GROUP_SCHOOL_ADMIN"]);

        for (const module of hideModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(false);
        }

        for (const module of showModuleKeys) {
            expect(permission.can(module as keyof PaymentRules, "show")).toEqual(true);
        }
    });
});
