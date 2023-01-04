import { ReactNode } from "react";

import { Add } from "@mui/icons-material";

import ButtonPrimaryContained, { ButtonPrimaryContainedProps } from "../ButtonPrimaryContained";

import useTranslate from "src/hooks/useTranslate";

export interface ButtonCreateProps extends ButtonPrimaryContainedProps {
    children?: ReactNode;
}

const ButtonCreate = (props: ButtonCreateProps) => {
    const { children } = props;
    const t = useTranslate();
    const buttonText = t("ra.common.action.create");
    return (
        <ButtonPrimaryContained aria-label={buttonText} startIcon={<Add />} {...props}>
            {children ? children : buttonText}
        </ButtonPrimaryContained>
    );
};

export default ButtonCreate;
