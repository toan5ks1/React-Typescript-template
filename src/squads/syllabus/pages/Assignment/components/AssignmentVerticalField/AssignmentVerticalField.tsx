import { Box } from "@mui/material";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

// Replicate current UI due to new components
const sx = {
    label: {
        textTransform: "uppercase",
        fontSize: "1rem",
    },
    value: {
        fontWeight: 500,
        fontSize: "1rem",
    },
};

interface AssignmentVerticalFieldProps {
    label: string;
    value: string | number;
    valueTypoProps?: object | TypographyBaseProps;
}

const AssignmentVerticalField = (props: AssignmentVerticalFieldProps) => {
    const { label, value, valueTypoProps } = props;

    return (
        <Box display="flex" flexDirection="column" mt={1} mb={3}>
            <Box mb={1}>
                <TypographyBase variant="h6" color="textSecondary" sx={sx.label}>
                    {label}
                </TypographyBase>
            </Box>
            <TypographyBase variant="body2" color="textPrimary" sx={sx.value} {...valueTypoProps}>
                {value}
            </TypographyBase>
        </Box>
    );
};

export default AssignmentVerticalField;
