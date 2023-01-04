import { Entities, ProviderTypes } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { TypeEntity } from "src/typings/react-admin";

import { BreadCrumb, genBreadcrumbVariables, fetchBreadcrumbHelper } from "../useBreadcrumb";

jest.mock("src/app/essentials", () => {
    const { Entities } = jest.requireActual("src/common/constants/enum");
    const dataProvider = (_: ProviderTypes, resource: TypeEntity) => {
        switch (resource) {
            case Entities.BOOKS:
                return {
                    data: {
                        id: "id",
                        book_id: "id",
                        name: "bookName",
                    },
                };
            case Entities.CHAPTERS:
                return {
                    data: {
                        id: "id",
                        chapter_id: "id",
                        name: "chapterName",
                    },
                };
            case Entities.TOPICS:
                return {
                    data: {
                        id: "id",
                        topic_id: "id",
                        name: "topicName",
                    },
                };
            default:
                break;
        }
    };
    return {
        dataProvider,
    };
});

describe(genBreadcrumbVariables.name, () => {
    const search = "?bookId=BOOK_ID&chapterId=CHAPTER_ID&parentId=PARENT_ID";
    const breadcrumbs: BreadCrumb[] = genBreadcrumbVariables(search, Entities.LOS);

    it("should generator breadcrumbs from search query", () => {
        // The first path is books/:id
        expect(breadcrumbs[0].path).toEqual("books");
        expect(breadcrumbs[0].id).toEqual("BOOK_ID");

        // The second path also is books/:id (chapter list - book detail is same the level)
        expect(breadcrumbs[1].path).toEqual("books");
        // The resource is endpoint
        expect(breadcrumbs[1].resource).toEqual("chapters");
        // The id to get chapter name
        expect(breadcrumbs[1].id).toEqual("CHAPTER_ID");
        // The rootId will override id on the url
        expect(breadcrumbs[1].rootId).toEqual("BOOK_ID");

        // The third path is LO will have search params
        expect(breadcrumbs[2].id).toEqual("PARENT_ID");
        expect(breadcrumbs[2].resource).toEqual("topics");
    });

    it("should gen information for breadcrumb with call endpoint", async () => {
        // The case for key translate without call API to get breadcrumb name
        const courseBreadcrumb = await fetchBreadcrumbHelper({
            resource: Entities.COURSES,
            translateKey: "keyTranslate",
            path: Entities.COURSES,
            search: {},
            basename: MicroFrontendTypes.SYLLABUS,
            dataProvider: () =>
                new Promise((resolve) =>
                    resolve({
                        data: {
                            name: "bookName",
                        },
                    })
                ),
        });
        expect(courseBreadcrumb).toEqual({
            translateKey: "keyTranslate",
            url: "/syllabus/courses?",
            name: "",
        });

        // The case for get breadcrumb name from API
        const bookBreadcrumb = await fetchBreadcrumbHelper({
            resource: Entities.BOOKS,
            id: "id",
            basename: MicroFrontendTypes.SYLLABUS,
            path: Entities.BOOKS,
            search: {},
            dataProvider: () =>
                new Promise((resolve) =>
                    resolve({
                        data: {
                            name: "bookName",
                        },
                    })
                ),
        });
        expect(bookBreadcrumb).toEqual({ url: "/syllabus/books/id/show?", name: "bookName" });
    });
});
