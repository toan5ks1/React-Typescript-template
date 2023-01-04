import { useCallback } from "react";

import { EditorState, Modifier, RichUtils } from "draft-js";
import { Entities } from "src/common/constants/enum";

import ColorLensIcon from "@mui/icons-material/ColorLens";
import Box from "@mui/material/Box";
import Menu, { menuClasses } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Radio, { radioClasses } from "@mui/material/Radio";
import { styled, Theme } from "@mui/material/styles";

import ControlButton from "./ControlButton";
import { InlineControlProps, OmitCreateProps } from "./control-types";

import useActionMenu from "src/squads/syllabus/hooks/useActionMenu";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export const colorMap = {
    warning: {
        color: "#FF9800",
    },
    success: {
        color: "#4CAF50",
    },
    error: {
        color: "#F44336",
    },
    text: {
        color: "#212121",
    },
};

const PREFIX = "Radio";
const classes = {
    radioRoot: `${PREFIX}-radioRoot`,
    radioChecked: `${PREFIX}-radioChecked`,
};

const StyledRadio = styled(Radio)({
    //Remove origin style radio
    [`&.${classes.radioRoot}`]: {
        width: 18,
        height: 18,
        overflow: "hidden",
        color: "transparent",
    },

    [`& .${classes.radioChecked}`]: {
        color: "transparent",
        border: "3px solid #E0E0E0",
    },
});

// export default InlineColor;
const sx = {
    root: {
        margin: 0,
    },
    menu: (theme: Theme) => ({
        [`& .${menuClasses.paper}`]: {
            boxShadow: theme.shadows[12],
        },
    }),
    menuItem: {
        display: "flex",
        justifyContent: "center",
        width: 40,
        backgroundColor: "transparent",
        cursor: "unset",
    },
    //Remove origin style radio
    radio: {
        width: 18,
        height: 18,
        overflow: "hidden",
        "&.root": {
            color: "transparent",
        },
        [`&.${radioClasses.checked}`]: {
            color: "transparent",
            border: "3px solid #E0E0E0",
        },
    },
};

const arrColors = Object.keys(colorMap);

const InlineColor = (props: OmitCreateProps<InlineControlProps>) => {
    const { editorState, onChange } = props;
    const { open, onOpen, anchorEl, onClose } = useActionMenu();
    const t = useResourceTranslate(Entities.QUIZZES);

    const handleOnClick = useCallback(
        (_e, colorName: string) => {
            const selection = editorState.getSelection();

            // Let's just allow one color at a time. Turn off all active colors.
            const nextContentState = Object.keys(colorMap).reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color);
            }, editorState.getCurrentContent());

            let nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                "change-inline-style"
            );
            const currentStyle = editorState.getCurrentInlineStyle();
            // Unset style override for current color.
            if (selection.isCollapsed()) {
                nextEditorState = currentStyle.reduce((state, color) => {
                    return RichUtils.toggleInlineStyle(state!, color!);
                }, nextEditorState);
            }

            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, colorName);

            onChange(nextEditorState);
            onClose();
        },
        [editorState, onChange, onClose]
    );

    return (
        <Box>
            <ControlButton tooltip={t("color")} onClick={onOpen} active={false}>
                <ColorLensIcon />
            </ControlButton>

            <Menu
                sx={sx.menu}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                onMouseDown={(e) => e.preventDefault()}
                // getContentAnchorEl={null}
                disableAutoFocus
                disableEnforceFocus
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box display="flex">
                    {arrColors.map((item) => {
                        const colorCode = colorMap[item].color;
                        const checked = editorState.getCurrentInlineStyle().has(item);

                        return (
                            <MenuItem sx={sx.menuItem} key={colorCode} disableGutters={true}>
                                <StyledRadio
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.radioChecked,
                                    }}
                                    checked={checked}
                                    onClick={(e) => handleOnClick(e, item)}
                                    value={item}
                                    style={{ backgroundColor: colorCode, color: "transparent" }}
                                />
                            </MenuItem>
                        );
                    })}
                </Box>
            </Menu>
        </Box>
    );
};

export default InlineColor;
