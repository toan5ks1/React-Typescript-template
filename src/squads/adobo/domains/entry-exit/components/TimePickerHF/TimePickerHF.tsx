import { DateTime } from "luxon";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { useToggle } from "react-use";
import { FormatDateOptions } from "src/common/constants/enum";
import { convertToDate, createValidDate } from "src/common/utils/time";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import { Schedule } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import TimePickerBase, { TimePickerBaseProps } from "src/components/DatePickers/TimePickerBase";
import TextFieldBase, { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";

export interface TimePickerHFProps
    extends Omit<TimePickerBaseProps, "value" | "onChange" | "defaultValue" | "renderInput"> {
    name: string;
    rules?: HookFormControllerOptionProps["rules"];
    onAccept?: TimePickerBaseProps["onAccept"];
    onChange?: TimePickerBaseProps["onChange"];
    size?: TextFieldBaseProps["size"];
    InputLabelProps?: TextFieldBaseProps["InputLabelProps"];
    InputProps?: TextFieldBaseProps["InputProps"] & { "data-testid"?: string };
    renderInput?: TimePickerBaseProps["renderInput"];
    id?: string;
}

const TimePickerHF = (props: TimePickerHFProps) => {
    const formatType: FormatDateOptions = "HH:mm";

    const {
        name,
        rules,
        inputFormat = formatType,
        size = "small",
        onAccept: handleAccept,
        onChange: handleChange,
        DialogProps,
        id,
        InputLabelProps,
        ...rest
    } = props;

    const {
        control,
        formState: { errors },
        getValues,
    } = useFormContext();

    const initialValue = getValues()[name] ? createValidDate(getValues()[name]) : null;

    const [isOpen, setIsOpen] = useToggle(false);
    const handleOpen = () => setIsOpen(true);

    const handleOnAccept = (
        date: DateTime,
        { onChange }: ControllerRenderProps<FieldValues, string>
    ) => {
        // prevent select default value by Mui behavior
        if (!initialValue) {
            onChange(null);
            handleChange && handleChange(null);
        }

        if (date) {
            onChange(convertToDate(date as DateTime));
            handleChange && handleChange(date);
            handleAccept && handleAccept(date);
        }
        setIsOpen(false);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TimePickerBase
                    ampm
                    value={field.value}
                    DialogProps={{
                        "aria-label": "TimePickerHF__dialog",
                        ...DialogProps,
                    }}
                    inputFormat={inputFormat}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    onAccept={(date) => handleOnAccept(date as DateTime, field)}
                    onChange={(date) => {
                        field.onChange(convertToDate(date as DateTime));
                        handleChange && handleChange(date);
                    }}
                    renderInput={(params) => (
                        <TextFieldBase
                            {...params}
                            variant="outlined"
                            size={size}
                            name={name}
                            id={id}
                            InputLabelProps={{
                                ...params.InputLabelProps,
                                ...InputLabelProps,
                            }}
                            FormHelperTextProps={{
                                variant: "standard", // set error margin equal 0
                            }}
                            helperText={errors && errors[name] ? errors[name].message : ""} // color of helperText
                            required={rest.InputProps?.required}
                            error={Boolean(errors && errors[name])} // color error message
                            onClick={handleOpen}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            // sx={{ marginRight: "-14px" }}
                                            sx={{ width: 44, height: 44 }}
                                            onClick={handleOpen}
                                        >
                                            <Schedule />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                ...params.InputProps,
                            }}
                        />
                    )}
                    {...rest}
                />
            )}
            rules={rules}
        />
    );
};

export default TimePickerHF;
