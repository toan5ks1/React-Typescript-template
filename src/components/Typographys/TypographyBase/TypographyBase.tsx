import { ElementType, forwardRef, RefObject } from "react";

import { Typography, TypographyProps } from "@mui/material";

export type TypographyBaseProps = TypographyProps & {
    component?: ElementType;
};

//using forwardRef avoid Function components cannot be given refs
const TypographyBase = forwardRef(
    (
        props: TypographyBaseProps,
        ref:
            | ((instance: HTMLSpanElement | null) => void)
            | RefObject<HTMLSpanElement>
            | null
            | undefined
    ) => {
        return <Typography ref={ref} {...props} />;
    }
);

export default TypographyBase;
