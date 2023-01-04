declare module NsBooks {
    export interface Dialog {
        addTitle: string;
        renameTitle: string;
        editTitle: string;
    }

    export interface RootObject {
        name: string;
        bookList: string;
        bookName: string;
        editTitle: string;
        addBook: string;
        dialog: Dialog;
    }
}

export interface Books extends NsBooks.RootObject {}
