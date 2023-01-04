import { OptionSelectType } from "src/common/constants/types";

import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Box, ButtonGroup, MenuList, MenuItem, Popover } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useActionMenu from "src/squads/adobo/domains/invoice/hooks/useActionMenu";

const CustomPopover = styled(Popover)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    height: theme.spacing(4.5),
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({ minWidth: theme.spacing(19.5) }));

export interface ButtonInvoiceDropdownProps {
    label: string;
    options: OptionSelectType[];
    onClick?: (data: OptionSelectType) => void;
}

export default function ButtonInvoiceDropdown(props: ButtonInvoiceDropdownProps) {
    const { label, options, onClick } = props;
    const { anchorEl, open, onClose, onOpen } = useActionMenu();

    return (
        <Box>
            <StyledButtonGroup data-testid="ButtonInvoiceDropdown" onClick={onOpen}>
                <ButtonBase
                    data-testid="ButtonInvoiceDropdown__contentButton"
                    color="primary"
                    variant="contained"
                >
                    {label}
                </ButtonBase>
                <ButtonBase
                    data-testid="ButtonInvoiceDropdown__iconButton"
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
                data-testid="ButtonInvoiceDropdown__popover"
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
                                    onClick && onClick(option);
                                }}
                                data-value={label}
                            >
                                {value}
                            </CustomMenuItem>
                        );
                    })}
                </MenuList>
            </CustomPopover>
        </Box>
    );
}
