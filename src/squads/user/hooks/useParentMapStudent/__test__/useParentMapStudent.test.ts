import { ParentsManyQuery, ParentsManyQueryVariables } from "src/squads/user/service/bob/bob-types";
import studentParent from "src/squads/user/service/define-service/student-parents-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

import TranslationProvider from "src/squads/user/providers/TranslationProvider";

import { parents as mockData } from "../__mocks__";
import useParentMapStudent from "../useParentMapStudent";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useParentMapStudent", () => {
    const showSnackbar = jest.fn();
    it("should return parent list", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
            data: mockData,
        }));

        const { result } = renderHook(() => useParentMapStudent("student_id"), {
            wrapper: TranslationProvider,
        });

        expect(result.current.parents).toEqual(mockData);
    });
    it("should return no data", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
        }));

        const { result } = renderHook(() => useParentMapStudent("student_id"), {
            wrapper: TranslationProvider,
        });

        expect(result.current.parents).toEqual([]);
    });
    it("should show snackbar when fetching parent list fail", async () => {
        let callbackRan = false;
        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "studentParent"; action: keyof typeof studentParent["query"] }) =>
                (
                    _params: ListQuery<ParentsManyQueryVariables>,
                    options?: UseQueryBaseOptions<ParentsManyQuery[]>
                ) => {
                    if (!callbackRan) {
                        callbackRan = true;
                        options?.onError?.(new Error());
                        return { isLoading: false, data: [], refetch: jest.fn() };
                    }
                    return { isLoading: false, data: [], refetch: jest.fn() };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        const { result } = renderHook(() => useParentMapStudent("student_id"), {
            wrapper: TranslationProvider,
        });
        expect(result.current.parents).toEqual([]);
        expect(showSnackbar).toBeCalledWith("Cannot get parents list of a student");
    });
});
