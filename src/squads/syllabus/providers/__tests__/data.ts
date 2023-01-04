import { BookTypeKeys } from "../../pages/Book/common/constants";
import { Syllabus_BookOneQuery } from "../../services/eureka/eureka-types";
import { CreateMockDataTest } from "../../test-utils/types";

export const createMockGetSyllabusBookOne: CreateMockDataTest<Syllabus_BookOneQuery["books"][0]> = (
    override = {}
) => {
    return {
        book_id: "sample book_id",
        name: "sample name",
        school_id: 0,
        book_type: BookTypeKeys.BOOK_TYPE_GENERAL,
        book_chapters: [
            {
                chapter_id: "sample chapter_id",
            },
        ],
        ...override,
    };
};
