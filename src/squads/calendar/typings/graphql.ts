import { DocumentNode } from "graphql";

export interface GraphqlBody<T = Record<string, any>> {
    query: DocumentNode;
    operationName?: string;
    variables?: T;
}
