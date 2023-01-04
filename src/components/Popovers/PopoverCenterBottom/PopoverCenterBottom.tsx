import PopoverBase, { PopoverBaseProps } from "../PopoverBase";

export interface PopoverCenterBottomProps extends PopoverBaseProps {
    onClose: () => void;
}

const PopoverCenterBottom = ({ children, onClose, ...rest }: PopoverCenterBottomProps) => {
    return (
        <PopoverBase
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            {...rest}
        >
            {children}
        </PopoverBase>
    );
};

export default PopoverCenterBottom;
