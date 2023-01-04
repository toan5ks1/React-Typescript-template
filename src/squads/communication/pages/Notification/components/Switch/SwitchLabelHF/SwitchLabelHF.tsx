import { useFormContext, Controller } from "react-hook-form";
import { HookFormControllerOptionProps } from "src/squads/communication/typings/react-hook-form";

import FormControlLabelBase, {
    FormControlLabelBaseProps,
} from "src/components/Forms/FormControlLabelBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

import SwitchBase, { SwitchBaseProps } from "../SwitchBase";

export interface SwitchLabelHFProps
    extends Pick<HookFormControllerOptionProps, "name">,
        Omit<FormControlLabelBaseProps, "control" | "name"> {
    switchProps?: SwitchBaseProps;
}

const SwitchLabelHF = ({
    name,
    switchProps,
    defaultChecked = false,
    onChange: handleOnChange,
    ...props
}: SwitchLabelHFProps) => {
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
                        <SwitchBase
                            color="primary"
                            data-testid="SwitchLabelHF__switchBase"
                            onChange={(event, selected) => {
                                onChange(event);
                                handleOnChange && handleOnChange(event, selected);
                            }}
                            {...switchProps}
                        />
                    }
                    {...props}
                    label={
                        <TypographyBase data-testid="SwitchLabelHF__label" variant="body2">
                            {props.label}
                        </TypographyBase>
                    }
                />
            )}
        />
    );
};

export default SwitchLabelHF;
