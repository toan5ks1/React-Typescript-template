import { arrayHasItem } from "src/common/utils/other";

import { ListItem, SxProps, Theme } from "@mui/material";

import ChildrenLocationItem, { ChildrenLocationItemProps } from "./ChildrenLocationItem";

import type {
    TreeLocationProps,
    NodeLocationProps,
} from "src/squads/user/hooks/useMapTreeLocations";
import useSelectLocationItem from "src/squads/user/hooks/useSelectLocationItem";

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
    isolateParent?: boolean;
}

function ItemLocation(props: ItemLocationProps<TreeLocationProps>) {
    const {
        option,
        keyCompareEqual,
        checkedList,
        onCheck,
        sxItem,
        isolateParent = false,
        ...rest
    } = props;

    const { checked, restOfCheckedLocations, indeterminate, selectedLocations } =
        useSelectLocationItem({
            keyCompareEqual,
            checkedList,
            location: option,
            isolateParent,
        });

    const handleCheck = () => {
        onCheck(selectedLocations, restOfCheckedLocations, checked);
    };
    let marginLeft = option.level ? option.level * 30 - 6 : 0;
    if (isolateParent) marginLeft = option.level ? option.level * 30 + 24 : 24;
    return (
        <ListItem
            button
            dense
            disableGutters
            style={{
                marginLeft,
            }}
            onClick={handleCheck}
            data-testid="ItemLocation__container"
            data-value={option ? option[keyCompareEqual] : null}
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
