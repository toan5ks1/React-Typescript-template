import { ProductFormPackageCourseType } from "src/squads/payment/types/form/order-form-types";

export const getTotalSelectedSlotPackages = (fields: ProductFormPackageCourseType[]): number => {
    return fields.reduce((sum, { slot }) => sum + (slot || 0), 0);
};
