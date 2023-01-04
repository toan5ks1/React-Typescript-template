import { ReactNode } from "react";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface ButtonPrimaryTextProps extends ButtonBaseProps {
    children?: ReactNode;
}

// This is made into an component because it"s used regularly in the schedule module
const ButtonPrimaryText = (props: ButtonPrimaryTextProps) => {
    const { children } = props;
    return (
        <ButtonBase variant="text" color="primary" style={{ wordBreak: "keep-all" }} {...props}>
            {children}
        </ButtonBase>
    );
};

export default ButtonPrimaryText;
