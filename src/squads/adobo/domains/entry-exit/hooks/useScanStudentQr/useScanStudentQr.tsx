import { useCallback } from "react";

import { useNetworkState } from "react-use";
import { errorCodesMap } from "src/common/utils/error";
import {
    ScannerResultText,
    ScannerScreenStatus,
} from "src/squads/adobo/domains/entry-exit/common/constants/enum";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";

import { TouchEvent } from "manabuf/entryexitmgmt/v1/enums_pb";

import useSafeState from "src/squads/adobo/domains/entry-exit/hooks/useSafeState";

export interface UseScanStudentQrReturn {
    scanStudentQr: (
        props: NsStudentEntryExitService.ScanRequest
    ) => NsStudentEntryExitService.ScanResponse;
    resultText: ScannerResultText | "";
    scannerStatus: ScannerScreenStatus;
    studentName: string;
    touchEvent: TouchEvent;
}

const {
    TITLE,
    ENTRY,
    EXIT,
    SCAN_LIMIT,
    ERROR,
    INVALID,
    PERMISSION_DENIED: PERMISSION_FAIL,
    NETWORK_ISSUE,
} = ScannerResultText;

const useScanStudentQr = () => {
    const { online } = useNetworkState();

    const [resultText, setResultText] = useSafeState<ScannerResultText | "">(
        ScannerResultText.TITLE
    );
    const [scannerStatus, setScannerStatus] = useSafeState<ScannerScreenStatus>(
        ScannerScreenStatus.DEFAULT
    );
    const [studentName, setStudentName] = useSafeState("");
    const [touchEvent, setTouchEvent] = useSafeState<TouchEvent | undefined>();

    const setDefaultDisplay = useCallback(() => {
        setResultText(TITLE);
        setScannerStatus(ScannerScreenStatus.DEFAULT);
        setStudentName("");
    }, [setResultText, setScannerStatus, setStudentName]);

    const setDefaultHeaderTimeout = useCallback(
        (duration: number = 3000) => {
            const timeout = setTimeout(() => {
                setDefaultDisplay();

                clearTimeout(timeout);
            }, duration);
        },
        [setDefaultDisplay]
    );

    const setSuccessDisplay = useCallback(
        (res: NsStudentEntryExitService.ScanResponse) => {
            if (res.touchEvent) {
                setTouchEvent(TouchEvent.TOUCH_EXIT);
                setResultText(EXIT);
            } else {
                setTouchEvent(TouchEvent.TOUCH_ENTRY);
                setResultText(ENTRY);
            }
            setScannerStatus(ScannerScreenStatus.SUCCESS);
            setStudentName(res.studentName);

            setDefaultHeaderTimeout(3000);
        },
        [setDefaultHeaderTimeout, setResultText, setScannerStatus, setStudentName, setTouchEvent]
    );

    const { mutate: scanStudentQrMutation } = inferMutation({
        entity: "studentEntryExit",
        action: "SCAN",
    })({
        onSuccess: (res) => {
            if (res.successful) {
                setSuccessDisplay(res);
            }
        },
        onError: (err) => {
            const { PERMISSION_DENIED, INVALID_PARAMS } = errorCodesMap;

            switch (err.message) {
                case PERMISSION_DENIED:
                    setResultText(PERMISSION_FAIL);
                    break;
                case "ra.manabie-error.specified.invalid_student_qr":
                    setResultText(PERMISSION_FAIL);
                    break;
                case "ra.manabie-error.specified.scan_again_later":
                    setResultText(SCAN_LIMIT);
                    break;
                case INVALID_PARAMS:
                    setResultText(INVALID);
                    break;
                default:
                    setResultText(ERROR);
                    break;
            }

            setScannerStatus(ScannerScreenStatus.ERROR);

            setDefaultHeaderTimeout(5000);
        },
    });

    const scanStudentQr = useCallback(
        ({ qrcodeContent, touchTime }: NsStudentEntryExitService.ScanRequest) => {
            if (online) {
                scanStudentQrMutation({ qrcodeContent, touchTime });
            } else {
                setScannerStatus(ScannerScreenStatus.ERROR);
                setResultText(NETWORK_ISSUE);

                setDefaultHeaderTimeout(5000);
            }
        },
        [online, scanStudentQrMutation, setDefaultHeaderTimeout, setResultText, setScannerStatus]
    );

    return {
        studentName,
        scanStudentQr,
        resultText,
        scannerStatus,
        touchEvent,
    };
};

export default useScanStudentQr;
