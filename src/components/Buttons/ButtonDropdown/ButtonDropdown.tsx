import { useCallback, useRef, useState } from "react";

import { useToggle } from "react-use";
import { OptionSelectType } from "src/common/constants/types";
import { ComponentClasses } from "src/typings/material-ui";

import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import {
    Popper,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    MenuList,
    Paper,
    MenuItem,
    MenuItemProps,
    Box,
    ButtonGroupProps,
    Button,
} from "@mui/material";

import useTranslate from "src/hooks/useTranslate";

export interface DropdownButtonProps {
    classes?: ComponentClasses<DropdownButtonClassKeys>;
    options: OptionSelectType[];
    isTranslated?: boolean;
    ButtonGroupProps?: ButtonGroupProps;
    MenuItemProps?: MenuItemProps;
    onClick?: (data: OptionSelectType) => void;
}

export type DropdownButtonClassKeys = "root" | "menuItem";

// because we have wrong logic in getTitleTranslation, so we need to passed opposite value for isTranslated
const ButtonDropdown = ({
    isTranslated = false,
    classes,
    MenuItemProps,
    ...props
}: DropdownButtonProps) => {
    const { options, onClick, ButtonGroupProps } = props;
    const [open, toggleOpen] = useToggle(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const anchorRef = useRef<HTMLDivElement>(null);

    const t = useTranslate();

    const handleMenuItemClick = useCallback(
        (_, index: number) => {
            setSelectedIndex(index);
            toggleOpen(false);
        },
        [toggleOpen]
    );

    const handleClose = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
                return;
            }

            toggleOpen(false);
        },
        [toggleOpen]
    );
    const currentSelectedItem = options[selectedIndex];

    return (
        <Box>
            <ButtonGroup
                data-testid="DropdownButton__groupContainerButton"
                {...ButtonGroupProps}
                ref={anchorRef}
            >
                <Button data-testid="DropdownButton__contentButton" onClick={toggleOpen}>
                    {isTranslated ? currentSelectedItem?.value : t(currentSelectedItem?.value)}
                </Button>
                <Button
                    data-testid="DropdownButton__iconButton"
                    color="primary"
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="Select Button"
                    aria-haspopup="menu"
                    onClick={toggleOpen}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            <Popper open={open} anchorEl={anchorRef.current} transition style={{ zIndex: 2 }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => {
                                        const { id, label, value } = option;

                                        return (
                                            <MenuItem
                                                key={id}
                                                className={classes?.menuItem}
                                                selected={index === selectedIndex}
                                                onClick={(event) => {
                                                    handleMenuItemClick(event, index);
                                                    onClick && onClick(option);
                                                }}
                                                data-value={label}
                                                {...MenuItemProps}
                                            >
                                                {isTranslated ? value : t(value)}
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
};

export default ButtonDropdown;
