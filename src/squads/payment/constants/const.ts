import { convertEnumKeys } from "src/common/constants/helper";

import { UserGroup } from "manabie-bob/enum_pb";
import {
    DiscountAmountType,
    DiscountType,
    ProductType,
    PackageType,
    MaterialType,
    FeeType,
    TaxCategory,
    OrderType,
    OrderStatus,
    BillingStatus,
    OrderActionStatus,
    StudentProductStatus,
} from "manabuf/payment/v1/enums_pb";
import { StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

export const KeyDiscountTypes = convertEnumKeys(DiscountType);
export const KeyDiscountAmountTypes = convertEnumKeys(DiscountAmountType);

export const KeyOrderStatus = convertEnumKeys(OrderStatus);
export const KeyOrderTypes = convertEnumKeys(OrderType);

export const KeyProductTypes = convertEnumKeys(ProductType);
export const KeyProductPackageTypes = convertEnumKeys(PackageType);
export const KeyProductMaterialTypes = convertEnumKeys(MaterialType);
export const KeyProductFeeTypes = convertEnumKeys(FeeType);

export const KeyStudentEnrollmentStatusTypes = convertEnumKeys(StudentEnrollmentStatus);

export const KeyTaxCategoryTypes = convertEnumKeys(TaxCategory);

export const KeyBillingStatus = convertEnumKeys(BillingStatus);

export const KeyOrderActionStatus = convertEnumKeys(OrderActionStatus);

export const KeyStudentProductStatus = convertEnumKeys(StudentProductStatus);

export const ProductEntities = ["fee", "material", "packageEntity"] as const;

export enum ExtendedUserGroup {
    USER_GROUP_HQ_STAFF = 16,
    USER_GROUP_TEACHER_LEAD = 17,
    USER_GROUP_CENTRE_LEAD = 18,
    USER_GROUP_CENTRE_MANAGER = 19,
    USER_GROUP_CENTRE_STAFF = 20,
}

export const UserGroupUnion = Object.assign({}, UserGroup, ExtendedUserGroup);
