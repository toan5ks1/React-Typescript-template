import {
    StudentListNavbar,
    StudentListNavbarProps,
} from "src/squads/user/modules/student-list/components";
import {
    StudentQrCodeByStudentIdsQuery,
    StudentQrCodeByStudentIdsQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentEntryExitService from "src/squads/user/service/define-service/student-entry-exit-service";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";
import { inferMutation, inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { UseMutationOptions } from "src/squads/user/service/service-creator";
import { TestQueryWrapper, TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { render, fireEvent, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGenerateStudentQrPdf, {
    UseGenerateStudentQrPdfReturn,
} from "src/squads/user/hooks/useGenerateStudentQrPdf";
import useUserFeatureToggle, { FeatureFlag } from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("react-redux", () => {
    const redux = jest.requireActual("react-redux");
    return {
        __esModule: true,
        ...redux,
        useDispatch: jest.fn(),
        useSelector: () => ({
            isImporting: false,
        }),
    };
});
// TODO: Remove once Print ActionPanel is available on UAT and prod
jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useGenerateStudentQrPdf", () => {
    return {
        __esModule: true,
        default: jest.fn(),
        generatePdf: jest.fn(),
    };
});

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferMutation: jest.fn(),
}));

const renderComponent = (props: StudentListNavbarProps) => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <MuiPickersUtilsProvider>
                    <StudentListNavbar {...props} />
                </MuiPickersUtilsProvider>
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

describe("<StudentListNavbar />", () => {
    const onSearch = jest.fn();
    const mockOnGenerate = jest.fn();
    const mockGeneratePdf = jest.fn();
    const props: StudentListNavbarProps = {
        filter: {
            keyword: "",
            grades: [],
            courses: [],
            isNotLogged: false,
        },
        onFilter: jest.fn(),
        refetch: jest.fn(),
        onSearch,
        onGenerate: mockOnGenerate,
        selectedStudents: [],
    };

    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["query"];
                }) =>
                (
                    _params: StudentQrCodeByStudentIdsQueryVariables,
                    _options?: UseQueryBaseOptions<
                        StudentQrCodeByStudentIdsQuery["student_qr"] | undefined
                    >
                ) => {
                    if (resource.entity === "studentEntryExit") {
                        return {
                            data: [
                                {
                                    student_id: "id01",
                                    qr_url: "public/images/iconDefault.png", // usable placeholder image
                                    qr_id: "qrid01",
                                },
                                {
                                    student_id: "id02",
                                    qr_url: "public/images/iconDefault.png", // usable placeholder image
                                    qr_id: "qrid02",
                                },
                            ],
                        };
                    }
                    return {
                        data: [],
                        isLoading: false,
                    };
                }
        );

        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    _options?: UseMutationOptions<
                        NsStudentEntryExitService.GenerateStudentQrCodesRequest,
                        NsStudentEntryExitService.GenerateStudentQrCodesResponse
                    >
                ) => {
                    return {
                        mutate: jest.fn(),
                    };
                }
        );

        (useGenerateStudentQrPdf as jest.Mock<UseGenerateStudentQrPdfReturn>).mockImplementation(
            () => ({
                generatePdf: mockGeneratePdf,
                isLoading: false,
            })
        );

        (useUserFeatureToggle as jest.Mock<boolean>).mockReturnValue(true);
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("should match snapshot", () => {
        const { container } = renderComponent(props);
        expect(container).toMatchSnapshot();
    });

    it("should render UI", () => {
        renderComponent(props);
        expect(screen.getByTestId("StudentListNavbar__root")).toBeInTheDocument();
        expect(screen.getByTestId("FormFilterAdvanced__root")).toBeInTheDocument();
        expect(screen.getByTestId("FormFilterAdvanced__textField")).toBeInTheDocument();
        expect(screen.getByTestId("ButtonDropdownWithPopover__button")).toBeInTheDocument();
        expect(screen.getByTestId("ButtonAddStudentDropdown")).toBeInTheDocument();
        expect(screen.getByTestId("ActionPanel__root")).toBeInTheDocument();
    });

    it("should search by student name", async () => {
        renderComponent(props);

        const textField = screen.getByTestId("FormFilterAdvanced__textField");
        const inputElement = textField.querySelector("input") as HTMLInputElement;

        expect(inputElement).toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: "123" } });
        fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });

        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith("123");
    });

    it("should render correct dialog add student", async () => {
        renderComponent(props);

        userEvent.click(screen.getByTestId("ButtonAddStudentDropdown"));
        expect(screen.getByTestId("ButtonAddStudentDropdown__popover")).toBeInTheDocument();
        userEvent.click(screen.getByText("New Student"));

        expect(await screen.findByTestId("FormStudentInfo__generalInfo")).toBeInTheDocument();
        expect(await screen.findByTestId("DialogFullScreenHF__container")).toBeInTheDocument();
    });

    it("should render dialog import student correctly", async () => {
        renderComponent(props);

        userEvent.click(screen.getByTestId("ButtonAddStudentDropdown"));
        expect(screen.getByTestId("ButtonAddStudentDropdown__popover")).toBeInTheDocument();
        userEvent.click(screen.getByText("Import Student"));

        const importStudentDialog = await screen.findByTestId("DialogWithHeaderFooter_wrapper");
        expect(importStudentDialog).toBeInTheDocument();
        expect(await within(importStudentDialog).findByText("Import from CSV")).toBeInTheDocument();
    });

    it("should render dialog import parent correctly", async () => {
        renderComponent(props);

        const buttonAction = screen.getByTestId("ActionPanel__trigger");
        userEvent.click(buttonAction);

        const buttonImportParents = document.querySelector(
            'button[data-value="importParents"]'
        ) as HTMLButtonElement;

        userEvent.click(buttonImportParents);

        expect(screen.getByTestId(`DialogWithHeaderFooter_wrapper`)).toBeInTheDocument();
    });

    it("should render new form with school when feature flag is enable", async () => {
        renderComponent(props);

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__button"));

        expect(await screen.findByTestId("FormFilterStudent__root")).toBeInTheDocument();

        expect(screen.queryByTestId("FormFilterAdvancedStudent__root")).not.toBeInTheDocument();
    });

    it("should render old form without school when feature flag is disable", async () => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockImplementation((args: FeatureFlag) => {
            return !Boolean(args === "STUDENT_MANAGEMENT_SCHOOL_HISTORY");
        });

        renderComponent(props);

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__button"));

        expect(await screen.findByTestId("FormFilterAdvancedStudent__root")).toBeInTheDocument();

        expect(screen.queryByTestId("FormFilterStudent__root")).not.toBeInTheDocument();
    });
});
