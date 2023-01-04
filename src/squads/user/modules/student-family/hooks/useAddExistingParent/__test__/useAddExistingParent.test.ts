import studentParentService from "src/squads/user/service/define-service/student-parents-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import { getLatestCallParams } from "src/squads/user/test-utils/mocks/mock-utils";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { act, renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useAddExistingParent, {
    UseAddExistingParentReturn,
} from "src/squads/user/modules/student-family/hooks/useAddExistingParent";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

describe("useAddExistingParent", () => {
    const mutateAsync = jest.fn();
    const showSnackbar = jest.fn();
    const payload: Parameters<UseAddExistingParentReturn["addExistingParent"]>[0] = {
        formData: {
            name: "Parent Edit",
            relationship: 2,
            countryCode: 5,
            phoneNumber: "0123456789",
            email: "parent_email@manabie.com",
        },
        studentId: "student_1",
    };
    it("should api called with correctly payload", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentParent";
                    action: keyof typeof studentParentService.mutation;
                }) =>
                (options: UseMutationOptions<NsUsermgmtStudentService.UpsertParent, {}>) => {
                    void options.onSuccess?.(
                        {},
                        {
                            studentId: payload.studentId,
                            parent: payload.formData,
                        },
                        undefined
                    );
                    return {
                        mutateAsync,
                    };
                }
        );
        const {
            result: { current },
        } = renderHook(() => useAddExistingParent(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() => current.addExistingParent(payload, {}));

        const expectedPayload: NsUsermgmtStudentService.UpsertParent = {
            studentId: payload.studentId,
            parent: {
                ...payload.formData,
            },
        };

        expect(getLatestCallParams(mutateAsync)[0]).toEqual(expectedPayload);
        expect(showSnackbar).toBeCalledWith("You have added the parent successfully!");
    });
    it("should show error snackbar when add parent failed", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentParent";
                    action: keyof typeof studentParentService.mutation;
                }) =>
                (_options: UseMutationOptions<NsUsermgmtStudentService.UpsertParent, {}>) => {
                    return {
                        mutateAsync: jest.fn(() =>
                            Promise.reject(new Error("Add existing parent failed."))
                        ),
                    };
                }
        );
        const {
            result: { current },
        } = renderHook(() => useAddExistingParent(), {
            wrapper: TestCommonAppProvider,
        });

        await act(() => current.addExistingParent(payload, {}));

        expect(showSnackbar).toHaveBeenCalledWith("Add existing parent failed.", "error");
    });
});
