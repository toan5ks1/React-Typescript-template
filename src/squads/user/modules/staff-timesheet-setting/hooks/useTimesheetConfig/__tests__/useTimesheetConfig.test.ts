import {
    User_StaffTimesheetConfigQueryVariables,
    User_StaffTimesheetConfigQuery,
} from "src/squads/user/service/bob/bob-types";
import staffService from "src/squads/user/service/define-service/staff-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import { updateStaffSettingReq } from "src/squads/user/test-utils/mocks/staff";

import TranslationProvider from "src/squads/user/providers/TranslationProvider";

import useTimesheetConfig, { UseTimesheetConfigReturn } from "../useTimesheetConfig";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("useTimesheetConfig", () => {
    const showSnackbar = jest.fn();
    const staff = updateStaffSettingReq(false);
    const runRenderHook = () => {
        return renderHook(() => useTimesheetConfig(staff.staffId), {
            wrapper: TranslationProvider,
        });
    };

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });
    it("should show default value", () => {
        (inferQuery as jest.Mock).mockImplementation(() => () => {
            return {
                data: false,
                isLoading: false,
                refetch: jest.fn(),
            };
        });

        const {
            result: { current },
        } = runRenderHook();

        expect(current.data).toEqual(false);
    });

    it("should return correct timesheet config", () => {
        const useTimesheetConfigReturn: UseTimesheetConfigReturn = {
            data: false,
            isLoading: false,
            refetch: jest.fn(),
        };
        (inferQuery as jest.Mock).mockImplementation(() => () => useTimesheetConfigReturn);

        const {
            result: { current },
        } = runRenderHook();

        expect(inferQuery).toBeCalledWith({
            entity: "staff",
            action: "userGetTimesheetConfig",
        });
        expect(current).toMatchObject(useTimesheetConfigReturn);
    });

    it("should call onError when fetching timesheet config", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "staff"; action: keyof typeof staffService["query"] }) =>
                (
                    _params: User_StaffTimesheetConfigQueryVariables,
                    options: UseQueryBaseOptions<
                        User_StaffTimesheetConfigQuery["staff"] | undefined
                    >
                ) => {
                    if (resource.action === "userGetTimesheetConfig") {
                        if (!callbackRan) {
                            options.onError?.(Error("Error userGetTimesheetConfig"));
                            callbackRan = true;
                        }
                    }

                    return {
                        data: [],
                        isLoading: false,
                    };
                }
        );

        runRenderHook();

        expect(showSnackbar).toBeCalledWith(
            "Unable to load data, please try again!: Error userGetTimesheetConfig",
            "error"
        );
    });
});
