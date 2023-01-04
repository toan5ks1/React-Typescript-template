import { arrayHasItem } from "src/common/utils/other";

import { GetBasicProfileRequest } from "manabuf/usermgmt/v2/users_pb";

import { NsUsermgmtUserService } from "./types";

export function createGetBasicProfileRequest(data?: NsUsermgmtUserService.GetBasicProfileReq) {
    const req = new GetBasicProfileRequest();
    if (arrayHasItem(data?.userIdsList)) {
        req.setUserIdsList(data?.userIdsList!);
    }

    return req;
}
