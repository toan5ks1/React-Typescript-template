import { CourseItem } from "manabuf/payment/v1/order_pb";

export const createPackageSlotBasedCourseItemsList = (): CourseItem.AsObject[] => [
    {
        courseId: "Course_1",
        courseName: "English",
        slot: {
            value: 3,
        },
    },
    {
        courseId: "Course2",
        courseName: "Math",
        slot: {
            value: 2,
        },
    },
];

export const createPackageOneTimeCourseItemsList = (): CourseItem.AsObject[] => [
    {
        courseId: "Course_1",
        courseName: "English",
        slot: undefined,
    },
    {
        courseId: "Course2",
        courseName: "Math",
        slot: undefined,
    },
];

export const createPackageScheduleBasedCourseItemsList = (): CourseItem.AsObject[] => [
    {
        courseId: "Course_1",
        courseName: "English",
        weight: {
            value: 1,
        },
    },
    {
        courseId: "Course2",
        courseName: "Math",
        weight: {
            value: 2,
        },
    },
];
