import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { FEATURE_NAME_GROUP_LESSON_REPORT_FORM_CONFIG } from "src/squads/lesson/common/constants";
import { LessonForLessonReportQueried } from "src/squads/lesson/common/types";

import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import DialogConfirmSubmitLessonReport from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogConfirmSubmitLessonReport";
import FormLessonReportGrp from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonReportGrp";
import WrapperHF from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperHF";

import useGetLatestPartnerFormConfig from "src/squads/lesson/hooks/useGetLatestPartnerFormConfig";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import LessonReportUpsertFooterGrp from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertGrp/LessonReportUpsertFooterGrp";
import {
    LessonReportGroupData,
    LessonReportUpsertMode,
} from "src/squads/lesson/pages/LessonManagement/common/types";

export interface LessonReportUpsertGrpProps {
    open: boolean;
    mode: LessonReportUpsertMode;
    onClose: () => void;
    onUpsertSuccess: () => void;

    // TODO: Refactor for edit lesson report group
    lessonId: string;
    studentsList: LessonForLessonReportQueried["lesson_members"];
}

const LessonReportUpsertGrp = (props: LessonReportUpsertGrpProps) => {
    const { open, mode, onClose, lessonId, studentsList, onUpsertSuccess } = props;

    const [openConfirmSubmitDialog, setOpenConfirmSubmitDialog] = useState<boolean>(false);
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const dialogTitle = tLessonManagement(mode === "CREATE" ? "addReport" : "editReport");

    const { data: partnerFormConfigQueried, isLoading: isLoadingGetPartnerFormConfig } =
        useGetLatestPartnerFormConfig({
            featureName: FEATURE_NAME_GROUP_LESSON_REPORT_FORM_CONFIG,
        });

    const onSubmitLessonReport = (_data: LessonReportGroupData) => {
        onUpsertSuccess();
    };

    return (
        <WrapperHF<LessonReportGroupData>
            defaultValues={{ lessonId }}
            render={({ handleSubmit, getValues }) => (
                <DialogFullScreen
                    open={open}
                    title={dialogTitle}
                    onClose={onClose}
                    onSave={() => {}}
                    footer={
                        <LessonReportUpsertFooterGrp
                            onCancel={onClose}
                            onSaveDraft={() => onSubmitLessonReport(getValues())}
                            onSubmitAll={handleSubmit(() => setOpenConfirmSubmitDialog(true))}
                        />
                    }
                >
                    <FormLessonReportGrp
                        studentsList={studentsList}
                        isLoading={isLoadingGetPartnerFormConfig}
                        reportFormConfig={partnerFormConfigQueried}
                    />

                    <DialogConfirmSubmitLessonReport
                        open={openConfirmSubmitDialog}
                        onClose={() => setOpenConfirmSubmitDialog(false)}
                        onSave={handleSubmit(onSubmitLessonReport)}
                    />
                </DialogFullScreen>
            )}
        />
    );
};

export default LessonReportUpsertGrp;
