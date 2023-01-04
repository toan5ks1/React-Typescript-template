import { OptionSelectType } from "src/common/constants/types";
import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";
import { PackageCourseType } from "src/squads/payment/types/service/package-course-types";

import { PackageType } from "manabuf/payment/v1/enums_pb";

export const DefaultCourseSlot = 1;

export const enableSlotSelect = (packageType: PackageType): boolean => {
    return (
        packageType === PackageType.PACKAGE_TYPE_SLOT_BASED ||
        packageType === PackageType.PACKAGE_TYPE_FREQUENCY
    );
};

export const getSlotOptions = (packageCourse: PackageCourseType): OptionSelectType[] => {
    return Array.from({ length: packageCourse.max_slots_per_course }, (_, i) => i + 1).map(
        (slot) => {
            const stringSlot = slot.toString();
            return {
                id: stringSlot,
                value: stringSlot,
                label: stringSlot,
                disabled: false,
            };
        }
    );
};

export const genFormFieldByPackageType = (
    packageType: PackageType,
    fields: Partial<ProductFormPackageCourseType>
) => {
    const { packageCourse, course, slot } = fields;

    switch (packageType) {
        case PackageType.PACKAGE_TYPE_SLOT_BASED:
        case PackageType.PACKAGE_TYPE_FREQUENCY:
            return {
                course,
                packageCourse,
                slot: slot ?? DefaultCourseSlot,
            };

        default:
            return {
                course,
                packageCourse,
            };
    }
};
