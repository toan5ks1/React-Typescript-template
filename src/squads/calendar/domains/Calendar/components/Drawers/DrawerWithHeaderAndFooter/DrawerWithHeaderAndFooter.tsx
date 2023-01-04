import { ChevronRight } from "@mui/icons-material";
import { Box, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import DrawerBase, { DrawerBaseProps } from "src/components/Drawers/DrawerBase";

import useTranslate from "src/squads/calendar/hooks/useTranslate";

export interface DrawerWithHeaderAndFooterProps extends DrawerBaseProps {
    onCloseSidebar?: () => void;
    onClose: () => void;
    onSave?: () => void;
}

const sx = {
    drawerContainer: {
        width: "360px",
        zIndex: 1201,
        display: "flex",
    },
};

const DrawerWithHeaderAndFooter = (props: DrawerWithHeaderAndFooterProps) => {
    const { children, title, onCloseSidebar, onSave, onClose, ...rest } = props;

    const theme = useTheme<Theme>();
    const t = useTranslate();

    return (
        <Box flexShrink="0">
            <DrawerBase
                role="presentation"
                PaperProps={{
                    sx: sx.drawerContainer,
                }}
                onClose={onClose}
                {...rest}
            >
                <Box
                    display="flex"
                    px={3}
                    py={2}
                    bgcolor={theme.palette.grey[100]}
                    borderBottom={`1px solid ${theme.palette.grey[300]}`}
                >
                    <Box pr={1.5} my="auto">
                        <ButtonBase
                            onClick={onCloseSidebar}
                            size="small"
                            sx={{ minWidth: "unset" }}
                            data-testid="DrawerWithHeaderAndFooter__closeSidebar"
                        >
                            <ChevronRight />
                        </ButtonBase>
                    </Box>
                    <Box my="auto">
                        <Typography color={theme.palette.text.primary} variant="h6">
                            {title}
                        </Typography>
                    </Box>
                </Box>

                <Box m={3} flexGrow={1}>
                    {children}
                </Box>

                <Box
                    display="flex"
                    bgcolor={theme.palette.background.paper}
                    justifyContent="flex-end"
                    p={3}
                >
                    <Box mr={2}>
                        <ButtonBase onClick={onClose}>{t("ra.common.action.cancel")}</ButtonBase>
                    </Box>
                    <Box>
                        <ButtonBase
                            variant="contained"
                            color="primary"
                            onClick={onSave}
                            type="submit"
                        >
                            {t("ra.common.save")}
                        </ButtonBase>
                    </Box>
                </Box>
            </DrawerBase>
        </Box>
    );
};

export default DrawerWithHeaderAndFooter;
