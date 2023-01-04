import { ReactNode } from "react";

import { Box } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import EmptyIcon from "src/components/SvgIcons/EmptyIcon";
import TypographyLookingFor from "src/components/Typographys/TypographyLookingFor";

import TypographyBase from "../../Typographys/TypographyBase";

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
                <Box display="block">
                    <EmptyIcon data-testid="LookingFor__icon" />
                    <Box mb={1} mt={2}>
                        <TypographyLookingFor>{content}</TypographyLookingFor>
                    </Box>
                    <TypographyBase
                        variant="body2"
                        sx={(theme) => ({ color: theme.palette.grey[500] })}
                    >
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
