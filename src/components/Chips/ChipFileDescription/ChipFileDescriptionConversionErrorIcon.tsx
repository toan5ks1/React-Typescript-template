import { Box } from "@mui/material";
import { ErrorIcon } from "src/components/SvgIcons";

const ChipFileDescriptionConversionErrorIcon = () => {
    return (
        <Box
            sx={(theme) => ({
                marginRight: theme.spacing(1.5),
                display: "flex",
                alignItems: "center",
                "& > svg": {
                    width: "11px",
                    "& > path": {
                        fill: theme.palette.error.main,
                    },
                },
            })}
            data-testid="ChipFileDescriptionConversionErrorIcon__root"
        >
            <ErrorIcon />
        </Box>
    );
};

export default ChipFileDescriptionConversionErrorIcon;
