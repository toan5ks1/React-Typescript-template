import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { LessonReportSubmittingStatus } from "src/squads/lesson/common/constants";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { EditOutlined } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import ChipStatus from "src/components/Chips/ChipStatus";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import useMutationLessonIndividualReport from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";

export interface DetailSectionReportHeaderIndProps {
    lessonReports: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>;
    onEdit: () => void;
    onDelete: () => void;
}

const DetailSectionReportHeaderInd = (props: DetailSectionReportHeaderIndProps) => {
    const { lessonReports, onEdit, onDelete } = props;
    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const { deleteLessonReport } = useMutationLessonIndividualReport();
    // const onMutation = useCallback((action: MutationMenus) => {
    //     if (action === MutationMenus.DELETE) setOpenDeleteDialog(true);
    // }, []);

    const handleDeleteLessonReport = async () => {
        await deleteLessonReport({
            data: {
                lessonReportId: lessonReports.lesson_report_id,
            },
            onSuccess: onDelete,
        });
    };

    const reportStatus =
        lessonReports.report_submitting_status ===
        LessonReportSubmittingStatus.LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED
            ? "success"
            : "default";

    return (
        <>
            <Grid container>
                <Grid item xs={6} container alignItems="center">
                    <Box mr={2}>
                        <ChipStatus
                            data-testid="DetailSectionReportHeaderInd__chipLessonReportStatus"
                            label={tLessonManagement(
                                `status.${lessonReports.report_submitting_status}`
                            )}
                            status={reportStatus}
                        />
                    </Box>
                    <TypographyPageTitle title={tLessonManagement("reportDetail")} disablePadding />
                </Grid>

                <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
                    <ButtonPrimaryOutlined
                        startIcon={<EditOutlined />}
                        onClick={onEdit}
                        data-testid="DetailSectionReportHeaderInd__buttonEdit"
                    >
                        {t("ra.action.edit")}
                    </ButtonPrimaryOutlined>

                    {/* Currently all our customers don't need Delete Report feature
                        https://manabie.atlassian.net/browse/LT-8942 */}
                    {/* <ActionPanel
                        actions={[
                            {
                                action: MutationMenus.DELETE,
                                label: t("ra.action.delete"),
                                withConfirm: false,
                            },
                        ]}
                        onAction={onMutation}
                        recordName=""
                    /> */}
                </Grid>
            </Grid>

            <DialogWithHeaderFooter
                open={openDeleteDialog}
                title={tLessonManagement("deleteLessonReport")}
                textSave={t("ra.common.action.delete")}
                onClose={() => setOpenDeleteDialog(false)}
                onSave={async () => await handleDeleteLessonReport()}
                footerConfirmButtonProps={{
                    color: "error",
                }}
                data-testid="DetailSectionReportHeaderInd__dialogDelete"
            >
                <TypographyTextSecondary variant="body1">
                    {tLessonManagement("areYouSureYouWantToDeleteTheLessonReport")}
                </TypographyTextSecondary>
            </DialogWithHeaderFooter>
        </>
    );
};

export default DetailSectionReportHeaderInd;
