import { UserAddress } from "src/squads/user/common/types";
import userAddressService, {
    GetOneUserAddressVariables,
} from "src/squads/user/service/define-service/user-address-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useStudentDetailHomeAddress from "../useStudentDetailHomeAddress";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return jest.fn();
});
describe("useStudentDetailHomeAddress", () => {
    const mockUserAddress = mockUserAddressList[0];

    it("should return correct data", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
            data: mockUserAddress,
            refetch: jest.fn(),
        }));

        const { result } = renderHook(() => useStudentDetailHomeAddress(mockUserAddress.user_id));

        expect(result.current.homeAddress).toEqual(mockUserAddress);
    });
    it("should show error snackbar when fetch student address fail", () => {
        const mockShowSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackbar);
        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "userAddress"; action: keyof typeof userAddressService.query }) =>
                (
                    _params: GetOneUserAddressVariables,
                    options: UseQueryBaseOptions<UserAddress | undefined>
                ) => {
                    options?.onError?.(new Error("Fetch student address failed"));
                    return {
                        isLoading: false,
                        data: undefined,
                    };
                }
        );

        renderHook(() => useStudentDetailHomeAddress(mockUserAddress.user_id), {
            wrapper: TestCommonAppProvider,
        });
        expect(mockShowSnackbar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toBeCalledWith("Unable to load data, please try again!", "error");
    });
});
