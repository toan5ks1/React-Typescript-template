import graphqlClient from "src/squads/architecture/internals/hasura-client";
import {
    HasuraError,
    HasuraErrorOptions,
} from "src/squads/architecture/internals/hasura-client/errors";
import reactiveStorage from "src/squads/architecture/internals/reactive-storage";
import { createEmptyResponse } from "src/squads/architecture/service/utils/utils";

import { GraphqlBody } from "@manabie-com/graphql-client";

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
    return createEmptyResponse({
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
