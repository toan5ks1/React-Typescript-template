import { ElementType } from "react";

export interface ISidebarItem {
    name: string;
    key: string;
    icon: ElementType;
    order: number;
    owner: string;
    to: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    isActive: (fullPath: string) => boolean;
}

export interface IManaSidebar {
    getAllItems: () => ISidebarItem[];
    registerSidebarItems: (items: ISidebarItem[]) => void;
    removeSidebarItems: (items: ISidebarItem[]) => void;
    onValueChanged: (listener: Callback) => void;
}

export type ManaSidebarFnType = () => IManaSidebar;

export type MapItemsType = Map<ISidebarItem["key"], ISidebarItem>;
export type MapOrderKeysType = Map<number, ISidebarItem["key"]>;

export type Callback = (val: ISidebarItem[]) => void;
