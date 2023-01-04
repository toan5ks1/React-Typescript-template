import { ReactNode } from "react";

import { useSelector } from "react-redux";
import { RootState } from "src/store/store-types";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppDrawer from "src/components/Layout/AppDrawer";
import ErrorLayout from "src/components/Layout/Layout/ErrorLayout";
import NotificationTaskbar from "src/components/NotificationTaskbar";

import AppBar from "../AppBar";

import useUIToggleSchema from "src/hooks/useUIToggleSchema";

// necessary for content to be below app bar
const Spacer = styled("div")(({ theme }) => {
    return { ...theme.mixins.toolbar };
});

interface LayoutProps {
    children: ReactNode;
}

function Layout(props: LayoutProps) {
    const { children } = props;

    const sidebarOpen = useSelector((state: RootState) => state.app.sidebarOpen);

    const { uiSchema } = useUIToggleSchema();
    return (
        <Box className="layout" sx={{ display: "flex", overflowX: "hidden" }}>
            {uiSchema.appbar && <AppBar sidebarOpen={sidebarOpen} />}

            {uiSchema.menu && <AppDrawer sidebarOpen={sidebarOpen} />}

            <Box
                component="main"
                sx={[
                    {
                        padding: 0,
                        flex: 1,
                        display: "flex",
                        overflow: "auto",
                        height: "100vh",
                    },
                    (theme) => (uiSchema.contentSpacing ? { padding: theme.spacing(4) } : {}),
                ]}
                data-testid="Layout__main"
            >
                <Box
                    sx={{
                        width: "100%",
                        minWidth: "min-content",
                    }}
                >
                    {uiSchema.appbar && <Spacer />}

                    <ErrorLayout {...props}>{children}</ErrorLayout>

                    <NotificationTaskbar />
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;
