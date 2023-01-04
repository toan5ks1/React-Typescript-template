declare module NsChapters {
    export interface RootObject {
        name: string;
        addTitle: string;
        chapterName: string;
        chapter: string;
    }
}

export interface Chapters extends NsChapters.RootObject {}
