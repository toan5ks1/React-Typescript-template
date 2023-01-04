import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { LessonManagementStudentInfo as LessonStudentInfo } from "src/squads/lesson/common/types";

import { Grid } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import WrapperGrid from "src/components/Wrappers/WrapperGrid";
import WrapperLookingFor, {
    WrapperLookingForProps,
} from "src/components/Wrappers/WrapperLookingFor";
import FormFilterAdvancedStudentInfos from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedStudentInfos";
import TableStudentSubscriptionV2 from "src/squads/lesson/pages/LessonManagement/components/Tables/TableStudentSubscriptionV2";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import useStudentInfoWithFilter from "src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter";

export interface DialogAddStudentInfoProps {
    onSave: (studentInfosList: LessonStudentInfo[]) => void;
    onClose: () => void;
    selectedStudentInfoList: LessonStudentInfo[];
    open: boolean;
}

const DialogAddStudentInfo = (props: DialogAddStudentInfoProps) => {
    const { open, onSave, onClose, selectedStudentInfoList } = props;

    const [addedStudentInfoList, setAddedStudentInfoList] =
        useState<LessonStudentInfo[]>(selectedStudentInfoList);

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const {
        studentInfosList,
        isLoadingStudentsCourses,
        isLoadingGrades,
        pagination,
        handleEnterSearchBar,
        handleApplyFilterCriteria,
    } = useStudentInfoWithFilter();

    const handleClose = () => {
        setAddedStudentInfoList(selectedStudentInfoList);
        onClose();
    };

    const lookingForWrapperVariant: WrapperLookingForProps["variant"] =
        !isLoadingStudentsCourses && !arrayHasItem(studentInfosList) ? "empty-icon" : "result";

    return (
        <DialogWithHeaderFooter
            onClose={handleClose}
            onSave={() => onSave(addedStudentInfoList)}
            title={tLessonManagement("addStudent")}
            open={open}
            fullWidth
            maxWidth="md"
            minWidthBox="md"
            textSave={t("ra.common.action.add")}
            data-testid="DialogAddStudentInfo__dialogContainer"
        >
            <WrapperGrid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormFilterAdvancedStudentInfos
                            onApplySubmit={handleApplyFilterCriteria}
                            onEnterSearchBar={handleEnterSearchBar}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <WrapperLookingFor
                            variant={lookingForWrapperVariant}
                            content={t("resources.common.noResult")}
                            helperText={t("resources.common.noResultSearchAndFilter")}
                            height="dialog"
                        >
                            <PaperRoundedBorders>
                                <TableStudentSubscriptionV2
                                    studentInfosList={studentInfosList}
                                    selectedStudentInfoList={addedStudentInfoList}
                                    pagination={pagination}
                                    onSelect={setAddedStudentInfoList}
                                    isLoadingStudentsCourses={isLoadingStudentsCourses}
                                    isLoadingGrades={isLoadingGrades}
                                />
                            </PaperRoundedBorders>
                        </WrapperLookingFor>
                    </Grid>
                </Grid>
            </WrapperGrid>
        </DialogWithHeaderFooter>
    );
};

export default DialogAddStudentInfo;
