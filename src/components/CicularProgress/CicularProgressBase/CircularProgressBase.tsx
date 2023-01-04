import { useMemo } from "react";

import { CircularProgress, CircularProgressProps } from "@mui/material";

export interface CircularProgressBaseProps extends CircularProgressProps {
    sizeVariant?: "button";
}

interface ICircularProgressVariantProps {
    size: CircularProgressProps["size"];
    color: CircularProgressProps["color"];
}

const CircularProgressBase = ({ sizeVariant, ...props }: CircularProgressBaseProps) => {
    const circularProgressVariantProps: ICircularProgressVariantProps = useMemo(() => {
        switch (sizeVariant) {
            case "button":
                return {
                    size: 18,
                    color: "primary",
                };
            default:
                return {
                    size: 40,
                    color: "primary",
                };
        }
    }, [sizeVariant]);

    return (
        <CircularProgress
            {...props}
            {...circularProgressVariantProps}
            data-testid="Loading__root"
        />
    );
};

export default CircularProgressBase;
