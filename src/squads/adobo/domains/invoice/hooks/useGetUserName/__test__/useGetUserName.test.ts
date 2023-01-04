import { ArrayElement } from "src/common/constants/types";
import { UseQueryBaseOptions } from "src/squads/adobo/domains/entry-exit/hooks/data/data-types";
import { inferQuery } from "src/squads/adobo/domains/invoice/services/infer-service";
import invoiceService from "src/squads/adobo/domains/invoice/services/invoice-service";
import {
    Invoice_UsersQuery,
    Invoice_UsersQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getUsersMock } from "src/squads/adobo/domains/invoice/test-utils/mocks/users";
import { mockWarner } from "src/squads/adobo/domains/invoice/test-utils/warner";

import { renderHook } from "@testing-library/react-hooks";
import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";
import useShowSnackbar from "src/squads/adobo/domains/invoice/hooks/useShowSnackbar";

const mockUsers = getUsersMock();

jest.mock("src/squads/adobo/domains/invoice/services/infer-service", () => {
    return {
        _esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/invoice/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const showSnackbar = jest.fn();

describe("useGetUserName", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "invoice"; action: keyof typeof invoiceService.query }) =>
                (
                    _params: Invoice_UsersQueryVariables,
                    options?: UseQueryBaseOptions<Invoice_UsersQuery["users"] | []>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "invoiceGetUsers") {
                            callbackRan = true;
                            options?.onSuccess?.(mockUsers);
                            options?.selector?.(mockUsers);

                            return {
                                data: mockUsers,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: undefined, isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() =>
            useGetUserName({ userIds: ["01G7NNATV02HJ6VMFEVG7HY6ZR"] })
        );

        expect(result.current.data).toEqual(mockUsers);
    });

    it("should call onError when returning undefined", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "invoice"; action: keyof typeof invoiceService.query }) =>
                (
                    _params: Invoice_UsersQueryVariables,
                    options?: UseQueryBaseOptions<
                        ArrayElement<Invoice_UsersQuery["users"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "invoiceGetUsers") {
                            callbackRan = true;

                            options?.onError?.(Error("ERROR invoice - userGetUseName"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() => useGetUserName({ userIds: ["01G7NNATV02HJ6VMFEVG7HY6ZR"] }));

        expect(std.warn).toBeCalledWith("useGetUserName", Error("ERROR invoice - userGetUseName"));
    });
});
