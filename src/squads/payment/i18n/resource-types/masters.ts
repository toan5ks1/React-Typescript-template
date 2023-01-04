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

    export interface Choices {
        masterData: {
            grades: string;
            accountingCategory: string;
            location: string;
            locationType: string;
            billingSchedule: string;
            billingSchedulePeriod: string;
            discount: string;
            tax: string;
            package: string;
            material: string;
            fee: string;
            productGrade: string;
            productCourse: string;
            productAccountingCategory: string;
            productLocation: string;
            productPrice: string;
            billingRatio: string;
            leavingReason: string;
            class: string;
            packageQuantityTypeMapping: string;
            packageCourseFee: string;
            packageCourseMaterial: string;
            schoolLevel: string;
            school: string;
            schoolCourse: string;
            schoolLevelGrade: string;
            userTag: string;
            bank: string;
            bankBranch: string;
            timesheetConfig: string;
            invoiceSchedule: string;
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
        status: Status;
        message: Message;
        choices: Choices;
    }
}

export interface Masters extends NsMaster.RootObject {}
