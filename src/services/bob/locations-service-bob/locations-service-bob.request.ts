import { RetrieveLowestLevelLocationsRequest } from "manabuf/bob/v1/masterdata_pb";

import { NsBobLocationService } from "./types";

export function newRetrieveLowestLevelLocationsReq(
    params: NsBobLocationService.RetrieveLocationsRequest
): RetrieveLowestLevelLocationsRequest {
    const req = new RetrieveLowestLevelLocationsRequest();

    req.setName(params.name);
    req.setLimit(params.limit);
    req.setOffset(params.offset);

    return req;
}
