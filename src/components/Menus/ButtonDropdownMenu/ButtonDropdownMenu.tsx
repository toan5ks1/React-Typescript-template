import { OptionSelectType } from "src/common/constants/types";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MenuList, Popover, MenuItem, PopoverOrigin } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useActionMenu from "src/hooks/useActionMenu";
import useTranslate from "src/hooks/useTranslate";

const PREFIX = "ButtonDropdownMenu";

const classes = {
    root: `${PREFIX}-root`,
    mainButton: `${PREFIX}-mainButton`,
    endIcon: `${PREFIX}-endIcon`,
    mainMenu: `${PREFIX}-mainMenu`,
};

const Root = styled("span")(({ theme }) => ({
    [`& .${classes.mainButton}`]: {
        ...theme.typography.button,
        height: theme.spacing(4.5),
        padding: theme.spacing(0, 2),
    },

    [`& .${classes.endIcon}`]: {
        borderLeft: 0,
    },

    [`& .${classes.mainMenu}`]: {
        marginTop: theme.spacing(1),
    },
}));

export interface ButtonDropdownMenuProps {
    label: string;
    options: OptionSelectType[];
    isTranslated?: boolean;
    onClick?: (data: OptionSelectType) => void;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
}

const ButtonDropdownMenu = (props: ButtonDropdownMenuProps) => {
    const {
        label,
        options,
        isTranslated,
        onClick,
        anchorOrigin = {
            vertical: "bottom",
            horizontal: "right",
        },
        transformOrigin = {
            vertical: "top",
            horizontal: "right",
        },
    } = props;
    const { anchorEl, open, onClose, onOpen } = useActionMenu();

    const t = useTranslate();

    return (
        <Root>
            <ButtonBase
                data-testid="ButtonDropdownMenu__button"
                size="large"
                variant="outlined"
                color="primary"
                endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                className={classes.mainButton}
                classes={{
                    endIcon: classes.endIcon,
                }}
                onClick={onOpen}
            >
                {label}
            </ButtonBase>
            <Popover
                data-testid="ButtonDropdownMenu__popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                className={classes.mainMenu}
                onClose={onClose}
            >
                <MenuList>
                    {options.map((option) => {
                        const { id, label, value, disabled } = option;
                        return (
                            <MenuItem
                                key={id}
                                onClick={() => {
                                    onClose();
                                    onClick && onClick(option);
                                }}
                                data-value={label}
                                disabled={disabled}
                            >
                                {isTranslated ? value : t(value)}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Popover>
        </Root>
    );
};

export default ButtonDropdownMenu;
