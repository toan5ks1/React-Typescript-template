import { PaginationPayload, SortPayload } from "react-admin";
import {
    ERPModules,
    EurekaEntities,
    FatimaEntities,
    ProviderTypes,
    Entities,
} from "src/common/constants/enum";

import { TypeObject } from "./support-types";

export type TypeEntity = Entities | EurekaEntities | FatimaEntities | ERPModules;

export interface UseQueryReturn<T = any> {
    data: T;
    loading: boolean;
    loaded: boolean;
    total: number;
    error: Error | null;
}

export enum RaSortOrder {
    "asc" = "asc",
    "ASC" = "ASC",
    "desc" = "desc",
    "DESC" = "DESC",
}

export interface RaSort extends SortPayload {
    order: RaSortOrder;
}

export interface RaQueryPayload {
    [x: string]: any;
    sort?: SortPayload | RaSort | RaSort[];
    filter?: TypeObject;
    pagination?: PaginationPayload;
}

export interface RaQuery {
    resource: TypeEntity;
    type: ProviderTypes;
    payload: RaQueryPayload;
}
