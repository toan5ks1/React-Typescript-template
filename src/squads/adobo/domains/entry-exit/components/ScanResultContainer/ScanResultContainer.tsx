import { useCallback } from "react";

import clsx from "clsx";
import { Entities } from "src/common/constants/enum";
import {
    ScannerResultText,
    ScannerScreenStatus,
} from "src/squads/adobo/domains/entry-exit/common/constants/enum";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { TouchEvent } from "manabuf/entryexitmgmt/v1/enums_pb";

import useResourceTranslate from "src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate";

const PREFIX = "ScanResultContainer";

const classes = {
    mainContainer: `${PREFIX}-mainContainer`,
    text: `${PREFIX}-text`,
    subText: `${PREFIX}-subText`,
    default: `${PREFIX}-default`,
    result: `${PREFIX}-result`,
    success: `${PREFIX}-success`,
    error: `${PREFIX}-error`,
};

const StyledBox = styled(Box)(({ theme }) => {
    return {
        [`&.${classes.mainContainer}`]: {
            display: "flex",
            justifyContent: "center",
            height: "25vh",
            [theme.breakpoints.up(2500)]: {
                height: "15vh",
            },
            [theme.breakpoints.down("lg")]: {
                height: "35vh",
            },
        },
        [`& .${classes.text}`]: {
            color: theme.palette.common.white,
            fontWeight: 700,
        },
        [`& .${classes.subText}`]: {
            paddingTop: theme.spacing(2),
        },
        [`& .${classes.default}`]: {
            textAlign: "center",
            minWidth: "40vw",
            background: theme.palette.text.primary,
            borderRadius: 8,

            [theme.breakpoints.down("lg")]: {
                width: "80vw",
            },
        },
        [`& .${classes.result}`]: {
            textAlign: "center",
            width: "100vw",
            background: theme.palette.text.primary,
            padding: theme.spacing(3, 0),

            [theme.breakpoints.down("md")]: {
                padding: theme.spacing(3, 0),
            },
        },
        [`& .${classes.success}`]: {
            background: "#3ACE85",
            opacity: 0.9,
        },
        [`& .${classes.error}`]: {
            paddingTop: theme.spacing(5),
            background: theme.palette.error.main,
            opacity: 0.9,
        },
    };
});

export interface ScanResultContainerProps {
    studentName: string;
    scanResult: ScannerScreenStatus;
    touchEvent: TouchEvent | undefined;
    resultText: string;
}

const ScanResultContainer = ({
    studentName,
    scanResult,
    resultText,
    touchEvent,
    ...props
}: ScanResultContainerProps) => {
    const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);

    const getHeaderText = useCallback(() => {
        const { OOPS, WELCOME, GOODBYE } = ScannerResultText;

        let status = "";

        switch (scanResult) {
            case ScannerScreenStatus.ERROR:
                status = OOPS;
                break;
            case ScannerScreenStatus.SUCCESS:
                status = touchEvent === TouchEvent.TOUCH_ENTRY ? WELCOME : GOODBYE;
                break;
            default:
                break;
        }

        return tEntryExit(`message.${status}`);
    }, [scanResult, tEntryExit, touchEvent]);

    return (
        <StyledBox data-testid="ScanResult__Container" className={classes.mainContainer}>
            <Box className={clsx(classes.result, classes[scanResult])}>
                {scanResult !== ScannerScreenStatus.DEFAULT ? (
                    <>
                        <TypographyBase
                            data-testid="ScanResult__Header"
                            variant="h2"
                            {...props}
                            className={classes.text}
                        >
                            {getHeaderText()}
                        </TypographyBase>
                        <TypographyBase
                            data-testid="ScanResult__Name"
                            variant="h4"
                            {...props}
                            className={clsx(classes.text, classes.subText)}
                        >
                            {studentName}
                        </TypographyBase>
                        <TypographyBase
                            data-testid="ScanResult__SubText"
                            variant="h4"
                            {...props}
                            className={clsx(classes.text)}
                        >
                            {tEntryExit(`message.${resultText}`)}
                        </TypographyBase>
                    </>
                ) : null}
            </Box>
        </StyledBox>
    );
};

export default ScanResultContainer;
