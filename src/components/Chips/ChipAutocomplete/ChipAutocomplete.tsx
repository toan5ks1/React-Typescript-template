import { forwardRef, PropsWithChildren } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import ChipBase, { ChipBaseProps } from "../ChipBase";

import useTextEllipsis from "src/hooks/useTextEllipsis";

export interface ChipAutocompleteProps extends ChipBaseProps {}

const ChipAutocompleteTypography = forwardRef<HTMLDivElement, PropsWithChildren<{}>>(
    ({ children, ...rest }: PropsWithChildren<{}>, ref) => {
        return (
            <Box {...rest} ref={ref} component="div">
                <TypographyBase
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center" }}
                    data-testid="ChipAutocomplete"
                >
                    {children}
                </TypographyBase>
            </Box>
        );
    }
);
const ChipAutocomplete = ({ sx = [], ...rest }: ChipAutocompleteProps) => {
    return (
        <ChipBase
            size="small"
            {...rest}
            component={ChipAutocompleteTypography}
            sx={[
                useTextEllipsis,
                (theme) => ({
                    border: `1px solid ${theme.palette.grey[300]}`,
                    backgroundColor: "transparent",
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            deleteIcon={<CloseIcon data-testid="ChipAutocomplete__iconDelete" />}
        />
    );
};

export default ChipAutocomplete;
