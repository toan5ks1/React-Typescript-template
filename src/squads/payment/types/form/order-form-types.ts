import { FieldArrayWithId } from "react-hook-form";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { UpdateOrderBillItem } from "src/squads/payment/types/service/bill-item-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { CourseType } from "src/squads/payment/types/service/course-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { PackageCourseType } from "src/squads/payment/types/service/package-course-types";
import { ProductPriceListType } from "src/squads/payment/types/service/price-types";
import {
    ProductExtensions,
    ProductTypeQuery,
} from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";

export type OrderFormProductSection = "billedAtOrder" | "upcomingBilling";
export enum OrderFormProductSection2 {
    BILLED_AT_ORDER,
    UPCOMING_BILLING,
}

export interface OrderFormValues {
    location: NsBobLocationService.RetrieveLocationsResponseLocation;
    students: Array<{
        studentInfo: ArrayElement<Payment_GetStudentsManyV3Query["students"]>;
        productFieldArrayItems: ProductsFormValues[];
        comment: string;
    }>;
}

export type OrderFormLocationFieldName = `location`;

export type OrderFormStudentInfoFieldName = `students.${number}.studentInfo`;

export type OrderFormProductFieldArrayItemsFieldName = `students.${number}.productFieldArrayItems`;

export type ProductFieldItem = FieldArrayWithId<
    OrderFormValues,
    OrderFormProductFieldArrayItemsFieldName
>;

export interface ProductFormDetails extends ProductExtensions {
    product: ProductTypeQuery;
    productPrices?: ProductPriceListType;
    discount?: ProductDiscountType | null;
    productTax?: ProductTaxType;
}

export interface ProductFormPackageCourseType {
    packageCourse: PackageCourseType;
    course: CourseType;
    slot?: number;
}

export interface AssociatedProductDetails extends ProductExtensions {
    product: ProductTypeQuery;
    productPrices?: ProductPriceListType;
    discount?: ProductDiscountType;
    productTax?: ProductTaxType;
    courseId?: CourseType["course_id"];
}

interface UpdateOrderDetails {
    orderStatus: ProductListItemStatus;
    effectiveDate: Date;
    billItems: UpdateOrderBillItem[];
    hasUpdate?: boolean;
    reccuringDetails?: RecurringDetails;
}

export interface RecurringDetails {
    startDate?: string | null;
    billingSchedulePeriods?: BillingSchedulePeriod[];
}

// TODO: Refactor this interface to separate different types of product fields [LT-17973]
export interface ProductsFormValues extends Omit<ProductFormDetails, "product"> {
    product: ProductTypeQuery | null; // This can be null because when the user clicks add button, the autocomplete contains no product by default
    associatedProducts?: AssociatedProductDetails[];
    packageCourses?: ProductFormPackageCourseType[];
    updateOrderDetails?: UpdateOrderDetails;
    recurringDetails?: RecurringDetails;
}

export type BulkOrderSectionType = "single-order-option" | "bulk-order-options";
