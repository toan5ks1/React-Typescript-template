import { HtmlHTMLAttributes, useCallback, useState } from "react";

import { Box } from "@mui/material";

//@ts-ignore
import ReactPlayerLoader from "@brightcove/react-player-loader";
import useBrightcoveProfileData from "src/hooks/useBrightcoveProfileData";
import useTranslate from "src/hooks/useTranslate";

export interface BrightcoveVideoProps extends HtmlHTMLAttributes<HTMLVideoElement> {
    videoId: string;
    width?: string | number;
    height?: string | number;
}

const BrightcoveVideo = (props: BrightcoveVideoProps) => {
    const { className, videoId, width, height, ...rest } = props;
    const [failed, setFailed] = useState(false);
    const t = useTranslate();
    const { accountId } = useBrightcoveProfileData();

    const onFailure = useCallback(() => {
        setFailed(true);
    }, []);

    if (failed) {
        return (
            <Box
                sx={(theme) => ({
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: theme.palette.error.main,
                    fontSize: "1.25rem",
                })}
            >
                {t(`ra.manabie-error.videoCannotLoad`)}
            </Box>
        );
    }

    return (
        <ReactPlayerLoader
            attrs={{
                "data-testid": "Brightcove__video",
                style: {
                    width: width || 550,
                    height: height || 278,
                },
                ...rest,
            }}
            accountId={accountId}
            videoId={videoId}
            onFailure={onFailure}
        />
    );
};

export default BrightcoveVideo;
