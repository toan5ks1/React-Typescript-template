import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const CustomBillingCommentSection = () => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <>
            <Box mb={2}>
                <TypographyHeader>{tOrder("label.comment")}</TypographyHeader>
            </Box>
            <TextFieldHF
                name="comment"
                label={tOrder("label.comment")}
                inputProps={{
                    "data-testid": "CustomBillingCommentSection__commentInput",
                }}
                multiline
                rows={6.5}
            />
        </>
    );
};

export default CustomBillingCommentSection;
