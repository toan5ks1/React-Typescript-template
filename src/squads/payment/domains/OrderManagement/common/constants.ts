import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

export const FIRST_STUDENT_IDX = 0;

export const defaultProductFieldArrayItems: ArrayElement<
    OrderFormValues["students"]
>["productFieldArrayItems"] = [
    {
        product: null,
    },
];
