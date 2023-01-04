import { Entities, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import { genBreadcrumbVariables, MapperBreadCrumbParams } from "../common";

describe(genBreadcrumbVariables.name, () => {
    it("should return correct ID and resource base on the mapper params", () => {
        const bookId = "bookId01";
        const mapper: MapperBreadCrumbParams<"book"> = {
            book: {
                basename: MicroFrontendTypes.SYLLABUS,
                query: SearchEngine.BOOK_ID,
                resource: Entities.BOOKS,
            },
        };

        const search = `${SearchEngine.BOOK_ID}=${bookId}`;
        expect(genBreadcrumbVariables(search, mapper)).toEqual({
            book: {
                id: bookId,
                resource: Entities.BOOKS,
            },
        });
    });
});
