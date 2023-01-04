import { ERPModules } from "src/common/constants/enum";
import { Media } from "src/squads/lesson/common/types";
import { MediasManyQuery } from "src/squads/lesson/service/bob/bob-types";

import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ListMaterials from "src/squads/lesson/components/Lists/ListMaterials";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface DetailSectionLessonMaterialsProps {
    mediasList: MediasManyQuery["media"] | undefined;
    isLoadingMedias: boolean;
}
const DetailSectionLessonMaterials = (props: DetailSectionLessonMaterialsProps) => {
    const { mediasList, isLoadingMedias } = props;
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <Box data-testid="LessonDetailsMaterials__root">
            <Box mb={2}>
                <TypographyBase variant="subtitle1">
                    {tLessonManagement("materialInfo")}
                </TypographyBase>
            </Box>

            <ListMaterials
                // TODO: Refactor ListMaterials to only pick out what it needs and remove this as
                mediasList={mediasList as Media[]}
                isLoadingMedias={isLoadingMedias}
                isInLessonManagement={true}
            />
        </Box>
    );
};

export default DetailSectionLessonMaterials;
