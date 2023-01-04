import { useMemo } from "react";

import { UseFieldArrayReturn } from "react-hook-form";
import { OptionSelectType } from "src/common/constants/types";
import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import { getTotalSelectedSlotPackages } from "src/squads/payment/helpers/packages";
import { Payment_GetManyCourseByCourseIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import {
    OrderFormValues,
    ProductFormPackageCourseType,
} from "src/squads/payment/types/form/order-form-types";
import { CourseType } from "src/squads/payment/types/service/course-types";
import { PackageCourseType } from "src/squads/payment/types/service/package-course-types";

import { genFormFieldByPackageType } from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails/helper";

import { PackageType } from "manabuf/payment/v1/enums_pb";

interface UsePackageCoursesInteractionsProps {
    packageType: PackageType;
    packageCourses: PackageCourseType[];
    courseDetails?: CourseType[];
    packageCoursesFieldArrayMethods: UseFieldArrayReturn<
        OrderFormValues,
        `students.${number}.productFieldArrayItems.${number}.packageCourses`
    >;
    onPackageCoursesChange: () => void;
}

interface UsePackageCoursesInteractionsReturn {
    packageCourseOptions: OptionSelectType[];
    totalSelectedSlot: number;
    addPackageCourse: () => void;
    onPackageCourseSelect: (courseId: CourseType["course_id"], index: number) => void;
    removePackageCourse: (index: number) => void;
    appendMandatoryOrDefaultCourses: (
        queriedCourses: Payment_GetManyCourseByCourseIdsQuery["courses"]
    ) => void;
    onSlotSelect: (slot: number, courseId: CourseType["course_id"], index: number) => void;
}

const usePackageCoursesInteractions = ({
    packageType,
    packageCourses,
    courseDetails = [],
    packageCoursesFieldArrayMethods: { fields, append, remove, update },
    onPackageCoursesChange,
}: UsePackageCoursesInteractionsProps): UsePackageCoursesInteractionsReturn => {
    const totalSelectedSlot = useMemo(() => {
        const totalSlot = getTotalSelectedSlotPackages(fields);
        const packageTypeMap = {
            [PackageType.PACKAGE_TYPE_SLOT_BASED]: totalSlot,
            [PackageType.PACKAGE_TYPE_FREQUENCY]: totalSlot,
        };
        return packageTypeMap[packageType];
    }, [fields, packageType]);

    const selectedCourseIds = useMemo(() => {
        return fields
            ?.filter((item) => item.packageCourse !== undefined)
            .map((item) => item.packageCourse.course_id);
    }, [fields]);
    const packageCourseOptions = useMemo((): OptionSelectType[] => {
        return courseDetails.map((course) => {
            const isDisabled = selectedCourseIds?.includes(course.course_id);
            return {
                id: course.course_id,
                value: course.name ?? "",
                label: course.name ?? "",
                disabled: isDisabled,
            };
        });
    }, [courseDetails, selectedCourseIds]);

    const coursesMap = useMemo<Record<PackageCourseType["course_id"], PackageCourseType>>(() => {
        return packageCourses.reduce(
            (map, packageCourse) => ({
                ...map,
                [packageCourse.course_id]: packageCourse,
            }),
            {}
        );
    }, [packageCourses]);
    const courseDetailsMap = useMemo<Record<CourseType["course_id"], CourseType>>(() => {
        return courseDetails.reduce(
            (map, course) => ({
                ...map,
                [course.course_id]: course,
            }),
            {}
        );
    }, [courseDetails]);

    const addPackageCourse = (): void => {
        const courseDetail = courseDetails.find(
            (course) => !selectedCourseIds?.includes(course.course_id)
        );

        if (courseDetail) {
            const packageCourseDetails = coursesMap[courseDetail.course_id];

            append(
                genFormFieldByPackageType(packageType, {
                    course: courseDetail,
                    packageCourse: packageCourseDetails,
                })
            );
            onPackageCoursesChange();
        }
    };

    const removePackageCourse = (index: number) => {
        remove(index);
        onPackageCoursesChange();
    };

    const onPackageCourseSelect = (courseId: CourseType["course_id"], index: number) => {
        const packageCourseDetails = coursesMap[courseId];

        const courseDetail = courseDetailsMap[courseId];

        if (packageCourseDetails && courseDetail) {
            update(
                index,
                genFormFieldByPackageType(packageType, {
                    course: courseDetail,
                    packageCourse: packageCourseDetails,
                })
            );
            onPackageCoursesChange();
        }
    };

    const appendMandatoryOrDefaultCourses = (
        queriedCourses: Payment_GetManyCourseByCourseIdsQuery["courses"]
    ): void => {
        const mandatoryCourses: Partial<ProductFormPackageCourseType>[] = [];

        queriedCourses.forEach((queriedCourse) => {
            const packageCourseDetails = packageCourses.find((packageCourse) => {
                return (
                    packageCourse.mandatory_flag &&
                    packageCourse.course_id === queriedCourse.course_id
                );
            });

            if (packageCourseDetails) {
                mandatoryCourses.push(
                    genFormFieldByPackageType(packageType, {
                        course: queriedCourse,
                        packageCourse: packageCourseDetails,
                    })
                );
            }
        });

        if (arrayHasItem(mandatoryCourses)) {
            append(mandatoryCourses);
        } else {
            const firstCourse = pick1stElement(queriedCourses);
            const packageCourseDetails = packageCourses.find(
                (packageCourse) => packageCourse.course_id === firstCourse?.course_id
            );

            append(
                genFormFieldByPackageType(packageType, {
                    course: firstCourse,
                    packageCourse: packageCourseDetails,
                })
            );
        }

        onPackageCoursesChange();
    };

    const onSlotSelect = (slot: number, courseId: CourseType["course_id"], index: number) => {
        const packageCourseDetails = coursesMap[courseId];
        const courseDetail = courseDetailsMap[courseId];

        if (packageCourseDetails && courseDetail) {
            update(
                index,
                genFormFieldByPackageType(packageType, {
                    course: courseDetail,
                    packageCourse: packageCourseDetails,
                    slot: slot,
                })
            );
        }
    };
    return {
        packageCourseOptions,
        totalSelectedSlot,
        addPackageCourse,
        onPackageCourseSelect,
        removePackageCourse,
        appendMandatoryOrDefaultCourses,
        onSlotSelect,
    };
};

export default usePackageCoursesInteractions;
