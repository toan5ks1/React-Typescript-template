import { ModeOpenDialog } from "src/common/constants/enum";
import { UserGroupInfo } from "src/squads/user/common/types/user-group";
import userGroupService from "src/squads/user/service/define-service/user-group-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtUserGroupService } from "src/squads/user/service/usermgmt/user-group-service-user-mgmt/types";
import { getLatestCallParams } from "src/squads/user/test-utils/mocks/mock-utils";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useUpsertUserGroup from "../useUpsertUserGroup";

import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferMutation: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useBasicContent", () => ({
    __esModule: true,
    default: () => ({
        country: "COUNTRY_JP",
        school_id: 1,
    }),
}));
describe("useUpsertStaff", () => {
    const showSnackbar = jest.fn();
    const mutateAsync = jest.fn();
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (resource: { entity: "userGroup"; action: keyof typeof userGroupService.mutation }) =>
                (
                    options: UseMutationOptions<
                        | NsUsermgmtUserGroupService.CreateUserGroupReq
                        | NsUsermgmtUserGroupService.UpdateUserGroupReq,
                        | NsUsermgmtUserGroupService.CreateUserGroupResp
                        | NsUsermgmtUserGroupService.UpdateUserGroupResp
                    >
                ) => {
                    if (resource.action === "userCreateUserGroup")
                        return {
                            mutateAsync: jest.fn(
                                async (params: NsUsermgmtUserGroupService.CreateUserGroupReq) => {
                                    mutateAsync(params);
                                    await options?.onSuccess?.(
                                        { userGroupId: "user-group-id" },
                                        {} as NsUsermgmtUserGroupService.CreateUserGroupReq,
                                        undefined
                                    );
                                }
                            ),
                        };
                    else
                        return {
                            mutateAsync: jest.fn(
                                async (params: NsUsermgmtUserGroupService.UpdateUserGroupReq) => {
                                    mutateAsync(params);
                                    await options?.onSuccess?.(
                                        { successful: true },
                                        {} as NsUsermgmtUserGroupService.UpdateUserGroupReq,
                                        undefined
                                    );
                                }
                            ),
                        };
                }
        );
    });
    it("should call add user group api with correct payload", async () => {
        const formData: UserGroupInfo = {
            name: "user-group-name",
            grantedPermissionPackage: mockGrantedPermissionPackage,
        };
        const payload: NsUsermgmtUserGroupService.CreateUserGroupReq = {
            userGroupName: formData.name,
            roleWithLocationsList: mockGrantedPermissionPackage.map((p) => {
                return {
                    roleId: p.role.role_id,
                    locationIdsList: p.locations.map((l) => l.locationId),
                };
            }),
        };

        const {
            result: { current },
        } = renderHook(() => useUpsertUserGroup({ mode: ModeOpenDialog.ADD }), {
            wrapper: TestCommonAppProvider,
        });

        await act(() => current.upsertUserGroup(formData, { onSuccess: expect.any(Function) }));

        expect(getLatestCallParams(mutateAsync)[0]).toEqual(payload);
        expect(showSnackbar).toBeCalledWith("You have added a user group successfully", "success");
    });
    it("should call update user group api with correct payload", async () => {
        const formData: UserGroupInfo = {
            id: "user-group-id",
            name: "user-group-name",
            grantedPermissionPackage: mockGrantedPermissionPackage,
        };
        const payload: NsUsermgmtUserGroupService.UpdateUserGroupReq = {
            userGroupId: formData.id!,
            userGroupName: formData.name,
            roleWithLocationsList: mockGrantedPermissionPackage.map((p) => {
                return {
                    roleId: p.role.role_id,
                    locationIdsList: p.locations.map((l) => l.locationId),
                };
            }),
        };

        const {
            result: { current },
        } = renderHook(() => useUpsertUserGroup({ mode: ModeOpenDialog.EDIT }), {
            wrapper: TestCommonAppProvider,
        });

        await act(() => current.upsertUserGroup(formData, { onSuccess: expect.any(Function) }));

        expect(getLatestCallParams(mutateAsync)[0]).toEqual(payload);
        expect(showSnackbar).toBeCalledWith("You have edited user group successfully", "success");
    });
    it("should show error snackbar when create user group failed", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(() => Promise.reject(new Error("Create user group failed."))),
        }));

        const {
            result: { current },
        } = renderHook(() => useUpsertUserGroup({ mode: ModeOpenDialog.ADD }), {
            wrapper: TestCommonAppProvider,
        });

        const formData: UserGroupInfo = {
            name: "user-group-name",
            grantedPermissionPackage: mockGrantedPermissionPackage,
        };

        await act(() => current.upsertUserGroup(formData, {}));
        expect(showSnackbar).toHaveBeenCalledWith(
            "Created failed.Create user group failed.",
            "error"
        );
    });
    it("should show error snackbar when create user group failed", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(() => Promise.reject(new Error("Update user group failed."))),
        }));

        const {
            result: { current },
        } = renderHook(() => useUpsertUserGroup({ mode: ModeOpenDialog.EDIT }), {
            wrapper: TestCommonAppProvider,
        });

        const formData: UserGroupInfo = {
            id: "user-group-id",
            name: "user-group-name",
            grantedPermissionPackage: mockGrantedPermissionPackage,
        };

        await act(() => current.upsertUserGroup(formData, {}));
        expect(showSnackbar).toHaveBeenCalledWith(
            "Updated failed.Update user group failed.",
            "error"
        );
    });
});
