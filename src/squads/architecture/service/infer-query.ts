import { masterReaderService } from "src/squads/architecture/service/bob/master-reader-service/master-reader-service";

import {
    composeServices,
    createUseQuery,
    createUseQueryPagination,
    createUseQueryWithGRPCPagination,
} from "@manabie-com/react-utils";

// compose all services into service map
export const rootService = composeServices({
    masterReader: masterReaderService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryWithGRPCPagination = createUseQueryWithGRPCPagination(rootService);
