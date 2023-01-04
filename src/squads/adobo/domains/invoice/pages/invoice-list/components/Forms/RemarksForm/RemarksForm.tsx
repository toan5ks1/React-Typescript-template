import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface RemarksFormProps extends Pick<UseDialogReturn, "onClose"> {}

const RemarksForm = () => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    return (
        <Grid container pb={1} data-testid="RemarksForm__form">
            <Grid container item xs={12} spacing={1} pb={0}>
                <Grid item xs={12} p={0}>
                    <TextFieldHF
                        name="remarks"
                        label={tInvoice("remarks")}
                        inputProps={{
                            "data-testid": "RemarksForm__inputInvoiceRemark",
                        }}
                        multiline
                        rows={6.474}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RemarksForm;
