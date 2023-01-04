import { ERPModules } from "src/common/constants/enum";

import { Grid, Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import { GrantedPermissionUpsert } from "src/squads/user/modules/user-group-upsert/components/GrantedPermissionUpsert";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export const FormUserGroupInfo = () => {
    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);
    const t = useTranslate();
    return (
        <>
            <Box mb={2}>
                <TypographyHeader>{tUserGroup("titles.generalInfo")}</TypographyHeader>
            </Box>
            <Grid container item xs={12} spacing={3} data-testid="FormUserGroupInfo__generalInfo">
                <Grid item xs={6}>
                    <TextFieldHF
                        name="name"
                        required
                        label={tUserGroup("labels.userGroupName")}
                        inputProps={{
                            "data-testid": "FormUserGroupInfo__inputUserGroupName",
                        }}
                        rules={{
                            required: {
                                value: true,
                                message: t("resources.input.error.required"),
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <Box my={3}>
                <DividerDashed variant="fullWidth" />
            </Box>
            <GrantedPermissionUpsert />
        </>
    );
};
