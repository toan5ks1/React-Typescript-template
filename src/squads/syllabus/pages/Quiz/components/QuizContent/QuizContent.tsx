import { memo } from "react";

import clsx from "clsx";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { ExternalIdProps } from "../../types";
import MaterialUpload from "./MaterialUpload";
import QuizMain from "./QuizMain";
import QuizPdf from "./QuizPdf";

const PREFIX = "QuizContent";

const classes = {
    root: `${PREFIX}-root`,
    material: `${PREFIX}-material`,
    materialContent: `${PREFIX}-materialContent`,
    paper: `${PREFIX}-paper`,
    sticky: `${PREFIX}-sticky`,
    leftPart: `${PREFIX}-leftPart`,
    rightPart: `${PREFIX}-rightPart`,
    rightPartWithPdf: `${PREFIX}-rightPartWithPdf`,
    quizMain: `${PREFIX}-quizMain`,
};

const Root = styled("div")(({ theme }) => {
    return {
        [`& .${classes.root}`]: {
            maxWidth: "100%",
            margin: "-8px",
        },
        [`& .${classes.material}`]: {
            marginBottom: theme.spacing(3),
        },
        [`& .${classes.materialContent}`]: {
            maxHeight: `calc(100vh - 220px - ${footerHeight}px)`, // minus (header + 2 padding 24px + material header height + footer height)
            marginBottom: footerHeight, // height for the footer pagination
            overflowY: "auto",
            overflowX: "hidden",
        },
        [`& .${classes.paper}`]: {
            padding: theme.spacing(3, 4),
            position: "relative",
        },
        [`& .${classes.sticky}`]: {
            position: "sticky",
            top: 0,
        },
        [`& .${classes.leftPart}`]: {
            width: "50%",
            display: "inline-block",
            float: "left",
            paddingRight: theme.spacing(1.5),
        },
        [`& .${classes.rightPart}`]: {
            width: "100%",
            display: "inline-block",
        },
        [`& .${classes.rightPartWithPdf}`]: {
            width: "50% !important",
            paddingLeft: theme.spacing(1.5),
        },
        [`& .${classes.quizMain}`]: {
            paddingLeft: "0 !important",
            paddingRight: "0 !important",
            paddingTop: `${theme.spacing(1)} !important`,
            padding: theme.spacing(1),
            display: "block",
        },
    };
});

const footerHeight = 40;

export interface QuizContentProps {
    disabled?: boolean;
    pdfUrl: string | null;
    externalIdProps: ExternalIdProps;
}

export const QuizContent = (props: QuizContentProps) => {
    const { disabled, pdfUrl, externalIdProps } = props;
    const dispatch = useDispatch();

    return (
        <Root>
            {pdfUrl ? (
                <div className={clsx(classes.leftPart, classes.sticky)}>
                    <QuizPdf
                        className={clsx(classes.paper)}
                        classes={{
                            content: classes.materialContent,
                        }}
                        pdfUrl={pdfUrl}
                        disabled={disabled}
                        data-testid="QuizContent__PDF"
                        dispatch={dispatch}
                    />
                </div>
            ) : null}
            <div className={clsx(classes.rightPart, pdfUrl && classes.rightPartWithPdf)}>
                <Grid className={classes.root} container spacing={2} justifyContent="center">
                    <Grid
                        className={classes.quizMain}
                        container
                        item
                        xs={pdfUrl ? 12 : 6}
                        direction="column"
                    >
                        {!pdfUrl ? (
                            <Grid className={classes.material} item>
                                <MaterialUpload className={classes.paper} dispatch={dispatch} />
                            </Grid>
                        ) : null}
                        <Grid item xs={12}>
                            <QuizMain
                                className={clsx(classes.paper)}
                                dispatch={dispatch}
                                externalIdProps={externalIdProps}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Root>
    );
};

export default memo(QuizContent);
