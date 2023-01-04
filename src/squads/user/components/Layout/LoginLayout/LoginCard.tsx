import { ReactNode, FunctionComponent } from "react";

import { Box, Card, SxProps, Theme } from "@mui/material";

export interface LoginProps {
    backgroundImage?: string;
    children?: ReactNode;
    sx?: SxProps<Theme>;
}

const styles = {
    main: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage:
            "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)",
    },
    card: (theme: Theme) => ({
        border: "none",
        boxShadow: "none",
        margin: "auto",
        padding: theme.spacing(3),
        minWidth: 300,
        maxWidth: 600,
        width: "70%",
        backgroundColor: theme.palette.other?.backgroundGrey,
    }),
};

const LoginCard: FunctionComponent<LoginProps> = (props) => {
    const { children, backgroundImage, sx = [] } = props;

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            alignItems="center"
            justifyContent="flex-start"
            sx={[styles.main, ...(Array.isArray(sx) ? sx : [sx])]}
            data-testid="LoginCard__background"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            }}
        >
            <Card data-testid="LoginCard__content" sx={styles.card}>
                {children}
            </Card>
        </Box>
    );
};

export default LoginCard;
