import { ReactElement } from "react";

import {
    Popper as MuiPopper,
    ClickAwayListener,
    PopperProps as MuiPopperProps,
} from "@mui/material";

export interface PopperProps extends MuiPopperProps {
    onClose: () => void;
}

const Popper = (props: PopperProps) => {
    const { children, onClose, ...rest } = props;

    return (
        <MuiPopper {...rest}>
            <ClickAwayListener mouseEvent="onClick" touchEvent="onTouchEnd" onClickAway={onClose}>
                {children as ReactElement}
            </ClickAwayListener>
        </MuiPopper>
    );
};

export default Popper;
