import { FC, AudioHTMLAttributes } from "react";

import { Box } from "@mui/material";

const Audio: FC<AudioHTMLAttributes<HTMLAudioElement>> = ({ className, ...rest }) => {
    return (
        <Box
            component="audio"
            sx={{
                outline: "none",
                "&:focus": {
                    outline: "none",
                },
            }}
            className={className}
            controls
            {...rest}
        />
    );
};

export default Audio;
