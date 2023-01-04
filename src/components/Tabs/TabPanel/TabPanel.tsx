import { Box, BoxProps } from "@mui/material";

export interface TabPanelProps extends BoxProps {
    index: number;
    value: number | string;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            data-testid="TabPanel"
            {...other}
        >
            {value === index && children}
        </Box>
    );
};

export default TabPanel;
