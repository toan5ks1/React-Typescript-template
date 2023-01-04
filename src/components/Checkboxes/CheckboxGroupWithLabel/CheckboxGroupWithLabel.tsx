import { useMemo } from "react";

import { FormSize } from "src/common/constants/enum";

import { List, ListItem, Box } from "@mui/material";

import TypographyShortenStr from "../../Typographys/TypographyShortenStr";
import CheckboxBase, { CheckboxBaseProps } from "../CheckboxBase";

export interface CheckboxGroupWithLabelProps<T> {
    size?: FormSize;
    options?: T[];
    onCheck: (item: T, checked: boolean) => void;
    color?: CheckboxBaseProps["color"];
    checkedList: T[];
    keyShowValue: string;
    keyCompareEqual: string;
    classNameCheckbox?: string;
}

const CheckboxGroupWithLabel = <T extends object = any>(props: CheckboxGroupWithLabelProps<T>) => {
    const {
        options,
        onCheck,
        checkedList,
        keyShowValue,
        keyCompareEqual,
        size = "small",
        color = "primary",
        classNameCheckbox,
    } = props;

    const isChecked = useMemo(
        () => (item: T) =>
            checkedList.findIndex(
                (element) => element[keyCompareEqual] === item[keyCompareEqual]
            ) !== -1,
        [checkedList, keyCompareEqual]
    );

    if (!options || !options.length) return null;

    return (
        <List disablePadding data-testid="CheckboxGroupWithLabel">
            {options.map((option, index) => {
                const checked = isChecked(option);
                return (
                    <ListItem
                        button
                        key={index}
                        dense
                        disableGutters
                        onClick={() => onCheck(option, checked)}
                    >
                        <Box px={1} display="flex" alignItems="center">
                            <Box px={1}>
                                <CheckboxBase
                                    data-testid="CheckboxGroupWithLabel__checkbox"
                                    checked={checked}
                                    size={size}
                                    color={color}
                                    className={classNameCheckbox}
                                />
                            </Box>
                            <TypographyShortenStr
                                variant="body2"
                                maxLength={60}
                                data-testid="CheckboxGroupWithLabel__label"
                            >
                                {option[keyShowValue]}
                            </TypographyShortenStr>
                        </Box>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default CheckboxGroupWithLabel;
