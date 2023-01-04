import PopoverBase, { PopoverBaseProps } from "src/components/Popovers/PopoverBase";

export interface PopoverLeftBottomProps extends PopoverBaseProps {
    onClose: () => void;
}

const PopoverLeftBottom = ({ onClose, children, ...props }: PopoverLeftBottomProps) => {
    return (
        <PopoverBase
            data-testid="PopoverLeftBottom__container"
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            {...props}
        >
            {children}
        </PopoverBase>
    );
};

export default PopoverLeftBottom;
