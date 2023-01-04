import { Close as CloseIcon } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import { DialogFullScreenHeaderProps } from "../types";

const DialogFullScreenHFHeader = (props: DialogFullScreenHeaderProps) => {
    const { onClose, title } = props;

    const theme = useTheme();

    return (
        <AppBar
            style={{
                position: "relative",
                borderBottom: `1px solid ${theme.palette?.border?.main}`,
            }}
            color="inherit"
            elevation={0}
        >
            <Toolbar>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            data-testid="DialogFullScreen__buttonClose"
                            size="large"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TypographyHeader data-testid="DialogFullScreen__dialogTitle">
                            {title}
                        </TypographyHeader>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default DialogFullScreenHFHeader;
