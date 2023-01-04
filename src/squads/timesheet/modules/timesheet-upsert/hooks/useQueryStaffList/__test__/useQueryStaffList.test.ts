import {
    Timesheet_StaffListV2QueryVariables,
    Timesheet_StaffListV2Query,
} from "src/squads/timesheet/service/bob/bob-types";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { ListQuery } from "src/squads/timesheet/service/service-types";
import { mockStaffListDataV2 } from "src/squads/timesheet/test-utils/mocks/staff";
import { mockWarner } from "src/squads/timesheet/test-utils/warner";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useQueryStaffList from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList";

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
                _params: ListQuery<Timesheet_StaffListV2QueryVariables>,
                options: UseQueryBaseOptions<Timesheet_StaffListV2Query["staff"]>
            ) => {
                if (isSuccess) {
                    if (!ranCallBack) {
                        options?.onSuccess?.(mockStaffListDataV2);
                        ranCallBack = true;
                    }
                    return { data: mockStaffListDataV2, isLoading: false };
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

describe("useQueryStaffList", () => {
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
        } = renderHook(() => useQueryStaffList({ keyword: "" }), {
            wrapper: TranslationProvider,
        });

        expect(warn).not.toBeCalled();
        expect(showSnackbar).not.toBeCalled();
        expect(data[0]).toMatchObject({
            staff_id: "staff_0",
            user: {
                name: "Staff 0",
                email: "staff-0@manabie.com",
            },
        });
    });

    it("should query fail", () => {
        mockUseQuery(false);

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useQueryStaffList({ keyword: "" }));

        expect(warn).toBeCalledWith("fetch staff list error: ", Error("Fake query error"));
        expect(showSnackbar).toBeCalledWith(
            "resources.message.unableToLoadData Fake query error",
            "error"
        );
        expect(data).toMatchObject([]);
    });
});
