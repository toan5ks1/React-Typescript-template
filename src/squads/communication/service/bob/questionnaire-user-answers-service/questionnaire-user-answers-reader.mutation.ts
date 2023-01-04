import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import { toBasicPagingProto } from "src/squads/communication/common/utils/utils";
import { InheritedGrpcServiceClient } from "src/squads/communication/service/service-types";

import { NotificationReaderServicePromiseClient } from "manabuf/bob/v1/notifications_grpc_web_pb";
import { GetAnswersByFilterRequest } from "manabuf/bob/v1/notifications_pb";

export function getAnswersByFilterRequest({
    keyword,
    questionnaireId,
    paging,
}: GetAnswersByFilterRequest.AsObject): GetAnswersByFilterRequest {
    if (!paging) throw formInvalidErr;

    const request = new GetAnswersByFilterRequest();

    const pagingObj = toBasicPagingProto(paging);
    request.setPaging(pagingObj);
    request.setKeyword(keyword);
    request.setQuestionnaireId(questionnaireId);

    return request;
}

class QuestionnaireUserAnswersReaderMutationService extends InheritedGrpcServiceClient<NotificationReaderServicePromiseClient> {
    async getAnswersByFilter(params: GetAnswersByFilterRequest.AsObject) {
        const request = getAnswersByFilterRequest(params);
        const response = await this._call("getAnswersByFilter", request);
        return response.toObject();
    }
}

const questionnaireUserAnswersReaderMutationService =
    new QuestionnaireUserAnswersReaderMutationService(
        NotificationReaderServicePromiseClient,
        appConfigs,
        commonGrpcOptions
    );

export default questionnaireUserAnswersReaderMutationService;
