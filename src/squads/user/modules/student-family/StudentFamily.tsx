import { useToggle } from "react-use";
import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { choicesAddParentType } from "src/squads/user/common/constants/choices";
import { AddParentType } from "src/squads/user/common/constants/enum";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import ParentList from "./components/ParentList";
import { Box } from "@mui/material";
import ButtonDropdownMenu from "src/components/Menus/ButtonDropdownMenu";
import TypographyBase from "src/components/Typographys/TypographyBase";
import DialogAccountInfo from "src/squads/user/components/DialogAccountInfo";
import DialogSearchParent from "src/squads/user/modules/student-family/components/DialogSearchParent";
import DialogUpsertParent from "src/squads/user/modules/student-family/components/DialogUpsertParent";

import useParentMapStudent from "src/squads/user/hooks/useParentMapStudent";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useSafeState from "src/squads/user/hooks/useSafeState";

export interface StudentFamilyProps {
    studentId: string;
}

const StudentFamily = ({ studentId }: StudentFamilyProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const [openDialogUpsertParent, setOpenDialogUpsertParent] = useToggle(false);
    const [openDialogSearchParent, setOpenDialogSearchParent] = useToggle(false);
    const [openDialogParentAccountInfo, setOpenDialogParentAccountInfo] = useToggle(false);
    const [parentsAccountInfo, setParentsAccountInfo] =
        useSafeState<NsUsermgmtStudentService.CreateParentProfile[]>();

    const { parents, isLoading, refetch: refetchParents } = useParentMapStudent(studentId);

    const handleOpenDialogCreateParent = () => {
        setOpenDialogUpsertParent(true);
    };

    const handleOpenDialogSearchParent = () => {
        setOpenDialogSearchParent(true);
    };

    const onSelectAddParentType = (type: OptionSelectType) => {
        switch (type.id) {
            case AddParentType.EXISTING:
                return handleOpenDialogSearchParent();
            case AddParentType.NEW:
                return handleOpenDialogCreateParent();
            default:
                return;
        }
    };

    const handleCloseParentAccountInfo = () => {
        setOpenDialogParentAccountInfo(false);
        setParentsAccountInfo([]);
    };

    const handleCloseDialogUpsertParent = () => {
        void refetchParents();
        setOpenDialogUpsertParent(false);
    };

    const handleCreateParentSuccess = (
        resp: NsUsermgmtStudentService.CreateParentsAndAssignToStudent
    ) => {
        handleCloseDialogUpsertParent();

        if (arrayHasItem(resp.parentProfilesList)) {
            setParentsAccountInfo(resp.parentProfilesList);
            setOpenDialogParentAccountInfo(true);
        }
    };

    const handleAddExistingParentSuccess = () => {
        setOpenDialogSearchParent(false);
        void refetchParents();
    };

    return (
        <>
            <Box mt={3} data-testid="StudentFamily__root">
                <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <TypographyBase data-testid="StudentFamily__title" variant="h6">
                        {tStudents("titles.familyInfo")}
                    </TypographyBase>
                    <ButtonDropdownMenu
                        label={tStudents("titles.addFamily")}
                        options={choicesAddParentType}
                        onClick={onSelectAddParentType}
                    />
                </Box>
                <ParentList
                    studentId={studentId}
                    parents={parents}
                    isLoading={isLoading}
                    refetchParents={refetchParents}
                />
            </Box>
            {openDialogUpsertParent ? (
                <DialogUpsertParent
                    mode={ModeOpenDialog.ADD}
                    studentId={studentId}
                    parents={parents}
                    open={openDialogUpsertParent}
                    onClose={() => setOpenDialogUpsertParent(false)}
                    onSuccess={handleCreateParentSuccess}
                />
            ) : null}
            {openDialogSearchParent ? (
                <DialogSearchParent
                    studentId={studentId}
                    parents={parents}
                    open={openDialogSearchParent}
                    onSuccess={handleAddExistingParentSuccess}
                    onClose={() => setOpenDialogSearchParent(false)}
                />
            ) : null}
            {openDialogParentAccountInfo ? (
                <DialogAccountInfo
                    parents={parentsAccountInfo}
                    showDividerDashed={false}
                    title={tStudents("titles.dialogAccountInfo")}
                    open={openDialogParentAccountInfo}
                    onClose={handleCloseParentAccountInfo}
                />
            ) : null}
        </>
    );
};

export default StudentFamily;
