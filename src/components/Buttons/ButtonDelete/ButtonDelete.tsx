import { ReactNode } from "react";

import { DeleteOutlined } from "@mui/icons-material";
import ButtonBase, { ButtonBaseProps } from "src/components/Buttons/ButtonBase";

import useTranslate from "src/hooks/useTranslate";

export interface ButtonDeleteProps extends ButtonBaseProps {
    children?: ReactNode;
}

const ButtonDelete = (props: ButtonDeleteProps) => {
    const { children } = props;
    const t = useTranslate();
    const buttonText = t("ra.common.action.delete");
    return (
        <ButtonBase
            aria-label={buttonText}
            color="error"
            startIcon={<DeleteOutlined />}
            disableRipple
            style={{ wordBreak: "keep-all" }}
            {...props}
        >
            {children ? children : buttonText}
        </ButtonBase>
    );
};

export default ButtonDelete;
