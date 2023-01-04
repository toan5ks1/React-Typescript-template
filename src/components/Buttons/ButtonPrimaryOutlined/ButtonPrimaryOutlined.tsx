import { ReactNode } from "react";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface ButtonPrimaryOutlinedProps extends ButtonBaseProps {
    children?: ReactNode;
}

const ButtonPrimaryOutlined = (props: ButtonPrimaryOutlinedProps) => {
    const { children } = props;
    return (
        <ButtonBase color="primary" variant="outlined" style={{ wordBreak: "keep-all" }} {...props}>
            {children}
        </ButtonBase>
    );
};

export default ButtonPrimaryOutlined;
