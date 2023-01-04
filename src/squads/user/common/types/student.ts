import { ArrayElement } from "src/common/constants/types";
import { KeyStudentEnrollmentStatus, StudentKeys } from "src/squads/user/common/constants/student";
import {
    User_ClassListWithFilterQuery,
    User_CoursesManyWithLocationQuery,
    User_LocationListByIdsQuery,
    User_CourseLocationsByCourseIdQuery,
    User_CoursesManyReferenceWithLocationV2Query,
} from "src/squads/user/service/bob/bob-types";
import { StudentPackageByIdQuery } from "src/squads/user/service/fatima/fatima-types";

export type StatusStudentTypes = keyof typeof KeyStudentEnrollmentStatus;

export interface CourseWithLocationChoice
    extends User_CourseLocationsByCourseIdQuery,
        Omit<
            ArrayElement<User_CoursesManyReferenceWithLocationV2Query["courses"]>,
            "school_id" | "grade"
        > {
    value?: ArrayElement<User_CoursesManyWithLocationQuery["courses"]>["name"];
}

export interface StudentPackageClientWithLocation {
    course: CourseWithLocationChoice;
    studentPackageId?: ArrayElement<
        StudentPackageByIdQuery["student_packages"]
    >["student_package_id"];
    start?: ArrayElement<StudentPackageByIdQuery["student_packages"]>["start_at"];
    end?: ArrayElement<StudentPackageByIdQuery["student_packages"]>["end_at"];
    isDraft?: boolean;
    id?: string; // id of array fields Hook form
    location?: ArrayElement<User_LocationListByIdsQuery["locations"]>;
    class?: ArrayElement<User_ClassListWithFilterQuery["class"]>;
}

export interface StudentPackageCourseForm {
    [StudentKeys.STUDENT_PACKAGES]: StudentPackageClientWithLocation[];
}

/*
0: Required fields cannot be blank!
1: Please add the student course location back to student to activate student course.
2: Please add the student course location back to course to activate student course.
1,2: both 1 and 2
*/
export type ValidationStudentCourseErrorTypes = "0" | "1" | "2" | "1,2";
