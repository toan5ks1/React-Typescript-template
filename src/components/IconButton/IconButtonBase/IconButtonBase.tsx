import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const PREFIX = "IconButtonBase";

const classes = {
    sizeSmall: `${PREFIX}-sizeSmall`,
};

const StyledIconButton = styled(IconButton)(({ theme }) => {
    return {
        [`& .${classes.sizeSmall}`]: {
            padding: theme.spacing(1.25),
        },
    };
});

export interface IconButtonBaseProps extends IconButtonProps {}

const IconButtonBase = (props: IconButtonBaseProps) => {
    const { className, classes: rops = {}, ...rest } = props;

    return (
        <StyledIconButton
            classes={{ sizeSmall: classes.sizeSmall, ...rops }}
            className={className}
            {...rest}
        />
    );
};

export default IconButtonBase;
