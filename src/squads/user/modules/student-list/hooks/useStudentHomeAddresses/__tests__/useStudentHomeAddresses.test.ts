import { UserAddress } from "src/squads/user/common/types";
import { Users_UserAddressByUserIdsQueryVariables } from "src/squads/user/service/bob/bob-types";
import userAddressService from "src/squads/user/service/define-service/user-address-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useStudentHomeAddresses from "../useStudentHomeAddresses";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return jest.fn();
});
describe("useStudentHomeAddresses", () => {
    const mockStudentIds = mockUserAddressList.map((address) => address.user_id);
    it("should return correct map data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "userAddress"; action: keyof typeof userAddressService.query }) =>
                (
                    _params: Users_UserAddressByUserIdsQueryVariables,
                    options: UseQueryBaseOptions<UserAddress[] | undefined>
                ) => {
                    const data = options?.selector?.(mockUserAddressList);
                    return {
                        isLoading: false,
                        data,
                    };
                }
        );
        const expectedResult = new Map<UserAddress["user_id"], UserAddress>();
        mockUserAddressList.forEach((address) => expectedResult.set(address.user_id, address));

        const { result } = renderHook(() => useStudentHomeAddresses(mockStudentIds));

        expect(result.current.mapHomeAddresses).toEqual(expectedResult);
    });
    it("should show error snackbar when fetch student address fail", () => {
        const mockShowSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackbar);
        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "userAddress"; action: keyof typeof userAddressService.query }) =>
                (
                    _params: Users_UserAddressByUserIdsQueryVariables,
                    options: UseQueryBaseOptions<UserAddress[] | undefined>
                ) => {
                    options?.onError?.(new Error("Fetch student addresses failed"));
                    return {
                        isLoading: false,
                        data: undefined,
                    };
                }
        );

        renderHook(() => useStudentHomeAddresses(mockStudentIds), {
            wrapper: TestCommonAppProvider,
        });
        expect(mockShowSnackbar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toBeCalledWith("Unable to load data, please try again!", "error");
    });
});
