import { Grid, Paper, SxProps, Theme } from "@mui/material";
import BaseBox from "src/squads/syllabus/components/BaseBox";

import QuizMain from "../QuizMain";
import QuizMaterialUpload from "../QuizMaterialUpload";

interface ContentLayoutSxProps {
    paper: SxProps<Theme>;
}

export interface QuizContentLayoutProps {
    pdfUrl?: string | null;
}

const sx: ContentLayoutSxProps = {
    paper: (theme: Theme) => ({
        padding: theme.spacing(3, 4),
        position: "relative",
    }),
};

export const QuizContentLayout = (props: QuizContentLayoutProps) => {
    const { pdfUrl } = props;

    return (
        <Grid container spacing={2} direction="row">
            {pdfUrl && (
                <Grid item xs={6}>
                    <BaseBox sx={{ top: 0, position: "sticky" }}>
                        <Paper sx={sx.paper} elevation={0}>
                            Quiz Pdf
                        </Paper>
                    </BaseBox>
                </Grid>
            )}

            <Grid container item xs={pdfUrl ? 6 : 12} spacing={2}>
                {!pdfUrl && (
                    <Grid item xs={12} data-testid="QuizMaterialUpload__root">
                        <BaseBox>
                            <Paper sx={sx.paper} elevation={0}>
                                <QuizMaterialUpload />
                            </Paper>
                        </BaseBox>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <QuizMain />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default QuizContentLayout;
