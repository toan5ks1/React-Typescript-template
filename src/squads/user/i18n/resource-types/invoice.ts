declare module NsInvoice {
    export interface RootObject {
        name: string;
        title: string;
    }
}

export interface Invoice extends NsInvoice.RootObject {}
