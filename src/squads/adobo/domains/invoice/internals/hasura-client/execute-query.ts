import graphqlClient from "src/squads/adobo/domains/entry-exit/internals/hasura-client";
import {
    HasuraError,
    HasuraErrorOptions,
} from "src/squads/adobo/domains/entry-exit/internals/hasura-client/errors";
import reactiveStorage from "src/squads/adobo/domains/invoice/internals/reactive-storage";
import { GraphqlBody } from "src/typings/graphql";

interface HasuraErrorReturn {
    message: string;
    extensions: {
        path: string;
        code: string;
    };
}

export interface HasuraResponse<T> {
    data: T | null;
    error?: HasuraError;
    errors?: HasuraErrorReturn[];
    code?: HasuraErrorOptions["code"];
}

export type HasuraAndDefaultResponse<T> = HasuraResponse<T>;

function getEmptyResponse() {
    return Promise.resolve({
        data: null,
    });
}

export async function doQuery<T>(
    body: GraphqlBody,
    urlEndpoint: string
): Promise<HasuraAndDefaultResponse<T>> {
    const user = reactiveStorage.get("PROFILE");

    if (!user) {
        return getEmptyResponse();
    }

    return graphqlClient.request({
        body,
        url: `${urlEndpoint}/v1/graphql`,
    });
}
