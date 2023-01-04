import {
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetMaterialByProductIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MaterialType } from "manabuf/payment/v1/enums_pb";

export interface ProductMaterialType
    extends Omit<ArrayElement<Payment_GetMaterialByProductIdQuery["material"]>, "material_type"> {
    material_type: keyof typeof MaterialType;
}

export interface OrderDetailProductListMaterialType
    extends Omit<
        ArrayElement<Payment_GetManyMaterialsByProductIdsV2Query["material"]>,
        "material_type"
    > {
    material_type: keyof typeof MaterialType;
}
