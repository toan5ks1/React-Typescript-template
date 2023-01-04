import { useState } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import { Grid } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import ButtonDelete from "src/components/Buttons/ButtonDelete";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import CustomBillingOrderTable, {
    CustomBillingFieldArrayWithIdType,
} from "src/squads/payment/domains/OrderManagement/components/Tables/CustomBillingOrderTable";

import useCustomBillingOrderValidationRules from "src/squads/payment/hooks/useCustomBillingOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface CustomBillingSectionProps {
    billingErrorMessage: string | null;
}

const CustomBillingSection = ({ billingErrorMessage }: CustomBillingSectionProps) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [selectedBillingItem, setSelectedBillingItem] =
        useState<CustomBillingFieldArrayWithIdType>([]);

    const { fields, append, remove } = useFieldArray<
        CustomBillingOrderFormValue,
        "billingFieldArrayItem"
    >({ name: "billingFieldArrayItem" });

    const {
        clearErrors,
        formState: { errors },
    } = useFormContext<CustomBillingOrderFormValue>();

    const validationRules = useCustomBillingOrderValidationRules();

    const errorMessage = validationRules.billingItemArrayTable.getErrorMessage(
        billingErrorMessage,
        errors
    );

    const addBillingFieldArrayItem = () => {
        append({ name: undefined, taxItem: undefined, price: undefined });
    };

    const removeBillingFieldArrayItem = () => {
        const selectedIndexBillingItemArray = new Set<number>();

        fields.forEach((billingItem) => {
            if (selectedBillingItem.indexOf(billingItem) < 0) return;
            selectedIndexBillingItemArray.add(fields.indexOf(billingItem));
        });

        remove([...selectedIndexBillingItemArray]);
        setSelectedBillingItem([]);
        clearErrors();
    };

    const handleSelectedBillingItem = (billingItem: CustomBillingFieldArrayWithIdType) => {
        setSelectedBillingItem(billingItem);
    };

    return (
        <>
            <Grid container justifyContent="space-between" mb={2}>
                <Grid item xs="auto">
                    <TypographyHeader data-testid="CustomBillingSection__title">
                        {tOrder("title.billingItem")}
                    </TypographyHeader>
                </Grid>
                <Grid item container columnSpacing={2} xs="auto">
                    <Grid item>
                        <ButtonDelete
                            onClick={removeBillingFieldArrayItem}
                            disabled={!arrayHasItem(selectedBillingItem)}
                            resource={Entities.ORDERS}
                            data-testid="CustomBillingSection__deleteButton"
                        />
                    </Grid>
                    <Grid item>
                        <ButtonCreate
                            onClick={addBillingFieldArrayItem}
                            variant="outlined"
                            resource={Entities.ORDERS}
                            data-testid="CustomBillingSection__addButton"
                        >
                            {t("ra.common.action.addRow")}
                        </ButtonCreate>
                    </Grid>
                </Grid>
            </Grid>

            <CustomBillingOrderTable
                dataSource={fields}
                onSelect={handleSelectedBillingItem}
                listSelectedItems={selectedBillingItem}
                errorMessage={errorMessage}
            />
        </>
    );
};

export default CustomBillingSection;
