import { ElementType } from "react";

import { IPageResourceProperties } from "src/internals/permission";
import { TypeEntity } from "src/typings/react-admin";

import { Features } from "../common/constants/enum";

export enum ResourceActions {
    CREATE = "create",
    EDIT = "edit",
    LIST = "list",
    SHOW = "show",
}

export interface CommonRoutingProps {
    readonly basePath: string;
    readonly resource: TypeEntity;
}

export type IAppResource = IPageResourceProperties & {
    key: TypeEntity;
    name: TypeEntity;
    feature?: Features;
    translateKey?: string;
    target?: string;
    icon?: ElementType;
    activePaths?: TypeEntity[];
    fullscreen?: boolean;
    basename?: string;
    isDisableJPREP?: boolean;
};

export interface ISchoolConfig {
    country: string;
    created_at: string;
    plan_duration: string;
    plan_expired_at: string;
    plan_id: string;
    privileges: any[];
    school_id: number;
    updated_at: string;
}
