import { useState } from "react";

import { Entities, ModeOpenDialog } from "src/common/constants/enum";
import StaffUpsert from "src/squads/user/modules/staff-upsert";
import { inferQueryPagination } from "src/squads/user/service/infer-service";

import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import StaffListNavbar from "src/squads/user/modules/staff-list/components/Navbar";
import StaffListTable from "src/squads/user/modules/staff-list/components/Table";

import useDialog from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

const StaffList = () => {
    const t = useTranslate();
    const tStaff = useResourceTranslate(Entities.STAFF);
    const showSnackbar = useShowSnackbar();
    const { open, onOpen, onClose } = useDialog();
    const [searchTerm, setSearchTerm] = useState("");
    const isEnabledStaffTableQuery = useUserFeatureToggle("STAFF_MANAGEMENT_USE_STAFF_QUERY");
    const action = isEnabledStaffTableQuery
        ? "userStaffGetManyByFilterV4"
        : "userGetManyStaffWithFilter";
    const {
        result: { refetch, isFetching },
        data,
        pagination: staffPagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "staff",
        action,
    })(
        {
            filter: {
                user_name: searchTerm,
            },
        },
        {
            enabled: true,
            onError: (error) => {
                window.warner?.warn(`LIST_WITH_FILTER`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const handleEnterSearchBar = (value: string) => {
        if (value !== searchTerm) resetPaginationOffset();
        setSearchTerm(value);
    };

    return (
        <>
            <TypographyPageTitle title={tStaff("titles.staffManagement")} />
            <StaffListNavbar onOpenUpsert={onOpen} onSearch={handleEnterSearchBar} />
            <StaffListTable
                data={data?.data || []}
                pagination={staffPagination}
                isFetching={isFetching}
            />
            {open ? (
                <StaffUpsert
                    onSave={refetch}
                    mode={ModeOpenDialog.ADD}
                    open={open}
                    onClose={onClose}
                />
            ) : null}
        </>
    );
};

export default StaffList;
