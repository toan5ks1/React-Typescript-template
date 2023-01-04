import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { DynamicLabelValue, DynamicSection } from "src/squads/lesson/common/types";

import { Box, Grid } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import DividerDashed from "src/components/Divider/DividerDashed";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";
import DetailSectionPreviousReportInfoInd from "src/squads/lesson/components/DetailSections/DetailSectionPreviousReportInfoInd";
import WrapperDividerSection from "src/squads/lesson/components/Wrappers/WrapperDividerSection";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { isLastItemInArray } from "src/squads/lesson/pages/LessonManagement/common/array-utils";

export interface DialogPreviousReportIndProps {
    open: DialogWithHeaderFooterProps["open"];
    onSave: DialogWithHeaderFooterProps["onSave"];
    onClose: DialogWithHeaderFooterProps["onClose"];
    previousLessonReportDataConfig: DynamicSection[];
    previousLessonReportData: DynamicLabelValue[];
}

const DialogPreviousReportInd = (props: DialogPreviousReportIndProps) => {
    const { open, onSave, onClose, previousLessonReportDataConfig, previousLessonReportData } =
        props;
    const t = useTranslate();
    const tLessonReport = useResourceTranslate(ERPModules.LESSON_REPORTS);

    const renderPreviousLessonReportContent = (
        dataConfig: DynamicSection[],
        data: DynamicLabelValue[]
    ) => {
        if (!arrayHasItem(data) || !arrayHasItem(dataConfig)) {
            return <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />;
        }

        return (
            <Box pt={1} data-testid="DialogPreviousReportInd__content">
                {dataConfig.map((section: DynamicSection, index: number) => {
                    return (
                        <Grid container spacing={2} key={section.section_id}>
                            <Grid item xs={12}>
                                <DetailSectionPreviousReportInfoInd
                                    fields={section.fields}
                                    dynamicLessonReportData={previousLessonReportData}
                                />
                            </Grid>

                            {!isLastItemInArray(index, dataConfig.length) && (
                                <Grid item xs={12}>
                                    <WrapperDividerSection>
                                        <DividerDashed />
                                    </WrapperDividerSection>
                                </Grid>
                            )}
                        </Grid>
                    );
                })}
            </Box>
        );
    };

    return (
        <DialogWithHeaderFooter
            open={open}
            onSave={onSave}
            onClose={onClose}
            textSave={t("ra.action.close")}
            title={tLessonReport("previousReport")}
            shouldShowCancelButton={false}
            maxWidth="md"
            minWidthBox="md"
        >
            {renderPreviousLessonReportContent(
                previousLessonReportDataConfig,
                previousLessonReportData
            )}
        </DialogWithHeaderFooter>
    );
};

export default DialogPreviousReportInd;
