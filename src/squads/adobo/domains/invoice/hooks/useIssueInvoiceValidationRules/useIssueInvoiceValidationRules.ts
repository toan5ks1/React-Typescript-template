import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { dateIsSameOrAfter, dateIsAfter } from "src/common/utils/time";
import { FormIssueInvoiceValues } from "src/squads/adobo/domains/invoice/common/types/invoice";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useTranslate from "src/squads/adobo/domains/invoice/hooks/useTranslate";

export interface UseIssueInvoiceValidationRulesReturn {
    required: {
        value: boolean;
        message: string;
    };
    validate: {
        dueDate: (dueDate: Date) => string | undefined;
        expiryDate: (expiryDate: Date) => string | undefined;
    };
}

const useIssueInvoiceValidationRules = (): UseIssueInvoiceValidationRulesReturn => {
    const t = useTranslate();
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    const { getValues, clearErrors } = useFormContext<FormIssueInvoiceValues>();

    return {
        required: {
            value: true,
            message: t("resources.input.error.required"),
        },
        validate: {
            dueDate: (dueDate: Date) => {
                const expiryDateFormValue = getValues("expiryDate") as Date;

                if (!dateIsSameOrAfter(expiryDateFormValue, dueDate) && expiryDateFormValue) {
                    clearErrors("expiryDate");
                    return tInvoice("validations.dueDateAfterExpiryDate");
                }

                clearErrors("dueDate");
            },
            expiryDate: (expiryDate: Date) => {
                const dueDateFormValue = getValues("dueDate") as Date;

                if (dateIsAfter(dueDateFormValue, expiryDate) && dueDateFormValue) {
                    clearErrors("dueDate");
                    return tInvoice("validations.dueDateAfterExpiryDate");
                }

                clearErrors("expiryDate");
            },
        },
    };
};

export default useIssueInvoiceValidationRules;
