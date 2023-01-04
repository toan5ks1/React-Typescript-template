import {
    InfiniteQueryObserverResult,
    QueryKey,
    UseQueryOptions as rqUseQueryOptions,
    UseQueryResult,
} from "react-query";
import { ProviderTypes } from "src/common/constants/enum";
import { TypeEntity } from "src/typings/react-admin";

export enum UseQueryOptions {
    RETRY_TIMES = 0,
    CACHE_TIME = 0,
    TIME_UNTIL_AUTO_REFETCH = 5 * 60 * 1000, // don't auto reload, auto fetch for 5 min after the query executed
}

export type ActionTypeForQuery =
    | ProviderTypes.ONE
    | ProviderTypes.LIST
    | ProviderTypes.MANY
    | ProviderTypes.TITLE
    | ProviderTypes.GET_TITLES
    | ProviderTypes.COUNT_STATUS
    | ProviderTypes.DISPLAY_ORDER
    | ProviderTypes.GET_USERNAMES
    | ProviderTypes.DOWNLOAD_BOOK
    | ProviderTypes.MANY_REFERENCE
    | ProviderTypes.LIST_WITH_FILTER
    | ProviderTypes.RETRIEVE_GRADE_MAP
    | ProviderTypes.DOWNLOAD_STUDY_PLAN
    | ProviderTypes.VALIDATE_EXTERNAL_ID
    | ProviderTypes.GET_STATUS_NOTIFICATION
    | ProviderTypes.COUNT_READ_OF_NOTIFICATIONS
    | ProviderTypes.GET_STUDENTS_WITH_SCHOOL
    | ProviderTypes.GET_GRADES_OF_STUDENTS
    | ProviderTypes.GET_BRIGHTCOVE_VIDEO_INFO
    | ProviderTypes.COUNT_SCHOOL_ADMINS
    | ProviderTypes.GET_PREVIOUS_LESSON_REPORT
    | ProviderTypes.RETRIEVE_PARTNER_DOMAIN
    | ProviderTypes.GET_ATTENDANCE_STATUS_AND_REMARK
    | ProviderTypes.PARTNER_DYNAMIC_FORM_FIELD_VALUES_WITH_LESSON_REPORT_DETAILS
    | ProviderTypes.ONE_LATEST
    | ProviderTypes.MANY_REFERENCE_WITHOUT_CALC
    | ProviderTypes.MANY_REFERENCE_WITH_LOCATION_WITHOUT_CALC
    | ProviderTypes.MANY_WITH_LOCATION;

export interface GraphqlPagination {
    limit?: number;
    offset?: number;
}

export interface LegacyGraphqlPagination {
    page?: number;
    perPage?: number;
}

export interface PayloadForQuery<Sort extends Record<any, any> = any> {
    filter?: Record<string, any>;
    sort?: Sort;
    pagination?: GraphqlPagination | LegacyGraphqlPagination;
}

export interface UseQueryBaseRequest<Sort extends Record<any, any> = any> {
    entity: TypeEntity;
    action: ActionTypeForQuery;
    params?: PayloadForQuery<Sort>;
}

export type ProviderResponse<T> = {
    data: T;
    total?: number;
};

export interface UseQueryBaseOptions<T = any, MappedType = T, IError = Error> {
    retry?: number;
    enabled?: boolean;
    cacheFor?: number; // ms to cache the result
    markDataAsStaleAfter?: number;
    rerenderOnChangeProps?: Array<keyof InfiniteQueryObserverResult>; // will only rerender when those props change, use with care

    selector?: rqUseQueryOptions<T, IError, MappedType>["select"]; // select/filter/transform to get data you want based on returned result
    onError?: rqUseQueryOptions<T, IError, MappedType>["onError"];
    onSuccess?: rqUseQueryOptions<T, IError, MappedType>["onSuccess"];
}

export type UseQueryBaseV2Return<T> = UseQueryResult<T, Error> & {
    queryKey: QueryKey | undefined;
};

export function getQueryKey<Order>(params: UseQueryBaseRequest<Order>) {
    return `${params.entity}_${params.action}`;
}
