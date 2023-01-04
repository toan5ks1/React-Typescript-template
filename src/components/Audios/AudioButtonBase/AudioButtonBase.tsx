import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SvgIconTypeMap } from "@mui/material";

import IconButtonBase, { IconButtonBaseProps } from "../../IconButton/IconButtonBase";

export interface AudioButtonBaseProps extends IconButtonBaseProps {
    iconProps?: SvgIconTypeMap;
}

const AudioButtonBase = ({ iconProps, ...props }: AudioButtonBaseProps) => {
    return (
        <IconButtonBase color="primary" size="large" {...props}>
            <VolumeUpIcon fontSize="small" {...iconProps} />
        </IconButtonBase>
    );
};

export default AudioButtonBase;
