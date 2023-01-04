import { Box } from "@mui/material";

export interface NotificationTaskbarItemProps {
    onClick: () => void;
    content: string;
}

export const NotificationTaskbarItem = (props: NotificationTaskbarItemProps) => {
    const { onClick, content } = props;
    return (
        <Box
            sx={(theme) => ({
                width: theme.spacing(28),
                height: theme.spacing(8.375),
                padding: theme.spacing(3, 2),
                display: "flex",
                alignItems: "center",
                borderRadius: "8px 8px 0px 0px",
                border: "1px solid #E6E8EF",
                cursor: "pointer",
                "&:not(:first-of-type)": {
                    marginLeft: theme.spacing(0.5),
                },
                backgroundColor: theme.palette.background.paper,
            })}
            onClick={onClick}
            data-testid="NotificationTaskbarItem__root"
        >
            <Box
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                data-testid="NotificationTaskbarItem__name"
                data-content={content}
            >
                {content}
            </Box>
        </Box>
    );
};

export default NotificationTaskbarItem;
