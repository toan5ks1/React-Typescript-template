import { ReactElement, ReactNode } from "react";

import { Box, Container } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface FormLayoutProps {
    formTitle?: string | ReactElement;
    children: ReactNode;
    fullWidth?: boolean;
    classesOverride?: {
        wrapper?: string;
    };
}

const FormLayout = (props: FormLayoutProps) => {
    const { formTitle, children, fullWidth, classesOverride = {}, ...rest } = props;

    return (
        <div className={classesOverride.wrapper}>
            <Container
                sx={{
                    maxWidth: fullWidth ? "100%" : 770,
                    boxShadow: "none",
                    background: "transparent",
                    padding: 0,
                }}
                {...rest}
            >
                {formTitle ? (
                    <TypographyBase
                        variant="h4"
                        sx={{ textTransform: "capitalize" }}
                        data-testid="FormLayout__title"
                    >
                        <Box mt={1} mb={3}>
                            {formTitle}
                        </Box>
                    </TypographyBase>
                ) : null}
                {children}
            </Container>
        </div>
    );
};

export default FormLayout;
