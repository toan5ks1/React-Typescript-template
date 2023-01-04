import { ReactNode } from "react";

import { Box } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyLookingFor from "src/components/Typographys/TypographyLookingFor";
import SvgIconEmptyCalendar from "src/squads/calendar/components/SvgIcons/SvgIconEmptyCalendar";

export interface WrapperLookingForProps {
    children: ReactNode;
    content: string;
    helperText: string;
    height?: "page" | "dialog" | "full-height";
    variant?: "empty-icon" | "loading" | "result";
}

const WrapperLookingFor = (props: WrapperLookingForProps) => {
    const { children, content, helperText, height, variant } = props;

    const getHeight = () => {
        if (height === "page") return 600;
        if (height === "dialog") return 300;
        return "100%";
    };
    if (variant === "result") return <>{children}</>;

    return (
        <Box
            display="flex"
            height={getHeight()}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            {variant === "empty-icon" ? (
                <Box>
                    <SvgIconEmptyCalendar data-testid="WrapperLookingFor__icon" />
                    <TypographyLookingFor mb={1} mt={5}>
                        {content}
                    </TypographyLookingFor>
                    <TypographyBase variant="caption" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                        {helperText}
                    </TypographyBase>
                </Box>
            ) : (
                <CircularProgressBase />
            )}
        </Box>
    );
};

export default WrapperLookingFor;
