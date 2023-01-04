import { Box, BoxProps } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface NotImplementYetProps extends BoxProps {
    isImplemented: boolean;
    notImplementText?: string;
}

function NotImplementYet({
    isImplemented,
    notImplementText,
    children,
    ...boxProps
}: NotImplementYetProps) {
    const t = useTranslate();

    return (
        <Box {...boxProps}>
            {isImplemented ? (
                children
            ) : (
                <TypographyBase variant="caption" data-testid="NotImplementYet__label">
                    {typeof notImplementText !== "undefined"
                        ? notImplementText
                        : t("ra.message.notImplementedYet")}
                </TypographyBase>
            )}
        </Box>
    );
}

export default NotImplementYet;
