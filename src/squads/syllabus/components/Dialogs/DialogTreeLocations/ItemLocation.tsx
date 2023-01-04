import { arrayHasItem } from "src/common/utils/other";

import { ListItem, SxProps, Theme } from "@mui/material";

import ChildrenLocationItem, { ChildrenLocationItemProps } from "./ChildrenLocationItem";

import {
    NodeLocationProps,
    TreeLocationProps,
} from "src/squads/syllabus/hooks/useMapTreeLocations";
import useSelectLocationItem from "src/squads/syllabus/hooks/useSelectLocationItem";

export interface ItemLocationProps<T> extends ChildrenLocationItemProps<T> {
    option: T;
    keyShowValue: string;
    keyCompareEqual: string;
    checkedList: NodeLocationProps[];
    onCheck: (
        selectedLocations: NodeLocationProps[],
        restOfCheckedLocations: NodeLocationProps[],
        checked: boolean
    ) => void;
    sxItem?: SxProps<Theme>;
}

function ItemLocation(props: ItemLocationProps<TreeLocationProps>) {
    const { option, keyCompareEqual, checkedList, onCheck, sxItem, ...rest } = props;

    const { checked, restOfCheckedLocations, indeterminate, selectedLocations } =
        useSelectLocationItem({
            keyCompareEqual,
            checkedList,
            location: option,
        });

    const handleCheck = () => {
        onCheck(selectedLocations, restOfCheckedLocations, checked);
    };

    return (
        <ListItem
            button
            dense
            disableGutters
            style={{
                marginLeft: option.level ? option.level * 30 - 6 : 0,
            }}
            onClick={handleCheck}
            data-testid="ItemLocation__container"
            data-value={option && option[keyCompareEqual]}
            data-type={arrayHasItem(option.children) ? "parent" : "child"}
            sx={sxItem}
        >
            <ChildrenLocationItem
                option={option}
                indeterminate={indeterminate}
                checked={checked}
                {...rest}
            />
        </ListItem>
    );
}

export default ItemLocation;
