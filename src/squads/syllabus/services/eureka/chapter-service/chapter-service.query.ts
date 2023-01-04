import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";

import { InheritedHasuraServiceClient } from "../../service-types";
import {
    ChaptersManyQuery,
    ChaptersManyQueryVariables,
    ChaptersTitleQuery,
    ChaptersTitleQueryVariables,
} from "../eureka-types";

const chapterFragment = gql`
    fragment ChapterAttrs on chapters {
        chapter_id
        name
        country
        school_id
        subject
        grade
        display_order
    }
`;

const getTitleQuery = gql`
    query ChaptersTitle($chapter_id: String!) {
        chapters(where: { chapter_id: { _eq: $chapter_id } }) {
            name
        }
    }
`;

const getManyQuery = gql`
    query ChaptersMany($chapter_ids: [String!] = []) {
        chapters(
            order_by: { display_order: asc, chapter_id: asc }
            where: { chapter_id: { _in: $chapter_ids } }
        ) {
            ...ChapterAttrs
        }
    }
    ${chapterFragment}
`;

class ChapterBobQuery extends InheritedHasuraServiceClient {
    async getTitle(
        variables: ChaptersTitleQueryVariables
    ): Promise<ChaptersTitleQuery["chapters"][0] | undefined> {
        const body = {
            query: getTitleQuery,
            variables,
        };

        const resp = await this._call<ChaptersTitleQuery>(body);

        return resp.data?.chapters[0];
    }

    async getMany(
        variables: ChaptersManyQueryVariables
    ): Promise<ChaptersManyQuery["chapters"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<ChaptersManyQuery>(body);

        return resp.data?.chapters;
    }
}

const chapterQueries = new ChapterBobQuery(appConfigs, "eurekaGraphQL", doQuery);

export default chapterQueries;
