import { Box, BoxProps } from "@mui/material";

interface BaseBoxProps extends BoxProps {}

const BaseBox = ({ children, sx = [], ...props }: BaseBoxProps) => {
    return (
        <Box {...props} sx={[{ borderColor: "#E0E0E0" }, ...(Array.isArray(sx) ? sx : [sx])]}>
            {children}
        </Box>
    );
};

const defaultProps: Partial<BaseBoxProps> = {
    border: 1,
    borderRadius: "4px",
};

BaseBox.defaultProps = defaultProps;

export default BaseBox;
