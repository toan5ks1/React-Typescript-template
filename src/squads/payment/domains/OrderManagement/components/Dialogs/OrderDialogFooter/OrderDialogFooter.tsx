import { Grid } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";

import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface OrderDialogFooterProps {
    onCancel: () => void;
    onSubmit: () => void;
    hasNextPage?: boolean;
    onNextPage?: () => void;
    onPreviousPage?: () => void;
    submitButtonTitle?: string;
}

const OrderDialogFooter = ({
    onCancel,
    onSubmit,
    hasNextPage,
    onNextPage,
    onPreviousPage,
    submitButtonTitle,
}: OrderDialogFooterProps) => {
    const tCommon = useTranslate();

    return (
        <>
            {hasNextPage === false && (
                <Grid item>
                    <ButtonBase
                        data-testid="OrderDialogFooter__buttonBack"
                        onClick={onPreviousPage}
                        variant="outlined"
                    >
                        {tCommon("ra.common.action.back")}
                    </ButtonBase>
                </Grid>
            )}
            <Grid
                container
                data-testid="OrderDialogFooter__container"
                spacing={1}
                justifyContent="flex-end"
            >
                <Grid item>
                    <ButtonBase data-testid="OrderDialogFooter__buttonCancel" onClick={onCancel}>
                        {tCommon("ra.common.action.cancel")}
                    </ButtonBase>
                </Grid>
                <Grid item>
                    {hasNextPage ? (
                        <ButtonPrimaryContained
                            data-testid="OrderDialogFooter__buttonNext"
                            onClick={onNextPage}
                        >
                            {tCommon("ra.common.action.next")}
                        </ButtonPrimaryContained>
                    ) : (
                        <ButtonPrimaryContained
                            data-testid="OrderDialogFooter__buttonSubmit"
                            onClick={onSubmit}
                        >
                            {submitButtonTitle
                                ? submitButtonTitle
                                : tCommon("ra.common.action.submit")}
                        </ButtonPrimaryContained>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default OrderDialogFooter;
