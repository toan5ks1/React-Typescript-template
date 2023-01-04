import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { MicroFrontendTypes } from "src/routing/type";
import { UpsertStudentFormProps, NormalizeStudentInformation } from "src/squads/user/common/types";
import { mockStudentHomeAddress } from "src/squads/user/test-utils/mocks/address";
import { mockSchoolHistoryValues } from "src/squads/user/test-utils/mocks/school-history";

import StudentHomeAddressUpsert from "./components/StudentHomeAddressUpsert";
import Box from "@mui/material/Box";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import DialogAccountInfo from "src/squads/user/components/DialogAccountInfo";
import StudentGeneralInfoUpsert, {
    StudentGeneralInfoUpsertProps,
} from "src/squads/user/modules/student-upsert/components/StudentGeneralInfoUpsert";
import StudentSchoolHistoryUpsert from "src/squads/user/modules/student-upsert/components/StudentSchoolHistoryUpsert";

import useRedirect from "src/squads/user/hooks/useRedirect";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useCreateStudent from "src/squads/user/modules/student-upsert/hooks/useCreateStudent";
import useStudentUpsertFormMethods from "src/squads/user/modules/student-upsert/hooks/useStudentUpsertFormMethods";
import useUpdateStudent from "src/squads/user/modules/student-upsert/hooks/useUpdateStudent";

export interface StudentUpsertDialogProps extends StudentGeneralInfoUpsertProps {
    open: boolean;
    student?: NormalizeStudentInformation;
    onClose: () => void;
    onSuccess: () => void;
}

const StudentUpsertDialog = (props: StudentUpsertDialogProps) => {
    const { open, mode, student, onClose, onSuccess } = props;

    const t = useTranslate();

    const history = useRedirect();

    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const showSnackbar = useShowSnackbar();

    const isUseEnrollmentStatusStr = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_ENROLLMENT_STATUS_STRING"
    );
    const isShowNamePhonetic = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME");

    const shouldDisplaySchoolHistory = useUserFeatureToggle("STUDENT_MANAGEMENT_SCHOOL_HISTORY");

    const shouldDisplayHomeAddress = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_HOME_ADDRESS"
    );

    const { methods, handleSubmit, isSubmitting, setError } = useStudentUpsertFormMethods({
        mode,
        defaultValues: {
            student,
            schoolHistories: mockSchoolHistoryValues,
            homeAddress: mockStudentHomeAddress,
        },
    });

    const { createStudent, setStudentAccountInfo, studentAccountInfo } = useCreateStudent();

    const handleClose = () => {
        setStudentAccountInfo(undefined);
        onClose();
    };

    const handleCloseInfoAccount = () => {
        onSuccess();
        handleClose();
        if (mode === ModeOpenDialog.ADD) {
            history.push(
                `/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}/${studentAccountInfo?.userId}/show`
            );
        }
    };

    const { updateStudent } = useUpdateStudent({ onSuccess: handleCloseInfoAccount });

    const handleUpsertStudent = async (data: UpsertStudentFormProps) => {
        try {
            if (mode === ModeOpenDialog.ADD)
                return await createStudent({
                    data,
                    options: {
                        isUseEnrollmentStatusStr,
                        isShowNamePhonetic,
                    },
                });
            return await updateStudent({
                data,
                options: {
                    isUseEnrollmentStatusStr,
                    isShowNamePhonetic,
                },
            });
        } catch (err) {
            window.warner?.warn("Upsert a student error", err);
            const error = handleUnknownError(err);
            if (error.originMessage?.includes("INVALID_LOCATIONS")) {
                setError("generalInfo.locations", {
                    message: tStudents("messages.error.invalidLocations"),
                });
                return;
            }
            showSnackbar(t(error.message), "error");
        }
    };

    return (
        <DialogFullScreenHF
            title={tStudents(
                mode === ModeOpenDialog.ADD ? "titles.addStudent" : "titles.editStudent"
            )}
            open={open}
            onClose={handleClose}
            onSave={handleSubmit(handleUpsertStudent)}
            methods={methods}
            isShowingBackdrop={isSubmitting}
            dialogCancelConfirmProps={{
                textSave: t("ra.action.leave"),
            }}
            data-testid="DialogFullScreenHF__container"
        >
            <PaperSectionWrapper>
                <StudentGeneralInfoUpsert mode={mode} />
                {shouldDisplayHomeAddress && (
                    <>
                        <Box my={3}>
                            <DividerDashed />
                        </Box>
                        <StudentHomeAddressUpsert />
                    </>
                )}
                {shouldDisplaySchoolHistory && (
                    <>
                        <Box my={3}>
                            <DividerDashed />
                        </Box>
                        <StudentSchoolHistoryUpsert />
                    </>
                )}
                <DialogAccountInfo
                    student={studentAccountInfo}
                    title={t(`resources.common.accountInfo`)}
                    description={tStudents("descriptions.dialogStudentAccountInfo")}
                    open={typeof studentAccountInfo !== "undefined"}
                    onClose={handleCloseInfoAccount}
                />
            </PaperSectionWrapper>
            <Box mb={2} />
        </DialogFullScreenHF>
    );
};

export default StudentUpsertDialog;
