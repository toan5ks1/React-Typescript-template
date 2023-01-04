import { UpsertStudentFormProps } from "src/squads/user/common/types";
import studentService from "src/squads/user/service/define-service/student-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import {
    createMockStudentUpsertInfoForm,
    createStudentResp,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { DialogAccountInfoProps } from "src/squads/user/components/DialogAccountInfo";

import useCreateStudent from "../useCreateStudent";

import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

const mockStudentUpsertInfoForm = createMockStudentUpsertInfoForm({ id: "student_id_1" });

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

const showSnackbar = jest.fn();

const mockDialogAccountInfo: DialogAccountInfoProps["student"] = {
    email: "email@mail",
    password: "123",
    userId: "1",
};

const { student, studentPassword } = createStudentResp;
const dataMockSetAccountInfo: DialogAccountInfoProps["student"] = {
    email: student?.userProfile?.email,
    password: studentPassword,
    userId: student?.userProfile?.userId,
};

describe("useCreateStudent", () => {
    it("should return correct data", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));

        const { result } = renderHook(() => useCreateStudent(), {
            wrapper: TestCommonAppProvider,
        });

        const resp = await result.current.createStudent({ data: mockStudentUpsertInfoForm });

        expect(resp).toBeUndefined();
        expect(result.current.studentAccountInfo).toBeUndefined();
        expect(typeof result.current.createStudent).toBe("function");
        expect(typeof result.current.setStudentAccountInfo).toBe("function");

        act(() => {
            result.current.setStudentAccountInfo(mockDialogAccountInfo);
        });

        expect(JSON.stringify(result.current.studentAccountInfo)).toBe(
            JSON.stringify(mockDialogAccountInfo)
        );
    });

    it("should return render correct onSuccess", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: { entity: "student"; action: keyof typeof studentService["mutation"] }) =>
                (
                    options?: UseMutationOptions<
                        { data: UpsertStudentFormProps },
                        NsUsermgmtStudentService.CreateStudentResp
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(
                                createStudentResp,
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

        const { result } = renderHook(() => useCreateStudent(), {
            wrapper: TestCommonAppProvider,
        });

        await act(async () => {
            await result.current.createStudent({ data: mockStudentUpsertInfoForm });
        });
        expect(showSnackbar).toBeCalledWith("You have added the student successfully!");
        expect(JSON.stringify(result.current.studentAccountInfo)).toBe(
            JSON.stringify(dataMockSetAccountInfo)
        );
    });
});
