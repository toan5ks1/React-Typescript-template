import { arrayHasItem } from "src/common/utils/other";
import { Media } from "src/squads/lesson/common/types";

import { Box, Skeleton } from "@mui/material";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";

import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface ListMaterialsProps {
    mediasList: Media[] | undefined;
    isLoadingMedias?: boolean;
    onConvertSuccessfully?: () => void;
    isInLessonManagement?: boolean;
}
const ListMaterials = (props: ListMaterialsProps) => {
    const { mediasList, isLoadingMedias, isInLessonManagement } = props;
    const t = useTranslate();

    if (isLoadingMedias) return <Skeleton data-testid="ListMaterials__skeleton" />;
    if (mediasList && arrayHasItem(mediasList)) {
        return (
            <Box width={isInLessonManagement ? "30%" : "100%"}>
                <ListMediaChipsBase medias={mediasList} variant="outlined" />
            </Box>
        );
    }
    return (
        <PaperRoundedBorders>
            <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />
        </PaperRoundedBorders>
    );
};

export default ListMaterials;
