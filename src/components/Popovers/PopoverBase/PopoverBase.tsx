import { Popover as MaterialPopover, PopoverProps as MaterialPopoverProps } from "@mui/material";

export interface PopoverBaseProps extends MaterialPopoverProps {}

const PopoverBase = (props: PopoverBaseProps) => {
    return <MaterialPopover {...props} />;
};

export default PopoverBase;
