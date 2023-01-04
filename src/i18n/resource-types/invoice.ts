declare module NsInvoice {
    export interface RootObject {
        name: string;
    }
}

export interface Invoice extends NsInvoice.RootObject {}
