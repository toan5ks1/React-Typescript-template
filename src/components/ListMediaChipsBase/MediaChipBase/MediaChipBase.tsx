import { cloneElement, useRef } from "react";

import { useUnmount } from "react-use";

import { styled } from "@mui/material/styles";
import BrightcoveVideoReview from "src/components/BrightcoveVideoReview";
import ChipFileDescription, {
    ChipFileDescriptionProps,
} from "src/components/Chips/ChipFileDescription";

import { getKeyByValue, isMedia, MediaType, UploadFilesType } from "../utils/type";

export const getKeyOfMedia = (file: UploadFilesType) => {
    return file instanceof File
        ? `${file.name}.${file.type}.${file.size}.${file.lastModified}`
        : file.media_id;
};

export interface MediaChipBaseType {
    onDelete: (index: number) => void;
    variant: ChipFileDescriptionProps["variant"];
    shouldConfirmDelete: ChipFileDescriptionProps["shouldConfirmDelete"];
}

export interface MediaChipBaseProps
    extends Partial<MediaChipBaseType>,
        Pick<ChipFileDescriptionProps, "convertPdf" | "requirePdfConversion"> {
    file: UploadFilesType;
    index: number;
}

const StyledChipFileDescription = styled(ChipFileDescription)(({ theme }) => ({
    margin: theme.spacing(0.5, 0.25),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    border: "1px solid rgba(0, 0, 0, 0.23)",
}));

StyledChipFileDescription.displayName = "StyledChipFileDescription";

const MediaChipBase = (props: MediaChipBaseProps) => {
    const { file, index, onDelete, ...rest } = props;

    const key = getKeyOfMedia(file);

    const unMountedRef = useRef<boolean>(false);
    useUnmount(() => {
        unMountedRef.current = true;
    });

    const chip = (
        <StyledChipFileDescription
            name={file.name || ""}
            type={file.type || ""}
            file={file}
            onDelete={onDelete ? () => onDelete(index) : undefined}
            {...rest}
        />
    );

    if (!isMedia(file)) return chip;

    if (file.type === getKeyByValue(MediaType, MediaType.MEDIA_TYPE_VIDEO)) {
        return (
            <BrightcoveVideoReview videoId={`${file.resource}`} key={key}>
                {chip}
            </BrightcoveVideoReview>
        );
    }

    return cloneElement(chip, {
        href: file.resource,
    });
};

export default MediaChipBase;
