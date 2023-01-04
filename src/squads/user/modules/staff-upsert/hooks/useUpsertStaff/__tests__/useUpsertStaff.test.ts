import { ModeOpenDialog } from "src/common/constants/enum";
import staffService from "src/squads/user/service/define-service/staff-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import { getLatestCallParams } from "src/squads/user/test-utils/mocks/mock-utils";
import {
    updateStaffReq,
    userGroupsManyReference,
    createStaffReq,
    createStaffResp,
    MOCK_STAFF_USERS_DATA,
} from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useUpsertStaff, { UseUpsertStaffReturn } from "../useUpsertStaff";

import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});
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

    describe("useUpsertStaff ADD mode", () => {
        it("should call add staff api with correct payload", async () => {
            (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
            const payload: Parameters<UseUpsertStaffReturn["createStaff"]>[0] = {
                formDataUpsert: {
                    name: MOCK_STAFF_USERS_DATA.name,
                    email: MOCK_STAFF_USERS_DATA.email,
                    userGroupsList: userGroupsManyReference,
                },
            };
            (inferMutation as jest.Mock).mockImplementation(
                (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                    (
                        options: UseMutationOptions<
                            NsUsermgmtStaffService.CreateStaffReq,
                            NsUsermgmtStaffService.CreateStaffResp
                        >
                    ) => {
                        return {
                            mutateAsync: jest.fn(async (params) => {
                                mutateAsync(params);
                                await options?.onSuccess?.(
                                    createStaffResp,
                                    createStaffReq,
                                    undefined
                                );
                            }),
                        };
                    }
            );

            const {
                result: { current },
            } = renderHook(() => useUpsertStaff({ mode: ModeOpenDialog.ADD }), {
                wrapper: TestCommonAppProvider,
            });

            await act(() => current.createStaff(payload, { onSuccess: expect.any(Function) }));

            expect(getLatestCallParams(mutateAsync)[0]).toEqual(createStaffReq);
            expect(showSnackbar).toBeCalledWith(
                "You have created a new staff successfully",
                "success"
            );
        });
        it("should show error snackbar when create staff failed", async () => {
            (inferMutation as jest.Mock).mockImplementation(
                (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                    (
                        _options: UseMutationOptions<
                            NsUsermgmtStaffService.CreateStaffReq,
                            NsUsermgmtStaffService.CreateStaffResp
                        >
                    ) => {
                        return {
                            mutateAsync: jest.fn(() =>
                                Promise.reject(new Error("Create staff failed."))
                            ),
                        };
                    }
            );
            (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
            const {
                result: { current },
            } = renderHook(() => useUpsertStaff({ mode: ModeOpenDialog.ADD }), {
                wrapper: TestCommonAppProvider,
            });
            const payload: Parameters<UseUpsertStaffReturn["createStaff"]>[0] = {
                formDataUpsert: {
                    name: MOCK_STAFF_USERS_DATA.name,
                    email: MOCK_STAFF_USERS_DATA.email,
                    userGroupsList: userGroupsManyReference,
                },
            };

            await act(() => current.createStaff(payload, { onError: expect.any(Function) }));
            expect(showSnackbar).toHaveBeenCalledWith(
                "Created failed. Create staff failed.",
                "error"
            );
        });
    });

    describe("useUpsertStaff EDIT mode", () => {
        it("should call update staff api with correct payload", async () => {
            (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
            (inferMutation as jest.Mock).mockImplementation(
                (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                    (
                        options: UseMutationOptions<
                            NsUsermgmtStaffService.UpdateStaffReq,
                            NsUsermgmtStaffService.UpdateStaffResp
                        >
                    ) => {
                        return {
                            mutateAsync: jest.fn(async (params) => {
                                mutateAsync(params);
                                await options?.onSuccess?.(
                                    { successful: true },
                                    updateStaffReq,
                                    undefined
                                );
                            }),
                        };
                    }
            );
            const {
                result: { current },
            } = renderHook(() => useUpsertStaff({ mode: ModeOpenDialog.EDIT }), {
                wrapper: TestCommonAppProvider,
            });
            const payload: Parameters<UseUpsertStaffReturn["updateStaff"]>[0] = {
                formDataUpsert: {
                    ...updateStaffReq,
                },
            };

            await act(() => current.updateStaff(payload, { onSuccess: expect.any(Function) }));

            expect(getLatestCallParams(mutateAsync)[0]).toEqual(updateStaffReq);
            expect(showSnackbar).toBeCalledWith("You have updated staff successfully", "success");
        });

        it("should show error snackbar when update staff failed", async () => {
            (inferMutation as jest.Mock).mockImplementation(
                (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                    (
                        _options: UseMutationOptions<
                            NsUsermgmtStaffService.UpdateStaffReq,
                            NsUsermgmtStaffService.UpdateStaffResp
                        >
                    ) => {
                        return {
                            mutateAsync: jest.fn(() =>
                                Promise.reject(new Error("Update staff failed."))
                            ),
                        };
                    }
            );

            (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

            const {
                result: { current },
            } = renderHook(() => useUpsertStaff({ mode: ModeOpenDialog.EDIT }), {
                wrapper: TestCommonAppProvider,
            });

            const payload: Parameters<UseUpsertStaffReturn["updateStaff"]>[0] = {
                formDataUpsert: {
                    ...updateStaffReq,
                },
            };
            await act(() => current.updateStaff(payload, { onError: expect.any(Function) }));

            expect(showSnackbar).toBeCalledWith("Updated failed Update staff failed.", "error");
        });
    });
});
