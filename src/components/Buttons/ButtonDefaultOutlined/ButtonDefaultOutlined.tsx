import { ReactNode } from "react";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface ButtonDefaultOutlinedProps extends ButtonBaseProps {
    children?: ReactNode;
}

const ButtonDefaultOutlined = (props: ButtonDefaultOutlinedProps) => {
    const { children } = props;
    return (
        <ButtonBase variant="outlined" style={{ wordBreak: "keep-all" }} {...props}>
            {children}
        </ButtonBase>
    );
};

export default ButtonDefaultOutlined;
