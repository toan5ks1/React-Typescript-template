import {
    cloneElement,
    HtmlHTMLAttributes,
    isValidElement,
    MouseEvent,
    PropsWithChildren,
    useCallback,
    useState,
} from "react";

import { Box } from "@mui/material";
import FormDialog from "src/squads/syllabus/components/LegacyDialogs/FormDialog";

import BrightcoveVideo, { BrightcoveVideoProps } from "../BrightcoveVideo";

export interface BrightcoveVideoReviewProps
    extends Pick<BrightcoveVideoProps, "width" | "height" | "videoId">,
        HtmlHTMLAttributes<HTMLDivElement> {}

//clone and pass props to children
const BrightcoveVideoReview = (props: PropsWithChildren<BrightcoveVideoReviewProps>) => {
    const [openReview, setOpenReview] = useState(false);
    const { className, children, videoId, ...rest } = props;

    const onOpenReview = useCallback((e: MouseEvent) => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        setOpenReview(true);
    }, []);

    const onClosePreview = useCallback(() => {
        setOpenReview(false);
    }, []);

    return (
        <>
            <Box className={className} sx={{ cursor: "pointer", maxWidth: "100%" }} {...rest}>
                {isValidElement(children)
                    ? cloneElement(children, { onClick: onOpenReview })
                    : null}
            </Box>
            <FormDialog open={openReview} handleClose={onClosePreview}>
                <BrightcoveVideo videoId={videoId} />
            </FormDialog>
        </>
    );
};

export default BrightcoveVideoReview;
