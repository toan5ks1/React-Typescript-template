import { StudentSchoolHistoryFormProps } from "src/squads/user/common/types";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types/student";
import { GrantedPermission } from "src/squads/user/common/types/user-group";

export const initializeUserGroupGrantedPermission = (): GrantedPermission => ({
    granted_role_id: "",
    role: {
        role_id: "",
        role_name: "",
    },
    locations: [],
});

export const initializeCourse = (id: string = ""): StudentPackageClientWithLocation => ({
    course: {
        course_id: id,
        name: "",
        course_access_paths: [],
    },
    studentPackageId: "",
    start: null,
    end: null,
    isDraft: true,
    location: undefined,
});

export const initializeSchoolHistory = (): StudentSchoolHistoryFormProps => ({
    schoolLevelId: "",
    schoolId: "",
    schoolCourseId: "",
    startDate: null,
    endDate: null,
});
