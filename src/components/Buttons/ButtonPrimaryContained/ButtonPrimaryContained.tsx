import { ReactNode } from "react";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface ButtonPrimaryContainedProps extends ButtonBaseProps {
    children?: ReactNode;
}

const ButtonPrimaryContained = (props: ButtonPrimaryContainedProps) => {
    const { children } = props;
    return (
        <ButtonBase
            color="primary"
            variant="contained"
            style={{ wordBreak: "keep-all" }}
            {...props}
        >
            {children}
        </ButtonBase>
    );
};

export default ButtonPrimaryContained;
