import { Features } from "src/common/constants/enum";

import useFeatureToggle from "../useFeatureToggle";

export const useManageInvoiceFeatureFlag = () =>
    useFeatureToggle(Features.MANAGE_INVOICE).isEnabled;

export const useManagePaymentValidationFeatureFlag = () =>
    useFeatureToggle(Features.MANAGE_PAYMENT_VALIDATION).isEnabled;

export const useScheduledInvoicesFeatureFlag = () =>
    useFeatureToggle(Features.SCHEDULED_INVOICES).isEnabled;

export const useBulkIssueInvoiceFeatureFlag = () =>
    useFeatureToggle(Features.BULK_ISSUE_INVOICE).isEnabled;
