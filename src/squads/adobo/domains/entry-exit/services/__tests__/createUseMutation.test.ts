import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import {
    createUseMutation,
    UseMutationOptions,
} from "src/squads/adobo/domains/entry-exit/services/service-creator";
import { TestQueryWrapper } from "src/squads/adobo/domains/entry-exit/test-utils/react-hooks";

import { act, renderHook } from "@testing-library/react-hooks";

const service = {
    studentEntryExit: {
        mutation: {
            CREATE: jest.fn(),
        },
    },
};

const scanResponse: NsStudentEntryExitService.ScanResponse = {
    touchEvent: 0,
    successful: true,
    parentNotified: false,
    studentName: "Scan the Student",
};

const scanRequest: NsStudentEntryExitService.ScanRequest = {
    qrcodeContent: "qrcodeContent",
    touchTime: new Date(),
};

const defaultUseMutationParams = scanRequest;

const renderUseMutationHook = (
    options?: UseMutationOptions<
        NsStudentEntryExitService.ScanRequest,
        NsStudentEntryExitService.ScanResponse
    >
) => {
    const useMutation = createUseMutation(service)({
        entity: "studentEntryExit",
        action: "CREATE",
    });
    return renderHook(() => useMutation(options), {
        wrapper: TestQueryWrapper,
    });
};

const mockEntryExitService = (
    entryExitResponse: NsStudentEntryExitService.ScanResponse = scanResponse
) => {
    (service.studentEntryExit.mutation.CREATE as jest.Mock).mockImplementation(
        (
            _variables: NsStudentEntryExitService.ScanRequest
        ): NsStudentEntryExitService.ScanResponse => {
            return entryExitResponse;
        }
    );
};

describe("createUseMutation create infer mutation", () => {
    it("should return correct data when called", async () => {
        mockEntryExitService();

        const { result, waitForNextUpdate } = renderUseMutationHook();

        act(() => {
            result.current.mutate(defaultUseMutationParams);
        });

        await waitForNextUpdate();

        expect(service.studentEntryExit.mutation.CREATE).toBeCalledWith(defaultUseMutationParams);
        expect(result.current.data).toEqual(scanResponse);
    });

    it("should call lifecycle hooks correctly", async () => {
        mockEntryExitService();

        const options: UseMutationOptions<
            NsStudentEntryExitService.ScanRequest,
            NsStudentEntryExitService.ScanResponse
        > = {
            onSuccess: jest.fn(),
        };

        const { result, waitForNextUpdate } = renderUseMutationHook(options);

        act(() => {
            result.current.mutate(defaultUseMutationParams);
        });
        await waitForNextUpdate();

        expect(service.studentEntryExit.mutation.CREATE).toBeCalledWith(defaultUseMutationParams);
        expect(options.onSuccess).toBeCalledWith(scanResponse, defaultUseMutationParams, undefined);
    });
});
