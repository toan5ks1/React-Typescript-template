import { PropsWithChildren } from "react";

import clsx from "clsx";

import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    SelectProps as MuiSelectProps,
} from "@mui/material";
import { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";
import { useFormProps } from "src/squads/syllabus/providers/FormPropsProvider";

export interface BaseSelectProps<T = unknown> extends MuiSelectProps {
    size?: TextFieldBaseProps["size"];
    value?: T;
    defaultValue?: T;
}

const BaseSelect = ({
    className,
    children,
    label,
    name,
    required,
    size,
    ...rest
}: PropsWithChildren<BaseSelectProps>) => {
    const { readOnly } = useFormProps();

    return (
        <FormControl
            className={clsx(className)}
            sx={{ borderRadius: "4px" }}
            variant="outlined"
            size={size}
        >
            <InputLabel required={required} htmlFor="base-select">
                {label}
            </InputLabel>
            <MuiSelect
                labelId="base-select"
                data-testid="BaseSelect"
                {...rest}
                label={label}
                readOnly={readOnly}
            >
                {children}
            </MuiSelect>
        </FormControl>
    );
};

export default BaseSelect;
