import { QueryAggregateReturn } from "../typings/react-admin";
import { SimpleTopic } from "./topic";

export interface BookChapterHasura {
    book_id: string;
    chapter_id: string;
    chapter?: {
        display_order: number;
        topics: SimpleTopic[];
        topics_aggregate?: QueryAggregateReturn | undefined;
    };
}

export type SimpleBookChapter = Pick<BookChapterHasura, "book_id" | "chapter_id" | "chapter">;
