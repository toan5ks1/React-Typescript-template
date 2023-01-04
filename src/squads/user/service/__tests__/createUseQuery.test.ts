import { safeStringify } from "src/common/utils/other";
import { ParentsManyQuery, ParentsManyQueryVariables } from "src/squads/user/service/bob/bob-types";
import {
    createUseQuery,
    UseQueryBaseOptions,
    UseQueryBaseV2Return,
} from "src/squads/user/service/service-creator";
import { TestQueryWrapper } from "src/squads/user/test-utils/providers";
import { mockWarner } from "src/squads/user/test-utils/warner";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { parents } from "src/squads/user/hooks/useParentMapStudent/__mocks__";

const service = {
    studentParent: {
        query: {
            LIST_WITH_FILTER: jest.fn(),
        },
    },
};

const defaultUseQueryParams: ParentsManyQueryVariables = {
    student_ids: ["student_id_1", "student_id_2"],
};

const defaultUseQueryOptions: UseQueryBaseOptions<ParentsManyQuery["student_parents"] | undefined> =
    {
        enabled: true,
    };

const renderUseQueryHook = (
    params: ParentsManyQueryVariables = defaultUseQueryParams,
    options: UseQueryBaseOptions<
        ParentsManyQuery["student_parents"] | undefined
    > = defaultUseQueryOptions
): RenderHookResult<
    unknown,
    UseQueryBaseV2Return<ParentsManyQuery["student_parents"] | undefined>
> => {
    const useQuery = createUseQuery(service)({
        entity: "studentParent",
        action: "LIST_WITH_FILTER",
    });

    return renderHook(() => useQuery(params, options), {
        wrapper: TestQueryWrapper,
    });
};

const mockStudentParentService = (
    studentParentData: ParentsManyQuery["student_parents"] | undefined = parents
) => {
    (service.studentParent.query.LIST_WITH_FILTER as jest.Mock).mockImplementation(
        (_variables: ParentsManyQueryVariables) => {
            return studentParentData;
        }
    );
};

describe("createUseQuery create infer query", () => {
    const std = mockWarner();

    it("should return correct data when infer query is called", async () => {
        mockStudentParentService();

        const { result, waitFor } = renderUseQueryHook();

        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledWith(defaultUseQueryParams);
        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(parents);
    });

    it("should be able to refetch the data", async () => {
        mockStudentParentService();

        const { result, waitFor } = renderUseQueryHook();

        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledWith(defaultUseQueryParams);
        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledTimes(1);

        await waitFor(() => Boolean(result.current.data));

        expect(result.current.data).toEqual(parents);

        await act(async () => {
            await result.current.refetch();
        });

        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledWith(defaultUseQueryParams);
        expect(service.studentParent.query.LIST_WITH_FILTER).toBeCalledTimes(2);
    });

    it("should log warning when service throw error", async () => {
        const studentParentError = Error("$$__Student parent service error");

        (service.studentParent.query.LIST_WITH_FILTER as jest.Mock).mockImplementation(
            (_variables: ParentsManyQueryVariables) => {
                throw studentParentError;
            }
        );

        const { waitForNextUpdate } = renderUseQueryHook();

        await waitForNextUpdate();

        const queryKey = ["studentParent_LIST_WITH_FILTER", { request: defaultUseQueryParams }];

        expect(std.warn).toBeCalledWith(`UseQuery ${safeStringify(queryKey)}`, studentParentError);
    });
});
