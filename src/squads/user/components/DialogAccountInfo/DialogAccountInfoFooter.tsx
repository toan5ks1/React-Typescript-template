import { Box } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";

import useTranslate from "src/squads/user/hooks/useTranslate";

export interface DialogStudentAccountInfoFooterProps {
    onClose: () => void;
}

const DialogStudentAccountInfoFooter = ({ onClose }: DialogStudentAccountInfoFooterProps) => {
    const t = useTranslate();

    return (
        <Box display="flex" justifyContent="flex-end">
            <ButtonPrimaryContained
                onClick={onClose}
                data-testid="DialogStudentAccountInfoFooter__buttonClose"
            >
                {t("ra.action.close")}
            </ButtonPrimaryContained>
        </Box>
    );
};

export default DialogStudentAccountInfoFooter;
