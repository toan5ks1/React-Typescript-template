import { ReactNode } from "react";

import { Create } from "@mui/icons-material";

import ButtonPrimaryContained, { ButtonPrimaryContainedProps } from "../ButtonPrimaryContained";

import useTranslate from "src/hooks/useTranslate";

export interface ButtonEditProps extends ButtonPrimaryContainedProps {
    children?: ReactNode;
}

const ButtonEdit = (props: ButtonEditProps) => {
    const { children } = props;
    const t = useTranslate();
    const buttonText = t("ra.common.action.edit");
    return (
        <ButtonPrimaryContained aria-label={buttonText} startIcon={<Create />} {...props}>
            {children ? children : buttonText}
        </ButtonPrimaryContained>
    );
};

export default ButtonEdit;
