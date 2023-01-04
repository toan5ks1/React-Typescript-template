import { ReactElement } from "react";

import { Box } from "@mui/material";

const WrapperGrid = (props: { children: ReactElement }) => {
    return <Box style={{ overflow: "hidden" }}>{props.children}</Box>;
};

export default WrapperGrid;
