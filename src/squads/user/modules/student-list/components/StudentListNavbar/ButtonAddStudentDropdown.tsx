import { OptionSelectType } from "src/common/constants/types";

import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { ButtonGroup, MenuItem, MenuList, Popover } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useActionMenu from "src/squads/user/hooks/useActionMenu";
import useTranslate from "src/squads/user/hooks/useTranslate/useTranslate";

export interface ButtonAddStudentDropdownProps {
    label: string;
    options: OptionSelectType[];
    onClick?: (data: OptionSelectType) => void;
}

const CustomPopover = styled(Popover)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => {
    return {
        height: theme.spacing(4.5),
    };
});

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({ minWidth: theme.spacing(19.5) }));

export default function ButtonAddStudentDropdown(props: ButtonAddStudentDropdownProps) {
    const { label, options, onClick } = props;
    const { anchorEl, open, onClose, onOpen } = useActionMenu();
    const t = useTranslate();
    return (
        <>
            <StyledButtonGroup data-testid="ButtonAddStudentDropdown" onClick={onOpen}>
                <ButtonBase
                    data-testid="ButtonAddStudentDropdown__contentButton"
                    color="primary"
                    variant="contained"
                >
                    {label}
                </ButtonBase>
                <ButtonBase
                    data-testid="ButtonAddStudentDropdown__iconButton"
                    color="primary"
                    size="small"
                    variant="contained"
                    sx={(theme) => ({
                        background: theme.palette.blue?.[700],
                        minWidth: theme.spacing(6.5),
                    })}
                >
                    <ArrowDropDownIcon />
                </ButtonBase>
            </StyledButtonGroup>
            <CustomPopover
                data-testid="ButtonAddStudentDropdown__popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                onClose={onClose}
            >
                <MenuList>
                    {options.map((option) => {
                        const { id, label, value } = option;

                        return (
                            <CustomMenuItem
                                key={id}
                                onClick={() => {
                                    onClose();
                                    if (onClick) onClick(option);
                                }}
                                data-value={label}
                            >
                                {t(value)}
                            </CustomMenuItem>
                        );
                    })}
                </MenuList>
            </CustomPopover>
        </>
    );
}
