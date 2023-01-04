import { ToggleButton, ToggleButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface ToggleButtonBaseProps extends ToggleButtonProps {}

const PREFIX = "ToggleButtonBase";

const classes = {
    selected: `${PREFIX}-selected`,
    root: `${PREFIX}-root`,
};

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    [`&.${classes.root}`]: {
        color: theme.palette.text.secondary,
        padding: "6px 1rem", //design confirm,
    },
    [`&.${classes.selected}`]: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.background,
        borderColor: theme.palette.primary.border,
    },
}));

const ToggleButtonBase = (props: ToggleButtonBaseProps) => {
    const { value, children, classes: classOverride, ...rest } = props;

    return (
        <StyledToggleButton
            value={value}
            classes={{
                root: classes.root,
                selected: classes.selected,
                ...classOverride,
            }}
            data-testid="ToggleButtonBase"
            {...rest}
        >
            {children}
        </StyledToggleButton>
    );
};

export default ToggleButtonBase;
