import { useCallback, useState } from "react";

import { inferQueryWithGRPCPagination } from "src/squads/communication/service/infer-query";

import {
    GetAnswersByFilterRequest,
    GetAnswersByFilterResponse,
} from "manabuf/bob/v1/notifications_pb";

import { UseQueryWithGRPCPaginationReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UseQuestionnaireUserAnswersListProps {
    questionnaireId: GetAnswersByFilterRequest.AsObject["questionnaireId"];
    limit?: number;
}

export type GetAnswersByFilterReturn =
    UseQueryWithGRPCPaginationReturn<GetAnswersByFilterResponse.AsObject>;

export interface UseQuestionnaireUserAnswersListReturn {
    onSearch: (keyword: string) => void;
    pagination: GetAnswersByFilterReturn["pagination"];
    refreshPage: GetAnswersByFilterReturn["results"]["refetch"];
    keyword: string;
    isLoadingAnswer: GetAnswersByFilterReturn["results"]["isFetching"];
    answers: GetAnswersByFilterReturn["results"]["data"];
}

const useQuestionnaireUserAnswersList = ({
    questionnaireId,
    limit = 10,
}: UseQuestionnaireUserAnswersListProps): UseQuestionnaireUserAnswersListReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const [keyword, setKeyword] = useState<string>("");

    const {
        results: { data, isFetching, refetch },
        goToFirstPage,
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "questionnaireUserAnswers",
        action: "communicationGetAnswersByFilter",
    })(
        {
            keyword,
            questionnaireId,
        },
        {
            enabled: Boolean(questionnaireId),
            defaultPaging: {
                limit,
                offsetInteger: 0,
                offsetString: "",
            },
            onError: (error) => {
                window.warner?.warn("useQuestionnaireUserAnswersList", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} questionnaireUserAnswers - communicationGetAnswersByFilter`,
                    "error"
                );
            },
        }
    );

    const handleSearch = useCallback(
        (searchKeyword: string) => {
            setKeyword(searchKeyword);
            goToFirstPage();
        },
        [goToFirstPage]
    );

    return {
        answers: data,
        isLoadingAnswer: isFetching,
        refreshPage: refetch,
        keyword,
        onSearch: handleSearch,
        pagination,
    };
};

export default useQuestionnaireUserAnswersList;
