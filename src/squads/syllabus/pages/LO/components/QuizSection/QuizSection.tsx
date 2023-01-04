import { forwardRef, Fragment, useImperativeHandle } from "react";

import { Entities } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import BaseBox from "src/squads/syllabus/components/BaseBox";
import AddQuiz from "src/squads/syllabus/components/RelatedQuiz/AddQuiz";
import QuizTable, { QuizTableProps } from "src/squads/syllabus/components/RelatedQuiz/QuizTable";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const StyledQuizTable = styled(QuizTable)(({ theme }) => ({
    background: theme.palette.common.white,
}));
export interface QuizSectionProps
    extends Omit<QuizTableProps, "quizzes" | "loading" | "pagination" | "refetchQuizzes"> {
    loId: string;
    searchURL: string;
    wrapperType: "box" | "no-wrapper";
}

export interface QuizSectionRefs {
    fetchQuiz: () => void;
}

const QuizSection = forwardRef<QuizSectionRefs | undefined, QuizSectionProps>(
    (props: QuizSectionProps, ref) => {
        const { loId, searchURL, wrapperType } = props;
        const t = useTranslate();

        const showSnackBar = useShowSnackbar();

        const {
            data = [],
            refetch: refetchQuizzes,
            isFetching,
        } = inferQuery({
            entity: "quizzes",
            action: "syllabusQuizGetManyByLOId",
        })(
            {
                lo_id: loId,
            },
            {
                enabled: true,
                onError(error) {
                    logger.warn(`QuizSection fetchQuizzes`, error);

                    showSnackBar(
                        `${t("ra.message.unableToLoadData")} ${t(error.message)}`,
                        "error"
                    );
                },
            }
        );

        useImperativeHandle(ref, () => ({
            fetchQuiz() {
                void refetchQuizzes();
            },
        }));

        // TODO: The latest design removed box wrapper but it is in review progress
        // We will ping PM to can update the latest design
        const Wrapper = wrapperType === "box" ? BaseBox : Fragment;
        const attributes: BoxProps & {
            "data-testid"?: string;
        } =
            wrapperType === "box"
                ? {
                      sx: (theme) => ({ padding: theme.spacing(3, 4) }),
                      "data-testid": "QuizSection_root",
                  }
                : {};
        return (
            <Wrapper {...attributes}>
                <WrapperPageHeader
                    title={t(`resources.${Entities.QUIZZES}.questionList`)}
                    action={<AddQuiz searchURL={searchURL} />}
                />
                <StyledQuizTable
                    loId={loId}
                    quizzes={data}
                    loading={isFetching}
                    searchURL={searchURL}
                    refetchQuizzes={refetchQuizzes}
                />
            </Wrapper>
        );
    }
);

export default QuizSection;
