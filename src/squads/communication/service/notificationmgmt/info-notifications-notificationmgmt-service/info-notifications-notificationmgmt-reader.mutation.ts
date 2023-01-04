import { toTimestampOriginDate } from "src/common/utils/timezone";
import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import { toBasicPagingProto } from "src/squads/communication/common/utils/utils";
import { InheritedGrpcServiceClient } from "src/squads/communication/service/service-types";

import { NotificationReaderServicePromiseClient } from "manabuf/notificationmgmt/v1/notifications_grpc_web_pb";
import { GetNotificationsByFilterRequest } from "manabuf/notificationmgmt/v1/notifications_pb";

export function newGetNotificationsByFilter(
    data: GetNotificationsByFilterRequest.AsObject
): GetNotificationsByFilterRequest {
    const req = new GetNotificationsByFilterRequest();

    const { keyword, status, tagIdsList, paging, sentFrom, sentTo } = data;

    if (!paging) throw formInvalidErr;

    req.setKeyword(keyword);
    req.setStatus(status);
    req.setTagIdsList(tagIdsList);

    const pagingObj = toBasicPagingProto(paging);
    req.setPaging(pagingObj);

    const sentFromTimestamp = sentFrom ? toTimestampOriginDate(sentFrom) : null;
    const sentToTimestamp = sentTo ? toTimestampOriginDate(sentTo) : null;
    req.setSentFrom(sentFromTimestamp);
    req.setSentTo(sentToTimestamp);

    return req;
}

class InfoNotificationsMgmtReaderMutationService extends InheritedGrpcServiceClient<NotificationReaderServicePromiseClient> {
    async getNotificationsByFilter(params: GetNotificationsByFilterRequest.AsObject) {
        const request = newGetNotificationsByFilter(params);
        const response = await this._call("getNotificationsByFilter", request);
        return response.toObject();
    }
}

const infoNotificationsMgmtReaderMutationService = new InfoNotificationsMgmtReaderMutationService(
    NotificationReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default infoNotificationsMgmtReaderMutationService;
