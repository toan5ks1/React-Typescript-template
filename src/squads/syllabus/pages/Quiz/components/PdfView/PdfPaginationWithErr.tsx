import { useCallback, useEffect, useState } from "react";

import { Entities } from "src/common/constants/enum";

import { Box, Theme } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import PdfPagination, { PdfPaginationProps } from "./PdfPagination";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const sx = {
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    error: (theme: Theme) => ({
        textAlign: "center",
        marginTop: theme.spacing(1),
        minHeight: 20, // preserve space for error
    }),
};

enum ErrorTypes {
    OUT_OF_RANGE = "paginationOutOfRange",
    INVALID = "paginationInvalidPage",
}

export interface PdfPaginationWithErrProps
    extends Omit<PdfPaginationProps, "translator" | "currentPage"> {
    currentPage: number;
    customCheckError?: (nextPage: number | string) => boolean;
}

const PdfPaginationWithErr = (props: PdfPaginationWithErrProps) => {
    const [err, setErr] = useState<ErrorTypes | null>(null);
    const [interValue, setInterValue] = useState<string | number>(props.currentPage);

    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const { onChange, currentPage, customCheckError, totalPage, ...rest } = props;

    useEffect(() => {
        setInterValue(currentPage);
    }, [currentPage]);

    const _onChange = useCallback(
        (newValue: number | string) => {
            if (newValue === interValue) {
                return;
            }

            setInterValue(newValue);

            if (typeof customCheckError === "function" && customCheckError(newValue)) {
                return setErr(ErrorTypes.INVALID);
            }

            const numericValue = Number(newValue);

            const isStringValue = Number.isNaN(numericValue);

            if (isStringValue || newValue === "") {
                return setErr(ErrorTypes.INVALID);
            }

            if (
                Number.isSafeInteger(numericValue) &&
                (numericValue < 1 || numericValue > totalPage)
            ) {
                return setErr(ErrorTypes.OUT_OF_RANGE);
            }

            setErr(null);
            onChange(numericValue);
        },
        [interValue, totalPage, customCheckError, onChange]
    );

    return (
        <Box sx={sx.root}>
            <PdfPagination
                {...rest}
                totalPage={totalPage}
                currentPage={interValue}
                translator={tQuiz}
                onChange={_onChange}
            />
            <TypographyBase sx={sx.error} color="error">
                {err ? <span data-testid="PdfPaginationWithErr__err">{tQuiz(err)}</span> : null}
            </TypographyBase>
        </Box>
    );
};

export default PdfPaginationWithErr;
