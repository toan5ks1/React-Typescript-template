export enum OrderManagementFeatures {
    // --- micro frontend
    MICRO_FRONTEND_MANA_EVENTEMITTER = "PlatformPurple_MicroFrontend_ManaEventEmitter",

    //  --- Order Management
    PAYMENT_CUSTOM_BILLING_ORDER_UPSERT = "Payment_OrderManagement_BackOffice_CreateCustomBilling",
    PAYMENT_MASTER_MANAGEMENT_MENU_ITEM = "Payment_MasterManagement_BackOffice_MasterData",
    PAYMENT_MASTER_MANAGEMENT_IMPORT_SELECTIONS = "Payment_MasterManagement_BackOffice_MasterDataImportsSelections",
    PAYMENT_ORDER_MANAGEMENT_UPSERT = "Payment_OrderManagement_BackOffice_CreateOrder",
    PAYMENT_ENROLLMENT_ORDER_UPSERT = "Payment_OrderManagement_BackOffice_CreateEnrollment",
    PAYMENT_UPDATE_ORDER_UPSERT = "Payment_OrderManagement_BackOffice_UpdateOrder",
    PAYMENT_ORDER_MANAGEMENT = "Payment_OrderManagement_BackOffice_OrderList",
    PAYMENT_ORDER_MANAGEMENT_STUDENT_BILLING = "Payment_OrderManagement_BackOffice_BillingTab",
    PAYMENT_ORDER_MANAGEMENT_BULK_ORDER = "Payment_OrderManagement_BackOffice_BulkOrder",
    PAYMENT_ORDER_MANAGEMENT_VOID_ORDER = "Payment_OrderManagement_BackOffice_VoidOrder",
}

// --- User - Master Management
export enum UserFeatures {
    USER_MASTER_MANAGEMENT_SCHOOL_GROUP = "User_MasterManagement_BackOffice_School_Group",
    USER_MASTER_MANAGEMENT_TAG_GROUP = "User_MasterManagement_BackOffice_Tag_Group",
    USER_MASTER_MANAGEMENT_BANK_GROUP = "User_MasterManagement_BackOffice_Bank_Group",
}

// --- Timesheet - Master Management
export enum TimesheetFeatures {
    TIMESHEET_MASTER_MANAGEMENT_MASTER_DATA = "User_MasterManagement_BackOffice_Timesheet_Group",
}

// --- Architecture
export enum ArchitectureFeatures {
    ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA = "Architecture_MasterManagement_BackOffice_MasterData",
    ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA_RESERVE = "Architecture_MasterManagement_BackOffice_MasterData_Reserve",
}

// --- Invoice
export enum InvoiceFeatures {
    SCHEDULED_INVOICES = "Invoice_InvoiceManagement_BackOffice_ScheduledInvoices",
}

export const PaymentFeatures = {
    ...OrderManagementFeatures,
    ...UserFeatures,
    ...ArchitectureFeatures,
    ...TimesheetFeatures,
    ...InvoiceFeatures,
};
export type PaymentFeaturesType =
    | OrderManagementFeatures
    | UserFeatures
    | ArchitectureFeatures
    | TimesheetFeatures
    | InvoiceFeatures;
