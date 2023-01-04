import { BookHasura } from "./book";
import { TopicHasura } from "./topic";

export interface ChapterHasura {
    id: string;
    chapter_id: string;
    name: string;
    school_id: number;
    display_order: number;
    created_at?: string;
    updated_at?: string;
    book_chapters?: {
        book: BookHasura;
    }[];
    topics?: TopicHasura[];
}
