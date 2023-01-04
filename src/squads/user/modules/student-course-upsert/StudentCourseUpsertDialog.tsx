import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { StudentKeys } from "src/squads/user/common/constants/student";
import {
    StudentPackageClientWithLocation,
    StudentPackageCourseForm,
} from "src/squads/user/common/types/student";
import { inferMutation } from "src/squads/user/service/infer-service";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";

import { StudentCourseUpsert } from "./StudentCourseUpsert";

import { UseDialogReturn } from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

interface StudentCourseUpsertDialogProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    courses: StudentPackageClientWithLocation[];
    studentId: string;
    onSuccess?: () => void;
}

export const StudentCourseUpsertDialog = ({
    studentId,
    courses,
    open,
    onClose,
    onSuccess,
}: StudentCourseUpsertDialogProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const widthDialog = {
        "[role=dialog]": {
            maxWidth: 1280, //design confirm
        },
    };

    const defaultPackages = useMemo(
        () =>
            courses.map((item) => ({
                ...item,
                course: {
                    ...item.course,
                    value: item.course.name,
                },
            })),
        [courses]
    );

    const methodHF = useForm({
        defaultValues: {
            [StudentKeys.STUDENT_PACKAGES]: defaultPackages,
        },
        mode: "onSubmit",
    });

    const { mutateAsync: upsertCoursePackages, isLoading } = inferMutation({
        entity: "student",
        action: "userUpsertStudentCoursePackage",
    })({
        onSuccess: () => {
            showSnackbar(tStudents("messages.success.updateCourse"));
            if (onSuccess) onSuccess();
        },
    });

    const onSubmit = async (data: StudentPackageCourseForm) => {
        try {
            const { studentPackages } = data;

            if (!studentPackages.length) return;

            const req: NsUsermgmtStudentService.UpsertStudentCoursePackageFormReq = {
                studentId,
                studentPackages,
            };
            await upsertCoursePackages({ ...req });
        } catch (err) {
            window.warner?.log("Update a student error", err);
            const error = handleUnknownError(err);

            showSnackbar(t(error.message), "error");
        }
    };

    return (
        <DialogWithHeaderFooterHF
            open={open}
            onSave={methodHF.handleSubmit(onSubmit)}
            onClose={onClose}
            title={tStudents("titles.editCourse")}
            data-testid="StudentCourseUpsert__dialog"
            fullWidth
            maxWidth={"lg"}
            maxWidthBox={"lg"}
            sx={widthDialog}
            methods={methodHF}
            footerConfirmButtonProps={{ disabled: methodHF?.formState.isSubmitting }}
        >
            <StudentCourseUpsert />
            {isLoading ? (
                <BackdropLoading open data-testid="StudentCourseUpsert__BackdropLoading" />
            ) : null}
        </DialogWithHeaderFooterHF>
    );
};

export default StudentCourseUpsertDialog;
