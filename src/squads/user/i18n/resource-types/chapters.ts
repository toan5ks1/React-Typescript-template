declare module NsChapters {
    export interface RootObject {
        name: string;
        editTitle: string;
        createTitle: string;
        addTitle: string;
        edit: string;
        chapterName: string;
        chapter: string;
        grade: string;
        subject: string;
        country: string;
        createdAt: string;
        system: string;
        topics: string;
    }
}

export interface Chapters extends NsChapters.RootObject {}
