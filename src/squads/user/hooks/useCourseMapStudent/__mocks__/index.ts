import {
    IStudentPackage,
    ICourses,
    ILocations,
    UseCourseMapStudentReturn,
} from "../useCourseMapStudent";

export const studentPackages: IStudentPackage[] = [
    {
        properties: { can_do_quiz: ["01"] },
        student_package_id: "01",
        end_at: "2021-05-27T12:59:08+00:00",
        start_at: "2021-05-26T12:00:08+00:00",
        student_id: "01",
    },
    {
        properties: { can_do_quiz: ["02"] },
        student_package_id: "02",
        end_at: "2021-05-27T12:59:08+00:00",
        start_at: "2021-05-26T12:00:08+00:00",
        student_id: "01",
    },
    {
        properties: { can_do_quiz: ["03"] },
        student_package_id: "03",
        end_at: "2021-05-27T12:59:08+00:00",
        start_at: "2021-05-26T12:00:08+00:00",
        student_id: "02",
    },
];

export const course: ICourses[] = [
    {
        course_id: "01",
        name: "Course 01",
        grade: 10,
        school_id: 123,
        course_access_paths: [],
    },
    {
        course_id: "02",
        name: "Course 02",
        grade: 10,
        school_id: 123,
        course_access_paths: [],
    },
    {
        course_id: "03",
        name: "Course 03",
        grade: 10,
        school_id: 123,
        course_access_paths: [],
    },
];

export const coursesData: UseCourseMapStudentReturn["coursesData"] = [
    {
        studentId: "01",
        courses: [
            {
                course_id: "01",
                name: "Course 01",
                course_access_paths: [],
                end_date: "2021-05-27T12:59:08+00:00",
                start_date: "2021-05-26T12:00:08+00:00",
                student_package_id: "01",
                locations: [],
            },
            {
                course_id: "02",
                name: "Course 02",
                course_access_paths: [],
                end_date: "2021-05-27T12:59:08+00:00",
                start_date: "2021-05-26T12:00:08+00:00",
                student_package_id: "02",
                locations: [],
            },
        ],
    },
    {
        studentId: "02",
        courses: [
            {
                course_id: "03",
                course_access_paths: [],
                name: "Course 03",
                end_date: "2021-05-27T12:59:08+00:00",
                start_date: "2021-05-26T12:00:08+00:00",
                student_package_id: "03",
                locations: [],
            },
        ],
    },
];

export const locations: ILocations[] = [
    {
        location_id: "location_1",
        name: "Location 1",
    },
    {
        location_id: "location_2",
        name: "Location 2",
    },
];

export default (): UseCourseMapStudentReturn => ({
    coursesData,
    loaded: true,
    refetch: () => {},
});
