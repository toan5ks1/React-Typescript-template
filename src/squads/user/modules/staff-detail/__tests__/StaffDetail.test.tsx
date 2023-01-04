import { ArrayElement } from "src/common/constants/types";
import {
    User_StaffOneV2QueryVariables,
    User_StaffOneV2Query,
} from "src/squads/user/service/bob/bob-types";
import staffService from "src/squads/user/service/define-service/staff-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import {
    staffOneMockData,
    mockUseStaffInfoRulesReturn,
} from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import { render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useBreadcrumb from "src/hooks/useBreadcrumb";
import useDialog from "src/squads/user/hooks/useDialog";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import StaffDetail from "src/squads/user/modules/staff-detail/StaffDetail";
import useUpsertStaff, {
    UseUpsertStaffReturn,
} from "src/squads/user/modules/staff-upsert/hooks/useUpsertStaff";
import useUserGroupsList from "src/squads/user/modules/staff-upsert/hooks/useUserGroupsList";

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});
jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useDialog", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUpsertStaff", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/staff-upsert/hooks/useStaffInfoRules", () => {
    return {
        __esModule: true,
        default: () => mockUseStaffInfoRulesReturn,
    };
});

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUserGroupsList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("StaffDetail component", () => {
    const mockRefetch = jest.fn();
    const mockUseDialogReturn: ReturnType<typeof useDialog> = {
        open: false,
        onClose: jest.fn(),
        onOpen: jest.fn(),
    };
    const renderStaffDetail = (): RenderResult => {
        const wrapper: RenderResult = render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <StaffDetail id={staffOneMockData.staff_id} />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );

        return wrapper;
    };
    beforeEach(() => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: staffOneMockData,
            refetch: mockRefetch,
            isLoading: false,
        }));
        (useDialog as jest.Mock).mockReturnValue(mockUseDialogReturn);
        (useBreadcrumb as jest.Mock).mockReturnValue({
            breadcrumbs: [
                {
                    url: `/staff`,
                    name: "resources.staff.titles.staffManagement",
                },
            ],
            loading: false,
            loaded: true,
        });
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        (useUserGroupsList as jest.Mock<ReturnType<typeof useUserGroupsList>>).mockReturnValue({
            options: [],
            loading: false,
            setInputVal: jest.fn(),
        });
    });
    it("should match snapshot", () => {
        const wrapper = renderStaffDetail();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render Loading component when fetching staff detail", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: true,
        }));
        renderStaffDetail();
        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
    it("should render NotFound component when staff has no data", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
            data: undefined,
        }));
        renderStaffDetail();
        expect(screen.getByTestId("NotFound__root")).toBeInTheDocument();
    });
    it("should render header staff detail", () => {
        renderStaffDetail();
        expect(screen.getByTestId("HeaderStaffDetail")).toBeInTheDocument();
    });

    it("should render tab layout", () => {
        renderStaffDetail();
        expect(screen.getByTestId("TabLayout")).toBeInTheDocument();
    });
    it("should show error snackbar when fetch staff data failed", () => {
        const mockShowSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (_resource: {
                    entity: Parameters<typeof inferQuery>[0]["entity"];
                    action: keyof typeof staffService.query;
                }) =>
                (
                    _params: User_StaffOneV2QueryVariables,
                    _options?: UseQueryBaseOptions<
                        ArrayElement<User_StaffOneV2Query["staff"]> | undefined
                    >
                ) => {
                    _options?.onError?.(new Error("Fetch failed"));
                    return {
                        data: undefined,
                        refetch: mockRefetch,
                        isLoading: false,
                    };
                }
        );
        renderStaffDetail();
        expect(mockShowSnackbar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toBeCalledWith(
            "Unable to load data, please try again!: Fetch failed",
            "error"
        );
    });
    it("should call onOpen when click edit button on tab detail", () => {
        const mockOnOpenDialog = jest.fn();
        (useDialog as jest.Mock).mockImplementation(() => ({
            ...mockUseDialogReturn,
            onOpen: mockOnOpenDialog,
        }));
        renderStaffDetail();

        const editBtn = screen.getByTestId("TabStaffDetail__buttonEdit");
        userEvent.click(editBtn);

        expect(mockOnOpenDialog).toHaveBeenCalledTimes(1);
    });
    it("should call onClose when click cancel button on edit dialog", () => {
        const mockOnCloseDialog = jest.fn();
        (useDialog as jest.Mock).mockImplementation(() => ({
            ...mockUseDialogReturn,
            open: true,
            onClose: mockOnCloseDialog,
        }));
        (useUpsertStaff as jest.Mock<ReturnType<typeof useUpsertStaff>>).mockReturnValue({
            updateStaff: jest.fn(),
            createStaff: jest.fn(),
        });
        renderStaffDetail();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        const confirmDialog = screen.getByTestId("DialogWithHeaderFooter_wrapper");
        expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();

        userEvent.click(within(confirmDialog).getByTestId("FooterDialogConfirm__buttonSave"));
        expect(mockOnCloseDialog).toHaveBeenCalledTimes(1);
    });
    it("should call refetch staff detail when dialog submitted", async () => {
        const mockOnCloseDialog = jest.fn();
        const mockMutateFn = jest.fn();
        (useDialog as jest.Mock).mockReturnValue({
            ...mockUseDialogReturn,
            open: true,
            onClose: mockOnCloseDialog,
        });

        (useUpsertStaff as jest.Mock<ReturnType<typeof useUpsertStaff>>).mockImplementation(
            (): UseUpsertStaffReturn => ({
                updateStaff: async (data, options) => {
                    await options?.onSuccess?.(
                        { successful: true },
                        {} as NsUsermgmtStaffService.UpdateStaffReq,
                        undefined
                    );
                    await mockMutateFn(data, options);
                },
                createStaff: jest.fn(),
            })
        );

        renderStaffDetail();

        userEvent.click(screen.getByTestId(`FooterDialogConfirm__buttonSave`));

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledTimes(1);
        });

        expect(mockRefetch).toHaveBeenCalledTimes(1);
        expect(mockOnCloseDialog).toHaveBeenCalledTimes(1);
    });

    it("should render tab Time sheet settings", () => {
        const mockOnOpenDialog = jest.fn();
        (useDialog as jest.Mock).mockImplementation(() => ({
            ...mockUseDialogReturn,
            onOpen: mockOnOpenDialog,
        }));
        renderStaffDetail();

        const tabLayout = screen.getByTestId("TabLayout");
        const tablist = within(tabLayout).getByRole("tablist");

        userEvent.click(within(tablist).getByText("Timesheet Settings"));

        expect(screen.getByTestId(`StaffTimesheetSetting__title`)).toBeInTheDocument();
        expect(screen.getByText("Setting")).toBeInTheDocument();
    });
});
