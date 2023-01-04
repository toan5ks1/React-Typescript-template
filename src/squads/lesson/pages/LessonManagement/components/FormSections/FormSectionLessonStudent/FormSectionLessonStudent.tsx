import { Controller } from "react-hook-form";
import { arrayHasItem } from "src/common/utils/other";
import { LessonManagementStudentInfo } from "src/squads/lesson/common/types";

import TableStudentsInfoWithActions from "src/squads/lesson/components/Tables/TableStudentsInfoWithActions";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

interface FormSectionLessonStudentProps {
    isSavingDraftLesson: boolean;
}

const FormSectionLessonStudent = (props: FormSectionLessonStudentProps) => {
    const { isSavingDraftLesson } = props;
    const t = useTranslate();

    return (
        <Controller<LessonManagementUpsertFormType, "learners">
            name="learners"
            rules={{
                validate: (data) => {
                    if (isSavingDraftLesson) return undefined;
                    if (arrayHasItem(data)) return undefined;
                    return t("resources.input.error.required");
                },
            }}
            render={({ fieldState: { error }, field: { onChange, value: learners } }) => {
                const handleUpdateStudentAttendance = (
                    studentSubscriptionId: LessonManagementStudentInfo["studentSubscriptionId"],
                    attendanceValue: StudentAttendStatus
                ) => {
                    const updatedLearners = learners.map((learner) => {
                        if (learner.studentSubscriptionId === studentSubscriptionId) {
                            return { ...learner, attendanceStatus: attendanceValue };
                        }

                        return learner;
                    });

                    onChange(updatedLearners);
                };

                return (
                    <TableStudentsInfoWithActions
                        studentsList={learners}
                        updateStudentList={onChange}
                        updateStudentAttendance={handleUpdateStudentAttendance}
                        error={error}
                    />
                );
            }}
        />
    );
};

export default FormSectionLessonStudent;
