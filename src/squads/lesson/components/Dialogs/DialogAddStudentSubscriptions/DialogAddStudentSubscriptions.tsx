import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";

import { Grid } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import WrapperGrid from "src/components/Wrappers/WrapperGrid";
import WrapperLookingFor, {
    WrapperLookingForProps,
} from "src/components/Wrappers/WrapperLookingFor";
import FormFilterAdvancedStudentSubscriptions from "src/squads/lesson/components/Forms/FormFilterAdvancedStudentSubscriptions";
import TableStudentSubscriptions from "src/squads/lesson/components/Tables/TableStudentSubscriptions";

import useLessonStudentInfoListFilter from "src/squads/lesson/hooks/useLessonStudentInfoListFilter";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface DialogAddStudentSubscriptionsProps {
    onSave: (list: LessonManagementStudentInfo[]) => void;
    onClose: () => void;
    selectedStudentInfoList: LessonManagementStudentInfo[];
    open: boolean;
}

const DialogAddStudentSubscriptions = (props: DialogAddStudentSubscriptionsProps) => {
    const { open, onSave, onClose, selectedStudentInfoList } = props;

    const [addedStudentInfoList, setAddedStudentInfoList] =
        useState<LessonManagementStudentInfo[]>(selectedStudentInfoList);

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const {
        data: lessonStudentSubscriptionsData,
        isFetchingStudentsCourses,
        isLoadingGrades,
        pagination,
        handleEnterSearchBar,
        handleApplyFilterCriteria,
    } = useLessonStudentInfoListFilter();

    const handleClose = () => {
        setAddedStudentInfoList(selectedStudentInfoList);
        onClose();
    };

    const wrapperLookingForVariant: WrapperLookingForProps["variant"] =
        !isFetchingStudentsCourses && !arrayHasItem(lessonStudentSubscriptionsData)
            ? "empty-icon"
            : "result";

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
            data-testid="DialogAddStudentSubscriptions__dialogContainer"
        >
            <WrapperGrid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormFilterAdvancedStudentSubscriptions
                            onApplySubmit={handleApplyFilterCriteria}
                            onEnterSearchBar={handleEnterSearchBar}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <WrapperLookingFor
                            variant={wrapperLookingForVariant}
                            content={t("resources.common.noResult")}
                            helperText={t("resources.common.noResultSearchAndFilter")}
                            height="dialog"
                        >
                            <PaperRoundedBorders>
                                <TableStudentSubscriptions
                                    studentInfoList={lessonStudentSubscriptionsData}
                                    selectedStudentInfoList={addedStudentInfoList}
                                    pagination={pagination}
                                    onSelect={setAddedStudentInfoList}
                                    isLoadingStudentsCourses={isFetchingStudentsCourses}
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

export default DialogAddStudentSubscriptions;
