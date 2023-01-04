import { useLocation } from "react-router";
import { SearchEngine } from "src/common/constants/enum";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useBreadcrumbLOs from "../useBreadcrumbLOs";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        ...actual,
        useLocation: jest.fn(),
    };
});

const bookId = "bookId_01";
const chapterId = "chapterId_01";
const topicId = "topicId_01";

interface LOsSearchParams {
    [SearchEngine.BOOK_ID]: string;
    [SearchEngine.CHAPTER_ID]: string;
    [SearchEngine.TOPIC_ID]: string;
}

const createLOsSearch = ({ bookId, chapterId, topicId }: LOsSearchParams) =>
    `${SearchEngine.BOOK_ID}=${bookId}&${SearchEngine.CHAPTER_ID}=${chapterId}&${SearchEngine.TOPIC_ID}=${topicId}`;

describe(useBreadcrumbLOs.name, () => {
    const inferQueryBookFn = jest.fn();
    const inferQueryChapterFn = jest.fn();
    const inferQueryTopicFn = jest.fn();

    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(
            ({ entity }: Parameters<typeof inferQuery>[0]) => {
                switch (entity) {
                    case "book":
                        return inferQueryBookFn;
                    case "chapter":
                        return inferQueryChapterFn;
                    case "topic":
                        return inferQueryTopicFn;
                    default:
                        throw new Error("Please catch the other queries");
                }
            }
        );
    });
    it("should return correct breadcrumbs for LOs", () => {
        (useLocation as jest.Mock).mockReturnValue({
            search: createLOsSearch({ bookId, chapterId, topicId }),
        });

        inferQueryBookFn.mockReturnValue({
            data: { name: "BookName" },
        });

        inferQueryChapterFn.mockReturnValue({
            data: { name: "ChapterName" },
        });

        inferQueryTopicFn.mockReturnValue({
            data: { name: "TopicName" },
        });

        const { result } = renderHook(useBreadcrumbLOs);

        const expectBookDetailPath = `/syllabus/books/${bookId}/show`;

        expect(result.current.breadcrumbInfos).toEqual([
            { name: "BookName", translateKey: "resources.books.name", url: expectBookDetailPath },
            {
                name: "ChapterName",
                translateKey: "resources.chapters.name",
                url: expectBookDetailPath,
            },
            { name: "TopicName", translateKey: "resources.topics.name", url: expectBookDetailPath },
        ]);
    });
});
