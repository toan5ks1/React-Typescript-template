import { useMemo, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import {
    generateTranslatedAttendanceStatusOptions,
    lessonReportDetailsFormKeyName,
} from "src/squads/lesson/common/constants";
import {
    DynamicAutocompleteOptionProps,
    LessonReportBusinessRuleFieldIds,
    StudentAttendStatusType,
} from "src/squads/lesson/common/types";
import { isDynamicAutocompleteOptionProps } from "src/squads/lesson/common/utils";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TableBulkUpdateAttendance from "src/squads/lesson/pages/LessonManagement/components/Tables/TableBulkUpdateAttendance";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import {
    LessonManagementReportsIndividualData,
    StudentWithAttendanceStatus,
} from "src/squads/lesson/pages/LessonManagement/common/types";

export interface DialogBulkUpdateAttendanceProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    students: LessonManagementReportsIndividualData["students"];
}

const DialogBulkUpdateAttendance = (props: DialogBulkUpdateAttendanceProps) => {
    const { students, onSave, ...rest } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { setValue, clearErrors } = useFormContext<LessonManagementReportsIndividualData>();
    const lessonReportDetails = useWatch<
        LessonManagementReportsIndividualData,
        "lessonReportDetails"
    >({ name: "lessonReportDetails" });

    const defaultAttendanceValues: StudentWithAttendanceStatus[] = useMemo(() => {
        const attendanceStatuses = generateTranslatedAttendanceStatusOptions(tLessonManagement);

        const attendValueKey: StudentAttendStatusType = "STUDENT_ATTEND_STATUS_ATTEND";
        const attendStatus = attendanceStatuses.find((status) => status.key === attendValueKey)!;

        const attendanceValues: StudentWithAttendanceStatus[] = students.map((student) => {
            const defaultValue: StudentWithAttendanceStatus = { ...attendStatus, student };

            const studentReport = lessonReportDetails.find(
                (field) => field.student.user.user_id === student.user.user_id
            );

            // Use "Attend" option as default value
            if (!studentReport) return defaultValue;

            const attendanceValue =
                studentReport.dynamicFields[LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS];

            // Use props as default value
            if (isDynamicAutocompleteOptionProps(attendanceValue)) {
                return { ...attendanceValue, student };
            }

            // Use "Attend" option as default value
            return defaultValue;
        });

        return attendanceValues;
    }, [lessonReportDetails, students, tLessonManagement]);

    const [currentAttendanceValues, setCurrentAttendanceValues] =
        useState<StudentWithAttendanceStatus[]>(defaultAttendanceValues);

    const handleChangeAttendanceValueState = (
        student: StudentWithAttendanceStatus["student"],
        value: DynamicAutocompleteOptionProps
    ) => {
        const cloneData = [...currentAttendanceValues];

        const studentIndex = cloneData.findIndex((attendanceValue) => {
            return attendanceValue.student.user.user_id === student.user.user_id;
        });

        cloneData[studentIndex] = { ...value, student };
        setCurrentAttendanceValues(cloneData);
    };

    const handleSaveBulkAttendStatus = () => {
        const attendanceStatusKey: keyof StudentWithAttendanceStatus["student"] =
            "attendance_status";

        currentAttendanceValues.forEach(({ student, label, key }) => {
            const reportIndex = lessonReportDetails.findIndex(
                (report) => report.student.user.user_id === student.user.user_id
            );

            const lessonReportDetailKeyPath = lessonReportDetailsFormKeyName(
                reportIndex,
                attendanceStatusKey
            );

            setValue(lessonReportDetailKeyPath, { key, label });
        });

        clearErrors("lessonReportDetails");
        onSave();
    };

    return (
        <DialogWithHeaderFooter
            fullWidth
            maxWidth="md"
            minWidthBox="md"
            onSave={handleSaveBulkAttendStatus}
            data-testid="DialogBulkUpdateAttendance__dialog"
            title={tLessonManagement("bulkUpdateAttendance")}
            {...rest}
        >
            <Box mt={1}>
                <TableBulkUpdateAttendance
                    attendanceValues={currentAttendanceValues}
                    onChangeAttendanceValue={handleChangeAttendanceValueState}
                />
            </Box>
        </DialogWithHeaderFooter>
    );
};

export default DialogBulkUpdateAttendance;
