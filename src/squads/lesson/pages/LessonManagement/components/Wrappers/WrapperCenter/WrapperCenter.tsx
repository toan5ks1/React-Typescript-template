import { ReactNode } from "react";

import { Box } from "@mui/material";

const WrapperCenter = (props: { children: ReactNode }) => {
    return (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            {props.children}
        </Box>
    );
};

export default WrapperCenter;
