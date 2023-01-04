import { ElementType } from "react";

import { Features } from "src/common/constants/enum";
import { IPageResourceProperties } from "src/squads/syllabus/internals/permission";
import { TypeEntity } from "src/squads/syllabus/typings/react-admin";

export enum ResourceActions {
    CREATE = "create",
    EDIT = "edit",
    LIST = "list",
    SHOW = "show",
}

export type IAppResource = IPageResourceProperties & {
    key: TypeEntity;
    name: TypeEntity;
    feature?: Features;
    translateKey?: string;
    icon?: ElementType;
    activePaths?: TypeEntity[];
    basename?: string;
};
