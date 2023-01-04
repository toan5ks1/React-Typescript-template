import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import PaperBase, { PaperBaseProps } from "../PaperBase";

export interface PaperRoundedBordersProps extends PaperBaseProps {
    fullHeight?: boolean;
}

const PaperRoundedBorders = ({ fullHeight, children, ...rest }: PaperRoundedBordersProps) => {
    const theme = useTheme();

    return (
        <PaperBase elevation={0} {...rest} sx={{ ...(fullHeight && { height: "100%" }) }}>
            <Box
                border={`1px solid ${theme.palette.grey[300]}`}
                borderRadius="4px"
                height={fullHeight ? "100%" : undefined}
            >
                {children}
            </Box>
        </PaperBase>
    );
};

export default PaperRoundedBorders;
