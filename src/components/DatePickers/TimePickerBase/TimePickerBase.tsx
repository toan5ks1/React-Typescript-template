import {
    MobileTimePicker as MaterialTimePicker,
    MobileTimePickerProps as MaterialTimePickerProps,
} from "@mui/x-date-pickers";
import { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";

export interface TimePickerBaseProps extends Omit<MaterialTimePickerProps, "InputProps"> {
    InputProps?: TextFieldBaseProps["InputProps"];
}

const TimePickerBase = (props: TimePickerBaseProps) => {
    return <MaterialTimePicker {...props} />;
};

export default TimePickerBase;
