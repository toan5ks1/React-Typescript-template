import { useEffect, useState } from "react";

import { QrReader } from "react-qr-reader";
import {
    Entities,
    CameraPermissionStatus,
    ScannerScreenStatus,
} from "src/squads/adobo/domains/entry-exit/common/constants/enum";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import useRouteGuardLayout from "src/components/Layout/Layout/useRouteGuardLayout";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import ScanResultContainer from "src/squads/adobo/domains/entry-exit/components/ScanResultContainer";

import { styles, videoContainerStyle, cameraViewStyle } from "./styles";

import useResourceTranslate from "src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate";
import useScanStudentQr from "src/squads/adobo/domains/entry-exit/hooks/useScanStudentQr";

const StyledQrReader = styled(QrReader)(({ theme }) => ({
    padding: 0,
    maxHeight: "55vh",
    margin: "0 auto",
    overflow: "hidden",
    zIndex: 3,
    maxWidth: "auto",

    [theme.breakpoints.down("sm")]: {
        maxHeight: "45vh",
    },
}));

interface QrResultProps {
    text: string;
    timestamp?: number;
}

export const QrCodeScannerPage = () => {
    const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);
    const { touchEvent, resultText, studentName, scanStudentQr, scannerStatus } =
        useScanStudentQr();

    const [isUserScanning, setIsUserScanning] = useState(false);
    const [mediaPermission, setMediaPermission] = useState<CameraPermissionStatus | undefined>();
    const [scannedStudentQr, setScannedStudentQr] = useState("");
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [facingMode] = useState("user");

    useRouteGuardLayout(true); //TODO: temporary until we separate micro frontend

    useEffect(() => {
        const getMediaPermission = () => {
            navigator.mediaDevices
                .getUserMedia({
                    video: { facingMode },
                })
                .then((stream) => {
                    if (stream) {
                        setMediaPermission(CameraPermissionStatus.GRANTED);
                        setIsPromptOpen(false);
                    }
                })
                .catch(() => {
                    setMediaPermission(CameraPermissionStatus.DENIED);
                    setIsPromptOpen(true);
                });
        };

        getMediaPermission();
    }, [facingMode]);

    useEffect(() => {
        if (isUserScanning) {
            scanStudentQr({
                qrcodeContent: scannedStudentQr,
                touchTime: new Date(),
            });
        }
    }, [isUserScanning, scanStudentQr, scannedStudentQr]);

    const handleQrScan = (result?: QrResultProps | null) => {
        if (result) {
            const studentQr = result.text;
            setScannedStudentQr(studentQr);
            setIsUserScanning(true);

            const scannerTimeout = setTimeout(() => {
                setIsUserScanning(false);

                clearTimeout(scannerTimeout);
            }, 3000);
        }
    };

    // const switchCamera = () => {
    //     facingMode === "user" ? setFacingMode("environment") : setFacingMode("user");
    // };

    return (
        <Box data-testid="QrScannerPage__container" sx={styles.main}>
            <Box sx={styles.cameraContainer}>
                {mediaPermission === CameraPermissionStatus.GRANTED ? (
                    <StyledQrReader
                        constraints={{ facingMode }}
                        videoId="QrCodeScannerPage__video"
                        videoContainerStyle={videoContainerStyle}
                        videoStyle={cameraViewStyle}
                        onResult={(result) => handleQrScan(result as unknown as QrResultProps)}
                    />
                ) : (
                    <Box sx={styles.darkContainer} />
                )}
                <TypographyBase
                    variant="h4"
                    sx={[
                        styles.hoverText,
                        scannerStatus !== ScannerScreenStatus.DEFAULT && styles.disable,
                    ]}
                >
                    {tEntryExit("message.title")}
                </TypographyBase>
            </Box>
            {scannerStatus !== ScannerScreenStatus.DEFAULT ? (
                <Box sx={[styles.resultOverlay, styles[scannerStatus]]}>
                    <ScanResultContainer
                        resultText={resultText}
                        touchEvent={touchEvent}
                        studentName={studentName}
                        scanResult={scannerStatus}
                    />
                </Box>
            ) : null}
            {/* <Box onClick={switchCamera} className={classes.facingModeSwitch}>
                <CameraRotateIcon />
            </Box> */}
            <DialogWithHeaderFooter
                open={isPromptOpen}
                onSave={() => setIsPromptOpen(false)}
                onClose={() => setIsPromptOpen(false)}
                title={tEntryExit("allowCameraHeader")}
                maxWidth="md"
                minWidthBox="sm"
                shouldShowCancelButton={false}
                textSave={tEntryExit("dismiss")}
            >
                <TypographyTextSecondary>{tEntryExit("allowCameraText")}</TypographyTextSecondary>
            </DialogWithHeaderFooter>
        </Box>
    );
};

export default QrCodeScannerPage;
