import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import type { GrantedPermission } from "src/squads/user/common/types/user-group";

import Grid from "@mui/material/Grid";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import ButtonDelete from "src/components/Buttons/ButtonDelete";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import { GrantedPermissionUpsertTable } from "src/squads/user/modules/user-group-upsert/components/GrantedPermissionUpsertTable";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useGrantedPermissionFieldArray from "src/squads/user/modules/user-group-upsert/hooks/useGrantedPermissionFieldArray";

export const GrantedPermissionUpsert = () => {
    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);

    const t = useTranslate();

    const { grantedPermissions, onAdd, onDelete, update } = useGrantedPermissionFieldArray();

    const [selectedGrantedPermissions, setSelectedGrantedPermissions] = useState<
        GrantedPermission[]
    >([]);

    const handleDeleteRows = () => {
        onDelete(selectedGrantedPermissions);
        setSelectedGrantedPermissions([]);
    };

    const handleSelectedItems = (selectedGrantedPermissions: GrantedPermission[]) => {
        setSelectedGrantedPermissions(selectedGrantedPermissions);
    };

    return (
        <Grid data-testid="FormUserGroupGrantedPermissionInfo__grantedPermission" pb={1}>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                    <TypographyHeader>{tUserGroup("titles.grantedPermission")}</TypographyHeader>
                </Grid>
                <Grid item>
                    <ButtonDelete
                        data-testid="UserGroupGrantedPermissionUpsert__deleteAction"
                        onClick={handleDeleteRows}
                        disabled={!arrayHasItem(selectedGrantedPermissions)}
                    />
                    <ButtonCreate
                        variant="outlined"
                        onClick={onAdd}
                        data-testid="UserGroupGrantedPermissionUpsert__addButton"
                    >
                        {t("ra.common.action.add")}
                    </ButtonCreate>
                </Grid>
            </Grid>
            <GrantedPermissionUpsertTable
                grantedPermissions={grantedPermissions}
                listSelectedItems={selectedGrantedPermissions}
                onSelect={handleSelectedItems}
                updateRow={update}
            />
        </Grid>
    );
};
