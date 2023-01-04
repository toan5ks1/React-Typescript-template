declare module NsMaster {
    export interface Title {
        import: string;
    }
    export interface Button {
        import: string;
    }

    export interface Placeholder {
        masterData: string;
    }

    export interface Choice {
        masterData: {
            accountingCategory: string;
            grades: string;
            location: string;
            locationType: string;
        };
    }
    export interface Status {
        fileConverting: string;
        fileUploading: string;
    }
    export interface Message {
        importedSuccess: string;
        importedFailure: string;
    }
    export interface RootObject {
        name: string;
        title: Title;
        button: Button;
        placeholder: Placeholder;
        choice: Choice;
        status: Status;
        message: Message;
    }
}

export interface Masters extends NsMaster.RootObject {}
