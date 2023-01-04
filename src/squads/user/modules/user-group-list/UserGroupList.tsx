import { Entities, ModeOpenDialog } from "src/common/constants/enum";
import { UserGroupUpsert } from "src/squads/user/modules/user-group-upsert";
import { inferQueryPagination } from "src/squads/user/service/infer-service";

import Box from "@mui/material/Box";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import UserGroupTable from "src/squads/user/modules/user-group-list/components/UserGroupTable";

import useDialog from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

const UserGroupList = () => {
    const t = useTranslate();
    const tUserGroup = useResourceTranslate(Entities.USER_GROUP);
    const showSnackbar = useShowSnackbar();
    const { open, onOpen, onClose } = useDialog();
    const {
        result: { isFetching, refetch },
        data,
        pagination: userGroupPagination,
    } = inferQueryPagination({
        entity: "userGroup",
        action: "userGetManyUserGroupsWithFilter",
    })(
        {},
        {
            enabled: true,
            onError: (error) => {
                window.warner?.warn(`userGetManyUserGroupsWithFilter`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    return (
        <WrapperPageContent>
            <TypographyPageTitle title={tUserGroup("title")} />
            <Box display="flex" justifyContent="flex-end" alignItems="start" mb={2}>
                <ButtonCreate
                    data-testid="UserGroupTable__addButton"
                    resource={Entities.USER_GROUP}
                    onClick={onOpen}
                >
                    {t("ra.common.action.add")}
                </ButtonCreate>
            </Box>
            <UserGroupTable
                data={data?.data || []}
                isFetching={isFetching}
                pagination={userGroupPagination}
            />
            {open ? (
                <UserGroupUpsert
                    open={open}
                    mode={ModeOpenDialog.ADD}
                    onClose={onClose}
                    onSuccess={refetch}
                />
            ) : null}
        </WrapperPageContent>
    );
};

export default UserGroupList;
