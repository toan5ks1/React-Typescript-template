import { GrantedPermission } from "src/squads/user/common/types/user-group";
import {
    User_GrantedRoleAccessPathByGrantedRoleIdsQuery,
    User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables,
    User_GrantedRoleListQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import grantedRoleAccessPathService from "src/squads/user/service/define-service/granted-role-access-path-service";
import grantedRoleService from "src/squads/user/service/define-service/granted-role-service";
import { inferQueryPagination, inferQuery } from "src/squads/user/service/infer-service";
import { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";
import { pagination } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useGrantedPermissionPackage from "../useGrantedPermissionPackage";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import { GrantedRoleListQueryReturn } from "src/squads/user/service/bob/granted-role-service-bob/granted-role-service-bob.query";
import {
    mockReturnGrantedRoleAccessPath,
    mockReturnGrantedRoleList,
} from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});
describe("useGrantedPermissionPackage", () => {
    beforeEach(() => {
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            data: mockReturnGrantedRoleList,
            result: { isFetching: false, refetch: jest.fn() },
            pagination: pagination(5),
        }));
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: mockReturnGrantedRoleAccessPath,
            isFetching: false,
        }));
    });
    it("should return correct user group granted permission package", () => {
        const { result } = renderHook(() => useGrantedPermissionPackage("user-group-id"));
        const expectResult: GrantedPermission[] = mockReturnGrantedRoleList.data!.map(
            (value, index) => ({
                granted_role_id: value.granted_role_id,
                role: value.role,
                locations: [mockReturnGrantedRoleAccessPath[index].location].map((location) => ({
                    locationId: location.location_id,
                    name: location.name,
                    isArchived: location.is_archived,
                    parentLocationId: location.parent_location_id || "",
                    accessPath: location.access_path || "",
                    locationType: location.location_type || "",
                })),
            })
        );
        expect(result.current.grantedPermissionPackage).toEqual(expectResult);
    });

    it("should show error snackbar when fetch granted role list failed", () => {
        const mockShowSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackbar);

        (inferQueryPagination as jest.Mock).mockImplementation(
            (_resource: { entity: "grantedRole"; action: keyof typeof grantedRoleService.query }) =>
                (
                    _params: ListQuery<User_GrantedRoleListQueryVariables>,
                    _options?: UseQueryBaseOptions<GrantedRoleListQueryReturn | undefined>
                ) => {
                    _options?.onError?.(new Error("Fetch failed"));
                    return {
                        data: undefined,
                        isLoading: false,
                    };
                }
        );
        renderHook(() => useGrantedPermissionPackage("user-group-id"), {
            wrapper: TestCommonAppProvider,
        });
        expect(mockShowSnackbar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toBeCalledWith("Unable to load data, please try again!", "error");
    });

    it("should show error snackbar when fetch granted role access path list failed", () => {
        const mockShowSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "grantedRoleAccessPath";
                    action: keyof typeof grantedRoleAccessPathService.query;
                }) =>
                (
                    _params: User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables,
                    _options?: UseQueryBaseOptions<
                        | User_GrantedRoleAccessPathByGrantedRoleIdsQuery["granted_role_access_path"]
                        | undefined
                    >
                ) => {
                    _options?.onError?.(new Error("Fetch failed"));
                    return {
                        data: undefined,
                        isLoading: false,
                    };
                }
        );
        renderHook(() => useGrantedPermissionPackage("user-group-id"), {
            wrapper: TestCommonAppProvider,
        });
        expect(mockShowSnackbar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toBeCalledWith("Unable to load data, please try again!", "error");
    });
});
