import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import OrderDetailCommentDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDetailCommentDialogFooter";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OrderDetailCommentDialogProps {
    comment: string;
    open: boolean;
    onClose: () => void;
}

const OrderDetailCommentDialog = ({ comment, open, onClose }: OrderDetailCommentDialogProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <DialogWithHeaderFooter
            open={open}
            onClose={onClose}
            title={tOrder("title.viewComment")}
            footer={<OrderDetailCommentDialogFooter onClose={onClose} />}
            data-testid="OrderDetailCommentDialog__dialog"
        >
            <Box pt={1}>
                <TypographyWithValue
                    variant="horizontal"
                    value={comment}
                    label={tOrder("label.comment")}
                    xsLabel={3}
                    xsValue={9}
                    dataTestidValue={"OrderDetailCommentDialog__comment"}
                />
            </Box>
        </DialogWithHeaderFooter>
    );
};

export default OrderDetailCommentDialog;
