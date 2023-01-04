import { ERPModules, MutationMenus } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { UserGroup } from "src/squads/user/common/types/user-group";

import Box from "@mui/material/Box";
import Breadcrumbs from "src/components/Breadcrumbs";
import DividerBase from "src/components/Divider/DividerBase";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";

export interface HeaderUserGroupDetailProps {
    userGroup?: UserGroup;
    onOpenEditDialog: () => void;
}

export const HeaderUserGroupDetail = ({
    userGroup,
    onOpenEditDialog,
}: HeaderUserGroupDetailProps) => {
    const actions: Action[] = [{ action: MutationMenus.EDIT }];
    return (
        <Box data-testid="UserGroupDetail__Header">
            <Breadcrumbs resource={ERPModules.USER_GROUP} name={userGroup?.user_group_name} />
            <WrapperPageHeader
                title={convertString(userGroup?.user_group_name)}
                action={
                    <ActionPanel
                        loading={false}
                        actions={actions}
                        record={userGroup}
                        recordName={userGroup?.user_group_name}
                        buttonStyle="square"
                        onAction={onOpenEditDialog}
                    />
                }
                mb={1.5}
            />
            <Box mx={-4}>
                <DividerBase variant="fullWidth" />
            </Box>
        </Box>
    );
};
