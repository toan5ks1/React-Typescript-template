import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";

import {
    GetPartnerDomainRequest,
    RetrieveIndividualLessonsReportRequest,
} from "manabuf/bob/v1/lessons_pb";
import { Paging } from "manabuf/common/v1/requests_pb";

export function newRetrieveIndividualLessonsReportReq(
    data: RetrieveIndividualLessonsReportRequest.AsObject
): RetrieveIndividualLessonsReportRequest {
    const req = new RetrieveIndividualLessonsReportRequest();

    const pagingObj = new Paging();
    pagingObj.setLimit(data.paging!.limit);
    pagingObj.setOffsetTime(data.paging!.offsetTime);
    pagingObj.setOffsetInteger(data.paging!.offsetInteger);
    pagingObj.setOffsetString(data.paging!.offsetString);

    req.setPaging(pagingObj);

    return req;
}

export function newRetrievePartnerDomainReq(
    data: GetPartnerDomainRequestQuery
): GetPartnerDomainRequest {
    const req = new GetPartnerDomainRequest();

    req.setType(data.type);

    return req;
}

newRetrievePartnerDomainReq;
