import { ElementType, PropsWithChildren } from "react";

import { Entities } from "src/common/constants/enum";

import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const sx = {
    root: (theme: Theme) => ({
        border: `1px solid ${theme.palette.border?.main}`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1.5),
        borderRadius: theme.spacing(1),
    }),

    correctWrapper: (theme: Theme) => ({
        border: `1px solid ${theme.palette.success?.main}`,
    }),

    correct: (theme: Theme) => ({
        position: "absolute",
        padding: theme.spacing(0.5, 2 / 3),
        zIndex: 20,
        right: theme.spacing(2),
        color: theme.palette.success?.main,
        background: theme.palette.common.white,
        top: theme.spacing(-1.5),
        textTransform: "uppercase",
        fontSize: "0.625rem",
    }),
};
export interface AnswerReviewProps {
    className?: string;
    correct?: boolean;
    component?: ElementType;
}

const AnswerReview = (props: PropsWithChildren<AnswerReviewProps>) => {
    const { className, children, component: Component = Box, correct } = props;

    const t = useResourceTranslate(Entities.QUIZZES);

    return (
        <Component sx={[sx.root, correct && sx.correctWrapper]} className={className}>
            {children}
            {correct ? <TypographyBase sx={sx.correct}>{t("correct")}</TypographyBase> : null}
        </Component>
    );
};

export default AnswerReview;
