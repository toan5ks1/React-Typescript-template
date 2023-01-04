import { ProviderTypes } from "src/common/constants/enum";
import { GrpcOptions } from "src/internals/grpc";
import Configuration from "src/packages/configuration";
import { GraphqlBody } from "src/squads/timesheet/typings/graphql";
import { TypeEntity } from "src/squads/timesheet/typings/react-admin";

import { HasuraAndDefaultResponse } from "../internals/hasura-client/execute-query";

import { Order_By } from "src/squads/timesheet/__generated__/bob/root-types";

type AllMethodOf<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type Callable<T> = T extends (...args: any[]) => any
    ? (...args: Parameters<T>) => ReturnType<T>
    : never;

type HasProperty<T> = {
    [K in keyof T]: (...args: any[]) => any;
};

interface Constructable<T> {
    new (...args: any): HasProperty<T>;
}

export class InheritedGrpcServiceClient<T> {
    private configs: Configuration;
    private options: GrpcOptions;
    private UnInitializedClient: Constructable<T>;
    private previousUrl: string;
    private client: HasProperty<T>;

    constructor(client: Constructable<T>, configs: Configuration, options: GrpcOptions) {
        const baseURL = configs.getEndpoints().gRPC;

        this.UnInitializedClient = client;
        this.configs = configs;
        this.options = options;
        this.previousUrl = baseURL;

        this.client = new client(baseURL, {}, options);
    }

    _call<Method extends AllMethodOf<T>>(
        methodName: Method,
        ...parameters: Parameters<Callable<T[Method]>>
    ): ReturnType<Callable<T[Method]>> {
        const baseUrl = this.configs.getEndpoints().gRPC;

        if (baseUrl !== this.previousUrl) {
            this.client = new this.UnInitializedClient(baseUrl, {}, this.options);
            this.previousUrl = baseUrl;
        }

        return this.client[methodName](...parameters);
    }
}

export class InheritedHasuraServiceClient {
    protected configs: Configuration;
    protected serviceName: "bobGraphQL" | "eurekaGraphQL" | "fatimaGraphQL" | "timesheetGraphQL";
    protected previousUrl: string;

    protected doQuery: <T>(
        body: GraphqlBody,
        urlEndpoint: string
    ) => Promise<HasuraAndDefaultResponse<T>>;

    constructor(
        configs: Configuration,
        serviceName: "bobGraphQL" | "eurekaGraphQL" | "fatimaGraphQL" | "timesheetGraphQL",
        doQueryFnc: <T>(
            body: GraphqlBody,
            urlEndpoint: string
        ) => Promise<HasuraAndDefaultResponse<T>>
    ) {
        const hasuraUrl = configs.getEndpoints()[serviceName];

        this.configs = configs;
        this.serviceName = serviceName;
        this.doQuery = doQueryFnc;

        this.previousUrl = hasuraUrl;
    }

    _call<T>(body: GraphqlBody): Promise<HasuraAndDefaultResponse<T>> {
        const hasuraUrl = this.configs.getEndpoints()[this.serviceName];

        if (hasuraUrl !== this.previousUrl) {
            this.previousUrl = hasuraUrl;
        }

        return this.doQuery<T>(body, this.previousUrl);
    }
}

export interface GqlSort {
    [x: string]: Order_By;
}
export interface ListQuery<Filter = any, Sort = any, Pagination = GqlPagination> {
    filter?: Filter;
    sort?: Sort;
    pagination?: Pagination;
}

export interface GqlPagination {
    limit: number;
    offset: number;
}

//TODO: will refactor to type safe later
export type IDataProvider<T = ProviderTypes> = (
    type: ProviderTypes,
    resource: TypeEntity,
    payload: any
) => GraphqlBody<T> | any;
