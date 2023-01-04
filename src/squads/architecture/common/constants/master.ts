// Cloned from src/squads/payment/constants/master.ts
// TODO: Consider remove this file and move everything to Payment later

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
enum UserSchoolGroupCategory {
    SchoolLevel = "schoolLevel",
    School = "school",
    SchoolCourse = "schoolCourse",
    SchoolLevelGrade = "schoolLevelGrade",
}

enum UserTagGroupCategory {
    StudentTag = "studentTag",
    ParentTag = "parentTag",
}

enum UserBankGroupCategory {
    Bank = "bank",
    BankBranch = "bankBranch",
}

enum UserTimesheetGroupCategory {
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

export type MasterCategoryType =
    | OrderManagementCategory
    | UserSchoolGroupCategory
    | UserTagGroupCategory
    | UserBankGroupCategory
    | UserTimesheetGroupCategory
    | ArchitectureReserveCategory
    | ArchitectureCategory;
