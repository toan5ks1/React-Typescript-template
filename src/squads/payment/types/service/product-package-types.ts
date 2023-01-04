import { Payment_GetPackageByProductIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { PackageType } from "manabuf/payment/v1/enums_pb";

export interface ProductPackageType
    extends Omit<ArrayElement<Payment_GetPackageByProductIdQuery["package"]>, "package_type"> {
    package_type: keyof typeof PackageType;
}
