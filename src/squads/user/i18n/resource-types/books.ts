declare module NsBooks {
    export interface Dialog {
        addTitle: string;
        renameTitle: string;
        editTitle: string;
    }

    export interface RootObject {
        name: string;
        bookList: string;
        questionBank: string;
        assignments: string;
        topics: string;
        chapters: string;
        los: string;
        bookName: string;
        createTitle: string;
        chapter: string;
        noChapter: string;
        editTitle: string;
        addBook: string;
        noBook: string;
        dialog: Dialog;
    }
}

export interface Books extends NsBooks.RootObject {}
