
import type { ManaEventEmitter } from "@manabie-com/mana-utils";
import type { IEvents as _IEvents } from "./src/squads/root/src/internals/mana-event-emitter/mana-event-emitter-types"
import type { IManaSidebar as _IManaSidebar, ISidebarItem as _ISidebarItem, ManaSidebarFnType as _ManaSidebarFnType } from "./src/squads/architecture/internals/sidebar/sidebar-types";


declare global {
    interface IEvents extends _IEvents {}
    interface ISidebarItem extends _ISidebarItem {}
    interface IManaSidebar extends _IManaSidebar {}
    type ManaSidebarFnType = _ManaSidebarFnType
    interface Window {
        __MANA__: {
            getManaEventEmitter: () => ManaEventEmitter<IEvents>;
            getManaSidebar: ManaSidebarFnType
        };
       
    }
    
}


export default global;
