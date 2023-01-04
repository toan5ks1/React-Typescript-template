import { KeyTaxCategoryTypes } from "src/squads/payment/constants/const";
import {
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyTaxesByTaxIdsQueryVariables,
    Payment_GetManyTaxesReferenceQuery,
    Payment_GetManyTaxesReferenceQueryVariables,
    Payment_GetTaxByTaxIdV2Query,
    Payment_GetTaxByTaxIdV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { taxService } from "src/squads/payment/service/fatima/tax-fatima-service/tax-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import taxFatimaQueries from "src/squads/payment/service/fatima/tax-fatima-service/tax-fatima.query";

jest.mock("src/squads/payment/service/fatima/tax-fatima-service/tax-fatima.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
            getManyTaxesByTaxIds: jest.fn(),
            getManyReference: jest.fn(),
        },
    };
});

describe("tax-service", () => {
    it("should return tax item when calling paymentGetOneTaxByTaxId", async () => {
        const mockTaxId = "tax_id_1";
        const queryVariable: Partial<Payment_GetTaxByTaxIdV2QueryVariables> = {
            tax_id: mockTaxId,
        };

        const mockQueryReturn: Payment_GetTaxByTaxIdV2Query["tax"] = [
            {
                tax_percentage: 5,
                tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
            },
        ];

        (taxFatimaQueries.getOne as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await taxService.query.paymentGetOneTaxByTaxId(queryVariable);

        expect(taxFatimaQueries.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });

    it("should throw an error if tax_id is undefined when calling paymentGetOneTaxByTaxId", async () => {
        const queryVariable: Partial<Payment_GetTaxByTaxIdV2QueryVariables> = {
            tax_id: undefined,
        };

        await expect(async () => {
            await taxService.query.paymentGetOneTaxByTaxId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetOneTaxByTaxId",
                errors: [{ field: "tax_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(taxFatimaQueries.getOne).not.toBeCalled();
    });

    it("should return many tax items when calling paymentGetManyTaxesByTaxIds", async () => {
        const mockTaxIds = ["tax_id_1", "tax_id_2"];
        const queryVariable: Partial<Payment_GetManyTaxesByTaxIdsQueryVariables> = {
            tax_ids: mockTaxIds,
        };

        const mockQueryReturn: Payment_GetManyTaxesByTaxIdsQuery["tax"] = [
            {
                tax_percentage: 5,
                tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
                tax_id: "tax_id_1",
            },
            {
                tax_percentage: 30,
                tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
                tax_id: "tax_id_2",
            },
        ];

        (taxFatimaQueries.getManyTaxesByTaxIds as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await taxService.query.paymentGetManyTaxesByTaxIds(queryVariable);

        expect(taxFatimaQueries.getManyTaxesByTaxIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });

    it("should throw an error if tax_ids is empty when calling paymentGetManyTaxesByTaxIds", async () => {
        const queryVariable: Partial<Payment_GetManyTaxesByTaxIdsQueryVariables> = {
            tax_ids: [],
        };

        await expect(async () => {
            await taxService.query.paymentGetManyTaxesByTaxIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyTaxesByTaxIds",
                errors: [{ field: "tax_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(taxFatimaQueries.getManyTaxesByTaxIds).not.toBeCalled();
    });

    it("should return all taxes when calling paymentGetManyReference", async () => {
        const queryVariable: Payment_GetManyTaxesReferenceQueryVariables = {
            limit: 5,
        };

        const mockQueryReturn: Payment_GetManyTaxesReferenceQuery["tax"] = [
            {
                tax_id: "tax_id_1",
                name: "Tax 1",
                tax_percentage: 10,
                tax_category: KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE,
            },
        ];

        (taxFatimaQueries.getManyReference as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await taxService.query.paymentGetManyReference(queryVariable);

        expect(taxFatimaQueries.getManyReference).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });
});
