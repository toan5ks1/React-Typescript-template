import { useCallback, useMemo } from "react";

import { Entities, MoveDirection, MutationMenus } from "src/common/constants/enum";
import { PRIMARY_KEYS } from "src/common/constants/other";
import { MicroFrontendTypes } from "src/routing/type";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";
import logger from "src/squads/syllabus/internals/logger";
import permission from "src/squads/syllabus/internals/permission";
import { convertQuizHasuraToQuiz, QuizHasura, QuizType } from "src/squads/syllabus/models/quiz";
import { QuizzesManyByLearningObjectIdQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { StandardProps } from "src/squads/syllabus/typings/react-component";

import { TableBase, TableBaseBodyProps, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import RemoteDisplayRichText from "src/squads/syllabus/pages/Quiz/components/WYSWYG/RemoteRichTextDisplay";

import QuizAction from "../QuizAction";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useSwapOrder from "src/squads/syllabus/hooks/useSwapOrder";
import useSwapQuizOrder from "src/squads/syllabus/hooks/useSwapQuizOrder";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useQuizReview from "src/squads/syllabus/pages/Quiz/hooks/useQuizReview";

const sx = {
    idColumn: {
        width: "15%",
    },
    typeColumn: {
        width: "15%",
    },
    actionColumn: {
        width: "1%",
        whiteSpace: "nowrap",
        textAlign: "center",
    },
    table: {
        "& tbody tr": {
            verticalAlign: "baseline",
        },
    },
};

export interface QuizTableProps extends Pick<TableBaseBodyProps<{}>, "loading">, StandardProps {
    quizzes: QuizzesManyByLearningObjectIdQuery["find_quiz_by_lo_id"];
    loId: string;
    searchURL?: string;
    refetchQuizzes: () => void;
}

const QuizTable = (props: QuizTableProps) => {
    const { quizzes, loId, searchURL, loading, refetchQuizzes } = props;
    const t = useTranslate();
    const size = quizzes ? quizzes.length : 0;
    const rowKey = getPrimaryKey(Entities.QUIZZES);

    const { onSetQuizReview } = useQuizReview();
    const navigate = useNavigation();
    const showSnackbar = useShowSnackbar();

    const { updateOrder, isLoading } = useSwapQuizOrder();

    const { swap } = useSwapOrder<Pick<QuizHasura, "external_id" | "quiz_id">>({
        data: quizzes,
        key: PRIMARY_KEYS[Entities.QUIZZES] as keyof Pick<QuizHasura, "external_id" | "quiz_id">,
    });

    const onReOrder = useCallback(
        async (action: MoveDirection, identity: string) => {
            const swapArr = swap(action, identity);
            if (!swapArr || swapArr.length < 2) {
                logger.error("[Quiz re-order]: cannot swap arr", action, identity);
            }

            const [first, second] = swapArr!;
            updateOrder(
                { loId, pairsList: [{ first: first.external_id, second: second.external_id }] },
                {
                    onSuccess: () => {
                        refetchQuizzes();
                    },
                }
            );
        },
        [swap, updateOrder, loId, refetchQuizzes]
    );

    const { mutate: deleteQuizFromLO } = inferMutation({
        entity: "quiz",
        action: "syllabusQuizDelete",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: t(`resources.${Entities.QUIZZES}.question`),
                    },
                    { lowercase: true }
                )
            );
            refetchQuizzes();
        },
        onError: (error: Error) => {
            logger.warn("[QuizTable delete quiz]", error);

            showSnackbar(`${t("ra.common.deleteFail")}: ${t(error.message)}`, "error");
        },
    });

    const onAction = useCallback(
        (action: MutationMenus, record: QuizHasura) => {
            switch (action) {
                case MutationMenus.EDIT:
                    return navigate.push(
                        `/${MicroFrontendTypes.SYLLABUS}/${Entities.QUIZZES}/${record.quiz_id}/edit${searchURL}`
                    );
                case MutationMenus.DELETE:
                    return deleteQuizFromLO({
                        quizId: record.external_id,
                        loId,
                    });
                default:
            }
        },
        [navigate, searchURL, deleteQuizFromLO, loId]
    );

    const columns: TableColumn<QuizHasura>[] = useMemo(() => {
        return [
            ...(permission.can("quizzes", "show.external_id")
                ? [
                      {
                          cellProps: { sx: sx.idColumn },
                          title: t(`resources.${Entities.QUIZZES}.mappedID`),
                          render: (record: QuizHasura) => {
                              return (
                                  <TypographyBase
                                      display="inline"
                                      variant="body2"
                                      color="primary"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                          onSetQuizReview(convertQuizHasuraToQuiz(record, loId))
                                      }
                                      data-testid="QuizTable__id"
                                  >
                                      {record.external_id}
                                  </TypographyBase>
                              );
                          },
                          key: "externalID",
                      },
                  ]
                : []),
            {
                cellProps: { "data-testid": "QuizTable__description" },
                title: t(`resources.${Entities.QUIZZES}.description`),
                render: ({ question }) => {
                    if (!question || !question.rendered_url) {
                        return null;
                    }
                    return <RemoteDisplayRichText url={question.rendered_url} maxHeight={300} />;
                },
                key: "description",
            },
            {
                cellProps: { sx: sx.typeColumn },
                title: t(`resources.${Entities.QUIZZES}.type`),
                render: (record) => (
                    <TypographyBase>
                        {t(`resources.choices.quizTypes.${QuizType[record.kind]}`)}
                    </TypographyBase>
                ),
                key: "review",
            },
            {
                title: t("ra.common.actions"),
                cellProps: { sx: sx.actionColumn },
                render: (record, index) => {
                    return (
                        <QuizAction
                            record={record}
                            index={index}
                            size={size}
                            onAction={onAction}
                            onReOrder={onReOrder}
                            onSetQuizReview={() =>
                                onSetQuizReview(convertQuizHasuraToQuiz(record, loId))
                            }
                        />
                    );
                },
                key: "actions",
            },
        ];
    }, [t, onSetQuizReview, loId, onAction, size, onReOrder]);

    return (
        <>
            <TableBase
                body={{
                    rowKey,
                    loading: loading || isLoading,
                }}
                data={quizzes}
                columns={columns}
                tableProps={{
                    "data-testid": "QuizTable__table",
                    sx: sx.table,
                }}
            />
        </>
    );
};

export default QuizTable;
