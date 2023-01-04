import { KeyDiscountAmountTypes, KeyDiscountTypes } from "src/squads/payment/constants/const";
import { Payment_GetManyDiscountsByDiscountIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { OrderDetailProductListDiscountType } from "src/squads/payment/types/service/discount-types";

const discountList: OrderDetailProductListDiscountType[] = [
    {
        discount_id: "discount_id_1",
        name: "Discount 1",
        available_from: "2021-12-28T02:35:17.676837+00:00",
        available_until: "2022-12-28T02:35:17.676837+00:00",
        created_at: "2021-12-28T02:35:17.677491+00:00",
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
        recurring_valid_duration: null,
        remarks: "Remarks 1",
        updated_at: "2021-12-28T02:35:17.677491+00:00",
    },
    {
        discount_id: "discount_id_2",
        name: "Discount 2",
        available_from: "2021-12-28T02:35:17.676837+00:00",
        available_until: "2022-12-28T02:35:17.676837+00:00",
        created_at: "2021-12-28T02:35:17.677491+00:00",
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_PERCENTAGE,
        discount_amount_value: 12.25,
        discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
        recurring_valid_duration: 0,
        remarks: "Remarks 2",
        updated_at: "2021-12-28T02:35:17.677491+00:00",
    },
    {
        discount_id: "discount_id_3",
        name: "Discount 3",
        available_from: "2021-12-28T02:35:17.676837+00:00",
        available_until: "2022-12-28T02:35:17.676837+00:00",
        created_at: "2021-12-28T02:35:17.677491+00:00",
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_PERCENTAGE,
        discount_amount_value: 20,
        discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
        recurring_valid_duration: 1,
        remarks: "Remarks 3",
        updated_at: "2021-12-28T02:35:17.677491+00:00",
    },
    {
        discount_id: "discount_id_4",
        name: "Discount 4",
        available_from: "2021-12-28T02:35:17.676837+00:00",
        available_until: "2022-12-28T02:35:17.676837+00:00",
        created_at: "2021-12-28T02:35:17.677491+00:00",
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_NONE,
        discount_amount_value: 20,
        discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
        recurring_valid_duration: 2,
        remarks: "Remarks 4",
        updated_at: "2021-12-28T02:35:17.677491+00:00",
    },
];

const updateProductDiscount: Payment_GetManyDiscountsByDiscountIdsQuery["discount"] = [
    {
        name: "Discount name",
        discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
        discount_amount_value: 10,
        available_from: "2021-12-28T02:35:17.738471+00:00",
        available_until: "2022-12-28T02:35:17.738471+00:00",
        created_at: "2021-12-28T02:35:17.738471+00:00",
        discount_id: "discount_id_1",
        discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
        updated_at: "2021-12-28T02:35:17.738471+00:00",
    },
];

export const createMockDiscountList = (): OrderDetailProductListDiscountType[] => discountList;

export const createMockDiscountChoices = (): OrderDetailProductListDiscountType[] =>
    discountList.map((discount) => ({
        ...discount,
        value: discount.name,
    }));

export const createMockUpdateProductDiscount =
    (): Payment_GetManyDiscountsByDiscountIdsQuery["discount"] => updateProductDiscount;
