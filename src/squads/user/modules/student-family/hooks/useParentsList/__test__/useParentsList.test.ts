import { useParentsListDataMock as mockData } from "src/squads/user/test-utils/mocks/family";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useParentsList, {
    UseParentsListReturn,
} from "src/squads/user/modules/student-family/hooks/useParentsList";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: () => {
            const { useParentsListDataMock } = jest.requireActual(
                "src/squads/user/test-utils/mocks/family"
            );

            return () => ({
                isLoading: false,
                data: useParentsListDataMock,
            });
        },
    };
});

describe("useParentsList", () => {
    it("should return parent list", () => {
        const { result }: RenderHookResult<null, UseParentsListReturn> = renderHook(() =>
            useParentsList("")
        );

        expect(result.current.parents).toEqual(mockData);
    });
});
