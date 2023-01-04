import { GrpcOptions } from "src/internals/grpc";
import Configuration from "src/packages/configuration";
import { safeStringify } from "src/squads/adobo/common/utils/other";
import { HasuraAndDefaultResponse } from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import { GraphqlBody } from "src/squads/adobo/domains/invoice/typings/graphql";

import { Order_By } from "src/squads/adobo/__generated__/bob/root-types";

export class InheritedHasuraServiceClient {
    protected appConfigs: Configuration;
    protected serviceName: "bobGraphQL" | "eurekaGraphQL" | "fatimaGraphQL" | "invoicemgmtGraphQL";
    protected baseURL: string;

    protected doQuery: <T>(
        body: GraphqlBody,
        urlEndpoint: string
    ) => Promise<HasuraAndDefaultResponse<T>>;

    constructor(
        appConfigs: Configuration,
        serviceName: "bobGraphQL" | "eurekaGraphQL" | "fatimaGraphQL" | "invoicemgmtGraphQL",
        doQueryFnc: <T>(
            body: GraphqlBody,
            urlEndpoint: string
        ) => Promise<HasuraAndDefaultResponse<T>>
    ) {
        this.appConfigs = appConfigs;
        this.serviceName = serviceName;
        this.doQuery = doQueryFnc;

        this.baseURL = this.appConfigs.getEndpoints()[this.serviceName];
    }

    _call<T>(body: GraphqlBody): Promise<HasuraAndDefaultResponse<T>> {
        return this.doQuery<T>(body, this.baseURL);
    }
}

export interface InvalidParamErrorProps {
    serviceName:
        | "bobGraphQL"
        | "eurekaGraphQL"
        | "fatimaGraphQL"
        | "yasuoGraphQL"
        | "masterGraphQL"
        | "invoicemgmtGraphQL";
    // only set fieldValueIfNotSensitive when it isn't user private info (check https://www.weber.edu/iso/sensitive-data.html)
    errors: { field: string; fieldValueIfNotSensitive?: any }[];
    action: string;
}

export interface ToStringFormat extends InvalidParamErrorProps {
    errorName: string;
}

export class InvalidParamError extends Error {
    name: string = "InvalidParamError";

    private readonly errors?: InvalidParamErrorProps["errors"];
    private readonly serviceName: InvalidParamErrorProps["serviceName"];
    private readonly action: InvalidParamErrorProps["action"];

    constructor({ serviceName, errors, action }: InvalidParamErrorProps) {
        super("ra.message.manabie-error.invalid_params");

        this.serviceName = serviceName;
        this.errors = errors;
        this.action = action;
    }

    toString() {
        const formatted: ToStringFormat = {
            errorName: this.name,
            serviceName: this.serviceName,
            errors: this.errors || [],
            action: this.action,
        };
        return safeStringify(formatted, 2);
    }
}

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

export type MutationLessonIndividualReportParams<T> = {
    data: T;
};

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

export interface MutationParams<T> {
    id?: string;
    data?: T;
}
