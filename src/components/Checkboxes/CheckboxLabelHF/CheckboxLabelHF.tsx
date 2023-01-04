import { useFormContext, Controller } from "react-hook-form";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import FormControlLabelBase, {
    FormControlLabelBaseProps,
} from "src/components/Forms/FormControlLabelBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

import CheckboxBase, { CheckboxBaseProps } from "../CheckboxBase";

export interface CheckboxLabelHFProps
    extends Pick<HookFormControllerOptionProps, "name">,
        Omit<FormControlLabelBaseProps, "control" | "name"> {
    checkBoxProps?: CheckboxBaseProps;
}
// https://www.figma.com/file/4KdoZb1aM7AZirVMb8axlV/%5BERP%5D-%5BWeb%5D-Design-System-V1.1?node-id=3764%3A18386
const CheckboxLabelHF = ({
    name,
    checkBoxProps,
    defaultChecked,
    onChange: handleOnChange,
    ...rest
}: CheckboxLabelHFProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultChecked}
            render={({ field: { onChange, value } }) => (
                <FormControlLabelBase
                    checked={value}
                    control={
                        <CheckboxBase
                            data-testid="CheckboxLabelHF__checkboxBase"
                            color="primary"
                            onChange={(event, selected) => {
                                onChange(event);
                                handleOnChange && handleOnChange(event, selected);
                            }}
                            {...checkBoxProps}
                        />
                    }
                    {...rest}
                    label={<TypographyBase variant="body2">{rest.label}</TypographyBase>}
                />
            )}
        />
    );
};

export default CheckboxLabelHF;
