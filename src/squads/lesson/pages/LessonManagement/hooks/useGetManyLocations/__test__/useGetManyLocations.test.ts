import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    LocationListByIdsQuery,
    LocationListByIdsQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { createMockLocationManyList } from "src/squads/lesson/test-utils/lesson-management-list";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useGetManyLocations from "src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations/useGetManyLocations";

jest.mock("src/squads/lesson/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseQuery = (isSuccess: boolean) => {
    let ranCallBack = false;
    (inferQuery as jest.Mock).mockImplementation(
        (_: { entity: "locations"; action: "locationsGetMany" }) =>
            (
                _params: LocationListByIdsQueryVariables,
                options: UseQueryBaseOptions<LocationListByIdsQuery["locations"] | undefined>
            ) => {
                if (isSuccess) {
                    const data = createMockLocationManyList();
                    if (!ranCallBack) {
                        options?.onSuccess?.(data);
                        ranCallBack = true;
                    }
                    return { data, isLoading: false };
                } else {
                    if (!ranCallBack) {
                        options?.onError?.(Error("Fake query error"));
                        ranCallBack = true;
                    }
                    return { data: [], isLoading: false };
                }
            }
    );
};

describe("useGetManyLocations", () => {
    const { warn } = mockWarner();
    const showSnackbar = jest.fn();

    it("should query success", () => {
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useGetManyLocations(["locationId"]), {
            wrapper: TranslationProvider,
        });

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data).toMatchObject(createMockLocationManyList());
    });

    it("should query fail", () => {
        mockUseQuery(false);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useGetManyLocations(["locationId"]));

        expect(warn).toBeCalledWith("useGetManyLocation error: ", Error("Fake query error"));
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData Fake query error",
            "error"
        );
        expect(data).toMatchObject([]);
    });
});
