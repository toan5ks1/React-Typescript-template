import clsx from "clsx";

import {
    TextField as MaterialTextField,
    TextFieldProps as MaterialTextFieldProps,
} from "@mui/material";
import { inputBaseClasses } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const PREFIX = "TextFieldBase";

const classes = {
    readOnly: `${PREFIX}-readOnly`,
};

const StyledMaterialTextField = styled(MaterialTextField)(({ theme }) => ({
    [`& .${classes.readOnly}`]: {
        [`& .${inputBaseClasses.root}`]: {
            backgroundColor: theme.palette.grey[50],
        },
    },
}));

export type TextFieldBaseProps = MaterialTextFieldProps;

const TextFieldBase = (props: TextFieldBaseProps) => {
    const { className, InputProps, ...rest } = props;

    const readOnlyClass = { [classes.readOnly]: InputProps && InputProps.readOnly };

    return (
        <StyledMaterialTextField
            {...rest}
            InputProps={InputProps}
            className={clsx(className, readOnlyClass)}
        />
    );
};

export default TextFieldBase;
