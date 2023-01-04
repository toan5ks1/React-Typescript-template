// Payment
export enum OrderManagementCategory {
    Discount = "discount",
    Fee = "fee",
    LeavingReason = "leavingReason",
    Material = "material",
    Package = "package",
    PackageCourseMaterial = "packageCourseMaterial",
    PackageCourseFee = "packageCourseFee",
    PackageQuantityTypeMapping = "packageQuantityTypeMapping",
    ProductAccountingCategory = "productAccountingCategory",
    ProductCourse = "productCourse",
    ProductGrade = "productGrade",
    ProductLocation = "productLocation",
    ProductPrice = "productPrice",
    Tax = "tax",
    AccountingCategory = "accountingCategory",
    BillingRatio = "billingRatio",
    BillingSchedule = "billingSchedule",
    BillingSchedulePeriod = "billingSchedulePeriod",
}

// User
export enum UserSchoolGroupCategory {
    SchoolLevel = "schoolLevel",
    School = "school",
    SchoolCourse = "schoolCourse",
    SchoolLevelGrade = "schoolLevelGrade",
}

export enum UserTagGroupCategory {
    UserTag = "userTag",
}

export enum UserBankGroupCategory {
    Bank = "bank",
    BankBranch = "bankBranch",
}

export enum TimesheetCategory {
    TimesheetConfig = "timesheetConfig",
}

// Architecture
export enum ArchitectureReserveCategory {
    Grade = "grades",
}
export enum ArchitectureCategory {
    Class = "class",
    Location = "location",
    LocationType = "locationType",
}

// Invoice
export enum InvoiceCategory {
    InvoiceSchedule = "invoiceSchedule",
}

export type MasterCategoryType =
    | OrderManagementCategory
    | UserSchoolGroupCategory
    | UserTagGroupCategory
    | UserBankGroupCategory
    | TimesheetCategory
    | ArchitectureReserveCategory
    | ArchitectureCategory
    | InvoiceCategory;
