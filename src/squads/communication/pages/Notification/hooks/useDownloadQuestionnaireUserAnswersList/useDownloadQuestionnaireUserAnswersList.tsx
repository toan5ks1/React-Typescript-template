import { inferStandaloneQuery } from "src/squads/communication/service/infer-query";

import {
    GetAnswersByFilterResponse,
    GetAnswersByFilterRequest,
} from "manabuf/bob/v1/notifications_pb";
import { Paging } from "manabuf/common/v1/requests_pb";

import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UseDownloadQuestionnaireUserAnswersListProps {
    questionnaireId: GetAnswersByFilterRequest.AsObject["questionnaireId"];
    limit?: Paging.AsObject["limit"];
}

const useDownloadQuestionnaireUserAnswersList = ({
    questionnaireId,
    limit = 10,
}: UseDownloadQuestionnaireUserAnswersListProps): (() => Promise<
    GetAnswersByFilterResponse.AsObject | undefined
>) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    return async () => {
        try {
            return await inferStandaloneQuery({
                entity: "questionnaireUserAnswers",
                action: "communicationGetAnswersByFilterToDownloadCsv",
            })({
                keyword: "",
                questionnaireId,
                paging: {
                    limit,
                    offsetInteger: 0,
                    offsetString: "",
                },
            });
        } catch (error) {
            window.warner?.warn("useDownloadQuestionnaireUserAnswersList", error);
            showSnackbar(
                `${t(
                    "ra.message.unableToLoadData"
                )} downloadQuestionnaireUserAnswers - communicationGetAnswersByFilterToDownloadCsv`,
                "error"
            );
        }
    };
};

export default useDownloadQuestionnaireUserAnswersList;
