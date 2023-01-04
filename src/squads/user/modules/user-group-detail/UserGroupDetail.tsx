import { Redirect } from "react-router";
import { Entities, ModeOpenDialog } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { UserGroupUpsert } from "src/squads/user/modules/user-group-upsert";
import { inferQuery } from "src/squads/user/service/infer-service";

import {
    HeaderUserGroupDetail,
    GeneralUserGroupDetail,
    GrantedPermissionDetail,
} from "./components";
import Box from "@mui/material/Box";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";

import useGrantedPermissionPackage from "./hooks/useGrantedPermissionPackage";

import isEmpty from "lodash/isEmpty";
import useDialog from "src/squads/user/hooks/useDialog";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

interface UserGroupProps {
    id: string;
}

const UserGroupDetail = ({ id }: UserGroupProps) => {
    const { open, onOpen, onClose } = useDialog();
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const {
        data: userGroup,
        isLoading,
        refetch,
    } = inferQuery({ entity: "userGroup", action: "userGetOneUserGroup" })(
        { user_group_id: id },
        {
            enabled: !!id,
            onError(error) {
                window.warner?.warn(`Fetch user group data`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );
    const {
        grantedPermissionPackage,
        isLoading: isLoadingGrantedPermissions,
        pagination,
        refetch: refetchGrantedPermissions,
    } = useGrantedPermissionPackage(id);

    if (!id) return <Redirect to={`/${MicroFrontendTypes.USER}/${Entities.USER_GROUP}`} />;

    if (isLoading) return <Loading />;

    if (isEmpty(userGroup)) return <NotFound data-testid="NotFound__root" />;

    return (
        <Box data-testid="UserGroupDetail">
            <HeaderUserGroupDetail userGroup={userGroup} onOpenEditDialog={onOpen} />
            <GeneralUserGroupDetail userGroup={userGroup} />
            <GrantedPermissionDetail
                grantedPermissionPackage={grantedPermissionPackage}
                isLoading={isLoadingGrantedPermissions}
                pagination={pagination}
            />

            {open ? (
                //TODO: Update props when implement UserGroupUpsert
                <UserGroupUpsert
                    open={open}
                    mode={ModeOpenDialog.EDIT}
                    onClose={onClose}
                    onSuccess={async () => {
                        await refetch();
                        await refetchGrantedPermissions();
                    }}
                    userGroup={{
                        id: userGroup?.user_group_id || "",
                        name: userGroup?.user_group_name || "",
                        grantedPermissionPackage,
                    }}
                />
            ) : null}
        </Box>
    );
};

export default UserGroupDetail;
