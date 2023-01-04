import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

interface CancelledInputAdornmentProps extends TypographyBaseProps {}

const CancelledInputAdornment = (props: CancelledInputAdornmentProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <Box>
            <TypographyBase color="error" variant="subtitle1" {...props}>{`[${tOrder(
                "label.cancelled"
            )}]`}</TypographyBase>
        </Box>
    );
};

export default CancelledInputAdornment;
