import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface StaffListNavbarProps {
    onOpenUpsert: () => void;
    onSearch: (value: string) => void;
}
const Navbar = ({ onOpenUpsert, onSearch }: StaffListNavbarProps) => {
    const t = useTranslate();
    const tStaff = useResourceTranslate(Entities.STAFF);

    return (
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
            <FormFilterAdvanced
                inputSearchPlaceholder={tStaff(`descriptions.search`)}
                onEnterSearchBar={onSearch}
            />
            <ButtonCreate data-testid="StaffListNavbar__btnAdd" onClick={onOpenUpsert}>
                {t("ra.common.action.add")}
            </ButtonCreate>
        </Box>
    );
};

export default Navbar;
