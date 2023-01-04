import { useState, useCallback, useMemo, HTMLAttributes } from "react";

import debounce from "lodash/debounce";
import { KEY_CODE, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { ParentSearch, StudentParentDataType } from "src/squads/user/common/types";

import { Search as SearchIcon } from "@mui/icons-material";
import { Grid, Box } from "@mui/material";
import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/components/Autocompletes/AutocompleteBase";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useParentsList from "src/squads/user/modules/student-family/hooks/useParentsList";

export interface ParentsAutocompleteProps
    extends Omit<AutocompleteBaseProps<ParentSearch>, "options" | "optionLabelKey"> {
    parentProfilesList?: StudentParentDataType[];
}

const ParentsAutocomplete = ({
    onChange,
    parentProfilesList,
    getOptionSelectedField,
}: ParentsAutocompleteProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const [keyword, setKeyword] = useState<string>("");
    const [inputVal, setInputVal] = useState<string>("");

    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: ParentSearch) => {
        if (!option) return null;
        return (
            <Box
                {...props}
                component="li"
                display="flex"
                flexWrap="wrap"
                style={{ justifyContent: "space-between" }}
                key={option.user_id}
            >
                <Grid item>{option.name}</Grid>
                <Grid item>{option.email}</Grid>
            </Box>
        );
    };
    const { parents, isLoading } = useParentsList(keyword);

    const setKeywordDebounced = useMemo(
        () => debounce(setKeyword, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setKeyword]
    );

    const getOptionDisabled = useCallback(
        (option: ParentSearch) => {
            if (!parentProfilesList || !parentProfilesList.length) return false;
            return (
                parentProfilesList.findIndex(
                    (e: StudentParentDataType) => e.parent_id === option.user_id
                ) >= 0
            );
        },
        [parentProfilesList]
    );

    return (
        <AutocompleteBase
            id="ParentsAutocomplete__autoComplete"
            placeholder={tStudents("placeholder.inputSearchParent")}
            data-testid="ParentsAutocomplete__autoComplete"
            options={parents || []}
            freeSolo
            loading={isLoading}
            inputValue={inputVal}
            filterOptions={(options) => options}
            optionLabelKey="user.name"
            startAdornment={
                <Box px={1} display="flex" justifyItems="center">
                    <SearchIcon sx={(theme) => ({ color: theme.palette.text.secondary })} />
                </Box>
            }
            onInputChange={(_e, val) => {
                setKeywordDebounced(val);
                setInputVal(val);
            }}
            onBlur={() => {
                setInputVal("");
            }}
            onKeyDown={(event) => {
                if (event.keyCode === KEY_CODE.KEY_ENTER) {
                    event.preventDefault();
                }
            }}
            renderOption={renderOption}
            onChange={(event, value, reason, details) => {
                if (reason === "selectOption") onChange?.(event, value, reason, details);
            }}
            getOptionDisabled={getOptionDisabled}
            getOptionSelectedField={getOptionSelectedField}
        />
    );
};

export default ParentsAutocomplete;
