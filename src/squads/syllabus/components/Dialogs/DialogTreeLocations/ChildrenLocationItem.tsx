import { memo } from "react";

import { SxProps, Theme } from "@mui/material";
import CheckboxBase, { CheckboxBaseProps } from "src/components/Checkboxes/CheckboxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

import isEqual from "lodash/isEqual";
import { TreeLocationProps } from "src/squads/syllabus/hooks/useMapTreeLocations";

export interface ChildrenLocationItemProps<T>
    extends Pick<CheckboxBaseProps, "color" | "size" | "indeterminate" | "checked"> {
    option: T;
    keyShowValue: string;
    sxCheckbox?: SxProps<Theme>;
    sxText?: SxProps<Theme>;
}

function ChildrenLocationItem(props: ChildrenLocationItemProps<TreeLocationProps>) {
    const { keyShowValue, checked, indeterminate, option, sxCheckbox, sxText, ...rest } = props;
    return (
        <>
            <CheckboxBase
                data-testid="ItemLocation__checkbox"
                variant="selector"
                checked={checked}
                indeterminate={indeterminate}
                sx={sxCheckbox}
                {...rest}
            />
            <TypographyBase variant="body2" data-testid="ItemLocation__label" sx={sxText}>
                {option && option[keyShowValue]}
            </TypographyBase>
        </>
    );
}

export default memo(ChildrenLocationItem, (preProps, nextProps) => {
    return isEqual(preProps, nextProps);
});
