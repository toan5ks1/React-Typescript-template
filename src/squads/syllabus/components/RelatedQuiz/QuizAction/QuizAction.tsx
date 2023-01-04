import { MutationMenus } from "src/common/constants/enum";
import { QuizHasura } from "src/squads/syllabus/models/quiz";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import { Grid, IconButton } from "@mui/material";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";

import QuizDeleteConfirmDialog from "../QuizDeleteConfirmDialog";

import useDialog from "src/squads/syllabus/hooks/useDialog";
import { Action as SwapAction } from "src/squads/syllabus/hooks/useSwapOrder";

interface QuizActionProps {
    record: QuizHasura;
    index?: number;
    size: number;
    onAction: (action: MutationMenus, record: QuizHasura) => void;
    onReOrder: (action: SwapAction, identity: string) => Promise<void>;
    onSetQuizReview: () => void;
}
// TODO: Replace by src/components/MoveUpDown/MoveUpDownBase/MoveUpDownBase.tsx
const QuizAction = (props: QuizActionProps) => {
    const { record, index, size, onAction, onReOrder, onSetQuizReview } = props;
    const { open: dialogOpen, onClose: onDialogClose, onOpen: onDialogOpen } = useDialog(false);

    const moveDownDisabled = index === size - 1;
    const moveUpDisabled = index === 0;
    const actions: Action[] = [
        MutationMenus.EDIT,
        {
            action: MutationMenus.DELETE,
            onClick: onDialogOpen,
            render: (label) => <span>{label}</span>,
        },
    ];

    return (
        <>
            <Grid container wrap="nowrap" alignItems="center">
                <Grid item>
                    <IconButton
                        color="primary"
                        onClick={onSetQuizReview}
                        data-testid="QuizTable__previewButton"
                        size="large"
                    >
                        <ImageSearchOutlinedIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        color="primary"
                        disabled={moveDownDisabled}
                        onClick={() => onReOrder(MutationMenus.MOVE_DOWN, record.quiz_id)}
                        data-testid="QuizTable__moveDownButton"
                        size="large"
                    >
                        <ArrowDownwardIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        color="primary"
                        disabled={moveUpDisabled}
                        onClick={() => onReOrder(MutationMenus.MOVE_UP, record.quiz_id)}
                        data-testid="QuizTable__moveUpButton"
                        size="large"
                    >
                        <ArrowUpwardIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <ActionPanel
                        record={record}
                        recordName=""
                        onAction={onAction}
                        actions={actions}
                    />
                </Grid>
            </Grid>
            <QuizDeleteConfirmDialog
                open={dialogOpen}
                onClose={onDialogClose}
                onSave={() => onAction(MutationMenus.DELETE, record)}
            />
        </>
    );
};

export default QuizAction;
