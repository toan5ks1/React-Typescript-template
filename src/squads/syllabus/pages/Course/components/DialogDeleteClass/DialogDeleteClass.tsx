import { Entities } from "src/common/constants/enum";

import { useTheme } from "@mui/material/styles";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { ClassData } from "src/squads/syllabus/pages/Course/common/types";

export interface DialogDeleteClassProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onClose"> {
    onDeleteClass: (classData: ClassData) => void;
    classData: ClassData;
    isDeleting: boolean;
}

const DialogDeleteClass = (props: DialogDeleteClassProps) => {
    const { open, onClose, classData, onDeleteClass, isDeleting } = props;

    const theme = useTheme();

    const t = useTranslate();
    const tClass = useResourceTranslate(Entities.CLASS);

    const dialogContent = tClass("areYouSureToDelete", {
        className: `<span style="color: ${theme.palette.text.primary}">${classData.name}</span>`,
    });

    return (
        <DialogWithHeaderFooter
            open={open}
            onClose={onClose}
            onSave={() => onDeleteClass(classData)}
            textSave={t("ra.action.confirm")}
            footerConfirmButtonProps={{
                color: "error",
                disabled: isDeleting,
            }}
            title={tClass("titles.deleteAClass")}
            data-testid="DialogDeleteClass__dialog"
        >
            <TypographyTextSecondary variant="body1">
                <span dangerouslySetInnerHTML={{ __html: dialogContent }} />
            </TypographyTextSecondary>
        </DialogWithHeaderFooter>
    );
};

export default DialogDeleteClass;
