import { useMemo } from "react";

import { useLocation } from "react-router";
import { Entities, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { genBreadcrumbVariables, MapperBreadCrumbParams, UseBreadcrumbReturn } from "../common";

const mapper: MapperBreadCrumbParams<"book" | "chapter" | "topic"> = {
    book: {
        resource: Entities.BOOKS,
        query: SearchEngine.BOOK_ID,
        basename: MicroFrontendTypes.SYLLABUS,
    },
    chapter: {
        resource: Entities.CHAPTERS,
        query: SearchEngine.CHAPTER_ID,
        rootResource: Entities.BOOKS,
        rootId: SearchEngine.BOOK_ID,
        basename: MicroFrontendTypes.SYLLABUS,
    },
    topic: {
        resource: Entities.TOPICS,
        rootResource: Entities.BOOKS,
        rootId: SearchEngine.BOOK_ID,
        query: SearchEngine.PARENT_ID,
        basename: MicroFrontendTypes.SYLLABUS,
    },
};

export interface UseBreadCrumbLOsReturn extends UseBreadcrumbReturn {}

export const useBreadCrumbLOs = (): UseBreadCrumbLOsReturn => {
    const { search } = useLocation();

    const breadcrumbs = useMemo(() => {
        return genBreadcrumbVariables(search, mapper);
    }, [search]);

    const { data: dataBook, isLoading: isLoadingBook } = inferQuery({
        entity: "book",
        action: "syllabusBookGetTitle",
    })(
        {
            book_id: breadcrumbs.book.id || "",
        },
        {
            enabled: Boolean(breadcrumbs.book.id),
        }
    );

    const { data: dataChapter, isLoading: isLoadingChapter } = inferQuery({
        entity: "chapter",
        action: "syllabusChapterGetTitle",
    })(
        {
            chapter_id: breadcrumbs.chapter.id || "",
        },
        {
            enabled: Boolean(breadcrumbs.chapter.id),
        }
    );

    const { data: dataTopic, isLoading: isLoadingTopic } = inferQuery({
        entity: "topic",
        action: "syllabusTopicGetTitle",
    })(
        {
            topic_id: breadcrumbs.topic.id || "",
        },
        {
            enabled: Boolean(breadcrumbs.topic.id),
        }
    );
    const bookId = breadcrumbs.book.id;

    const bookDetailUrl = `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${bookId}/show`;

    return {
        loading: isLoadingBook || isLoadingChapter || isLoadingTopic,
        breadcrumbInfos: [
            {
                name: dataBook?.name,
                translateKey: "resources.books.name",
                url: bookDetailUrl,
            },
            {
                name: dataChapter?.name,
                translateKey: "resources.chapters.name",
                url: bookDetailUrl,
            },
            {
                name: dataTopic?.name,
                translateKey: "resources.topics.name",
                url: bookDetailUrl,
            },
        ],
    };
};

export default useBreadCrumbLOs;
