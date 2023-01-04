import { useCallback } from "react";

import { User_UserGroupsManyReferenceV2Query } from "src/squads/user/service/bob/bob-types";

import CloseIcon from "@mui/icons-material/Close";
import { AutocompleteRenderGetTagProps, Box, Theme } from "@mui/material";
import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";
import ChipBase from "src/components/Chips/ChipBase";

import useUserGroupsList, { IUserGroup } from "../../hooks/useUserGroupsList";

const sx = {
    tagBox: (theme: Theme) => ({
        padding: theme.spacing(0.25),
    }),
    tag: (theme: Theme) => ({
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.grey[300]}`,
    }),
};

const UserGroupsAutocompleteHF = (props: Omit<AutocompleteHFProps<IUserGroup>, "options">) => {
    const { loading, options, setInputVal } = useUserGroupsList();

    const _renderTags = useCallback(
        (
            tagValue: User_UserGroupsManyReferenceV2Query["user_group"],
            getTagProps: AutocompleteRenderGetTagProps
        ) => {
            return tagValue.map((tag, index) => (
                <Box
                    key={index}
                    sx={sx.tagBox}
                    maxWidth="100%"
                    data-testid="UserGroupsSelectInputHF__tagBox"
                >
                    <ChipBase
                        data-testid="UserGroupsSelectInputHF__ChipTag"
                        size="small"
                        sx={sx.tag}
                        label={tag.user_group_name}
                        deleteIcon={<CloseIcon data-testid="ChipAutocomplete__iconDelete" />}
                        {...getTagProps({ index })}
                    />
                </Box>
            ));
        },
        []
    );

    const _renderLimitTags = (more: number) => {
        return (
            <ChipBase
                data-testid="UserGroupsInputHF__ChipLimitTags"
                size="small"
                sx={sx.tag}
                label={`+ ${more}`}
            />
        );
    };

    return (
        <AutocompleteHF
            {...props}
            multiple
            size="small"
            id="UserGroupsAutocompleteHF__autocomplete"
            data-testid="UserGroupsAutocompleteHF__autocomplete"
            disableClearable={false}
            disableCloseOnSelect
            filterSelectedOptions
            options={options}
            loading={loading}
            onInputChange={(_e, val) => {
                setInputVal(val);
            }}
            limitTags={10}
            getLimitTagsText={_renderLimitTags}
            renderTags={_renderTags}
        />
    );
};

export default UserGroupsAutocompleteHF;
