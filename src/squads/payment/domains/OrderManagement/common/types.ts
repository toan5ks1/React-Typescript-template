import { OptionSelectType } from "src/common/constants/types";
import { Payment_GetManyProductsReferenceQuery } from "src/squads/payment/service/fatima/fatima-types";

type FilterDateType = null | Date;
export interface FormFilterOrderManagementValues {
    createdFrom: FilterDateType;
    createdTo: FilterDateType;
    orderTypeList: OptionSelectType[];
    productsList: Payment_GetManyProductsReferenceQuery["product"];
}
