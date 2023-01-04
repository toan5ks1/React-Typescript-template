import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";

import { LessonReportReaderServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { RetrieveIndividualLessonsReportRequest } from "manabuf/bob/v1/lessons_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import {
    newRetrieveIndividualLessonsReportReq,
    newRetrievePartnerDomainReq,
} from "./lesson-reports-bob.request";

class LessonReportServiceBob extends InheritedGrpcServiceClient<LessonReportReaderServicePromiseClient> {
    async retrieveIndividualLessonReport(params: RetrieveIndividualLessonsReportRequest.AsObject) {
        const req = newRetrieveIndividualLessonsReportReq(params);
        const resp = await this._call("retrieveIndividualLessonsReport", req);
        return { data: resp.toObject() };
    }

    async retrievePartnerDomain(params: GetPartnerDomainRequestQuery) {
        const req = newRetrievePartnerDomainReq(params);
        const resp = await this._call("retrievePartnerDomain", req);
        return { data: resp.toObject() };
    }
}

const lessonReportServiceBob = new LessonReportServiceBob(
    LessonReportReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonReportServiceBob;
