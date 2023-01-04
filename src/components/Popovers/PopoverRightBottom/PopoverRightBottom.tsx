import PopoverBase, { PopoverBaseProps } from "../PopoverBase";

export interface PopoverRightBottomProps extends PopoverBaseProps {
    onClose: () => void;
}

const PopoverRightBottom = ({ children, onClose, ...rest }: PopoverRightBottomProps) => {
    return (
        <PopoverBase
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            {...rest}
        >
            {children}
        </PopoverBase>
    );
};

export default PopoverRightBottom;
