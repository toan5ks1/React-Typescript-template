import { ERPModules } from "src/common/constants/enum";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface DialogConfirmSubmitLessonReportProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onSave" | "onClose"> {}

const DialogConfirmSubmitLessonReport = (props: DialogConfirmSubmitLessonReportProps) => {
    const tLessonReports = useResourceTranslate(ERPModules.LESSON_REPORTS);

    return (
        <DialogWithHeaderFooter
            {...props}
            title={tLessonReports("submitLessonReport")}
            data-testid="DialogConfirmSubmitLessonReport__dialog"
            textSave={tLessonReports("actions.submit")}
        >
            <Box pb={1}>
                <TypographyTextSecondary variant="body1">
                    {tLessonReports("areYouSureSubmitLessonReport")}
                </TypographyTextSecondary>
                <TypographyTextSecondary variant="body1">
                    {tLessonReports("submitLessonReportNote")}
                </TypographyTextSecondary>
            </Box>
        </DialogWithHeaderFooter>
    );
};

export default DialogConfirmSubmitLessonReport;
