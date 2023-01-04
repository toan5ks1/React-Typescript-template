import { useCallback, useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { FEATURE_NAME_INDIVIDUAL_LESSON_REPORT_FORM_CONFIG } from "src/squads/lesson/common/constants";
import { PartnerFormConfigLatestQueried } from "src/squads/lesson/common/types";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import FormLessonReportInd from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonReportInd";
import WrapperHF from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperHF";

import useGetLatestPartnerFormConfig from "src/squads/lesson/hooks/useGetLatestPartnerFormConfig";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import LessonReportFooterInd from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertInd/LessonReportUpsertFooterInd";
import {
    LessonManagementReportIndividualSubmitType,
    LessonManagementReportsIndividualData,
    LessonReportUpsertMode,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useMutationLessonIndividualReport from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";
import useTransformReportSubmitData from "src/squads/lesson/pages/LessonManagement/hooks/useTransformReportSubmitData";

type SubmitLessonReportFunction = (
    data: LessonManagementReportsIndividualData,
    submitType: LessonManagementReportIndividualSubmitType
) => void;

export interface LessonReportUpsertIndProps {
    isLoading: boolean;
    openDialogUpsertReport: boolean;
    mode: LessonReportUpsertMode;
    lessonReportData: LessonManagementReportsIndividualData;
    partnerFormConfig?: PartnerFormConfigLatestQueried;
    onCloseDialog: () => void;
    onUpsertSuccess: () => Promise<void>;
}

const LessonReportUpsertInd = (props: LessonReportUpsertIndProps) => {
    const {
        isLoading,
        mode,
        openDialogUpsertReport,
        lessonReportData,
        partnerFormConfig,
        onUpsertSuccess,
        onCloseDialog,
    } = props;

    const [openDialogSubmitReport, setOpenDialogSubmitReport] = useState<boolean>(false);
    const [openDialogDiscardReport, setOpenDialogDiscardReport] = useState<boolean>(false);

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const showSnackbar = useShowSnackbar();

    const isCreateMode = mode === "CREATE";

    const {
        data: partnerFormConfigQueried,
        isLoading: isLoadingGetPartnerFormConfig,
        error: errorGetPartnerFormConfigQueried,
    } = useGetLatestPartnerFormConfig({
        featureName: isCreateMode ? FEATURE_NAME_INDIVIDUAL_LESSON_REPORT_FORM_CONFIG : undefined,
    });

    const {
        upsertLessonReport,
        isSubmittingLessonReport,
        saveDraftLessonReport,
        isSavingDraftLessonReport,
    } = useMutationLessonIndividualReport();

    const transformUpsertData = useTransformReportSubmitData();

    const onSubmit: SubmitLessonReportFunction = useCallback(
        (data, submitType) => {
            const sectionsConfig = isCreateMode
                ? partnerFormConfigQueried?.form_config_data?.sections
                : partnerFormConfig?.form_config_data?.sections;

            if (!sectionsConfig || !arrayHasItem(sectionsConfig)) {
                showSnackbar(t("ra.manabie-error.unknown"), "error");
                window.warner?.warn("[LessonReportUpsertInd]: invalid dynamic form config");
                return;
            }

            const submitData = transformUpsertData({
                rawData: data,
                formSections: sectionsConfig,
            });

            if (submitType === "SUBMIT") {
                const upsertMessage = tLessonManagement(
                    "messages.submittedIndividualReportSuccessfully"
                );

                upsertLessonReport({
                    data: submitData,
                    onSuccess: async () => {
                        await onUpsertSuccess();
                        showSnackbar(upsertMessage);
                    },
                });
                return;
            }

            const saveDraftMessage = isCreateMode
                ? tLessonManagement("messages.createdReportSuccessfully")
                : tLessonManagement("messages.editedIndividualReportSuccessfully");

            saveDraftLessonReport({
                data: submitData,
                onSuccess: async () => {
                    await onUpsertSuccess();
                    showSnackbar(saveDraftMessage);
                },
            });
        },
        [
            t,
            showSnackbar,
            isCreateMode,
            onUpsertSuccess,
            partnerFormConfig,
            tLessonManagement,
            upsertLessonReport,
            transformUpsertData,
            saveDraftLessonReport,
            partnerFormConfigQueried,
        ]
    );

    const isMutating = isSubmittingLessonReport || isSavingDraftLessonReport;
    const isLoadingData = isLoading || isLoadingGetPartnerFormConfig;

    const isDisableActions =
        isMutating || isLoadingData || openDialogSubmitReport || openDialogDiscardReport;

    const partnerFormConfigProps = isCreateMode ? partnerFormConfigQueried : partnerFormConfig;
    const errorGetPartnerFormConfig = isCreateMode ? errorGetPartnerFormConfigQueried : undefined;

    const dialogTitle = tLessonManagement(
        isCreateMode ? "createIndividualReport" : "editIndividualReport"
    );

    return (
        <WrapperHF<LessonManagementReportsIndividualData>
            defaultValues={lessonReportData}
            render={({ handleSubmit, getValues }) => {
                return (
                    <DialogFullScreen
                        title={dialogTitle}
                        open={openDialogUpsertReport}
                        onClose={() => setOpenDialogDiscardReport(true)}
                        onSave={() => {}} // For rendering footer
                        data-testid="LessonReportUpsertInd__dialog"
                        footer={
                            <LessonReportFooterInd
                                onDiscard={() => setOpenDialogDiscardReport(true)}
                                onSaveDraft={() => onSubmit(getValues(), "SAVE_DRAFT")}
                                onSubmitAll={handleSubmit(() => setOpenDialogSubmitReport(true))}
                                disableActions={{
                                    disableSaveDraft: isDisableActions,
                                    disableDiscard: isDisableActions,
                                    disableSubmitAll: isDisableActions,
                                }}
                            />
                        }
                        isShowingBackdrop={isMutating || isLoading}
                    >
                        <FormLessonReportInd
                            isLoadingData={isLoadingData}
                            lessonReportData={lessonReportData}
                            partnerFormConfig={partnerFormConfigProps}
                            errorGetPartnerFormConfig={errorGetPartnerFormConfig}
                        />

                        <DialogCancelConfirm
                            open={openDialogDiscardReport}
                            onClose={() => setOpenDialogDiscardReport(false)}
                            onSave={() => {
                                setOpenDialogDiscardReport(false);
                                onCloseDialog();
                            }}
                        />

                        <DialogWithHeaderFooter
                            open={openDialogSubmitReport}
                            onClose={() => setOpenDialogSubmitReport(false)}
                            onSave={handleSubmit((data) => {
                                setOpenDialogSubmitReport(false);
                                onSubmit(data, "SUBMIT");
                            })}
                            title={tLessonManagement("actions.submit")}
                            textSave={tLessonManagement("actions.submit")}
                            data-testid="LessonReportUpsertInd__dialogSubmit"
                            footerConfirmButtonProps={{ disabled: isMutating }}
                        >
                            <TypographyTextSecondary variant="body1">
                                {tLessonManagement("areYouSureSubmitLessonReport")}
                            </TypographyTextSecondary>
                        </DialogWithHeaderFooter>
                    </DialogFullScreen>
                );
            }}
        />
    );
};

export default LessonReportUpsertInd;
