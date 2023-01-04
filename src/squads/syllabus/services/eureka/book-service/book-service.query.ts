import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    Syllabus_BooksListV2Query,
    Syllabus_BooksListV2QueryVariables,
    BooksManyQuery,
    BooksManyQueryVariables,
    Syllabus_BooksManyReferenceQuery,
    Syllabus_BooksManyReferenceQueryVariables,
    BooksOneQuery,
    BooksOneQueryVariables,
    BooksTitleQuery,
    BooksTitleQueryVariables,
    Syllabus_BookOneQueryVariables,
    Syllabus_BookOneQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { InheritedHasuraServiceClient } from "src/squads/syllabus/services/service-types";
import { getSearchString } from "src/squads/syllabus/services/utils/utils";

const bookFragment = gql`
    fragment BookAttrs on books {
        book_id
        country
        name
        school_id
        subject
    }
`;

const getTitleQuery = gql`
    query BooksTitle($book_id: String!) {
        books(where: { book_id: { _eq: $book_id } }) {
            name
        }
    }
`;

const getOneQuery = gql`
    query BooksOne($book_id: String!) {
        books(where: { book_id: { _eq: $book_id } }) {
            ...BookAttrs
            book_chapters(order_by: { chapter: { display_order: desc } }) {
                chapter {
                    display_order
                }
                chapter_id
            }
        }
    }
    ${bookFragment}
`;

const getOneQueryV2 = gql`
    query Syllabus_BookOne($book_id: String!) {
        books(where: { book_id: { _eq: $book_id } }) {
            book_id
            name
            school_id
            book_type
            book_chapters(order_by: { chapter: { display_order: desc } }) {
                chapter {
                    display_order
                }
                chapter_id
            }
        }
    }
`;

const getManyQuery = gql`
    query BooksMany($book_id: [String!] = []) {
        books(where: { book_id: { _in: $book_id } }) {
            ...BookAttrs
        }
    }
    ${bookFragment}
`;

const getManyReferenceQuery = gql`
    query Syllabus_BooksManyReference(
        $name: String
        $limit: Int = 10
        $offset: Int = 0
        $type: String = "BOOK_TYPE_GENERAL"
    ) {
        books(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, name: asc, book_id: asc }
            where: { name: { _ilike: $name }, book_type: { _eq: $type } }
        ) {
            name
            book_id
        }
    }
`;

const getListQuery = gql`
    query Syllabus_BooksListV2(
        $name: String
        $limit: Int = 10
        $offset: Int = 0
        $type: String = "BOOK_TYPE_GENERAL"
    ) {
        books(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, name: asc, book_id: asc }
            where: { name: { _ilike: $name }, book_type: { _eq: $type } }
        ) {
            book_id
            name
        }
        books_aggregate(where: { name: { _ilike: $name }, book_type: { _eq: $type } }) {
            aggregate {
                count
            }
        }
    }
`;

class BookBobQuery extends InheritedHasuraServiceClient {
    async getTitle(
        variables: BooksTitleQueryVariables
    ): Promise<BooksTitleQuery["books"][0] | undefined> {
        const body = {
            query: getTitleQuery,
            variables,
        };

        const resp = await this._call<BooksTitleQuery>(body);

        return resp.data?.books[0];
    }

    async getOne(
        variables: BooksOneQueryVariables
    ): Promise<BooksOneQuery["books"][0] | undefined> {
        const body = {
            query: getOneQuery,
            variables,
        };

        const resp = await this._call<BooksOneQuery>(body);

        return resp.data?.books[0];
    }

    async getOneV2(
        variables: Syllabus_BookOneQueryVariables
    ): Promise<Syllabus_BookOneQuery["books"][0] | undefined> {
        const body = {
            query: getOneQueryV2,
            variables,
        };

        const resp = await this._call<Syllabus_BookOneQuery>(body);

        return resp.data?.books[0];
    }

    async getMany(
        variables: BooksManyQueryVariables
    ): Promise<BooksManyQuery["books"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<BooksManyQuery>(body);

        return resp.data?.books;
    }

    async getManyReference(
        variables: Syllabus_BooksManyReferenceQueryVariables
    ): Promise<Syllabus_BooksManyReferenceQuery["books"] | undefined> {
        const { name, limit, offset } = variables;

        const body = {
            query: getManyReferenceQuery,
            variables: {
                limit,
                offset,
                name: getSearchString(name),
            },
        };

        const resp = await this._call<Syllabus_BooksManyReferenceQuery>(body);

        return resp.data?.books;
    }

    async getList({
        name,
        type: _type,
        ...variables
    }: Syllabus_BooksListV2QueryVariables): Promise<
        DataWithTotal<Syllabus_BooksListV2Query["books"] | undefined>
    > {
        const body = {
            query: getListQuery,
            variables: {
                ...variables,
                name: getSearchString(name),
            },
        };
        const resp = await this._call<Syllabus_BooksListV2Query>(body);

        return {
            data: resp.data?.books,
            total: resp.data?.books_aggregate.aggregate?.count ?? 0,
        };
    }
}

const bookQueries = new BookBobQuery(appConfigs, "eurekaGraphQL", doQuery);

export default bookQueries;
