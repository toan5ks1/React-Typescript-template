import { KeyTaxCategoryTypes } from "src/squads/payment/constants/const";
import {
    Payment_GetManyTaxesReferenceQuery,
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetTaxByTaxIdV2Query,
} from "src/squads/payment/service/fatima/fatima-types";

export const taxDataList: Payment_GetTaxByTaxIdV2Query["tax"] = [
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 5,
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_EXCLUSIVE,
        tax_percentage: 5,
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_NONE,
        tax_percentage: 5,
    },
];

export const getManyTaxDataList: Payment_GetManyTaxesByTaxIdsQuery["tax"] = [
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_1",
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 5,
        tax_id: "tax_id_2",
    },
];

export const getManyTaxesReference: Payment_GetManyTaxesReferenceQuery["tax"] = [
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_1",
        name: "Tax 1",
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_2",
        name: "Tax 2",
    },
    {
        tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
        tax_percentage: 10,
        tax_id: "tax_id_3",
        name: "Tax 3",
    },
];

export const createMockTaxDataList = (): Payment_GetTaxByTaxIdV2Query["tax"] => taxDataList;

export const createMockGetManyTaxDataList = (): Payment_GetManyTaxesByTaxIdsQuery["tax"] =>
    getManyTaxDataList;

export const createMockGetManyTaxesReferenceDataList =
    (): Payment_GetManyTaxesReferenceQuery["tax"] => getManyTaxesReference;

export const createMockGetManyTaxesReference = (): Payment_GetManyTaxesReferenceQuery["tax"] =>
    getManyTaxesReference;
