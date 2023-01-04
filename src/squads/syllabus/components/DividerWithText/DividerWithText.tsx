import Box from "@mui/material/Box";

export interface DividerWithTextProps {
    text: string;
    className?: string;
}

const DividerHr = () => (
    <Box
        component="hr"
        sx={(theme) => ({
            flex: 1,
            height: "1px",
            border: "none",
            backgroundColor: theme.palette.divider,
        })}
        data-testid="DividerWithText__hr"
    />
);

const DividerWithText = ({ text }: DividerWithTextProps) => {
    return (
        <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="center"
            data-testid="DividerWithText_container"
        >
            <DividerHr />
            <Box
                component="span"
                my={0}
                mx={1.5}
                sx={(theme) => ({ color: theme.palette.text.secondary })}
                data-testid="DividerWithText__text"
            >
                {text}
            </Box>
            <DividerHr />
        </Box>
    );
};

export default DividerWithText;
