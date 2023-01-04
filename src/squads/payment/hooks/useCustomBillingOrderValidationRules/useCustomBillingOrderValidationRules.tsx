import { FieldErrors } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import isEmpty from "lodash/isEmpty";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface BillingItemsFieldArrayTableValidateReturn {
    isError: boolean;
    errorMessage: string | null;
}

export interface useCustomBillingOrderValidationRulesReturn {
    billingFieldArrayItem: {
        name: {
            required: boolean;
        };
        price: {
            required: boolean;
            pattern: RegExp;
        };
    };
    billingItemArrayTable: {
        validate: (
            billingArrayItems: CustomBillingOrderFormValue["billingFieldArrayItem"]
        ) => BillingItemsFieldArrayTableValidateReturn;
        getErrorMessage: (
            billingErrorMessage: string | null,
            errors: FieldErrors<CustomBillingOrderFormValue>
        ) => string | null;
    };
}

const useCustomBillingOrderValidationRules = () => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const validateBillingItemArrayTable = (
        billingArrayItems: CustomBillingOrderFormValue["billingFieldArrayItem"]
    ): BillingItemsFieldArrayTableValidateReturn => {
        if (isEmpty(billingArrayItems)) {
            return {
                isError: true,
                errorMessage: tOrder("message.error.requiredSection"),
            };
        }

        return {
            isError: false,
            errorMessage: null,
        };
    };

    const getBillingItemArrayTableErrorMessage = (
        billingErrorMessage: string | null,
        errors: FieldErrors<CustomBillingOrderFormValue>
    ): string | null => {
        if (billingErrorMessage) {
            return billingErrorMessage;
        }

        if (errors.billingFieldArrayItem) {
            const hasPriceFieldArrayItemError = errors.billingFieldArrayItem.some(
                (billingField) => billingField?.price?.type === "pattern"
            );
            if (hasPriceFieldArrayItemError) return tOrder("message.error.incorrectFormatField");
            return t("ra.validation.requiredAll");
        }

        return null;
    };

    return {
        billingFieldArrayItem: {
            name: {
                required: true,
            },
            price: {
                required: true,
                pattern: /^-?\d+$/,
            },
        },
        billingItemArrayTable: {
            validate: validateBillingItemArrayTable,
            getErrorMessage: getBillingItemArrayTableErrorMessage,
        },
    };
};

export default useCustomBillingOrderValidationRules;
