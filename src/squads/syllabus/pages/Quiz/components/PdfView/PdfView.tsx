import { HtmlHTMLAttributes, memo, useCallback, useEffect, useRef, useState } from "react";

import { unstable_batchedUpdates } from "react-dom";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { Rect, RectTypes } from "src/squads/syllabus/models/canvas";
import { FieldTypes } from "src/squads/syllabus/models/quiz";
import { NsQuizAction } from "src/squads/syllabus/store/quiz";

import { Box, Theme } from "@mui/material";

import PdfDocument from "../PdfDocument";
import OCROptionSelection from "./OCROptionSelection";
import PdfPaginationWithErr from "./PdfPaginationWithErr";
import ScreenshotPosition from "./ScreenshotPosition";
import { SelectFieldState } from "./enum";

import useScreenShot, { ScreenshotRect } from "src/squads/syllabus/pages/Quiz/hooks/useScreenShot";

const sx = {
    pdfContainer: {
        position: "relative",
        marginBottom: "48px",
        overflow: "hidden",
    },
    pdf: {
        userSelect: "none",
    },
    paginationContainer: (theme: Theme) => ({
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.common.white,
        left: 0,
        /* minus height + 4px of border radius shape */
        top: "calc(100% - 64px)",
        height: "64px",
        /* 20px of the vertical scrolling bar */
        width: "100%",
        paddingTop: "16px",
        paddingBottom: "16px",
        zIndex: 3,
    }),
};

export interface PdfViewProps extends HtmlHTMLAttributes<HTMLDivElement> {
    pdfURL: string;
    readOnly?: boolean;
    onPDFLoaded: () => void;
    onRequestOCR: (params: Omit<NsQuizAction.PostORCRequest["payload"], "language">) => void;
}

const pdfScale = 1;
const PdfView = ({ className, readOnly, pdfURL, onRequestOCR, onPDFLoaded }: PdfViewProps) => {
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [processedScreenshot, setProcessedScreenshot] = useState<Rect | null>(null);
    const selectFieldStatePopper = useRef<any>(null);
    const [selectFieldState, setSelectFieldState] = useState<SelectFieldState | null>(null);
    const [pdfWidth, setPdfWidth] = useState(800);

    const documentElem = useRef<any | null>(null);
    const screenshotBoxElem = useRef<HTMLDivElement | null>(null);

    const onScreenshotComplete = useCallback(
        (data: ScreenshotRect) => {
            if (!documentElem.current || !data || !data.image) {
                return;
            }

            setProcessedScreenshot({
                id: genId(),
                fileName: pdfURL,
                filePage: currentPage,
                fileScale: pdfScale,
                rectType: RectTypes.IMAGE,
                fileWidth: documentElem.current?.offsetWidth || 0,
                ...data,
                image: data.image, //prevent typescript from unrecognised the string | undefined type for image field
            });
            setSelectFieldState(SelectFieldState.RECT_TYPE);
        },
        [pdfURL, currentPage]
    );

    const onError = useCallback(() => {
        //todo: notify error
    }, []);

    const {
        screenshotRect,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        screenshotState,
        onScreenshotCancel,
    } = useScreenShot({
        disabled: selectFieldState !== null || readOnly,
        onError,
        onScreenshotComplete,
        canvasSelector: "react-pdf__Page__canvas",
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [pdfURL]);

    const documentOnLoadSuccess = useCallback(
        ({ numPages }) => {
            setNumPages(numPages);
            onPDFLoaded();
        },
        [onPDFLoaded]
    );

    const setDocumentElement = useCallback((node: HTMLDivElement) => {
        documentElem.current = node;

        if (node) {
            setPdfWidth(node.getBoundingClientRect().width);
        }
    }, []);

    const onPageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, []);

    //select rect type first then field type
    const onSelectRectType = useCallback((rectType: RectTypes) => {
        setSelectFieldState(SelectFieldState.FIELD_TYPE);
        setProcessedScreenshot((prev) => {
            if (!prev) {
                return null;
            }

            return {
                ...prev,
                rectType,
            };
        });
    }, []);

    const onSelectFieldType = useCallback(
        (fieldType: FieldTypes, answerId?: string) => {
            if (processedScreenshot) {
                onRequestOCR({
                    fieldType,
                    answerId,
                    rect: processedScreenshot,
                });

                setProcessedScreenshot(null);
                setSelectFieldState(null);
            }

            //todo: handle error if screenshot not exist
            return;
        },
        [onRequestOCR, processedScreenshot]
    );

    useEffect(() => {
        const handleClick = (event: MouseEvent | TouchEvent) => {
            if (
                !selectFieldStatePopper.current ||
                selectFieldStatePopper.current.state.elements.popper.contains(
                    event.target as HTMLElement
                )
            ) {
                return;
            }

            unstable_batchedUpdates(() => {
                setProcessedScreenshot(null);
                setSelectFieldState(null);
                onScreenshotCancel();
            });
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    }, [onScreenshotCancel]);

    return (
        <div className={className}>
            <Box sx={sx.pdfContainer}>
                <Box ref={setDocumentElement} sx={sx.pdf}>
                    <PdfDocument
                        ref={documentElem}
                        pdfUrl={pdfURL}
                        scale={pdfScale}
                        pdfWidth={pdfWidth}
                        currentPage={currentPage}
                        onLoad={documentOnLoadSuccess}
                    />
                </Box>
                <ScreenshotPosition
                    ref={screenshotBoxElem}
                    screenshotRect={screenshotRect}
                    processedScreenshot={processedScreenshot}
                    screenshotState={screenshotState}
                    selectFieldState={selectFieldState}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                />
                <OCROptionSelection
                    sx={(theme) => ({ zIndex: theme.zIndex.tooltip })}
                    open={
                        selectFieldState === SelectFieldState.FIELD_TYPE ||
                        selectFieldState === SelectFieldState.RECT_TYPE
                    }
                    anchorEl={screenshotBoxElem.current}
                    popperRef={selectFieldStatePopper}
                    selectFieldState={selectFieldState}
                    onSelectFieldType={onSelectFieldType}
                    onSelectRectType={onSelectRectType}
                    rectType={processedScreenshot?.rectType}
                />
            </Box>
            <Box sx={sx.paginationContainer}>
                <PdfPaginationWithErr
                    currentPage={currentPage}
                    totalPage={numPages}
                    onChange={onPageChange}
                />
            </Box>
        </div>
    );
};

export default memo(PdfView);
