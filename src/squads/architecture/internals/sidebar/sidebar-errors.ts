import { safeStringify } from "../../common/utils/other";
import { ISidebarItem } from "./sidebar-types";

export class SidebarItemError extends Error {
    name = "SidebarItemError";
    message: string;
    item: Partial<ISidebarItem>;

    constructor(message: string, item: Partial<ISidebarItem>) {
        const { key, name, order, owner } = item;
        super(`${message}. ${JSON.stringify({ key, name, order, owner })}`);
        this.message = message;
        this.item = item;

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toString = () => {
        const errorObj = {
            message: this.message,
            item: this.item,
            name: this.name,
        };

        return safeStringify(errorObj);
    };
}
