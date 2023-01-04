import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { QuestionnaireResultTableData } from "src/squads/communication/common/constants/types";
import {
    getColumnsTableView,
    mapUserAnswersListToTableData,
} from "src/squads/communication/common/utils/questionnaire-table-utils";

import { TableBase, TableColumn } from "src/components/Table";
import WrapperLookingFor, {
    WrapperLookingForProps,
} from "src/components/Wrappers/WrapperLookingFor";

import { GetAnswersByFilterResponse } from "manabuf/bob/v1/notifications_pb";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import { UseQuestionnaireUserAnswersListReturn } from "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList";

export interface QuestionnaireResultTableProps
    extends Pick<
        UseQuestionnaireUserAnswersListReturn,
        "pagination" | "isLoadingAnswer" | "keyword"
    > {
    answersFilter: GetAnswersByFilterResponse.AsObject;
}

const QuestionnaireResultTable = ({
    pagination,
    answersFilter,
    isLoadingAnswer,
    keyword,
}: QuestionnaireResultTableProps) => {
    const tCommon = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const tableData: QuestionnaireResultTableData[] = useMemo(
        () =>
            mapUserAnswersListToTableData(
                answersFilter.userAnswersList,
                answersFilter.questionsList
            ),
        [answersFilter.questionsList, answersFilter.userAnswersList]
    );

    const tableLookingForVariant: WrapperLookingForProps["variant"] = useMemo(() => {
        if (isLoadingAnswer) return "loading";

        // No responder have answered
        if (!keyword && !arrayHasItem(answersFilter.userAnswersList)) return "result";

        // Check if filter return result
        return arrayHasItem(answersFilter.userAnswersList) ? "result" : "empty-icon";
    }, [answersFilter.userAnswersList, isLoadingAnswer, keyword]);

    const columns: TableColumn<QuestionnaireResultTableData>[] = useMemo(() => {
        return getColumnsTableView(answersFilter.questionsList, tNotification);
    }, [answersFilter.questionsList, tNotification]);

    return (
        <WrapperLookingFor
            variant={tableLookingForVariant}
            content={tCommon("resources.common.noResult")}
            helperText={tCommon("resources.common.noResultSearchAndFilter")}
        >
            <TableBase
                withIndex
                data={tableData}
                columns={columns}
                tableProps={{
                    "data-testid": "QuestionnaireResultTable__table",
                }}
                body={{
                    rowKey: "userId",
                    pagination,
                    loading: isLoadingAnswer,
                }}
                footer={{
                    pagination,
                }}
            />
        </WrapperLookingFor>
    );
};

export default QuestionnaireResultTable;
