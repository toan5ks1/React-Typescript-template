import { arrayHasItem } from "src/common/utils/other";

import { ToggleButtonGroup, ToggleButtonGroupProps } from "@mui/material";
import { toggleButtonClasses } from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";

import ToggleButtonBase, { ToggleButtonBaseProps } from "../ToggleButtonBase/ToggleButtonBase";

export interface ToggleButtonGroupBaseProps extends ToggleButtonGroupProps {
    options: ToggleButtonBaseProps[];
}

const StyledToggleButtonGroupBase = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonClasses.selected}`]: {
        borderColor: `${theme.palette.primary.border} !important`,
    },
}));

const ToggleButtonGroupBase = (props: ToggleButtonGroupBaseProps) => {
    const { options, ...rest } = props;

    return (
        <StyledToggleButtonGroupBase
            exclusive
            size="small"
            data-testid="ToggleButtonGroupBase"
            {...rest}
        >
            {arrayHasItem(options) &&
                options.map(({ children, value, ...rest }, index) => {
                    return (
                        <ToggleButtonBase key={index} value={value} {...rest}>
                            {children}
                        </ToggleButtonBase>
                    );
                })}
        </StyledToggleButtonGroupBase>
    );
};

export default ToggleButtonGroupBase;
