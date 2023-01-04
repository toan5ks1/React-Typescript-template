import { ReactNode } from "react";

import { Box } from "@mui/material";

export interface WrapperDividerSectionProps {
    children: ReactNode;
}

const WrapperDividerSection = (props: WrapperDividerSectionProps) => {
    const { children } = props;
    return <Box my={1}>{children}</Box>;
};

export default WrapperDividerSection;
