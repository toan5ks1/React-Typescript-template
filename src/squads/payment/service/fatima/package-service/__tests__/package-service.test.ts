import {
    Payment_GetPackageByProductIdQueryVariables,
    Payment_GetPackagesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { packageService } from "src/squads/payment/service/fatima/package-service/package-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockProductPackageList } from "src/squads/payment/test-utils/mocks/products";

import packageQueriesFatima from "src/squads/payment/service/fatima/package-service/package-fatima.query";

jest.mock("src/squads/payment/service/fatima/package-service/package-fatima.query", () => ({
    __esModule: true,
    default: {
        getOne: jest.fn(),
        getMany: jest.fn(),
    },
}));

const mockProductPackages = createMockProductPackageList();
const mockProductPackage = mockProductPackages[0];

describe("Product package service", () => {
    it("should return product package when calling paymentGetOneProductPackageByProductId", async () => {
        (packageQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductPackage);

        const queryVariable: Payment_GetPackageByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const response = await packageService.query.paymentGetOneProductPackageByProductId(
            queryVariable
        );

        expect(packageQueriesFatima.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductPackage);
    });

    it("should throw an error if product_id is undefined when calling paymentGetOneProductPackageByProductId", async () => {
        (packageQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductPackage);

        const queryVariable: Partial<Payment_GetPackageByProductIdQueryVariables> = {
            product_id: undefined,
        };

        await expect(async () => {
            await packageService.query.paymentGetOneProductPackageByProductId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "payment - packageEntity - paymentGetOneProductPackageByProductId",
                errors: [{ field: "product_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(packageQueriesFatima.getOne).not.toBeCalled();
    });

    it("should return product package when calling paymentGetManyProductPackagesByProductIds", async () => {
        (packageQueriesFatima.getMany as jest.Mock).mockResolvedValue(mockProductPackages);

        const queryVariable: Partial<Payment_GetPackagesByProductIdsQueryVariables> = {
            productIds: ["product_id_1"],
        };

        const response = await packageService.query.paymentGetManyProductPackagesByProductIds(
            queryVariable
        );

        expect(packageQueriesFatima.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductPackages);
    });

    it("should throw an error if productIds is undefined when calling paymentGetManyProductPackagesByProductIds", async () => {
        (packageQueriesFatima.getMany as jest.Mock).mockResolvedValue(mockProductPackages);

        const queryVariable: Partial<Payment_GetPackagesByProductIdsQueryVariables> = {
            productIds: undefined,
        };

        await expect(async () => {
            await packageService.query.paymentGetManyProductPackagesByProductIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "payment - packageEntity - paymentGetManyProductPackagesByProductIds",
                errors: [{ field: "product_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(packageQueriesFatima.getMany).not.toBeCalled();
    });
});
