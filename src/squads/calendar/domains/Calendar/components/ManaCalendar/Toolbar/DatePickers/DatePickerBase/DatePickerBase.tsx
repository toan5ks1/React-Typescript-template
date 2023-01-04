import {
    MobileDatePicker as MaterialDatePicker,
    MobileDatePickerProps as MaterialDatePickerProps,
} from "@mui/x-date-pickers";

export interface DatePickerBaseProps extends MaterialDatePickerProps {}

const DatePickerBase = (props: DatePickerBaseProps) => {
    return <MaterialDatePicker {...props} />;
};

export default DatePickerBase;
