import { Box } from "@mui/material";
import JPREPColorIcon from "src/components/SvgIcons/LogoIcon/JPREPColorIcon";
import JPREPWhiteIcon from "src/components/SvgIcons/LogoIcon/JPREPWhiteIcon";

import { LogoIconProps } from "./logo-icon-types";

const JPREPIcon = ({ variant = "primary" }: LogoIconProps) => {
    const image = variant === "primary" ? <JPREPColorIcon /> : <JPREPWhiteIcon />;

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 180,
                maxHeight: 40,
                objectFit: "contain",
            }}
        >
            {image}
        </Box>
    );
};

export default JPREPIcon;
