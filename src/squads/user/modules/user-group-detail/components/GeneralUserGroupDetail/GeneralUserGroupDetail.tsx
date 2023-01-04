import { Entities } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { UserGroup } from "src/squads/user/common/types/user-group";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

interface UserGroupDetailProps {
    userGroup?: UserGroup;
}

export const GeneralUserGroupDetail = ({ userGroup }: UserGroupDetailProps) => {
    const t = useResourceTranslate(Entities.USER_GROUP);

    return (
        <Box data-testid="GeneralUserGroupDetail__root" mt={2}>
            <Box mb={2}>
                <TypographyPrimary data-testid="GeneralUserGroupDetail__subTitle">
                    {t("detail.generalInfo")}
                </TypographyPrimary>
            </Box>
            <Grid container>
                <Grid item xs={6}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={convertString(userGroup?.user_group_name)}
                        label={t(`detail.generalName`)}
                        dataTestidValue="GeneralUserGroupDetail__generalNameValue"
                        xsLabel={3}
                        xsValue={8}
                    />
                </Grid>
            </Grid>
            <Box mt={3}>
                <DividerDashed variant="fullWidth" />
            </Box>
        </Box>
    );
};
