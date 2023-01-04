import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";

import { CourseItem } from "manabuf/payment/v1/order_pb";

export const mapPackageCourseWithWeight = ({
    course,
    packageCourse,
}: ProductFormPackageCourseType): CourseItem.AsObject => {
    return {
        courseId: course.course_id,
        courseName: course.name!,
        weight: packageCourse.course_weight,
    };
};

export const mapPackageCourseWithSlot = ({
    course,
    slot,
}: ProductFormPackageCourseType): CourseItem.AsObject => {
    return {
        courseId: course.course_id,
        courseName: course.name!,
        slot,
    };
};
