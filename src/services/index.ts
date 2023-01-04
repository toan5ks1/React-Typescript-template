import { EurekaEntities, FatimaEntities, ProviderTypes } from "../common/constants/enum";
import appConfigs from "../internals/configuration";
import graphqlClient from "../internals/hasura-client";
import reactiveStorage from "../internals/reactive-storage";
import { TypeEntity } from "../typings/react-admin";
import hasura from "./hasura";
import { getResponseConverter } from "./legacy-response-converter";
import { getEmptyResponse } from "./utils";

import { GraphqlBody } from "@manabie-com/graphql-client";

function chooseEndpoint(resourceParams: TypeEntity) {
    const { bobGraphQL, eurekaGraphQL, fatimaGraphQL } = appConfigs.getEndpoints();

    const resource = resourceParams.toUpperCase();

    if (resource in EurekaEntities) {
        return eurekaGraphQL;
    }

    if (resource in FatimaEntities) {
        return fatimaGraphQL;
    }

    return bobGraphQL;
}

async function doQuery(body: GraphqlBody, type: ProviderTypes, resource: TypeEntity) {
    let urlEndpoint = chooseEndpoint(resource);

    return graphqlClient.request({
        body,
        url: `${urlEndpoint}/v1/graphql`,
        transformer: getResponseConverter(type, resource),
    });
}

const getDataProvider = () => {
    //TODO: change resource: TypeEntity => keyof typeof hasura
    return async (type: ProviderTypes, resource: TypeEntity, payload: any) => {
        const user = reactiveStorage.get("PROFILE");
        if (!(resource in hasura)) {
            window.warner?.error("[Service routings]: service not found", resource);
            return getEmptyResponse();
        }

        // Expression produces a union type that is too complex to represent.ts(2590)
        const services = hasura[resource];
        const result = await services({
            type,
            payload,
            user,
        });

        if (!result) {
            return getEmptyResponse();
        }

        // GraphQL
        if ("query" in result) {
            return await doQuery(result, type, resource);
        }

        //gRPC should return with data object
        if (!("data" in result)) {
            window.warner?.log("[Service routings]: service not return data object", resource);
        }

        return result;
    };
};

export default getDataProvider;
