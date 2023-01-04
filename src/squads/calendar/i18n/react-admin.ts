declare module NsReactAdmin {
    export interface Action {
        cancel: string;
        save: string;
        search: string;
        close: string;
    }
    export interface Message {
        unableToLoadData: string;
    }

    export interface Boolean {
        true: string;
        false: string;
        null: string;
    }

    export interface ManabieError {
        invalid_params: string;
    }

    export interface Action2 {
        cancel: string;
        search: string;
        save: string;
        confirm: string;
        OK: string;
    }

    export interface Common {
        action: Action2;
        save: string;
        more: string;
    }

    export interface RootObject {
        action: Action;
        boolean: Boolean;
        "manabie-error": ManabieError;
        common: Common;
        message: Message;
    }
}
export interface ReactAdmin extends NsReactAdmin.RootObject {}
