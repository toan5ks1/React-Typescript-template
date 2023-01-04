import { Box, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonCloseSidebar from "src/components/Buttons/ButtonCloseSidebar";
import DrawerBase, { DrawerBaseProps } from "src/components/Drawers/DrawerBase";

import useTranslate from "src/hooks/useTranslate";

export interface DrawerWithHeaderAndFooterProps extends DrawerBaseProps {
    isShowHeaderAction?: boolean;
    isShowFooterAction?: boolean;
    onCloseSidebar?: () => void;
    onClose: () => void;
    onSave?: () => void;
}

const DrawerWithHeaderAndFooter = (props: DrawerWithHeaderAndFooterProps) => {
    const {
        isShowHeaderAction,
        isShowFooterAction,
        children,
        title,
        onCloseSidebar,
        onSave,
        onClose,
        ...rest
    } = props;

    const theme = useTheme<Theme>();
    const t = useTranslate();

    return (
        <Box flexShrink="0">
            <DrawerBase
                sx={(theme) => ({ zIndex: theme.zIndex.modal })}
                role="presentation"
                PaperProps={{
                    sx: (theme) => ({
                        width: "420px",
                        boxShadow: theme.shadows[12],
                    }),
                }}
                onClose={onClose}
                {...rest}
            >
                {isShowHeaderAction && (
                    <Box
                        display="flex"
                        px={3}
                        py={1.5}
                        bgcolor="grey.50"
                        borderBottom={`2px solid ${theme.palette.grey[300]}`}
                    >
                        <ButtonCloseSidebar onClick={onCloseSidebar} />
                        <Box color="text.primary" m="auto">
                            <Typography variant="h6">{title}</Typography>
                        </Box>
                    </Box>
                )}

                <Box m={3}>{children}</Box>

                {isShowFooterAction && (
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        bgcolor="transparent"
                        p={0}
                        mx={3}
                    >
                        <Box mr={3}>
                            <ButtonBase onClick={onClose}>
                                {t("ra.common.action.cancel")}
                            </ButtonBase>
                        </Box>
                        <Box ml={1}>
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
                )}
            </DrawerBase>
        </Box>
    );
};

export default DrawerWithHeaderAndFooter;
