import { useHistory, useLocation } from "react-router";
import { combineDateAndTime } from "src/common/utils/time";
import {
    inferQueryPaginationBob as adoboInferQueryPaginationBob,
    inferMutation as adoboInferMutation,
} from "src/squads/adobo/domains/entry-exit/services/infer-service";
import { EntryExitRecordFormData } from "src/squads/user/common/types/entry-exit";
import studentEntryExit from "src/squads/user/service/define-service/student-entry-exit-service";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";
import { inferMutation, inferQueryPagination } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import {
    getMockEntryExitRecordFormData,
    getMockEntryExitRecordsData,
    getMockEntryExitRecordsPagination,
} from "src/squads/user/test-utils/mocks/entry-exit";
import { getMockInvoicePagination } from "src/squads/user/test-utils/mocks/invoice";
import { createMockListParent, createMockStudent } from "src/squads/user/test-utils/mocks/student";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
    TestStudentDetailProvider,
} from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentDetail } from "../StudentDetail";

import { render, waitFor, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// TODO: Move useBreadcrumb in component in Phase - 2
import useBreadcrumb from "src/hooks/useBreadcrumb";
import useReissueUserPassword from "src/squads/user/hooks/useReissueUserPassword";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useQueryStudentCourse, {
    UseQueryStudentCourseReturn,
} from "src/squads/user/modules/student-course/hooks/useQueryStudentCourse";
import useNormalizeStudentDetail, {
    UseNormalizeStudentDetailReturn,
} from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";
import useStudentDetailHomeAddress, {
    useStudentDetailHomeAddressReturn,
} from "src/squads/user/modules/student-detail/hooks/useStudentDetailHomeAddress";
import useRemoveParent from "src/squads/user/modules/student-family/hooks/useRemoveParent";

const student = createMockStudent({ id: "student_id_01", current_grade: 10 });
const mockDataParents = createMockListParent({ length: 2, student_id: "student_id" });

// jest mock
jest.mock("src/squads/user/hooks/useFeatureController");

jest.mock("src/squads/user/hooks/useMapTreeLocations");

jest.mock("src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-detail/hooks/useStudentDetailHomeAddress", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/hooks/useBreadcrumb", () => jest.fn());

jest.mock("src/squads/user/hooks/useReissueUserPassword", () => jest.fn());

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/user/hooks/useParentMapStudent", () => ({
    __esModule: true,
    default: () => ({
        parents: mockDataParents,
        isLoading: false,
    }),
}));

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/services/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
        inferQueryPaginationBob: jest.fn(),
    };
});

jest.mock("src/squads/user/modules/student-course/hooks/useQueryStudentCourse", () => jest.fn());

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
        useLocation: jest.fn(),
    };
});

jest.mock("src/squads/user/modules/student-family/hooks/useRemoveParent", () => jest.fn());

// TODO: @payment team will remove it when Order is available in UAT and Prod
// TODO: @invoice team will remove once Invoice features are available in UAT and Prod
jest.mock("src/squads/user/hooks/useUserFeatureFlag");

//render component
const renderComponent = (reIssuePassword?: boolean) => {
    const reissueUserPassword = jest.fn(() => {
        return {
            successful: reIssuePassword ?? true,
            userId: "01F4V8P0M4TSYP4DQK0WEFB53R",
            newPassword: "EFB53R",
        };
    });

    (useReissueUserPassword as jest.Mock).mockReturnValue({ reissueUserPassword });

    return render(
        <MuiPickersUtilsProvider>
            <TestCommonAppProvider>
                <TestStudentDetailProvider>
                    <TestQueryWrapper>
                        <StudentDetail />
                    </TestQueryWrapper>
                </TestStudentDetailProvider>
            </TestCommonAppProvider>
        </MuiPickersUtilsProvider>
    );
};

const handleOpenDialogConfirmReIssuePassword = (): HTMLElement => {
    const buttonAction = screen.getByTestId("ActionPanel__trigger");

    userEvent.click(buttonAction);

    const buttonReIssuePassword = document.querySelector(
        'button[data-value="reIssuePassword"]'
    ) as HTMLButtonElement;

    userEvent.click(buttonReIssuePassword);

    const confirmDialog = screen.getByTestId(`DialogCancelConfirm__dialog`);

    return confirmDialog;
};

//Test cases
describe("<StudentDetail />", () => {
    const mockUseNormalizeStudentDetailReturn: UseNormalizeStudentDetailReturn = {
        isLoading: false,
        student,
        refetch: jest.fn(),
    };
    const mockUseQueryStudentCourse: UseQueryStudentCourseReturn = {
        courses: [],
        loaded: true,
        refetch: jest.fn(),
    };

    const mockUseStudentDetailHomeAddressReturn: useStudentDetailHomeAddressReturn = {
        isLoading: false,
        homeAddress: mockUserAddressList[0],
        refetch: jest.fn(),
    };

    beforeEach(() => {
        (useNormalizeStudentDetail as jest.Mock<UseNormalizeStudentDetailReturn>).mockReturnValue(
            mockUseNormalizeStudentDetailReturn
        );
        (
            useStudentDetailHomeAddress as jest.Mock<useStudentDetailHomeAddressReturn>
        ).mockReturnValue(mockUseStudentDetailHomeAddressReturn);

        (useBreadcrumb as jest.Mock).mockReturnValue({
            breadcrumbs: [
                {
                    url: `/user/students_erp`,
                    name: "resources.students_erp.titles.studentManagement",
                },
            ],
            loading: false,
            loaded: true,
        });
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));

        (useQueryStudentCourse as jest.Mock<UseQueryStudentCourseReturn>).mockReturnValue(
            mockUseQueryStudentCourse
        );
    });

    it("should render to match snapshot ", () => {
        const wrapper = renderComponent();
        //TODO: Need to update toMatchSnapshot when we clone component in Phase-2
        expect(wrapper.container).toMatchSnapshot();
        handleOpenDialogConfirmReIssuePassword();
    });

    it("should render NotFound component when student has no data", () => {
        (useNormalizeStudentDetail as jest.Mock).mockReturnValue({
            ...mockUseNormalizeStudentDetailReturn,
            student: undefined,
        });
        renderComponent();
        expect(screen.getByTestId("NotFound__root")).toBeInTheDocument();
    });

    it("should render correct header student detail", () => {
        renderComponent();
        expect(screen.getByTestId("HeaderStudentDetail")).toBeInTheDocument();
    });

    it("should render correct tab layout", () => {
        renderComponent();
        expect(screen.getByTestId("TabLayout")).toBeInTheDocument();
    });

    it("should render correct dialog confirm re issue password", () => {
        renderComponent();

        const confirmDialog = handleOpenDialogConfirmReIssuePassword();

        expect(confirmDialog).toBeInTheDocument();
    });

    it("should close dialog confirm re issue password", async () => {
        renderComponent();

        const renderConfirmDialog = handleOpenDialogConfirmReIssuePassword();

        const buttonCancel = within(renderConfirmDialog).getByTestId(
            `FooterDialogConfirm__buttonClose`
        );

        userEvent.click(buttonCancel);

        await waitFor(() => {
            expect(screen.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument();
        });
    });

    it("should render correctly when use re-issue password successfully", async () => {
        renderComponent();

        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);

        const renderConfirmDialog = handleOpenDialogConfirmReIssuePassword();

        const buttonConfirm = within(renderConfirmDialog).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );

        userEvent.click(buttonConfirm);

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("You have reissued the password successfully!");
        });
    });

    it("should render correctly when use re-issue password failed", async () => {
        const showSnackbar = jest.fn();

        renderComponent(false);

        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);

        const renderConfirmDialog = handleOpenDialogConfirmReIssuePassword();

        const buttonConfirm = within(renderConfirmDialog).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );

        userEvent.click(buttonConfirm);

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith(
                "You have failed to reissue the password. Please try again later!",
                "error"
            );
        });
    });

    it("should render upsert student", () => {
        renderComponent();

        const buttonEdit = screen.getByTestId("TabStudentDetail__buttonEdit");

        userEvent.click(buttonEdit);

        expect(screen.getByTestId("DialogFullScreenHF__container")).toBeInTheDocument();
        expect(screen.getByText("Detail Info")).toBeInTheDocument();
    });

    it("should render tab family ", () => {
        (useRemoveParent as jest.Mock).mockImplementation(() => jest.fn());

        renderComponent();

        const tabLayout = screen.getByTestId("TabLayout");
        const tablist = within(tabLayout).getByRole("tablist");

        userEvent.click(within(tablist).getByText("Family"));

        expect(screen.getByTestId(`StudentFamily__title`)).toBeInTheDocument();
        expect(screen.getByText("Family Info")).toBeInTheDocument();
    });

    it("should render tab course", () => {
        renderComponent();

        const tabLayout = screen.getByTestId("TabLayout");
        const tablist = within(tabLayout).getByRole("tablist");

        userEvent.click(within(tablist).getByText("Course"));

        expect(screen.getByTestId(`StudentCourseNavbar__title`)).toBeInTheDocument();
        expect(screen.getByText("Course Detail")).toBeInTheDocument();
    });

    it("should render tab entry and exit", () => {
        const mockResponse: NsStudentEntryExitService.CreateEntryExitResponse = {
            message: "Successfully created",
            parentNotified: true,
            successful: true,
        };
        const mockDate = "2022-03-02T07:00:00.000Z";

        const mockRecordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(mockDate);

        const payload: NsStudentEntryExitService.EntryExitPayload = {
            entryDateTime: combineDateAndTime(mockRecordForm.entryDate, mockRecordForm.entryTime),
            studentId: mockRecordForm.studentId,
            notifyParents: true,
        };

        const toAddRecord: NsStudentEntryExitService.CreateEntryExitRequest = {
            entryExitPayload: payload,
            ...payload,
        };
        (adoboInferQueryPaginationBob as jest.Mock).mockImplementation(() => () => {
            return {
                data: getMockEntryExitRecordsData(),
                result: {
                    isLoading: false,
                    refetch: jest.fn(),
                },
                pagination: getMockEntryExitRecordsPagination(),
            };
        });
        (adoboInferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExit.mutation;
                }) =>
                (
                    options: UseMutationOptions<
                        NsStudentEntryExitService.CreateEntryExitRequest,
                        NsStudentEntryExitService.CreateEntryExitResponse
                    >
                ) => {
                    return {
                        mutateAsync: jest.fn(async () => {
                            await options?.onSuccess?.(mockResponse, toAddRecord, undefined);
                        }),
                    };
                }
        );
        renderComponent();

        const tabLayout = screen.getByTestId("TabLayout");
        const tablist = within(tabLayout).getByRole("tablist");
        userEvent.click(within(tablist).getByText("Entry & Exit"));

        expect(screen.getByTestId(`StudentEntryExit__title`)).toBeInTheDocument();
        expect(screen.getByText("Entry & Exit History")).toBeInTheDocument();
    });

    it("should render tab invoice", () => {
        (inferQueryPagination as jest.Mock).mockImplementation(() => () => {
            return {
                data: [],
                result: {
                    isLoading: false,
                },
                pagination: getMockInvoicePagination(),
            };
        });

        (inferMutation as jest.Mock).mockImplementation(() => () => {
            return {
                mutate: jest.fn(),
            };
        });

        renderComponent();

        const tabLayout = screen.getByTestId("TabLayout");
        const tablist = within(tabLayout).getByRole("tablist");

        userEvent.click(within(tablist).getByText("Invoice"));

        expect(screen.getByTestId(`StudentInvoice__title`)).toBeInTheDocument();
    });
});

describe("<StudentDetail /> with create order of Payment Squad", () => {
    it("should call history.push to create order page", () => {
        const mockUseNormalizeStudentDetailReturn: UseNormalizeStudentDetailReturn = {
            isLoading: false,
            student,
            refetch: jest.fn(),
        };
        const mockUseQueryStudentCourse: UseQueryStudentCourseReturn = {
            courses: [],
            loaded: true,
            refetch: jest.fn(),
        };

        const mockUseStudentDetailHomeAddressReturn: useStudentDetailHomeAddressReturn = {
            isLoading: false,
            homeAddress: mockUserAddressList[0],
            refetch: jest.fn(),
        };

        const historyPush = jest.fn();
        const locationPathName = "studentDetail";
        const locationSearch = "?tab=test";

        (useNormalizeStudentDetail as jest.Mock<UseNormalizeStudentDetailReturn>).mockReturnValue(
            mockUseNormalizeStudentDetailReturn
        );

        (
            useStudentDetailHomeAddress as jest.Mock<useStudentDetailHomeAddressReturn>
        ).mockReturnValue(mockUseStudentDetailHomeAddressReturn);

        (useBreadcrumb as jest.Mock).mockReturnValue({
            breadcrumbs: [
                {
                    url: `/students_erp`,
                    name: "resources.students_erp.titles.studentManagement",
                },
            ],
            loading: false,
            loaded: true,
        });

        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: jest.fn(),
        }));

        (useQueryStudentCourse as jest.Mock<UseQueryStudentCourseReturn>).mockReturnValue(
            mockUseQueryStudentCourse
        );

        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        (useLocation as jest.Mock).mockImplementation(() => ({
            pathname: locationPathName,
            search: locationSearch,
        }));

        const wrapper = renderComponent();

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        // TODO: PAYMENT will update after clone components to squad
        userEvent.click(wrapper.getByText("ra.common.action.createNewOrder"));

        expect(historyPush).toBeCalledWith({
            pathname: "/payment/orders/create",
            search: `?studentId=${student.student_id}&redirectUrl=${locationPathName}${locationSearch}`,
        });
    });
});
