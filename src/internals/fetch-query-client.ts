import { ActionTypeForQuery, GraphqlPagination } from "src/hooks/data/data-types";
import StandaloneQueryClient, {
    FetchQueryBaseOptions,
} from "src/packages/standalone-query-client-legacy";
import { TypeEntity } from "src/typings/react-admin";

import dataProvider from "./data-provider";
import { queryClient } from "./query-client";
import warner from "./warner";

const standaloneQueryClient = new StandaloneQueryClient(queryClient, dataProvider, warner);

type FetchQueryBaseRequest<Sort extends Record<any, any> = any> = {
    entity: TypeEntity;
    action: ActionTypeForQuery;
    params?: {
        filter?: Record<string, any>;
        sort?: Sort;
        pagination?: GraphqlPagination;
    };
};

async function fetchQuery<T, Order extends Record<any, any> = any>(
    request: FetchQueryBaseRequest<Order>,
    options?: FetchQueryBaseOptions
) {
    const queryClientFetchQuery = await standaloneQueryClient.queryClientFetchQuery<
        T,
        TypeEntity,
        GraphqlPagination,
        Order
    >(request, options);

    return queryClientFetchQuery;
}

export default fetchQuery;
