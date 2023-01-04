import {
    OrderManagementCategory,
    ArchitectureCategory,
    ArchitectureReserveCategory,
    UserSchoolGroupCategory,
    UserTagGroupCategory,
    UserBankGroupCategory,
    TimesheetCategory,
} from "src/squads/payment/constants/master";
import { getEmptyResponse } from "src/squads/payment/service/utils/utils";

import { defineService } from "@manabie-com/react-utils";
import bankMutationService from "src/squads/payment/service/bob/bank-bob-service/bank-bob.mutation";
import bankBranchMutationService from "src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-bob.mutation";
import schoolCourseMutationService from "src/squads/payment/service/bob/school-course-bob-service/school-course-bob.mutation";
import schoolInfoMutationService from "src/squads/payment/service/bob/school-info-bob-service/school-info-bob.mutation";
import schoolLevelMutationService from "src/squads/payment/service/bob/school-level-bob-service/school-level-bob.mutation";
import schoolLevelGradeMutationService from "src/squads/payment/service/bob/school-level-grade-bob-service/school-level-grade-bob.mutation";
import userTagMutationService from "src/squads/payment/service/bob/user-tag-bob-service/user-tag-bob.mutation";
import classModifierMutationService from "src/squads/payment/service/mastermgmt/class-service/class-management-modifier.mutation";
import gradeImportModifierMutationService from "src/squads/payment/service/mastermgmt/grade-service/grade-import-mastermgmt-modifier.mutation";
import locationsModifierMutationService from "src/squads/payment/service/mastermgmt/locations-service/locations-management-modifier.mutation";
import masterImportModifierMutationService from "src/squads/payment/service/payment/master-import-payment-service/master-import-payment-modifier.mutation";
import timesheetConfigMutationService from "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/timesheet-config-timesheet.mutation";

export const masterImportPaymentService = defineService({
    mutation: {
        paymentImportMasterData: (
            data: Parameters<typeof masterImportModifierMutationService.importFile>[0]
        ) => {
            const {
                payload: { category },
            } = data;

            switch (category) {
                case OrderManagementCategory.AccountingCategory:
                case OrderManagementCategory.BillingSchedule:
                case OrderManagementCategory.BillingSchedulePeriod:
                case OrderManagementCategory.Discount:
                case OrderManagementCategory.Tax:
                case OrderManagementCategory.Package:
                case OrderManagementCategory.Fee:
                case OrderManagementCategory.Material:
                case OrderManagementCategory.ProductAccountingCategory:
                case OrderManagementCategory.ProductCourse:
                case OrderManagementCategory.ProductGrade:
                case OrderManagementCategory.ProductLocation:
                case OrderManagementCategory.ProductPrice:
                case OrderManagementCategory.BillingRatio:
                case OrderManagementCategory.LeavingReason:
                case OrderManagementCategory.PackageQuantityTypeMapping:
                case OrderManagementCategory.PackageCourseMaterial:
                case OrderManagementCategory.PackageCourseFee:
                    return masterImportModifierMutationService.importFile(data);

                case ArchitectureReserveCategory.Grade:
                    return gradeImportModifierMutationService.importFile(data);

                case ArchitectureCategory.Location:
                case ArchitectureCategory.LocationType:
                    return locationsModifierMutationService.importFile(data);

                case ArchitectureCategory.Class:
                    return classModifierMutationService.importClass(data.payload.file);

                case UserSchoolGroupCategory.School:
                    return schoolInfoMutationService.importSchoolInfos(data.payload.file);
                case UserSchoolGroupCategory.SchoolLevel:
                    return schoolLevelMutationService.importSchoolLevels(data.payload.file);
                case UserSchoolGroupCategory.SchoolCourse:
                    return schoolCourseMutationService.importSchoolCourses(data.payload.file);
                case UserSchoolGroupCategory.SchoolLevelGrade:
                    return schoolLevelGradeMutationService.importSchoolLevelGrades(
                        data.payload.file
                    );

                case UserTagGroupCategory.UserTag:
                    return userTagMutationService.importUserTags(data.payload.file);

                case UserBankGroupCategory.Bank:
                    return bankMutationService.importBanks(data.payload.file);
                case UserBankGroupCategory.BankBranch:
                    return bankBranchMutationService.importBankBranches(data.payload.file);

                case TimesheetCategory.TimesheetConfig:
                    return timesheetConfigMutationService.importTimesheetConfigs(data.payload.file);
                default:
                    return getEmptyResponse();
            }
        },
    },
});
