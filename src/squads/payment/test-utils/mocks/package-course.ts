import {
    Payment_GetManyCourseByCourseIdsQuery,
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetManyPackageCourseFeesByPackageIdQuery,
    Payment_GetManyPackageCourseMaterialsByPackageIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";

const courseList: Payment_GetManyCourseByCourseIdsQuery["courses"] = [
    {
        course_id: "course_id_1",
        name: "Course name 1",
        grade: 1,
    },
    {
        course_id: "course_id_2",
        name: "Course name 2",
        grade: 1,
    },
    {
        course_id: "course_id_3",
        name: "Course name 3",
        grade: 1,
    },
    {
        course_id: "course_id_4",
        name: "Course name 4",
        grade: 1,
    },
];

const packageCourseList: Payment_GetManyPackageCourseByPackageIdQuery["package_course"] = [
    {
        course_id: "course_id_1",
        course_weight: 1,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: true,
        max_slots_per_course: 5,
        package_id: "package_id_1",
    },
    {
        course_id: "course_id_2",
        course_weight: 2,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: false,
        max_slots_per_course: 2,
        package_id: "package_id_2",
    },
    {
        course_id: "course_id_3",
        course_weight: 3,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: false,
        max_slots_per_course: 3,
        package_id: "package_id_3",
    },
    {
        course_id: "course_id_4",
        course_weight: 4,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: true,
        max_slots_per_course: 4,
        package_id: "package_id_4",
    },
];

const packageCourseListOptional: Payment_GetManyPackageCourseByPackageIdQuery["package_course"] = [
    {
        course_id: "course_id_1",
        course_weight: 1,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: false,
        max_slots_per_course: 1,
        package_id: "package_id_1",
    },
    {
        course_id: "course_id_2",
        course_weight: 2,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: false,
        max_slots_per_course: 2,
        package_id: "package_id_2",
    },
    {
        course_id: "course_id_3",
        course_weight: 3,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: false,
        max_slots_per_course: 3,
        package_id: "package_id_3",
    },
    {
        course_id: "course_id_4",
        course_weight: 4,
        created_at: "2021-12-28T02:35:17.738675+00:00",
        mandatory_flag: false,
        max_slots_per_course: 4,
        package_id: "package_id_4",
    },
];

const packageCourseFeeList: Payment_GetManyPackageCourseFeesByPackageIdQuery["package_course_fee"] =
    [
        {
            course_id: "course_id_1",
            available_from: "2021-12-28T02:35:17.738675+00:00",
            available_until: "2023-12-28T02:35:17.738675+00:00",
            package_id: "package_id_1",
            fee_id: "product_id_1",
            created_at: "2021-12-28T02:35:17.738675+00:00",
        },
        {
            course_id: "course_id_2",
            available_from: "2021-12-28T02:35:17.738675+00:00",
            available_until: "2023-12-28T02:35:17.738675+00:00",
            package_id: "package_id_2",
            fee_id: "product_id_2",
            created_at: "2021-12-28T02:35:17.738675+00:00",
        },
        {
            course_id: "course_id_3",
            available_from: "2021-12-28T02:35:17.738675+00:00",
            available_until: "2023-12-28T02:35:17.738675+00:00",
            package_id: "package_id_3",
            fee_id: "product_id_3",
            created_at: "2021-12-28T02:35:17.738675+00:00",
        },
    ];

const packageCourseMaterialList: Payment_GetManyPackageCourseMaterialsByPackageIdQuery["package_course_material"] =
    [
        {
            course_id: "course_id_1",
            available_from: "2021-12-28T02:35:17.738675+00:00",
            available_until: "2023-12-28T02:35:17.738675+00:00",
            package_id: "package_id_1",
            material_id: "product_id_1",
            created_at: "2021-12-28T02:35:17.738675+00:00",
        },
        {
            course_id: "course_id_2",
            available_from: "2021-12-28T02:35:17.738675+00:00",
            available_until: "2023-12-28T02:35:17.738675+00:00",
            package_id: "package_id_2",
            material_id: "product_id_2",
            created_at: "2021-12-28T02:35:17.738675+00:00",
        },
        {
            course_id: "course_id_3",
            available_from: "2021-12-28T02:35:17.738675+00:00",
            available_until: "2023-12-28T02:35:17.738675+00:00",
            package_id: "package_id_3",
            material_id: "product_id_3",
            created_at: "2021-12-28T02:35:17.738675+00:00",
        },
    ];

const productFormPackageCourseList: ProductFormPackageCourseType[] = [
    {
        packageCourse: {
            course_id: "course_id_1",
            course_weight: 10,
            created_at: 1,
            mandatory_flag: false,
            max_slots_per_course: 1,
            package_id: "package_id_1",
        },
        course: {
            course_id: "course_id_1",
            grade: 1,
            name: "Test Course",
        },
        slot: 1,
    },
];

const productFormSlotBasedPackageCourseList: ProductFormPackageCourseType[] = [
    {
        packageCourse: {
            course_id: "course_id_1",
            course_weight: 10,
            created_at: 1,
            mandatory_flag: false,
            max_slots_per_course: 1,
            package_id: "package_id_1",
        },
        course: {
            course_id: "course_id_1",
            grade: 1,
            name: "Test Course",
        },
        slot: 10,
    },
];

const productFormFrequencyBasedPackageCourseList: ProductFormPackageCourseType[] = [
    {
        packageCourse: {
            course_id: "course_id_2",
            course_weight: 10,
            created_at: 1,
            mandatory_flag: false,
            max_slots_per_course: 1,
            package_id: "package_id_1",
        },
        course: {
            course_id: "course_id_2",
            grade: 1,
            name: "Test Course of package frequency",
        },
        slot: 2,
    },
];

export const createMockPackageCourseList =
    (): Payment_GetManyPackageCourseByPackageIdQuery["package_course"] => packageCourseList;

export const createMockPackageCourseListOptional =
    (): Payment_GetManyPackageCourseByPackageIdQuery["package_course"] => packageCourseListOptional;

export const createMockCourseList = (): Payment_GetManyCourseByCourseIdsQuery["courses"] =>
    courseList;

export const createMockPackageCourseFeeList =
    (): Payment_GetManyPackageCourseFeesByPackageIdQuery["package_course_fee"] =>
        packageCourseFeeList;

export const createMockPackageCourseMaterialList =
    (): Payment_GetManyPackageCourseMaterialsByPackageIdQuery["package_course_material"] =>
        packageCourseMaterialList;

export const createPackageCourses = (): ProductFormPackageCourseType[] =>
    productFormPackageCourseList;

export const createSlotBasedPackageCourses = (): ProductFormPackageCourseType[] =>
    productFormSlotBasedPackageCourseList;

export const createFrequencyBasedPackageCourses = (): ProductFormPackageCourseType[] =>
    productFormFrequencyBasedPackageCourseList;

export const createMockPackageCourses = (): ProductFormPackageCourseType[] | undefined => {
    return [
        {
            packageCourse: createMockPackageCourseList()[0],
            course: createMockCourseList()[0],
        },
        {
            packageCourse: createMockPackageCourseList()[1],
            course: createMockCourseList()[1],
        },
        {
            packageCourse: createMockPackageCourseList()[2],
            course: createMockCourseList()[2],
        },
        {
            packageCourse: createMockPackageCourseList()[3],
            course: createMockCourseList()[3],
        },
    ];
};

export const createMockPackageCourseOptional = (): ProductFormPackageCourseType[] | undefined => {
    return [
        {
            packageCourse: createMockPackageCourseListOptional()[0],
            course: createMockCourseList()[0],
        },
        {
            packageCourse: createMockPackageCourseListOptional()[1],
            course: createMockCourseList()[1],
        },
        {
            packageCourse: createMockPackageCourseListOptional()[2],
            course: createMockCourseList()[2],
        },
        {
            packageCourse: createMockPackageCourseListOptional()[3],
            course: createMockCourseList()[3],
        },
    ];
};
