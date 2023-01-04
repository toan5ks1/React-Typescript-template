import {
    Timesheet_LocationListByIdsQuery,
    Timesheet_LocationListByIdsQueryVariables,
} from "src/squads/timesheet/service/bob/bob-types";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { mockWarner } from "src/squads/timesheet/test-utils/warner";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryLocationList from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList";

jest.mock("src/squads/timesheet/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseQuery = (isSuccess: boolean) => {
    let ranCallBack = false;

    (inferQuery as jest.Mock).mockImplementation(
        () =>
            (
                _params: ListQuery<Timesheet_LocationListByIdsQueryVariables>,
                options: UseQueryBaseOptions<Timesheet_LocationListByIdsQuery["locations"]>
            ) => {
                if (isSuccess) {
                    if (!ranCallBack) {
                        options?.onSuccess?.(mockLocationListData);
                        ranCallBack = true;
                    }
                    return { data: mockLocationListData, isLoading: false };
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

describe("useQueryLocationList", () => {
    const { warn } = mockWarner();
    const showSnackbar = jest.fn();

    beforeEach(() => {
        mockUseQuery(true);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should query success with correct data", () => {
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useQueryLocationList({ keyword: "" }), {
            wrapper: TranslationProvider,
        });

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data[0]).toMatchObject({
            location_id: "location_0",
            name: "Location 0",
        });
    });

    it("should query fail", () => {
        mockUseQuery(false);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useQueryLocationList({ keyword: "" }));

        expect(warn).toBeCalledWith("fetch location list error: ", Error("Fake query error"));
        expect(showSnackbar).toBeCalledWith(
            "resources.message.unableToLoadData Fake query error",
            "error"
        );
        expect(data).toMatchObject([]);
    });
});
