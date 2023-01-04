import { forwardRef, CSSProperties, useCallback, useMemo } from "react";

import { Box, Grid, GridSize, GridSpacing, Skeleton, SxProps, Theme } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyEntityDetailLabel from "src/components/Typographys/TypographyEntityDetailLabel";

import TypographyShortenStr from "../TypographyShortenStr";
import TypographyTextSecondary from "../TypographyTextSecondary";

export interface TypographyWithValueProps {
    label: React.ReactNode;
    value?: string | number | React.ReactNode;
    variant?: "horizontal" | "vertical";
    spacing?: GridSpacing;
    xsLabel?: GridSize;
    xsValue?: GridSize;
    maxLength?: number;
    isLoading?: boolean;
    hasPercentage?: boolean;
    hasDoubleDash?: boolean;
    styleValue?: CSSProperties;
    classNameLabel?: string;
    classNameValue?: string;
    sxValue?: SxProps<Theme>;
    sxLabel?: SxProps<Theme>;
    dataTestidLabel?: string;
    dataTestidValue?: string;
}

const TypographyWithValue = forwardRef<HTMLDivElement, TypographyWithValueProps>(
    (
        {
            label,
            value,
            variant,
            spacing,
            xsValue = 6,
            xsLabel = 6,
            maxLength,
            isLoading = false,
            hasPercentage,
            hasDoubleDash,
            styleValue,
            classNameLabel,
            classNameValue,
            sxValue,
            sxLabel,
            dataTestidLabel,
            dataTestidValue,
        }: TypographyWithValueProps,
        _ref
    ) => {
        const handleRenderSkeleton = useCallback(
            (componentValue: JSX.Element) => {
                if (isLoading) {
                    return <Skeleton data-testid="TypographyWithValue__skeleton" />;
                }
                return componentValue;
            },
            [isLoading]
        );

        const typographyValue = useMemo(() => {
            if (isLoading) return <Skeleton />;
            if (maxLength) {
                return (
                    <TypographyShortenStr variant="body2" maxLength={maxLength} style={styleValue}>
                        {`${value}`}
                    </TypographyShortenStr>
                );
            }
            return (
                <Box display="flex">
                    <TypographyBase variant="body2" style={styleValue}>
                        {value ? value : hasDoubleDash && "--"}
                    </TypographyBase>
                    {hasPercentage && (
                        <TypographyTextSecondary variant="body2">/100%</TypographyTextSecondary>
                    )}
                </Box>
            );
        }, [isLoading, maxLength, styleValue, value, hasDoubleDash, hasPercentage]);

        return variant === "horizontal" ? (
            <Grid container spacing={spacing} sx={{ wordBreak: "break-word" }}>
                <Grid
                    item
                    sx={sxLabel}
                    xs={xsLabel}
                    className={classNameLabel}
                    data-testid={dataTestidLabel}
                >
                    <TypographyEntityDetailLabel>{label}</TypographyEntityDetailLabel>
                </Grid>
                <Grid
                    item
                    xs={xsValue}
                    className={classNameValue}
                    sx={sxValue}
                    data-testid={dataTestidValue}
                >
                    {handleRenderSkeleton(typographyValue)}
                </Grid>
            </Grid>
        ) : (
            <Box sx={{ wordBreak: "break-word" }}>
                <TypographyEntityDetailLabel>{label}</TypographyEntityDetailLabel>
                {handleRenderSkeleton(<TypographyBase variant="body2">{value}</TypographyBase>)}
            </Box>
        );
    }
);

export default TypographyWithValue;
