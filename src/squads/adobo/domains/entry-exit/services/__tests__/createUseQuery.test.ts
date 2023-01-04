import { safeStringify } from "src/common/utils/other";
import {
    UseQueryBaseOptions,
    UseQueryBaseV2Return,
} from "src/squads/adobo/domains/entry-exit/hooks/data/data-types";
import {
    StudentQrCodeByStudentIdsQuery,
    StudentQrCodeByStudentIdsQueryVariables,
} from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service-bob/bob-types";
import { createUseQuery } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import { TestQueryWrapper } from "src/squads/adobo/domains/entry-exit/test-utils/react-hooks";
import { mockWarner } from "src/squads/adobo/domains/entry-exit/test-utils/warner";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

const studentQrs = [
    {
        qr_url: "qrurl.com",
        qr_id: 1,
        student_id: "id",
    },
];

const service = {
    studentEntryExit: {
        query: {
            LIST_WITH_FILTER: jest.fn(),
        },
    },
};

const defaultUseQueryParams: StudentQrCodeByStudentIdsQueryVariables = {
    student_ids: ["student_id_1", "student_id_2"],
};

const defaultUseQueryOptions: UseQueryBaseOptions<
    StudentQrCodeByStudentIdsQuery["student_qr"] | undefined
> = {
    enabled: true,
};

const renderUseQueryHook = (
    params: StudentQrCodeByStudentIdsQueryVariables = defaultUseQueryParams,
    options: UseQueryBaseOptions<
        StudentQrCodeByStudentIdsQuery["student_qr"] | undefined
    > = defaultUseQueryOptions
): RenderHookResult<
    unknown,
    UseQueryBaseV2Return<StudentQrCodeByStudentIdsQuery["student_qr"] | undefined>
> => {
    const useQuery = createUseQuery(service)({
        entity: "studentEntryExit",
        action: "LIST_WITH_FILTER",
    });

    return renderHook(() => useQuery(params, options), {
        wrapper: TestQueryWrapper,
    });
};

const mockStudentQrsService = (
    studentQrsData: StudentQrCodeByStudentIdsQuery["student_qr"] | undefined = studentQrs
) => {
    (service.studentEntryExit.query.LIST_WITH_FILTER as jest.Mock).mockImplementation(
        (_variables: StudentQrCodeByStudentIdsQueryVariables) => {
            return studentQrsData;
        }
    );
};

describe("createUseQuery create infer query", () => {
    const std = mockWarner();

    it("should return correct data when infer query is called", async () => {
        mockStudentQrsService();

        const { result, waitFor } = renderUseQueryHook();

        expect(service.studentEntryExit.query.LIST_WITH_FILTER).toBeCalledWith(
            defaultUseQueryParams
        );
        expect(service.studentEntryExit.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(studentQrs);
    });

    it("should be able to refetch the data", async () => {
        mockStudentQrsService();

        const { result, waitFor } = renderUseQueryHook();

        expect(service.studentEntryExit.query.LIST_WITH_FILTER).toBeCalledWith(
            defaultUseQueryParams
        );
        expect(service.studentEntryExit.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(studentQrs);

        await act(async () => {
            await result.current.refetch();
        });

        expect(service.studentEntryExit.query.LIST_WITH_FILTER).toBeCalledWith(
            defaultUseQueryParams
        );
        expect(service.studentEntryExit.query.LIST_WITH_FILTER).toBeCalledTimes(2);
    });

    it("should log warning when service throw error", async () => {
        const studentEntryExitError = Error("$$__Student entry exit error");

        (service.studentEntryExit.query.LIST_WITH_FILTER as jest.Mock).mockImplementation(
            (_variables: StudentQrCodeByStudentIdsQuery) => {
                throw studentEntryExitError;
            }
        );

        const { waitForNextUpdate } = renderUseQueryHook();

        await waitForNextUpdate();

        const queryKey = ["studentEntryExit_LIST_WITH_FILTER", { request: defaultUseQueryParams }];

        expect(std.warn).toBeCalledWith(
            `UseQuery ${safeStringify(queryKey)}`,
            studentEntryExitError
        );
    });
});
