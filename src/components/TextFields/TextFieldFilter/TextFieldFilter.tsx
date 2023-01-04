import { KeyboardEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

import TextFieldBase, { TextFieldBaseProps } from "../TextFieldBase";

const PREFIX = "TextFieldFilter";

const classes = {
    root: `${PREFIX}-root`,
    inputRoot: `${PREFIX}-inputRoot`,
    inputPadding: `${PREFIX}-inputPadding`,
};

const StyledTextField = styled(TextFieldBase)({
    [`& .${classes.inputRoot}`]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    // We need custom it for same design. Input will height 36px.
    [`& .${classes.inputPadding}`]: {
        paddingTop: 8.5,
        paddingBottom: 8.5,
        height: "1.1876em",
    },
});

export type TextFieldFilterProps = TextFieldBaseProps & {
    onEnter: (value: string) => void;
    isCustom?: boolean;
};

const TextFieldFilter = ({ onEnter, isCustom, ...rest }: TextFieldFilterProps) => {
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (event.preventDefault) event.preventDefault();
            if (event.stopPropagation) event.stopPropagation();
            onEnter((event.target as HTMLInputElement).value);
        }
    };

    return (
        <StyledTextField
            {...rest}
            sx={{
                marginTop: 0,
                marginBottom: 0,
            }}
            onKeyPress={handleKeyPress}
            InputProps={{
                classes: {
                    root: isCustom ? classes.inputRoot : "",
                    input: classes.inputPadding,
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default TextFieldFilter;
