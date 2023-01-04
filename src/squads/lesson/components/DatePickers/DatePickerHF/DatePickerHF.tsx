import { DateTime } from "luxon";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { useToggle } from "react-use";
import { FormatDateOptions } from "src/common/constants/enum";
import { convertToDate, createValidDate } from "src/common/utils/time";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import { EventOutlined } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import TextFieldBase, { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";
import { isLabelString } from "src/squads/lesson/components/DatePickers/utils";

import DatePickerBase, { DatePickerBaseProps } from "../DatePickerBase";

import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface DatePickerHFProps
    extends Omit<DatePickerBaseProps, "value" | "onChange" | "defaultValue" | "renderInput"> {
    name: string;
    rules?: HookFormControllerOptionProps["rules"];
    onAccept?: DatePickerBaseProps["onAccept"];
    onChange?: DatePickerBaseProps["onChange"];
    size?: TextFieldBaseProps["size"];
    InputProps?: DatePickerBaseProps["InputProps"] & { "data-testid"?: string };
    renderInput?: DatePickerBaseProps["renderInput"];
    id?: string;
    shouldShowHelperText?: boolean;
}

const DatePickerHF = (props: DatePickerHFProps) => {
    const formatType: FormatDateOptions = "yyyy/LL/dd";

    const {
        id,
        name,
        rules,
        inputFormat = formatType,
        size = "small",
        onAccept: handleAccept,
        onChange: handleChange,
        shouldShowHelperText = true,
        DialogProps,
        label,
        ...rest
    } = props;

    const { getValues } = useFormContext();

    const [isOpen, setIsOpen] = useToggle(false);
    const initialValue = getValues(name) ? createValidDate(getValues(name)) : null;

    const handleOpen = () => setIsOpen(true);
    const t = useTranslate();

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
            onChange(convertToDate(date));
            handleChange && handleChange(date);
            handleAccept && handleAccept(date);
        }

        setIsOpen(false);
    };

    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error: fieldError } }) => {
                return (
                    <DatePickerBase
                        toolbarFormat="yyyy/LL/dd"
                        DialogProps={{
                            "aria-label": "DatePickerHF__dialog",
                            ...DialogProps,
                        }}
                        value={field.value}
                        inputFormat={inputFormat}
                        rightArrowButtonText="Next month"
                        leftArrowButtonText="Previous month"
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        onAccept={(date) => {
                            handleOnAccept(date as DateTime, field);
                        }}
                        onChange={(date) => {
                            field.onChange(convertToDate(date as DateTime));
                            handleChange && handleChange(date);
                        }}
                        cancelText={t("ra.common.action.cancel")}
                        okText={t("ra.common.action.OK")}
                        renderInput={(params) => (
                            <TextFieldBase
                                {...params}
                                variant="outlined"
                                id={id}
                                name={name}
                                size={size}
                                helperText={
                                    Boolean(fieldError) && shouldShowHelperText
                                        ? fieldError?.message
                                        : ""
                                } // color of helperText
                                FormHelperTextProps={{
                                    variant: "standard", // set error margin equal 0
                                }}
                                required={rest.InputProps?.required}
                                error={Boolean(fieldError)} // color error message
                                onClick={handleOpen}
                                inputProps={{
                                    "data-testid": "DatePickerHF__input",
                                    ...params.inputProps,
                                }}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                data-testid="DatePickerHF__openPickerButton"
                                                edge="end"
                                                onClick={handleOpen}
                                                role="button"
                                                sx={{ width: 44, height: 44 }}
                                            >
                                                <EventOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    ...params.InputProps,
                                }}
                            />
                        )}
                        label={isLabelString(label) ? t(label) : label}
                        {...rest}
                    />
                );
            }}
            rules={rules}
        />
    );
};

export default DatePickerHF;
