import {
    ScannerResultText,
    ScannerScreenStatus,
} from "src/squads/adobo/domains/entry-exit/common/constants/enum";
import { TestQueryWrapper } from "src/squads/adobo/domains/entry-exit/test-utils/react-hooks";

import MuiPickersUtilsProvider from "src/squads/adobo/domains/entry-exit/providers/MuiPickersUtilsProvider";

import { TouchEvent } from "manabuf/entryexitmgmt/v1/enums_pb";

import { QrCodeScannerPage } from "../QrCodeScannerPage";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useScanStudentQr, {
    UseScanStudentQrReturn,
} from "src/squads/adobo/domains/entry-exit/hooks/useScanStudentQr";
import TestApp from "src/squads/adobo/domains/entry-exit/test-utils/TestApp";

const mockOnResultFn = jest.fn();

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate", () => {
    return {
        __esModule: true,
        default: () => (translateKey: string) => translateKey,
    };
});

jest.mock("react-qr-reader", () => {
    const actual = jest.requireActual("react-qr-reader");

    return { ...actual, onResult: mockOnResultFn };
});

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useScanStudentQr", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderScannerPage = () => {
    const mockGetUserMedia = jest.fn(async () => {
        return new Promise<void>((resolve) => {
            resolve();
        });
    });

    Object.defineProperty(window.navigator, "mediaDevices", {
        writable: true,
        value: {
            getUserMedia: mockGetUserMedia,
        },
    });

    // Prevents flushing updates while React is rendering
    const spyMedia = jest.spyOn(HTMLMediaElement.prototype, "muted", "set"); // we pass 'get'
    spyMedia.mockImplementation(() => {});

    const wrapper = render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <QrCodeScannerPage />
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );

    return wrapper;
};

const renderScannerPageWithValues = (isError: boolean = false) => {
    const mockGetUserMedia = jest.fn(async () => {
        return new Promise<any>((resolve) => {
            resolve({
                video: { facingMode: "user" },
            });
        });
    });

    Object.defineProperty(window.navigator, "mediaDevices", {
        writable: true,
        value: {
            getUserMedia: mockGetUserMedia,
        },
    });

    Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
        configurable: true,
        // Define the property getter
        get() {
            setTimeout(() => this.onloadeddata && this.onloadeddata());
            return () => {};
        },
    });

    Object.defineProperty(window.HTMLCanvasElement.prototype, "getContext", {
        configurable: true,
        // Define the property getter
        get() {
            setTimeout(() => this.onloadeddata && this.onloadeddata());
            return () => {};
        },
    });

    if (isError) {
        mockGetUserMedia.mockRejectedValue(new Error());
    } else {
        mockGetUserMedia.mockResolvedValue({
            stream: {
                active: true,
            },
        });
    }

    const wrapper = render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <QrCodeScannerPage />
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );

    return wrapper;
};

const resetMediaMocks = () => {
    // reset to not spill over other tests; and remove unintended side effects
    Object.defineProperty(window.navigator, "mediaDevices", {
        value: undefined,
    });
};

describe("QrCodeScannerPage - SUCCESS DISPLAY RESPONSE", () => {
    afterEach(() => {
        resetMediaMocks();
    });

    const expectSuccessDisplayToBeByTouchEvent = (
        touchEvent: TouchEvent = TouchEvent.TOUCH_ENTRY
    ) => {
        (useScanStudentQr as jest.Mock).mockImplementation(
            (): UseScanStudentQrReturn => ({
                scanStudentQr: () => ({
                    studentName: "Scan the student",
                    successful: true,
                    touchEvent,
                    parentNotified: false,
                }),
                scannerStatus: ScannerScreenStatus.SUCCESS,
                resultText:
                    touchEvent === TouchEvent.TOUCH_EXIT
                        ? ScannerResultText.EXIT
                        : ScannerResultText.ENTRY,
                studentName: "Scan the student",
                touchEvent,
            })
        );

        renderScannerPage();

        const headerEl = screen.getByTestId("ScanResult__Header");
        const studentName = screen.getByTestId("ScanResult__Name");
        const subheaderEl = screen.getByTestId("ScanResult__SubText");

        const headerText =
            touchEvent === TouchEvent.TOUCH_ENTRY ? "message.welcome" : "message.goodbye";
        const subheaderText =
            touchEvent === TouchEvent.TOUCH_ENTRY ? "message.entry" : "message.exit";

        expect(headerEl).toHaveTextContent(headerText);
        expect(studentName).toHaveTextContent("Scan the student");
        expect(subheaderEl).toHaveTextContent(subheaderText);
    };

    it("should DISPLAY proper ENTRY RESPONSE AND UI when entry scan is success", () => {
        expectSuccessDisplayToBeByTouchEvent(TouchEvent.TOUCH_ENTRY);
    });

    it("should DISPLAY proper EXIT RESPONSE AND UI when exit scan is success", () => {
        expectSuccessDisplayToBeByTouchEvent(TouchEvent.TOUCH_EXIT);
    });
});

describe("QrCodeScannerPage - ERROR DISPLAY RESPONSE", () => {
    afterEach(() => {
        resetMediaMocks();
    });

    const expectErrorDisplayToBe = (resultText: ScannerResultText, textContent: string) => {
        (useScanStudentQr as jest.Mock).mockImplementation(
            (): UseScanStudentQrReturn => ({
                scanStudentQr: () => ({
                    studentName: "Scan the student",
                    successful: false,
                    touchEvent: 0,
                    parentNotified: false,
                }),
                scannerStatus: ScannerScreenStatus.ERROR,
                resultText,
                studentName: "Scan the student",
                touchEvent: TouchEvent.TOUCH_ENTRY,
            })
        );

        renderScannerPage();

        const headerEl = screen.getByTestId("ScanResult__Header");
        const subheaderEl = screen.getByTestId("ScanResult__SubText");

        expect(headerEl).toHaveTextContent("message.oops");
        expect(subheaderEl).toHaveTextContent(textContent);
    };

    it("should DISPLAY proper message when QUIT student scans", () => {
        expectErrorDisplayToBe(ScannerResultText.PERMISSION_DENIED, "message.permissionFail");
    });

    it("should DISPLAY proper text when QR is UNKNOWN", () => {
        expectErrorDisplayToBe(ScannerResultText.ERROR, "message.error");
    });

    it("should DISPLAY proper text when QR is INVALID", () => {
        expectErrorDisplayToBe(ScannerResultText.INVALID, "message.invalid");
    });

    it("should DISPLAY proper text when QR is scanned again within the 1 min time limit", () => {
        expectErrorDisplayToBe(ScannerResultText.SCAN_LIMIT, "message.scanLimit");
    });

    it("should DISPLAY proper text when attempting to scan without internet", () => {
        expectErrorDisplayToBe(ScannerResultText.NETWORK_ISSUE, "message.networkIssue");
    });
});

describe("<QRCodeScannerPage /> - DEFAULT STATE", () => {
    beforeEach(() => {
        (useScanStudentQr as jest.Mock).mockImplementation(
            (): UseScanStudentQrReturn => ({
                scanStudentQr: () => ({
                    studentName: "",
                    successful: false,
                    touchEvent: 0,
                    parentNotified: false,
                }),
                scannerStatus: ScannerScreenStatus.DEFAULT,
                resultText: "",
                studentName: "",
                touchEvent: TouchEvent.TOUCH_ENTRY,
            })
        );
    });

    afterEach(() => {
        resetMediaMocks();
    });

    it("should MATCH snapshot", () => {
        const wrapper = renderScannerPage();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should DISPLAY camera permission prompt and content if DENIED or PROMPT", async () => {
        renderScannerPageWithValues(true);

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
        });
    });

    it("should CLOSE PROMPT when dismiss button is CLICKED", async () => {
        renderScannerPageWithValues(true);

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
        });

        const dismissBtn = screen.getByText("dismiss");
        userEvent.click(dismissBtn);

        await waitFor(() => {
            expect(screen.queryByTestId("DialogWithHeaderFooter__wrapper")).not.toBeInTheDocument();
        });
    });

    it("should CLOSE PROMPT when close button is CLICKED", async () => {
        renderScannerPageWithValues(true);

        await waitFor(() => {
            expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
        });

        const closeBtn = screen.getByTestId("DialogWithHeaderFooter__buttonExit");
        userEvent.click(closeBtn);

        await waitFor(() => {
            expect(screen.queryByTestId("DialogWithHeaderFooter__wrapper")).not.toBeInTheDocument();
        });
    });

    it("should DISPLAY default elements title, background, and CAMERA if GRANTED permission", async () => {
        const wrapper = renderScannerPageWithValues();

        // Prevents flushing updates while React is rendering
        const spyMedia = jest.spyOn(HTMLMediaElement.prototype, "muted", "set"); // we pass 'get'
        spyMedia.mockImplementation(() => {});

        await waitFor(() => {
            expect(screen.getByTestId("QrScannerPage__container")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(
                wrapper.container.querySelector("#QrCodeScannerPage__video")
            ).toBeInTheDocument();
        });
    });
});
