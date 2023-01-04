import { useState } from "react";

import { FieldError } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";

import { TableActions } from "src/components/Table";
import DialogAddStudentSubscriptions from "src/squads/lesson/components/Dialogs/DialogAddStudentSubscriptions";
import TableStudentInfo from "src/squads/lesson/components/Tables/TableStudentInfo";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import differenceBy from "lodash/differenceBy";
import intersectionBy from "lodash/intersectionBy";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface TableStudentsInfoWithActionsProps {
    studentsList: LessonManagementStudentInfo[];
    updateStudentList: (list: LessonManagementStudentInfo[]) => void;
    updateStudentAttendance: (
        studentSubscriptionId: LessonManagementStudentInfo["studentSubscriptionId"],
        attendanceValue: StudentAttendStatus
    ) => void;
    error: FieldError | undefined;
}

const TableStudentsInfoWithActions = (props: TableStudentsInfoWithActionsProps) => {
    const { studentsList, updateStudentList, updateStudentAttendance, error } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const showSnackBar = useShowSnackbar();

    const [openAddStudentDialog, setOpenAddStudentDialog] = useState<boolean>(false);
    const [toBeDeleteStudents, setToBeDeleteStudents] = useState<LessonManagementStudentInfo[]>([]);

    const studentSubscriptionKey: keyof LessonManagementStudentInfo = "studentSubscriptionId";

    const handleAddStudents = (list: LessonManagementStudentInfo[]) => {
        const newStudentsList = differenceBy(list, studentsList, studentSubscriptionKey);
        const oldStudentsList = intersectionBy(studentsList, list, studentSubscriptionKey);

        updateStudentList([...oldStudentsList, ...newStudentsList]);
        setOpenAddStudentDialog(false);

        if (arrayHasItem(list))
            showSnackBar(tLessonManagement("messages.addedStudentsSuccessfully"));
    };

    const handleRemoveStudents = () => {
        const toBeKeptStudents = differenceBy(
            studentsList,
            toBeDeleteStudents,
            studentSubscriptionKey
        );

        updateStudentList(toBeKeptStudents);
        setToBeDeleteStudents([]);
    };

    return (
        <>
            <TableActions
                title={tLessonManagement("studentInfo")}
                data-testid="TableStudents__action"
                ButtonAddProps={{ onClick: () => setOpenAddStudentDialog(true) }}
                ButtonDeleteProps={{
                    startIcon: null,
                    children: t("ra.action.remove"),
                    onClick: handleRemoveStudents,
                    disabled: !arrayHasItem(toBeDeleteStudents),
                }}
            />

            <TableStudentInfo
                studentsList={studentsList}
                updateStudentAttendance={updateStudentAttendance}
                onSelect={setToBeDeleteStudents}
                selectedStudentsList={toBeDeleteStudents}
                errorMessage={error?.message}
            />

            {openAddStudentDialog && (
                <DialogAddStudentSubscriptions
                    open={openAddStudentDialog}
                    onClose={() => setOpenAddStudentDialog(false)}
                    onSave={handleAddStudents}
                    selectedStudentInfoList={studentsList}
                />
            )}
        </>
    );
};

export default TableStudentsInfoWithActions;
