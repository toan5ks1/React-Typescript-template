import { Entities, ERPModules, EurekaEntities, FatimaEntities } from "src/common/constants/enum";

export type TypeEntity = Entities | EurekaEntities | FatimaEntities | ERPModules;

export enum RaSortOrder {
    "asc" = "asc",
    "ASC" = "ASC",
    "desc" = "desc",
    "DESC" = "DESC",
}
