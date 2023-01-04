import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";
import {
    ProductPriceListType,
    ProductPriceType,
} from "src/squads/payment/types/service/price-types";

export const getProductPriceWithSlot = (
    packageCourses?: ProductFormPackageCourseType[],
    productPrices?: ProductPriceListType
): ProductPriceType | undefined => {
    const totalCoursesSlot = getTotalCoursesSlot(packageCourses ?? []);

    const productPriceWithSlot = productPrices?.find(
        ({ quantity }) => Boolean(totalCoursesSlot) && quantity === totalCoursesSlot
    );

    return productPriceWithSlot;
};

export const getProductPricesBySlotOrWeight = ({
    getTotalCoursesQuantity,
    packageCourses,
    productPrices,
}: {
    getTotalCoursesQuantity: (packageCourses: ProductFormPackageCourseType[]) => number;
    productPrices?: ProductPriceType[];
    packageCourses?: ProductFormPackageCourseType[];
}): ProductPriceType[] => {
    if (!packageCourses || !productPrices) return [];

    const totalQuantity = getTotalCoursesQuantity(packageCourses);

    return productPrices.filter(({ quantity }) => quantity === totalQuantity);
};

export const getTotalCoursesSlot = (packageCourses: ProductFormPackageCourseType[]) => {
    return packageCourses.reduce(
        (totalSlot, currentProduct) => (totalSlot = totalSlot + (currentProduct.slot || 0)),
        0
    );
};

export const getTotalCoursesWeight = (packageCourses: ProductFormPackageCourseType[]) => {
    return packageCourses.reduce(
        (totalSlot, currentProduct) =>
            (totalSlot = totalSlot + (currentProduct.packageCourse.course_weight || 0)),
        0
    );
};
