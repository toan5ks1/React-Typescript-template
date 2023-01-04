import { ReactNode, useMemo } from "react";

import { FilterAppliedObjectValuesMap } from "src/common/constants/types";

import { Box } from "@mui/material";
import ButtonDropdownWithPopover from "src/components/Buttons/ButtonDropdownWithPopover";
import TextFieldFilter from "src/components/TextFields/TextFieldFilter";

import { arrayHasItem } from "../../../common/utils/other";
import FormFilterAdvancedChipList from "./FormFilterAdvancedChipList";

import useTranslate from "src/hooks/useTranslate";

export const DEFAULT_FORM_FILTER_ADVANCED_WIDTH = "560px";

export interface FormFilterAdvancedProps<T extends Record<string, T[keyof T]>> {
    onEnterSearchBar: (value: string) => void;
    onDelete?: (fieldDeleted: string) => void;
    onClosePopover?: () => void;
    onApply?: () => void;
    onReset?: () => void;

    fields?: T;
    children?: ReactNode;
    isDisableReset?: boolean;
    isDisableApply?: boolean;
    filterNameApplied?: FilterAppliedObjectValuesMap<T>;
    width?: "fullWidth" | "page";
    inputSearchPlaceholder?: string;
    defaultSearchKeyword?: string;
}

const FormFilterAdvanced = <T extends Record<string, any>>(props: FormFilterAdvancedProps<T>) => {
    const t = useTranslate();

    const {
        children,
        isDisableReset,
        isDisableApply,
        filterNameApplied,
        onEnterSearchBar,
        onReset,
        onDelete,
        onApply,
        onClosePopover,
        inputSearchPlaceholder = t("resources.common.enterYourKeyword"),
        defaultSearchKeyword = "",
        width,
    } = props;

    const hasChildren = useMemo(() => !!children, [children]);

    return (
        <Box data-testid="FormFilterAdvanced__root">
            <Box
                sx={{
                    width: width === "fullWidth" ? "100%" : DEFAULT_FORM_FILTER_ADVANCED_WIDTH,
                    maxWidth: "100%",
                }}
                display="flex"
                alignItems="center"
            >
                <Box flexGrow={1} display="flex">
                    <TextFieldFilter
                        isCustom={hasChildren}
                        placeholder={inputSearchPlaceholder}
                        onEnter={onEnterSearchBar}
                        data-testid="FormFilterAdvanced__textField"
                        defaultValue={defaultSearchKeyword}
                    />
                    {hasChildren && (
                        <ButtonDropdownWithPopover
                            dropdownContent={children}
                            onResetFilter={onReset}
                            onApplyFilter={onApply}
                            onClosePopover={onClosePopover}
                            isDisableReset={isDisableReset}
                            isDisableApply={isDisableApply}
                        >
                            {t("ra.common.action.filter")}
                        </ButtonDropdownWithPopover>
                    )}
                </Box>
            </Box>

            {arrayHasItem(filterNameApplied) && (
                <Box mt={2}>
                    <FormFilterAdvancedChipList<T>
                        filterNameApplied={filterNameApplied!}
                        onClearAll={onReset!}
                        onDelete={onDelete!}
                    />
                </Box>
            )}
        </Box>
    );
};

export default FormFilterAdvanced;
