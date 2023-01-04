import { UpsertStudentFormProps } from "src/squads/user/common/types";
import studentService from "src/squads/user/service/define-service/student-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import {
    createMockStudentUpsertInfoForm,
    mockUpsetStudentResp,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useUpdateStudent from "../useUpdateStudent";

import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

describe("useUpdateStudent", () => {
    const mockStudentUpsertInfoForm = createMockStudentUpsertInfoForm({ id: "student_id_1" });

    const showSnackbar = jest.fn();
    const onSuccess = jest.fn();

    const wrapperRenderHook = () => {
        return renderHook(() => useUpdateStudent({ onSuccess }), {
            wrapper: TestCommonAppProvider,
        });
    };
    it("should return correct data", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));

        const wrapperHook = wrapperRenderHook();

        const {
            result: { current },
        } = wrapperHook;

        const result = await current.updateStudent({ data: mockStudentUpsertInfoForm });

        expect(result).toBeUndefined();
        expect(typeof current.updateStudent).toBe("function");
    });

    it("should return render correct onSuccess", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "student"; action: keyof typeof studentService["mutation"] }) =>
                (
                    options?: UseMutationOptions<
                        { data: UpsertStudentFormProps },
                        NsUsermgmtStudentService.UpdateStudentResp
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(
                                mockUpsetStudentResp,
                                {
                                    data: mockStudentUpsertInfoForm,
                                },
                                undefined
                            );
                        }),
                    };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const wrapperHook = wrapperRenderHook();

        const {
            result: { current },
        } = wrapperHook;

        await act(async () => {
            await current.updateStudent({ data: mockStudentUpsertInfoForm });
        });

        expect(showSnackbar).toBeCalledWith("You have updated the student successfully!");

        expect(onSuccess).toBeCalledTimes(1);
    });
});
