import clsx from "clsx";

import { Checkbox, CheckboxProps as MaterialCheckboxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const PREFIX = "CheckboxBase";

const classes = {
    selector: `${PREFIX}-selector`,
};

const StyledCheckbox = styled(Checkbox)(({ theme, size }) => ({
    [`&.${classes.selector}`]: {
        padding: size === "small" ? 0 : theme.spacing(1.125),
        ...(size === "small" && { marginRight: theme.spacing(1) }),
    },
}));

export interface CheckboxBaseProps extends MaterialCheckboxProps {
    variant?: "selector";
}

const CheckboxBase = (props: CheckboxBaseProps) => {
    const { variant, className, ...rest } = props;

    const classNameFinal = clsx({ [classes.selector]: variant === "selector" }, className);

    return <StyledCheckbox {...rest} className={classNameFinal} />;
};

export default CheckboxBase;
