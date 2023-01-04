import { Box, Grid } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";

import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface OrderDetailCommentDialogFooterProps {
    onClose: () => void;
}

const OrderDetailCommentDialogFooter = ({ onClose }: OrderDetailCommentDialogFooterProps) => {
    const t = useTranslate();

    return (
        <Grid container justifyContent="flex-end" data-testid="OrderDetailCommentDialog__footer">
            <Box mt={1}>
                <ButtonPrimaryContained
                    onClick={onClose}
                    data-testid="OrderDetailCommentDialog__buttonClose"
                >
                    {t("ra.common.action.close")}
                </ButtonPrimaryContained>
            </Box>
        </Grid>
    );
};

export default OrderDetailCommentDialogFooter;
