import { grpcErrorsMap } from "src/internals/grpc";
import { ScannerResultText } from "src/squads/adobo/domains/entry-exit/common/constants/enum";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import studentEntryExitService from "src/squads/adobo/domains/entry-exit/services/student-entry-exit-service";
import { TestQueryWrapper } from "src/squads/adobo/domains/entry-exit/test-utils/providers";
import { getLatestCallParams } from "src/squads/adobo/domains/invoice/test-utils/mocks/mock-utils";

import { renderHook, act } from "@testing-library/react-hooks";
import useScanStudentQr from "src/squads/adobo/domains/entry-exit/hooks/useScanStudentQr";

jest.useFakeTimers("modern");

jest.mock("src/squads/adobo/domains/entry-exit/services/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

const scanPayload: NsStudentEntryExitService.ScanRequest = {
    qrcodeContent: "qrcodeContent",
    touchTime: new Date(),
};

describe("useScanStudentQr set header - SUCCESS RESPONSE", () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    const expectPropertyToBe = async (
        property: "resultText" | "studentName" = "resultText",
        value: ScannerResultText | string,
        touchEvent: number = 0
    ) => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        NsStudentEntryExitService.ScanRequest,
                        NsStudentEntryExitService.ScanResponse
                    >
                ) => {
                    return {
                        mutate: jest.fn(async () => {
                            await options?.onSuccess?.(
                                {
                                    touchEvent,
                                    successful: true,
                                    parentNotified: false,
                                    studentName: "Scan the Student",
                                },
                                scanPayload,
                                undefined
                            );
                        }),
                    };
                }
        );

        const scanStudentHook = renderHook(() => useScanStudentQr(), {
            wrapper: TestQueryWrapper,
        });

        const { result } = scanStudentHook;

        await act(async () => {
            await result.current.scanStudentQr(scanPayload);
        });

        expect(result.current[property]).toBe(value);

        return scanStudentHook;
    };

    it("should SET header to ENTRY message if student has entered via QR scan", async () => {
        await expectPropertyToBe("resultText", ScannerResultText.ENTRY);
    });

    it("should SET header to EXIT message if student has exited via QR scan", async () => {
        await expectPropertyToBe("resultText", ScannerResultText.EXIT, 1);
    });

    it("should SET student name correctly", async () => {
        await expectPropertyToBe("studentName", "Scan the Student");
    });

    it("should set header to DEFAULT after a few seconds when SCAN RESPONSE is displayed", async () => {
        const { result } = await expectPropertyToBe("resultText", ScannerResultText.ENTRY);

        act(() => {
            // Fast-forward until all timers have been executed
            jest.runAllTimers();
        });

        expect(result.current.resultText).toBe(ScannerResultText.TITLE);
    }, 3000);
});

describe("useScanStudentQr set header - ERROR RESPONSE", () => {
    const mockScanFn = jest.fn();

    beforeEach(() => {
        (inferMutation as jest.Mock).mockReturnValue({ mutateAsync: mockScanFn });
    });

    const expectHeaderToBe = async (message: string, value: ScannerResultText) => {
        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        NsStudentEntryExitService.ScanRequest,
                        NsStudentEntryExitService.ScanResponse
                    >
                ) => {
                    return {
                        mutate: jest.fn(async () => {
                            await options?.onError?.(Error(message), scanPayload, undefined);
                        }),
                    };
                }
        );

        const { result } = renderHook(() => useScanStudentQr());

        await act(async () => {
            await result.current.scanStudentQr({
                qrcodeContent: "wrongQr",
                touchTime: new Date(),
            });
        });
        expect(result.current.resultText).toBe(value);
    };

    it("should SET header text with PERMISSION FAILED MESSAGE if student does NOT HAVE PERMISSION to scan", async () => {
        await expectHeaderToBe(
            grpcErrorsMap.PERMISSION_DENIED,
            ScannerResultText.PERMISSION_DENIED
        );
    });

    it("should SET header text with SCAN LIMIT MESSAGE if student does scans again within the intended limit (1 min)", async () => {
        await expectHeaderToBe(
            "ra.manabie-error.specified.scan_again_later",
            ScannerResultText.SCAN_LIMIT
        );
    });

    it("should SET header text with INVALID MESSAGE if scanned QR is invalid/unknown", async () => {
        await expectHeaderToBe(grpcErrorsMap.INVALID_PARAMS, ScannerResultText.INVALID);
    });

    it("should SET header text with ERROR MESSAGE if scanned QR encountered unanticipated error", async () => {
        await expectHeaderToBe(grpcErrorsMap.UNKNOWN, ScannerResultText.ERROR);
    });

    it("should SET header text with ERROR MESSAGE if scanned QR is from another center", async () => {
        await expectHeaderToBe(
            "ra.manabie-error.specified.invalid_student_qr",
            ScannerResultText.PERMISSION_DENIED
        );
    });
});

describe("useScanStudentQr", () => {
    it("should call SCAN STUDENT with correct payload", async () => {
        const mutate = jest.fn();

        (inferMutation as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "studentEntryExit";
                    action: keyof typeof studentEntryExitService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        NsStudentEntryExitService.ScanRequest,
                        NsStudentEntryExitService.ScanResponse
                    >
                ) => {
                    return {
                        mutate: jest.fn(async (params) => {
                            mutate(params);
                            await options?.onSuccess?.(
                                {
                                    touchEvent: 0,
                                    successful: true,
                                    parentNotified: false,
                                    studentName: "Scan the Student",
                                },
                                scanPayload,
                                undefined
                            );
                        }),
                    };
                }
        );

        const {
            result: { current },
        } = renderHook(() => useScanStudentQr());

        act(() => current.scanStudentQr(scanPayload));

        expect(getLatestCallParams(mutate)[0]).toEqual(scanPayload);
    });
});
