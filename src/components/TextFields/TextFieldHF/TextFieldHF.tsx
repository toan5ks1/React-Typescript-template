import get from "lodash/get";
import { useFormContext } from "react-hook-form";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import { FormControl } from "@mui/material";

import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

export interface TextFieldHFProps
    extends Omit<TextFieldBaseProps, "onChange">,
        Pick<HookFormControllerOptionProps, "rules"> {
    name: string;
}

const TextFieldHF = ({
    name,
    size = "small",
    rules,
    inputProps,
    FormHelperTextProps,
    ...rest
}: TextFieldHFProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const fieldError = get(errors, name);

    return (
        <FormControl variant="outlined" fullWidth size={size}>
            <TextFieldBase
                name={name}
                size={size}
                FormHelperTextProps={{
                    variant: "standard",
                    "aria-label": "TextFieldHF__formHelperText",
                    ...FormHelperTextProps,
                }}
                error={Boolean(fieldError)}
                helperText={Boolean(fieldError) && fieldError["message"]}
                inputProps={{
                    "data-testid": "TextFieldHF__input",
                    ...inputProps,
                    ...register(name, rules),
                }}
                {...rest}
            />
        </FormControl>
    );
};

export default TextFieldHF;
