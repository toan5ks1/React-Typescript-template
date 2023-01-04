import { useMemo, HTMLAttributes, useCallback } from "react";

import { AudioType, ImageType, MIMETypes, VideoType } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { getFileExtension, isImage, isPdf, isVideo } from "src/common/utils/file";
import { $enum } from "ts-enum-util";

import { Box } from "@mui/material";
import AudioIcon from "src/components/SvgIcons/AudioIcon";
import CSVIcon from "src/components/SvgIcons/CSVIcon";
import FileIconImg from "src/components/SvgIcons/FileIcon";
import ImageIcon from "src/components/SvgIcons/ImageIcon";
import PDFIcon from "src/components/SvgIcons/PDFIcon";
import VideoIcon from "src/components/SvgIcons/VideoIcon";

type EnhanceMimeTypes = MIMETypes | string | undefined;

interface FileIconProps extends HTMLAttributes<HTMLImageElement> {
    type?: EnhanceMimeTypes;
    name?: string;
    className?: string;
}
const images = $enum(ImageType)
    .getValues()
    .map((e) => String(e).replace("image/", ""));

const videos = $enum(VideoType)
    .getValues()
    .map((e) => String(e).replace("video/", ""));
const pdfs = ["pdf"];
const csv = ["csv"];
const audios = $enum(AudioType)
    .getValues()
    .map((e) => String(e).replace("audio/", ""));

const FileIcon = ({ type, name, className, ...props }: FileIconProps) => {
    const getPath = useCallback((fileType: EnhanceMimeTypes, name?: string) => {
        const ext = getFileExtension(convertString(name));

        switch (true) {
            case csv.includes(ext):
                return <CSVIcon data-testid="FileIcon__CSV" />;
            case audios.includes(ext):
                return <AudioIcon data-testid="FileIcon__audio" />;
            case isImage({ type: fileType }):
            case images.includes(ext):
                return <ImageIcon data-testid="FileIcon__image" />;
            case isPdf({ type: fileType }):
            case pdfs.includes(ext):
                return <PDFIcon data-testid="FileIcon__PDF" />;
            case isVideo({ type: fileType }):
            case videos.includes(ext):
                return <VideoIcon data-testid="FileIcon__video" />;
            default:
                return <FileIconImg data-testid="FileIcon__file" />;
        }
    }, []);

    const image = useMemo(() => getPath(type, name), [getPath, name, type]);

    return (
        <Box
            className={className}
            sx={{
                minWidth: 28,
                minHeight: 28,
                display: "flex",
            }}
            data-testid="FileIcon"
            {...props}
        >
            {image}
        </Box>
    );
};

export default FileIcon;
