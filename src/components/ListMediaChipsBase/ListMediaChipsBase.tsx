import { Box } from "@mui/material";

import MediaChipBase, { getKeyOfMedia, MediaChipBaseType } from "./MediaChipBase";
import { UploadFilesType } from "./utils/type";

export interface ListMediaChipsBaseProps extends Partial<MediaChipBaseType> {
    medias: UploadFilesType[];
}

const ListMediaChipsBase = ({ medias, ...rest }: ListMediaChipsBaseProps) => {
    if (!medias.length) return null;

    return (
        // can't use Grid because I just wants to margin 4px
        <Box
            m={-0.5}
            data-testid="ListMediaChipsBase"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
        >
            {medias.map((file: UploadFilesType, index: number) => {
                return (
                    <MediaChipBase key={getKeyOfMedia(file)} file={file} index={index} {...rest} />
                );
            })}
        </Box>
    );
};

export default ListMediaChipsBase;
