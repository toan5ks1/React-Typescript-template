import {
    composeServices,
    createUseQuery,
    createUseMutation,
    createUseQueryPagination,
} from "./service-creator";
import studentEntryExitService from "./student-entry-exit-service";
import studentEntryExitServiceBob from "./student-entry-exit-service-bob";

// compose all services into service map
const rootService = composeServices({
    studentEntryExit: studentEntryExitService,
});

const rootServiceBob = composeServices({
    studentEntryExit: studentEntryExitServiceBob,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferMutation = createUseMutation(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryEntryExitMgmt = createUseQuery(rootService);

export const inferMutationEntryExitMgmt = createUseMutation(rootService);

export const inferQueryBob = createUseQuery(rootServiceBob);

export const inferMutationBob = createUseMutation(rootServiceBob);

export const inferQueryPaginationBob = createUseQueryPagination(rootServiceBob);
