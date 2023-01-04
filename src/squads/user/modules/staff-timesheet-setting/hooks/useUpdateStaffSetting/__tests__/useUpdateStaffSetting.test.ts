import staffService from "src/squads/user/service/define-service/staff-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import { getLatestCallParams } from "src/squads/user/test-utils/mocks/mock-utils";
import { updateStaffSettingReq } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useUpdateStaffSetting from "../useUpdateStaffSetting";

import { renderHook, act } from "@testing-library/react-hooks";
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
describe("useUpdateStaffSetting with ENABLE timesheet config", () => {
    const showSnackbar = jest.fn();
    const mutateAsync = jest.fn();
    const _updateStaffSettingReq = updateStaffSettingReq(true);
    it("should call update staff api with correct payload", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                (
                    options: UseMutationOptions<
                        NsUsermgmtStaffService.UpdateStaffSettingReq,
                        NsUsermgmtStaffService.UpdateStaffSettingResp
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async (params) => {
                            mutateAsync(params);
                            await options?.onSuccess?.(
                                { successful: true },
                                _updateStaffSettingReq,
                                undefined
                            );
                        }),
                    };
                }
        );
        const {
            result: { current },
        } = renderHook(() => useUpdateStaffSetting(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() =>
            current.updateStaffSetting({
                payload: _updateStaffSettingReq,
                options: {
                    onSuccess: expect.any(Function),
                },
            })
        );

        expect(getLatestCallParams(mutateAsync)[0]).toEqual(_updateStaffSettingReq);
        expect(showSnackbar).toBeCalledWith("You have updated staff successfully", "success");
    });

    it("should show error snackbar when update staff failed", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                (
                    _options: UseMutationOptions<
                        NsUsermgmtStaffService.UpdateStaffSettingReq,
                        NsUsermgmtStaffService.UpdateStaffSettingResp
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
        } = renderHook(() => useUpdateStaffSetting(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() =>
            current.updateStaffSetting({
                payload: _updateStaffSettingReq,
                options: {
                    onError: expect.any(Function),
                },
            })
        );

        expect(showSnackbar).toBeCalledWith("Updated failed Update staff failed.", "error");
    });
});
describe("useUpdateStaffSetting with DISABLE timesheet config", () => {
    const showSnackbar = jest.fn();
    const mutateAsync = jest.fn();
    const _updateStaffSettingReq = updateStaffSettingReq(false);
    it("should call update staff api with correct payload", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                (
                    options: UseMutationOptions<
                        NsUsermgmtStaffService.UpdateStaffSettingReq,
                        NsUsermgmtStaffService.UpdateStaffSettingResp
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async (params) => {
                            mutateAsync(params);
                            await options?.onSuccess?.(
                                { successful: true },
                                _updateStaffSettingReq,
                                undefined
                            );
                        }),
                    };
                }
        );
        const {
            result: { current },
        } = renderHook(() => useUpdateStaffSetting(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() =>
            current.updateStaffSetting({
                payload: _updateStaffSettingReq,
                options: {
                    onSuccess: expect.any(Function),
                },
            })
        );

        expect(getLatestCallParams(mutateAsync)[0]).toEqual(_updateStaffSettingReq);
        expect(showSnackbar).toBeCalledWith("You have updated staff successfully", "success");
    });

    it("should show error snackbar when update staff failed", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "staff"; action: keyof typeof staffService.mutation }) =>
                (
                    _options: UseMutationOptions<
                        NsUsermgmtStaffService.UpdateStaffSettingReq,
                        NsUsermgmtStaffService.UpdateStaffSettingResp
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
        } = renderHook(() => useUpdateStaffSetting(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() =>
            current.updateStaffSetting({
                payload: _updateStaffSettingReq,
                options: {
                    onError: expect.any(Function),
                },
            })
        );

        expect(showSnackbar).toBeCalledWith("Updated failed Update staff failed.", "error");
    });
});
