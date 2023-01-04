import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";

import { LessonReportReaderServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { GetPartnerDomainRequest } from "manabuf/bob/v1/lessons_pb";

export function newRetrievePartnerDomainReq(
    data: GetPartnerDomainRequestQuery
): GetPartnerDomainRequest {
    const req = new GetPartnerDomainRequest();

    req.setType(data.type);

    return req;
}

class LessonReportReaderServiceBob extends InheritedGrpcServiceClient<LessonReportReaderServicePromiseClient> {
    async retrievePartnerDomain(params: GetPartnerDomainRequestQuery) {
        const request = newRetrievePartnerDomainReq(params);

        const response = await this._call("retrievePartnerDomain", request);

        return response.toObject();
    }
}

const lessonReportsReaderServiceBob = new LessonReportReaderServiceBob(
    LessonReportReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonReportsReaderServiceBob;
