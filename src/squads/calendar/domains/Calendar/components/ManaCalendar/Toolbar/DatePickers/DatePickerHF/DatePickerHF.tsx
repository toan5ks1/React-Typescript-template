import { DateTime } from "luxon";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { useToggle } from "react-use";
import { ERPModules } from "src/common/constants/enum";
import { convertToDate, createValidDate } from "src/common/utils/time";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import { EventOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import TextFieldBase, { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";
import DatePickerBase, {
    DatePickerBaseProps,
} from "src/squads/calendar/domains/Calendar/components/ManaCalendar/Toolbar/DatePickers/DatePickerBase";
import { isLabelString } from "src/squads/calendar/domains/Calendar/components/ManaCalendar/Toolbar/DatePickers/utils";
import calendarStyles from "src/squads/calendar/domains/Calendar/components/ManaCalendar/calendar-styles";

import useLocale from "src/squads/calendar/hooks/useLocale";
import useResourceTranslate from "src/squads/calendar/hooks/useResourceTranslate";
import useTranslate from "src/squads/calendar/hooks/useTranslate";

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
    const language = useLocale();
    // Update this when this issue is fixed: https://github.com/moment/luxon/issues/549
    const formatType = language === "ja" ? "yyyy年M月" : "MMMM yyyy";
    const toolbarFormat = language === "ja" ? "EEE, M月 dd" : "EEE, MMM dd";

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
    const tCalendar = useTranslate();
    const tResourceCalendar = useResourceTranslate(ERPModules.SCHEDULE);

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
                        toolbarTitle={tResourceCalendar("label.datePickerTitle")}
                        toolbarFormat={toolbarFormat}
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
                        cancelText={tCalendar("ra.common.action.cancel")}
                        okText={tCalendar("ra.common.action.OK")}
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
                                    startAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                data-testid="DatePickerHF__openPickerButton"
                                                edge="start"
                                                onClick={handleOpen}
                                                role="button"
                                                size={"small"}
                                            >
                                                <EventOutlined />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    ...params.InputProps,
                                }}
                                sx={calendarStyles.calendarToolbar.datePickerTextField}
                            />
                        )}
                        label={isLabelString(label) ? tCalendar(label) : label}
                        {...rest}
                    />
                );
            }}
            rules={rules}
        />
    );
};

export default DatePickerHF;
