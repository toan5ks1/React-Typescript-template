import { ReactElement, ReactNode } from "react";

import { Box, Container, SxProps, Theme } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTextCapitalize from "src/squads/syllabus/hooks/useTextCapitalize";

export interface FormLayoutProps {
    formTitle?: string | ReactElement;
    children: ReactNode;
    fullWidth?: boolean;
    sxOverride?: SxProps<Theme>;
}

const FormLayout = (props: FormLayoutProps) => {
    const { formTitle, children, fullWidth, sxOverride = [], ...rest } = props;

    return (
        <Box sx={sxOverride}>
            <Container
                sx={{
                    maxWidth: fullWidth ? "100% !important" : "770px !important",
                    boxShadow: "none",
                    background: "transparent",
                    padding: "0 !important",
                }}
                {...rest}
            >
                {formTitle && (
                    <TypographyBase
                        variant="h4"
                        sx={useTextCapitalize}
                        data-testid="FormLayout__title"
                    >
                        <Box mt={1} mb={3}>
                            {formTitle}
                        </Box>
                    </TypographyBase>
                )}
                {children}
            </Container>
        </Box>
    );
};

export default FormLayout;
