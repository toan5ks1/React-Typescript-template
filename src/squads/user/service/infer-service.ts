import standaloneQueryClient from "src/squads/user/internals/standalone-query-client";
import brightcoveServiceYasuo from "src/squads/user/service/yasuo/brightcove-yasuo-service";

import classService from "./define-service/class-service";
import courseAccessPathService from "./define-service/course-access-paths-service";
import courseService from "./define-service/course-service";
import courseStudentServiceEureka from "./define-service/course-student-service-eureka";
import grantedRoleAccessPathService from "./define-service/granted-role-access-path-service";
import grantedRoleService from "./define-service/granted-role-service";
import locationService from "./define-service/location-service";
import organizationsService from "./define-service/organizations-service";
import parentImportService from "./define-service/parent-import-service";
import parentService from "./define-service/parents-service";
import passwordFirebaseService from "./define-service/password-firebase-service";
import prefectureService from "./define-service/prefecture-service";
import roleService from "./define-service/role-service";
import schoolCourseService from "./define-service/school-course-service";
import schoolInfoService from "./define-service/school-info-service";
import schoolLevelService from "./define-service/school-level-service";
import staffService from "./define-service/staff-service";
import studentEntryExitService from "./define-service/student-entry-exit-service";
import studentImportService from "./define-service/student-import-service";
import studentPackageClassService from "./define-service/student-package-class-service";
import studentPackageService from "./define-service/student-package-service";
import studentParentService from "./define-service/student-parents-service";
import studentService from "./define-service/student-service";
import userAccessPathService from "./define-service/user-access-paths-service";
import userAddressService from "./define-service/user-address-service";
import userGroupService from "./define-service/user-group-service";
import userService from "./define-service/user-service";
import {
    composeServices,
    createUseQuery,
    createUseMutation,
    createUseQueryPagination,
} from "./service-creator";

// compose all services into service map
const rootService = composeServices({
    brightcove: brightcoveServiceYasuo,
    studentParent: studentParentService,
    student: studentService,
    parent: parentService,
    users: userService,
    course: courseService,
    userAccessPath: userAccessPathService,
    studentPackage: studentPackageService,
    courseStudents: courseStudentServiceEureka,
    location: locationService,
    studentEntryExit: studentEntryExitService,
    userGroup: userGroupService,
    staff: staffService,
    studentImport: studentImportService,
    grantedRole: grantedRoleService,
    grantedRoleAccessPath: grantedRoleAccessPathService,
    studentPackageClass: studentPackageClassService,
    class: classService,
    role: roleService,
    parentImport: parentImportService,
    courseAccessPath: courseAccessPathService,
    organizations: organizationsService,
    passwordFirebase: passwordFirebaseService,
    schoolCourse: schoolCourseService,
    schoolInfo: schoolInfoService,
    schoolLevel: schoolLevelService,
    userAddress: userAddressService,
    prefecture: prefectureService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferMutation = createUseMutation(rootService);

export const inferStandaloneQuery = standaloneQueryClient.createStandaloneQuery(rootService);
