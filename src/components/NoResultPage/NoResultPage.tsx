import Box from "@mui/material/Box";
import { EmptyIconV2 } from "src/components/SvgIcons";
import TypographyLookingFor from "src/components/Typographys/TypographyLookingFor";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useTranslate from "src/hooks/useTranslate";

const NoResultPage = () => {
    const t = useTranslate();
    return (
        <Box display="block" textAlign="center" data-testid="NoResultPage__root">
            <EmptyIconV2 data-testid="NoResultPage__emptyIcon" />
            <Box mb={1} mt={2}>
                <TypographyLookingFor>{t("resources.common.noResultFound")}</TypographyLookingFor>
            </Box>
            <TypographyTextSecondary variant="caption">
                {t("resources.common.pleaseTryAgainWithDifferentKeywordsOrFilters")}
            </TypographyTextSecondary>
        </Box>
    );
};

export default NoResultPage;
