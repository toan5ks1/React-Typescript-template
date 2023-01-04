import {
    inferQueryBob,
    inferQueryEntryExitMgmt,
    inferMutationBob,
    inferMutationEntryExitMgmt,
} from "src/squads/adobo/domains/entry-exit/services/infer-service";
import { PdfStudentQrCodesTypes } from "src/squads/user/common/constants/enum";
import { StudentListNavbar } from "src/squads/user/modules/student-list/components";
import {
    StudentQrCodeByStudentIdsQuery,
    StudentQrCodeByStudentIdsQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentEntryExitService from "src/squads/user/service/define-service/student-entry-exit-service";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";
import type {
    UseMutationOptions,
    UseQueryBaseOptions,
} from "src/squads/user/service/service-creator";
import {
    createMockListStudentWithFilter,
    createMockMapGradeOfStudents,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentListNavbarProps } from "../StudentListNavbar";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGenerateStudentQrPdf, {
    UseGenerateStudentQrPdfReturn,
} from "src/squads/user/hooks/useGenerateStudentQrPdf";
import { GradeStudent } from "src/squads/user/hooks/useGetGradeAndStatusOfStudents";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

const mockMappedGrades = ["student_id_01", "student_id_02"].map((item, index) =>
    createMockMapGradeOfStudents(item, index)
);
const mockMapGradeOfStudents = mockMappedGrades.reduce((defaultMapped, currentMapped) => {
    return new Map([...defaultMapped, ...currentMapped]);
}, new Map<GradeStudent["student_id"], GradeStudent>());

jest.mock("src/squads/user/modules/student-list/hooks/useNormalizeGrades", () => {
    return {
        __esModule: true,
        default: () => ({
            loading: false,
            mapGrades: mockMapGradeOfStudents,
            getGradeName: () => "",
        }),
    };
});

jest.mock("react-pdf");

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
jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/hooks/useGenerateStudentQrPdf", () => {
    return {
        __esModule: true,
        default: jest.fn(),
        generatePdf: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/services/infer-service", () => ({
    __esModule: true,
    inferQueryBob: jest.fn(),
    inferMutationBob: jest.fn(),
    inferQueryEntryExitMgmt: jest.fn(),
    inferMutationEntryExitMgmt: jest.fn(),
}));

const getExpectedDisabledCreateOrderButton = () => {
    const btnAction = screen.getByTestId("ActionPanel__trigger");

    userEvent.click(btnAction);

    expect(screen.getByTestId("ActionPanel__menuList")).toBeInTheDocument();

    const createOrderMenuItem = within(screen.getByTestId("ActionPanel__menuList")).getByRole(
        "menuitem",
        {
            name: "ra.common.action.createBulkOrder",
        }
    );
    expect(createOrderMenuItem).toHaveAttribute("aria-disabled", "true");
};

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
    const resetPaginationOffset = jest.fn();
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
    const shouldUseEntryExitMgmtQueries = useUserFeatureToggle(
        "ENTRY_EXIT_MANAGEMENT_USE_ENTRYEXITMGMT_QUERIES"
    );

    beforeEach(() => {
        (onSearch as jest.Mock).mockReturnValue(onSearch);
        (resetPaginationOffset as jest.Mock).mockReturnValue(resetPaginationOffset);

        shouldUseEntryExitMgmtQueries
            ? (inferQueryEntryExitMgmt as jest.Mock).mockImplementation(
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
                      }
              )
            : (inferQueryBob as jest.Mock).mockImplementation(
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
                      }
              );

        shouldUseEntryExitMgmtQueries
            ? (inferMutationEntryExitMgmt as jest.Mock).mockImplementation(
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
              )
            : (inferMutationBob as jest.Mock).mockImplementation(
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
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("should disable Print actions if there are no selected students", () => {
        renderComponent(props);

        const btnAction = screen.getByTestId("ActionPanel__trigger");

        userEvent.click(btnAction);

        expect(screen.getByTestId("ActionPanel__menuList")).toBeInTheDocument();

        const menuitems = within(screen.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem"
        );

        //TODO: @e&e please help me update this. Because user added new item in the ActionPanel
        menuitems.slice(0, 2).forEach((item) => {
            expect(item).toHaveAttribute("aria-disabled", "true");
        });
    });

    it("should call generatePdf with studentCard when clicking Print as Student Card", async () => {
        (useGenerateStudentQrPdf as jest.Mock<UseGenerateStudentQrPdfReturn>).mockImplementation(
            (_, mockOnGenerate) => {
                return {
                    generatePdf: mockGeneratePdf.mockImplementation(() => {
                        mockOnGenerate();
                    }),
                    isLoading: true,
                };
            }
        );
        const mockStudents = createMockListStudentWithFilter("id01");
        renderComponent({ ...props, selectedStudents: mockStudents });

        const btnAction = screen.getByTestId("ActionPanel__trigger");

        userEvent.click(btnAction);

        expect(screen.getByTestId("ActionPanel__menuList")).toBeInTheDocument();

        const menuitems = within(screen.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem"
        );
        userEvent.click(menuitems[0]);

        await waitFor(() => {
            expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
        });

        expect(mockGeneratePdf).toBeCalledWith(PdfStudentQrCodesTypes.STUDENT_CARD);
        expect(mockOnGenerate).toBeCalledTimes(1);
    });

    it("should call generatePdf with qrCodeSheet when clicking Print as QR Code Sheet", async () => {
        (useGenerateStudentQrPdf as jest.Mock<UseGenerateStudentQrPdfReturn>).mockImplementation(
            (_, mockOnGenerate) => {
                return {
                    generatePdf: mockGeneratePdf.mockImplementation(() => {
                        mockOnGenerate();
                    }),
                    isLoading: true,
                };
            }
        );
        const mockStudents = createMockListStudentWithFilter("id01");
        renderComponent({ ...props, selectedStudents: mockStudents });

        const btnAction = screen.getByTestId("ActionPanel__trigger");

        userEvent.click(btnAction);

        expect(screen.getByTestId("ActionPanel__menuList")).toBeInTheDocument();

        const menuitems = within(screen.getByTestId("ActionPanel__menuList")).getAllByRole(
            "menuitem"
        );
        userEvent.click(menuitems[1]);

        await waitFor(() => {
            expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
        });

        expect(mockGeneratePdf).toBeCalledWith(PdfStudentQrCodesTypes.QR_CODE_SHEET);
        expect(mockOnGenerate).toBeCalledTimes(1);
    });

    // PAYMENT BULK ORDER FEATURE TEST CASES
    it("should disable create order action if there are no selected students", () => {
        renderComponent(props);

        getExpectedDisabledCreateOrderButton();
    });

    it("should disable create order action if current grade of selected students isn't the same", () => {
        const mockStudents = ["student_id_01", "student_id_02"].map(
            (item) => createMockListStudentWithFilter(item)[0]
        );
        renderComponent({ ...props, selectedStudents: mockStudents });
        getExpectedDisabledCreateOrderButton();
    });
});
