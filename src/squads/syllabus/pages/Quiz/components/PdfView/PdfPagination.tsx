import { ChangeEvent } from "react";

import { isNumericValue } from "src/common/utils/other";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextFieldBase from "src/components/TextFields/TextFieldBase";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
}));
StyledIconButton.displayName = "StyledIconButton";

const sx = {
    root: {
        display: "flex",
        alignItems: "center",
    },
    inputWrapper: {
        width: 48,
        display: "flex",
        justifyContent: "center",
    },
    input: (theme: Theme) => ({
        textAlign: "center",
        paddingTop: "5px", // reduce the default padding to make it smaller then small
        paddingBottom: "5px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }),
    page: (theme: Theme) => ({
        color: theme.palette.text.light,
    }),
    prevNext: (theme: Theme) => ({
        color: theme.palette.text.primary,
        "&:disabled": {
            color: theme.palette.text.disabled,
        },
    }),
    prevIcon: {
        "& path": {
            transform: "translate(4px)", // fix weird bug of svg path not at center of the svg
        },
    },
};

type DisableFn = boolean | ((currentPage: number | string, totalPage: number) => boolean);
type TranslateKeys = "paginationPageText" | "paginationOfText";
type Mixed = number | string;

export interface PdfPaginationProps {
    totalPage: number;
    currentPage: Mixed;
    disables?: {
        prev?: DisableFn;
        next?: DisableFn;
        input?: DisableFn;
    };

    translator?: (s: TranslateKeys) => string;
    onChange: (nextPage: Mixed) => void;
}

function execDisable(fn?: DisableFn) {
    if (!fn) {
        return () => false;
    }

    if (typeof fn === "function") {
        return (currentPage: Mixed, totalPage: number) => fn(currentPage, totalPage);
    }

    return () => fn;
}

const defaultTranslator: PdfPaginationProps["translator"] = (s) => s;

const PdfPagination = (props: PdfPaginationProps) => {
    const { currentPage, totalPage, disables, translator = defaultTranslator, onChange } = props;

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    // actually we dont need to do this, just want to limit "as number" as much as possible
    const onChangeByButton = (newPage: number) => {
        if (isNumericValue(currentPage)) {
            onChange(Number(currentPage) + newPage);
        }
    };

    const shouldPrevDisabled = !isNumericValue(currentPage) || currentPage <= 1;
    const shouldNextDisabled = !isNumericValue(currentPage) || currentPage >= totalPage;

    return (
        <Box sx={sx.root}>
            <span>{`${translator("paginationPageText")}:`}</span>
            <StyledIconButton
                size="small"
                data-testid="PdfPagination__prev"
                disabled={shouldPrevDisabled || execDisable(disables?.prev)(currentPage, totalPage)}
                onClick={() => onChangeByButton(-1)}
            >
                <ArrowBackIos sx={sx.prevIcon} fontSize="inherit" />
            </StyledIconButton>
            <TextFieldBase
                sx={sx.inputWrapper}
                value={currentPage}
                size="small"
                disabled={execDisable(disables?.input)(currentPage, totalPage)}
                variant="outlined"
                inputProps={{
                    sx: sx.input,
                    "data-testid": "PdfPagination__input",
                }}
                onChange={onInputChange}
            />
            <StyledIconButton
                size="small"
                data-testid="PdfPagination__next"
                disabled={shouldNextDisabled || execDisable(disables?.next)(currentPage, totalPage)}
                onClick={() => onChangeByButton(1)}
            >
                <ArrowForwardIos fontSize="inherit" />
            </StyledIconButton>
            <span>{`${translator("paginationOfText")} ${totalPage}`}</span>
        </Box>
    );
};

PdfPagination.defaultProps = {
    disables: {
        prev: (currentPage: Mixed) => currentPage <= 1,
        next: (currentPage: Mixed, totalPage: number) => currentPage >= totalPage,
        input: () => false,
    },
};

export default PdfPagination;
