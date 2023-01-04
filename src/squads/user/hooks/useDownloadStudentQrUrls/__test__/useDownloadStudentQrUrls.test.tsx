import {
    EntryExit_StudentQrCodeByStudentIdsV2Query,
    EntryExit_StudentQrCodeByStudentIdsV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentEntryExitSerivce from "src/squads/user/service/define-service/student-entry-exit-service";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";
import { inferQuery, inferMutation } from "src/squads/user/service/infer-service";
import type {
    UseQueryBaseOptions,
    UseMutationOptions,
} from "src/squads/user/service/service-creator";
import { createMockListStudentWithFilter } from "src/squads/user/test-utils/mocks/student";
import { TestQueryWrapper } from "src/squads/user/test-utils/providers";
import { mockWarner } from "src/squads/user/test-utils/warner";

import { act, renderHook } from "@testing-library/react-hooks";
import useDownloadStudentQrUrls from "src/squads/user/hooks/useDownloadStudentQrUrls";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

interface MockLink {
    href: string;
    click: jest.Mock<any, any>;
    download: string;
    setAttribute: jest.Mock<any, any>;
}

jest.mock("react-redux", () => {
    return {
        __esModule: true,
        ...jest.requireActual("react-redux"),
        useDispatch: jest.fn(),
    };
});

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferMutation: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockInferMutation = (isSuccess: boolean) => {
    const mockMutateData: NsStudentEntryExitService.GenerateStudentQrCodesRequest = {
        studentIdsList: ["id01", "id02"],
    };
    (inferMutation as jest.Mock).mockImplementation(
        (_resource: {
                entity: "studentEntryExit";
                action: keyof typeof studentEntryExitSerivce["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    NsStudentEntryExitService.GenerateStudentQrCodesRequest,
                    NsStudentEntryExitService.GenerateStudentQrCodesResponse
                >
            ) => {
                return {
                    mutate: jest.fn(async () => {
                        isSuccess
                            ? await options?.onSuccess?.(
                                  {
                                      qrCodesList: [
                                          {
                                              studentId: "id01",
                                              url: "qr url",
                                          },
                                      ],
                                      errorsList: [],
                                  },
                                  mockMutateData,
                                  undefined
                              )
                            : await options?.onError?.(
                                  Error("ERROR_STUDENT_GENERATE_QR_CODES"),
                                  mockMutateData,
                                  undefined
                              );
                    }),
                };
            }
    );
};

describe("useDownloadStudentQrUrls", () => {
    const mockOnGenerate = jest.fn();
    const showSnackbar = jest.fn();
    const mockRefetchFn = jest.fn();
    const mockStudents = createMockListStudentWithFilter("id01");

    const std = mockWarner();

    const selectedStudents = [
        mockStudents[0],
        {
            user_id: "id02",
            name: "id02",
            email: "id02@manabie.com",
            phone_number: null,
            country: "COUNTRY_JP",
            last_login_date: null,
            resource_path: "-2147483644",
        },
    ];

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitSerivce["query"];
                }) =>
                (
                    _params: EntryExit_StudentQrCodeByStudentIdsV2QueryVariables,
                    _options?: UseQueryBaseOptions<
                        EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"] | undefined
                    >
                ) => {
                    if (resource.entity === "studentEntryExit") {
                        return {
                            data: [
                                {
                                    student_id: "id01",
                                    qr_url: "public/images/iconDefault.png", // usable placeholder image
                                    qr_id: "qrid01",
                                    version: "v2",
                                },
                                {
                                    student_id: "id02",
                                    qr_url: "public/images/iconDefault.png", // usable placeholder image
                                    qr_id: "qrid02",
                                    version: "v2",
                                },
                            ],
                            refetch: mockRefetchFn,
                        };
                    }
                }
        );

        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitSerivce["mutation"];
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
    });

    it("should download the csv when students are selected", async () => {
        const {
            result: { current },
        } = renderHook(() => useDownloadStudentQrUrls(selectedStudents, mockOnGenerate), {
            wrapper: TestQueryWrapper,
        });

        const mockCsvUrl = "mockCsvUrl";

        window.URL.createObjectURL = jest.fn(() => mockCsvUrl);

        const mockLink: MockLink = {
            href: "",
            click: jest.fn(),
            download: "",
            setAttribute: jest.fn(),
        };

        const createElementSpy = jest
            .spyOn(document, "createElement")
            .mockReturnValueOnce(mockLink as unknown as HTMLElement);

        await act(async () => {
            await current.downloadQrCsv();
        });

        expect(createElementSpy).toBeCalledWith("a");

        expect(mockLink.setAttribute.mock.calls.length).toBe(1);
        expect(mockLink.href).toEqual(mockCsvUrl);
        expect(mockLink.setAttribute.mock.calls[0]).toEqual(["download", "students-qr-urls.csv"]);

        expect(mockLink.click).toHaveBeenCalledTimes(1);
        expect(showSnackbar).toBeCalledWith(
            "resources.entry_exit.downloadQrUrls.message.success",
            "success"
        );

        createElementSpy.mockClear();
    });

    it("should call generate QR batches if found at least one student without QR", async () => {
        mockInferMutation(true);
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitSerivce["query"];
                }) =>
                (
                    _params: EntryExit_StudentQrCodeByStudentIdsV2QueryVariables,
                    _options?: UseQueryBaseOptions<
                        EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"] | undefined
                    >
                ) => {
                    if (resource.entity === "studentEntryExit") {
                        return {
                            data: [
                                {
                                    student_id: "id02",
                                    qr_url: "public/images/iconDefault.png", // usable placeholder image
                                    qr_id: "qrid02",
                                },
                            ],
                            refetch: mockRefetchFn,
                        };
                    }
                }
        );

        const {
            result: { current },
        } = renderHook(() => useDownloadStudentQrUrls(selectedStudents, mockOnGenerate), {
            wrapper: TestQueryWrapper,
        });

        await act(async () => {
            await current.downloadQrCsv();
        });

        expect(mockRefetchFn).toHaveBeenCalledTimes(1);
    });

    it("should show error snackbar in case of failed download", async () => {
        const {
            result: { current },
        } = renderHook(() => useDownloadStudentQrUrls(selectedStudents, mockOnGenerate), {
            wrapper: TestQueryWrapper,
        });

        const mockCsvUrl = "mockCsvUrl";

        window.URL.createObjectURL = jest.fn(() => mockCsvUrl);

        const createElementSpy = jest.spyOn(document, "createElement").mockImplementation(() => {
            throw new Error("download error");
        });

        await act(async () => {
            await current.downloadQrCsv();
        });

        expect(createElementSpy).toBeCalledWith("a");

        expect(showSnackbar).toBeCalledWith(
            "resources.entry_exit.downloadQrUrls.message.failed",
            "error"
        );

        createElementSpy.mockClear();
    });

    it("should show snackbar when fetching student-qr-codes fail", async () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitSerivce["query"];
                }) =>
                (
                    _params: EntryExit_StudentQrCodeByStudentIdsV2QueryVariables,
                    options?: UseQueryBaseOptions<
                        EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"] | undefined
                    >
                ) => {
                    if (resource.entity === "studentEntryExit") {
                        options?.onError?.(Error("ERROR_STUDENT_QR_CODES"));

                        return { data: [], refetch: jest.fn() };
                    }
                    return { data: [], refetch: jest.fn() };
                }
        );

        renderHook(() => useDownloadStudentQrUrls(selectedStudents, mockOnGenerate), {
            wrapper: TestQueryWrapper,
        });

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unableToRetrieveQRCodes", "error");
        expect(std.warn).toBeCalledWith(
            `useGenerateStudentQrPdf get student-qr-codes`,
            Error("ERROR_STUDENT_QR_CODES")
        );
    });

    it("should show snackbar when generate student-qr-codes fail", async () => {
        mockInferMutation(false);

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitSerivce["query"];
                }) =>
                (
                    _params: EntryExit_StudentQrCodeByStudentIdsV2QueryVariables,
                    _options?: UseQueryBaseOptions<
                        EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"] | undefined
                    >
                ) => {
                    if (resource.entity === "studentEntryExit") {
                        return {
                            data: [
                                {
                                    student_id: "id02",
                                    qr_url: "public/images/iconDefault.png", // usable placeholder image
                                    qr_id: "qrid02",
                                },
                            ],
                            refetch: mockRefetchFn,
                        };
                    }
                }
        );

        const {
            result: { current },
        } = renderHook(() => useDownloadStudentQrUrls(selectedStudents, mockOnGenerate), {
            wrapper: TestQueryWrapper,
        });

        await act(async () => {
            await current.downloadQrCsv();
        });

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unableToGenerateStudentQRs", "error");
        expect(std.warn).toBeCalledWith(
            `useGenerateStudentQrPdf generate students qr codes`,
            Error("ERROR_STUDENT_GENERATE_QR_CODES")
        );
    });
});
