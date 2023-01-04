import { ReactNode } from "react";

import { isLastItemInArray } from "src/squads/payment/utils/array";
import { isEmptyObject } from "src/squads/payment/utils/types";

import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemText, Stack, Theme, Tooltip } from "@mui/material";
import { listItemButtonClasses } from "@mui/material/ListItemButton";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

type RenderErrorTypeReturn = string | ReactNode;
export interface MenuItemButtonListProps<T extends Record<string, any>> {
    keyName: string;
    title: string;
    itemList: T[];
    selectedIndex: number;
    onSelected: (selectedIndex: number) => void;
    errors: object;
    renderComponent: (item: T) => ReactNode;
    renderError: (errors: object, itemListIndex: number) => RenderErrorTypeReturn;
}

const sx = {
    listItemButton: {
        [`&.${listItemButtonClasses.selected}, &.${listItemButtonClasses.selected}:hover`]: {
            backgroundColor: "#EBEBEB",
        },
    },
    errorIcon: (theme: Theme) => ({
        color: theme.palette.error.main,
    }),
};

const defaultRenderError = (toolTipError: string) => {
    return (
        <Tooltip title={toolTipError} placement="top">
            <ErrorOutlineOutlined sx={sx.errorIcon} data-testid="MenuItemButtonList__errorIcon" />
        </Tooltip>
    );
};

const wrapperRenderError = (renderError: RenderErrorTypeReturn) => {
    if (typeof renderError === "string") return defaultRenderError(renderError);
    return renderError;
};

const MenuItemButtonList = <T extends Record<string, any>>({
    keyName,
    title,
    itemList,
    selectedIndex,
    onSelected,
    renderComponent,
    errors,
    renderError,
}: MenuItemButtonListProps<T>) => {
    return (
        <PaperRoundedBorders fullHeight data-testid="MenuItemButtonList__root">
            <Stack pt={3} pb={1} rowGap={2}>
                <Box px={4}>
                    <TypographyHeader>{title}</TypographyHeader>
                </Box>

                <List disablePadding>
                    {itemList.map((item, index) => {
                        return (
                            <ListItemButton
                                key={item[keyName]}
                                color="default"
                                selected={selectedIndex === index}
                                onClick={() => {
                                    onSelected(index);
                                }}
                                divider={!isLastItemInArray(index, itemList.length)}
                                sx={sx.listItemButton}
                                data-testid="MenuItemButtonList__listItemButton"
                            >
                                <ListItemText sx={{ pl: 2 }}>{renderComponent(item)}</ListItemText>

                                {!isEmptyObject(errors) &&
                                    wrapperRenderError(renderError(errors, index))}
                            </ListItemButton>
                        );
                    })}
                </List>
            </Stack>
        </PaperRoundedBorders>
    );
};

export default MenuItemButtonList;
