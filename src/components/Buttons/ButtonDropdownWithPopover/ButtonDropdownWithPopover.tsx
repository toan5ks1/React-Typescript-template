import { ReactNode, useMemo, useState } from "react";

import { KeyboardArrowDown, Refresh } from "@mui/icons-material";
import { Box } from "@mui/material";
import PopoverLeftBottom from "src/components/Popovers/PopoverLeftBottom";
import PopoverRightBottom from "src/components/Popovers/PopoverRightBottom";

import PopoverCenterBottom from "../../Popovers/PopoverCenterBottom";
import ButtonDefaultOutlined from "../ButtonDefaultOutlined";
import ButtonPrimaryContained, { ButtonPrimaryContainedProps } from "../ButtonPrimaryContained";
import ButtonPrimaryText from "../ButtonPrimaryText";

import useTranslate from "src/hooks/useTranslate";

export interface ButtonDropdownWithPopoverProps extends ButtonPrimaryContainedProps {
    dropdownContent: ReactNode;
    popoverPosition?: "bottom-right" | "bottom-left" | "bottom-center";
    isDisableReset?: boolean;
    isDisableApply?: boolean;
    onResetFilter?: () => void;
    onApplyFilter?: () => void;
    onClosePopover?: () => void;
    isAdvancedFilterButton?: boolean;
}

const ButtonDropdownWithPopover = (props: ButtonDropdownWithPopoverProps) => {
    const {
        endIcon = <KeyboardArrowDown />,
        popoverPosition = "bottom-right",
        children,
        dropdownContent,
        onResetFilter,
        onApplyFilter,
        onClosePopover,
        isDisableReset,
        isDisableApply,
        isAdvancedFilterButton = true,
        ...rest
    } = props;

    const t = useTranslate();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleOpenPopover = (currentTarget: Element) => {
        currentTarget && setAnchorEl(currentTarget);
    };

    const handleClosePopover = () => {
        onClosePopover && onClosePopover();
        setAnchorEl(null);
    };

    const PositionedPopover = useMemo(() => {
        switch (popoverPosition) {
            case "bottom-left":
                return PopoverLeftBottom;
            case "bottom-center":
                return PopoverCenterBottom;
            default:
                return PopoverRightBottom;
        }
    }, [popoverPosition]);

    return (
        <>
            <ButtonDefaultOutlined
                data-testid="ButtonDropdownWithPopover__button"
                {...rest}
                sx={(theme) => ({
                    ...(isAdvancedFilterButton && {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        backgroundColor: theme.palette.grey[50],
                        borderColor: theme.palette.grey[300],
                        borderLeft: "none",
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            borderColor: theme.palette.grey[300],
                            borderLeft: "none",
                        },
                    }),
                })}
                endIcon={endIcon}
                onClick={(event) => handleOpenPopover(event.currentTarget as Element)}
            >
                {children}
            </ButtonDefaultOutlined>

            <PositionedPopover
                data-testid="ButtonDropdownWithPopover__popover"
                sx={(theme) => ({ marginTop: theme.spacing(1) })}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
            >
                <Box p={3}>
                    <Box mb={onResetFilter || onApplyFilter ? 3 : 0}>{dropdownContent}</Box>

                    {(onResetFilter || onApplyFilter) && (
                        <Box display="flex" justifyContent="flex-end">
                            {onResetFilter && (
                                <Box mr={2}>
                                    <ButtonPrimaryText
                                        data-testid="ButtonDropdownWithPopover__buttonReset"
                                        disabled={isDisableReset}
                                        onClick={onResetFilter}
                                        size="small"
                                        startIcon={<Refresh />}
                                    >
                                        {t("ra.common.action.reset")}
                                    </ButtonPrimaryText>
                                </Box>
                            )}

                            {onApplyFilter && (
                                <Box>
                                    <ButtonPrimaryContained
                                        data-testid="ButtonDropdownWithPopover__buttonApply"
                                        disabled={isDisableApply}
                                        onClick={onApplyFilter}
                                        size="small"
                                    >
                                        {t("ra.common.action.apply")}
                                    </ButtonPrimaryContained>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </PositionedPopover>
        </>
    );
};

export default ButtonDropdownWithPopover;
