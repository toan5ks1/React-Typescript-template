import { OptionSelectType } from "src/common/constants/types";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import SelectHF, { SelectHFProps } from "src/components/Select/SelectHF";

export interface SelectIconHFProps<T>
    extends Omit<SelectHFProps<T>, "renderValue" | "renderLabel" | "options" | "placeholder"> {
    optionIconLabelKey: string;
    valueKey: string;
    options: T[];
    placeholder?: string;
}

const StyledWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
});

const SelectIconHF = <T extends unknown>(props: SelectIconHFProps<T>) => {
    const { name, optionIconLabelKey, valueKey, options, rules, placeholder, ...rest } = props;

    const convertedOptions: OptionSelectType[] = options.map((option) => {
        const value = option[valueKey];

        return {
            value,
            id: value,
            label: option[optionIconLabelKey],
        };
    });

    return (
        <SelectHF
            {...rest}
            name={name}
            rules={rules}
            options={convertedOptions}
            displayEmpty
            size="small"
            renderValue={(value) => {
                const selectedOption = options.find((option) => value === option[valueKey]);

                if (selectedOption) {
                    return <StyledWrapper>{selectedOption[optionIconLabelKey]}</StyledWrapper>;
                }

                if (placeholder) {
                    return (
                        <StyledWrapper sx={(theme) => ({ color: theme.palette.grey[500] })}>
                            {placeholder}
                        </StyledWrapper>
                    );
                }

                return null;
            }}
            renderLabel={(value) => {
                return (
                    <Box
                        display="flex"
                        alignItems="center"
                        data-testid="SelectIcon__option"
                        key={value.id}
                    >
                        {value.label}
                    </Box>
                );
            }}
        />
    );
};

export default SelectIconHF;
