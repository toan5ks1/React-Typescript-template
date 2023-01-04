import { MutationMenus, MoveDirection } from "src/common/constants/enum";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import IconButtonBase, { IconButtonBaseProps } from "src/components/IconButton/IconButtonBase";

export interface MoveUpDownProps<T> {
    size?: IconButtonBaseProps["size"];
    identity: string;
    record?: T;
    onClick: (action: MoveDirection, identity: string, record?: T) => void;
    moveDownProps: IconButtonBaseProps;
    moveUpProps: IconButtonBaseProps;
    iconProps?: SvgIconTypeMap<{}, "svg">;
}

const MoveUpDown = <T extends {}>(props: MoveUpDownProps<T>) => {
    const {
        onClick,
        identity,
        record,
        size = "large",
        moveDownProps,
        moveUpProps,
        iconProps = {},
    } = props;

    return (
        <>
            <IconButtonBase
                size={size}
                color="primary"
                onClick={() => onClick(MutationMenus.MOVE_DOWN, identity, record)}
                data-testid="MoveUpDownBase__down"
                {...moveDownProps}
            >
                <ArrowDownward fontSize="small" {...iconProps} />
            </IconButtonBase>
            <IconButtonBase
                size={size}
                color="primary"
                onClick={() => onClick(MutationMenus.MOVE_UP, identity, record)}
                data-testid="MoveUpDownBase__up"
                {...moveUpProps}
            >
                <ArrowUpward fontSize="small" {...iconProps} />
            </IconButtonBase>
        </>
    );
};

export default MoveUpDown;
