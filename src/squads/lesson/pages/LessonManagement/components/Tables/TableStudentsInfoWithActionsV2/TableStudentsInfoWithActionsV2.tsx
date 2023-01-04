import { useState } from "react";

import { FieldError } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { TableActions } from "src/components/Table";
import DialogAddStudentInfo from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogAddStudentInfo";
import TableStudentInfoV2 from "src/squads/lesson/pages/LessonManagement/components/Tables/TableStudentInfoV2";

import differenceBy from "lodash/differenceBy";
import intersectionBy from "lodash/intersectionBy";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface TableStudentsInfoWithActionsV2Props {
    studentInfosList: LessonManagementStudentInfo[];
    updateStudentList: (studentInfosList: LessonManagementStudentInfo[]) => void;
    updateStudentAttendance: (
        studentSubscriptionId: LessonManagementStudentInfo["studentSubscriptionId"],
        attendanceValue: LessonManagementStudentInfo["attendanceStatus"]
    ) => void;
    error: FieldError | undefined;
}

const TableStudentsInfoWithActionsV2 = (props: TableStudentsInfoWithActionsV2Props) => {
    const { studentInfosList, updateStudentList, updateStudentAttendance, error } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const showSnackBar = useShowSnackbar();

    const [openAddStudentDialog, setOpenAddStudentDialog] = useState<boolean>(false);
    const [toBeDeleteStudents, setToBeDeleteStudents] = useState<LessonManagementStudentInfo[]>([]);

    const studentSubscriptionKey: keyof LessonManagementStudentInfo = "studentSubscriptionId";

    const handleAddStudents = (list: LessonManagementStudentInfo[]) => {
        const newStudentInfosList = differenceBy(list, studentInfosList, studentSubscriptionKey);
        const oldStudentInfosList = intersectionBy(studentInfosList, list, studentSubscriptionKey);

        updateStudentList([...oldStudentInfosList, ...newStudentInfosList]);
        setOpenAddStudentDialog(false);

        if (arrayHasItem(list))
            showSnackBar(tLessonManagement("messages.addedStudentsSuccessfully"));
    };

    const handleRemoveStudents = () => {
        const toBeKeptStudents = differenceBy(
            studentInfosList,
            toBeDeleteStudents,
            studentSubscriptionKey
        );

        updateStudentList(toBeKeptStudents);
        setToBeDeleteStudents([]);
        showSnackBar(tLessonManagement("messages.removedStudentsSuccessfully"));
    };

    const tableTitle = `${tLessonManagement("studentInfo")} ${
        arrayHasItem(studentInfosList) ? `(${studentInfosList.length})` : ""
    }`;

    return (
        <Box data-testid="TableStudentsInfoWithActionsV2__wrapper">
            <TableActions
                title={tableTitle}
                data-testid="TableStudentsInfoWithActionsV2__actions"
                ButtonAddProps={{ onClick: () => setOpenAddStudentDialog(true) }}
                ButtonDeleteProps={{
                    startIcon: <CloseIcon />,
                    children: t("ra.action.remove"),
                    onClick: handleRemoveStudents,
                    disabled: !arrayHasItem(toBeDeleteStudents),
                }}
            />

            <TableStudentInfoV2
                studentInfosList={studentInfosList}
                updateStudentAttendance={updateStudentAttendance}
                onSelect={setToBeDeleteStudents}
                selectedStudentInfosList={toBeDeleteStudents}
                errorMessage={error?.message}
            />

            {openAddStudentDialog && (
                <DialogAddStudentInfo
                    open={openAddStudentDialog}
                    onClose={() => setOpenAddStudentDialog(false)}
                    onSave={handleAddStudents}
                    selectedStudentInfoList={studentInfosList}
                />
            )}
        </Box>
    );
};

export default TableStudentsInfoWithActionsV2;
