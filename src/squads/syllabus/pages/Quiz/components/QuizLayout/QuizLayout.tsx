import { PropsWithChildren, ReactElement } from "react";

import { Entities } from "src/common/constants/enum";
import { Quiz } from "src/squads/syllabus/models/quiz";
import { StandardProps } from "src/squads/syllabus/typings/react-component";

import { Grid, Theme } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import SpacingGroup from "src/components/Utilities/SpacingGroup";
import FormDialog from "src/squads/syllabus/components/LegacyDialogs/FormDialog";
import FormLayout from "src/squads/syllabus/pages/Quiz/components/FormLayout";

import QuizReview from "../QuizReview";

import useDialog from "src/squads/syllabus/hooks/useDialog";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const sx = {
    root: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    wrapper: {
        padding: 0,
    },
    actionWrapper: (theme: Theme) => ({
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(3),
    }),
    save: {
        backgroundColor: "#2196F3",
    },
};

export interface QuizLayoutProps extends StandardProps {
    title?: string | ReactElement;
    loading?: boolean;
    disabled?: boolean;
    quizOnReview: Quiz | null;
    expandActionSpace?: boolean;
    fullWidth?: boolean;

    onCancel?: () => void;
    onSubmit?: () => void;
    onCloseReview: () => void;
}

const QuizLayout = (props: PropsWithChildren<QuizLayoutProps>) => {
    const {
        title,
        quizOnReview,
        expandActionSpace,
        disabled,
        loading,
        children,
        onSubmit,
        onCancel,
        onCloseReview,
        fullWidth = true,
    } = props;
    const t = useTranslate();

    const { open } = useDialog(true);

    return (
        <FormDialog
            fullScreen={true}
            handleClose={onCancel}
            open={open}
            title={title}
            disableEnforceFocus
        >
            <FormLayout fullWidth={fullWidth} sxOverride={sx.wrapper}>
                {children}
                {/*replica props from quizContent Grid wrapper*/}
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={expandActionSpace ? 12 : 6}>
                        <SpacingGroup direction="horizontal" spacing={8} sx={sx.actionWrapper}>
                            <ButtonBase variant="text" disabled={loading} onClick={onCancel}>
                                {t("ra.common.action.cancel")}
                            </ButtonBase>
                            <ButtonBase
                                data-testid="QuizLayout__submit"
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={disabled || loading}
                                onClick={onSubmit}
                                aria-label="Save"
                                sx={sx.save}
                            >
                                {t(`ra.common.save`)}
                            </ButtonBase>
                        </SpacingGroup>
                    </Grid>
                </Grid>

                {quizOnReview ? (
                    <QuizReview
                        open={Boolean(quizOnReview)}
                        quiz={quizOnReview}
                        anchor="right"
                        title={t(`resources.${Entities.QUIZZES}.questionPreview`)}
                        onClose={onCloseReview}
                    />
                ) : null}
            </FormLayout>
        </FormDialog>
    );
};

export default QuizLayout;
