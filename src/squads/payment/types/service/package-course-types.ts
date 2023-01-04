import {
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetManyPackageCourseFeesByPackageIdQuery,
    Payment_GetManyPackageCourseMaterialsByPackageIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export type PackageCourseType = ArrayElement<
    Payment_GetManyPackageCourseByPackageIdQuery["package_course"]
>;

export type PackageCourseMaterial = ArrayElement<
    Payment_GetManyPackageCourseMaterialsByPackageIdQuery["package_course_material"]
>;

export type PackageCourseFee = ArrayElement<
    Payment_GetManyPackageCourseFeesByPackageIdQuery["package_course_fee"]
>;
