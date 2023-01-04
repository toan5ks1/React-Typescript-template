import { Entities } from "src/common/constants/enum";

import Box from "@mui/material/Box";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { ClassAssociation } from "src/squads/syllabus/pages/Course/hooks/useClassAssociation";

export interface DialogNotAllowDeleteClassProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onClose"> {
    classAssociation: ClassAssociation;
}

const DialogNotAllowDeleteClass = (props: DialogNotAllowDeleteClassProps) => {
    const { open, onClose, classAssociation } = props;

    const t = useTranslate();
    const tClass = useResourceTranslate(Entities.CLASS);

    return (
        <DialogWithHeaderFooter
            open={open}
            onSave={onClose}
            onClose={onClose}
            textSave={t("ra.action.close")}
            shouldShowCancelButton={false}
            title={tClass("titles.deleteAClass")}
            data-testid="DialogNotAllowDeleteClass__dialog"
        >
            <Box pb={2}>
                <TypographyTextSecondary variant="body1">
                    {tClass("youCanNotDeleteThisClass")}
                </TypographyTextSecondary>
            </Box>

            {classAssociation.student && (
                <TypographyTextSecondary
                    variant="body1"
                    data-testid="DialogNotAllowDeleteClass__studentAssociate"
                >
                    {`• ${tClass("thereAreStudentInTheClass")}`}
                </TypographyTextSecondary>
            )}

            {classAssociation.lesson && (
                <TypographyTextSecondary
                    variant="body1"
                    data-testid="DialogNotAllowDeleteClass__lessonAssociate"
                >
                    {`• ${tClass("thereAreLessonInTheClass")}`}
                </TypographyTextSecondary>
            )}
        </DialogWithHeaderFooter>
    );
};

export default DialogNotAllowDeleteClass;
