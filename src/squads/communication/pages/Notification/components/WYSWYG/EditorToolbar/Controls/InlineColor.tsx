import { useCallback } from "react";

import { EditorState, Modifier, RichUtils } from "draft-js";
import { ERPModules } from "src/common/constants/enum";

import { ColorLens } from "@mui/icons-material";
import { Box, Menu, MenuItem, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";
import useActionMenu from "src/squads/communication/pages/Notification/components/WYSWYG/hooks/useActionMenu";

import ControlButton from "./ControlButton";
import { InlineControlProps, OmitCreateProps } from "./control-types";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

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

const radioClasses = {
    radioRoot: `${PREFIX}-radioRoot`,
    radioChecked: `${PREFIX}-radioChecked`,
};

const StyledRadio = styled(Radio)(({ theme }) => ({
    //Remove origin style radio
    [`&.${radioClasses.radioRoot}`]: {
        width: 18,
        height: 18,
    },

    [`&.${radioClasses.radioChecked}`]: {
        border: `2px solid ${theme.palette.grey[300]}`,
    },
}));

const menuClasses = {
    menuPaper: "Menu-paper",
};

const StyledMenu = styled(Menu)(({ theme }) => ({
    [`.${menuClasses.menuPaper}`]: {
        boxShadow: theme.shadows[12],
    },
}));

// export default InlineColor;
const sx = {
    menuItem: {
        display: "flex",
        justifyContent: "center",
        width: 40,
        backgroundColor: "transparent",
        cursor: "unset",
    },
};

const arrColors = Object.keys(colorMap);

export interface InlineColorProps extends OmitCreateProps<InlineControlProps> {}

const InlineColor = (props: InlineColorProps) => {
    const { editorState, onChange } = props;
    const { open, onOpen, anchorEl, onClose } = useActionMenu();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

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
            <ControlButton tooltip={tNotification("color")} onClick={onOpen} active={false}>
                <ColorLens />
            </ControlButton>

            <StyledMenu
                classes={{
                    paper: menuClasses.menuPaper,
                }}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                onMouseDown={(e) => e.preventDefault()}
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
                            <MenuItem
                                data-testid="InlineColor__menuItem"
                                sx={sx.menuItem}
                                key={colorCode}
                                disableGutters={true}
                                onClick={(e) => handleOnClick(e, item)}
                            >
                                <StyledRadio
                                    classes={{
                                        root: radioClasses.radioRoot,
                                        checked: radioClasses.radioChecked,
                                    }}
                                    checked={checked}
                                    value={item}
                                    style={{ backgroundColor: colorCode, color: "transparent" }}
                                />
                            </MenuItem>
                        );
                    })}
                </Box>
            </StyledMenu>
        </Box>
    );
};

export default InlineColor;
