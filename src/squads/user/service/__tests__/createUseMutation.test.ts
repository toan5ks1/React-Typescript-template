import { createUseMutation, UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import {
    createMockStudentGeneralInfoForm,
    createStudentResp,
} from "src/squads/user/test-utils/mocks/student";
import { TestQueryWrapper } from "src/squads/user/test-utils/providers";

import { act, renderHook } from "@testing-library/react-hooks";

const service = {
    student: {
        mutation: {
            CREATE: jest.fn(),
        },
    },
};

const defaultUseMutationParams = createMockStudentGeneralInfoForm();

const renderUseMutationHook = (
    options?: UseMutationOptions<
        NsUsermgmtStudentService.UpsertStudentFormPropsReq,
        NsUsermgmtStudentService.CreateStudentResp | undefined
    >
) => {
    const useMutation = createUseMutation(service)({
        entity: "student",
        action: "CREATE",
    });
    return renderHook(() => useMutation(options), {
        wrapper: TestQueryWrapper,
    });
};

const mockStudentService = (
    studentResponse: NsUsermgmtStudentService.CreateStudentResp = createStudentResp
) => {
    (service.student.mutation.CREATE as jest.Mock).mockImplementation(
        (
            _variables: NsUsermgmtStudentService.UpsertStudentFormPropsReq
        ): NsUsermgmtStudentService.CreateStudentResp => {
            return studentResponse;
        }
    );
};

describe("createUseMutation create infer mutation", () => {
    it("should return correct data when called", async () => {
        mockStudentService();

        const { result, waitForNextUpdate } = renderUseMutationHook();

        act(() => {
            result.current.mutate({ generalInfo: defaultUseMutationParams });
        });

        await waitForNextUpdate();

        expect(service.student.mutation.CREATE).toBeCalledWith({
            generalInfo: defaultUseMutationParams,
        });
        expect(result.current.data).toEqual(createStudentResp);
    });

    it("should call lifecycle hooks correctly", async () => {
        mockStudentService();

        const options: UseMutationOptions<
            NsUsermgmtStudentService.UpsertStudentFormPropsReq,
            NsUsermgmtStudentService.CreateStudentResp | undefined
        > = {
            onSuccess: jest.fn(),
        };

        const { result, waitForNextUpdate } = renderUseMutationHook(options);

        act(() => {
            result.current.mutate({ generalInfo: defaultUseMutationParams });
        });
        await waitForNextUpdate();

        expect(service.student.mutation.CREATE).toBeCalledWith({
            generalInfo: defaultUseMutationParams,
        });
        expect(options.onSuccess).toBeCalledWith(
            createStudentResp,
            {
                generalInfo: defaultUseMutationParams,
            },
            undefined
        );
    });
});
