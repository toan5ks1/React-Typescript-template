import { ReactNode } from "react";

import { OptionSelectType } from "src/common/constants/types";

import { MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";

export interface SelectBaseProps<T> extends SelectProps {
    options: T[];
    isTranslated?: boolean;
    renderLabel?(prop: T): string | JSX.Element;
    onChange?: (event: SelectChangeEvent<unknown>, child: ReactNode) => void;
}

function getLabel<T extends OptionSelectType>({
    option,
    renderLabel,
}: {
    option: T;
    renderLabel: SelectBaseProps<T>["renderLabel"];
}) {
    if (typeof renderLabel === "function") {
        return renderLabel(option);
    }

    // inorder not to break current code, still using value here
    const { value } = option;
    return value;
}

const SelectBase = <T extends OptionSelectType>({
    options,
    onChange,
    renderLabel,
    isTranslated = false,
    label,
    variant,
    className,
    readOnly,
    sx = [],
    ...props
}: SelectBaseProps<T>) => {
    return (
        <Select
            {...props}
            readOnly={readOnly}
            fullWidth
            onChange={onChange}
            label={label}
            className={className}
            MenuProps={{
                PaperProps: {
                    sx: {
                        "& ul": { maxHeight: "400px" },
                    },
                },
            }}
            sx={[
                (theme) => {
                    return readOnly ? { backgroundColor: theme.palette.grey[50] } : {};
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {options?.map((option: T) => {
                const { id, disabled } = option;
                return (
                    <MenuItem value={id} key={id} disabled={disabled}>
                        {getLabel<T>({ option, renderLabel })}
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default SelectBase;
