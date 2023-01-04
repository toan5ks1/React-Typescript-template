import { Box } from "@mui/material";
import RenseikaiColorIcon from "src/components/SvgIcons/LogoIcon/RenseikaiColorIcon";
import RenseikaiWhiteIcon from "src/components/SvgIcons/LogoIcon/RenseikaiWhiteIcon";

import { LogoIconProps } from "./logo-icon-types";

const RenseikaiIcon = ({ variant }: LogoIconProps) => {
    const image = variant === "primary" ? <RenseikaiColorIcon /> : <RenseikaiWhiteIcon />;

    return <Box sx={{ width: "100%", maxWidth: 200 }}>{image}</Box>;
};

export default RenseikaiIcon;
