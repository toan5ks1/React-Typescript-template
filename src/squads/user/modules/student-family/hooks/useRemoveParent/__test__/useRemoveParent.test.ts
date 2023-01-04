import studentParentService from "src/squads/user/service/define-service/student-parents-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import { getLatestCallParams } from "src/squads/user/test-utils/mocks/mock-utils";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useRemoveParent, { UseRemoveParentReturn } from "../useRemoveParent";

import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});
jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

describe("useRemoveParent", () => {
    const mutateAsync = jest.fn();
    const showSnackbar = jest.fn();
    const payload: Parameters<UseRemoveParentReturn["removeParent"]>[0] = {
        studentId: "student_1",
        parentId: "parent_1",
    };
    it("should api called with correctly payload", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentParent";
                    action: keyof typeof studentParentService.mutation;
                }) =>
                (options: UseMutationOptions<NsUsermgmtStudentService.RemoveParentReq, {}>) => {
                    void options.onSuccess?.({}, payload, undefined);
                    return {
                        mutateAsync,
                    };
                }
        );
        const {
            result: { current },
        } = renderHook(() => useRemoveParent(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() => current.removeParent(payload, {}));

        expect(getLatestCallParams(mutateAsync)[0]).toEqual(payload);
        expect(showSnackbar).toBeCalledWith("You have removed the parent successfully!");
    });
    it("should show error snackbar when remove parent failed", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentParent";
                    action: keyof typeof studentParentService.mutation;
                }) =>
                (_options: UseMutationOptions<NsUsermgmtStudentService.UpsertParent, {}>) => {
                    return {
                        mutateAsync: jest.fn(() =>
                            Promise.reject(new Error("Remove existing parent failed."))
                        ),
                    };
                }
        );
        const {
            result: { current },
        } = renderHook(() => useRemoveParent(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() => current.removeParent(payload, {}));

        expect(showSnackbar).toHaveBeenCalledWith("Remove existing parent failed.", "error");
    });
});
