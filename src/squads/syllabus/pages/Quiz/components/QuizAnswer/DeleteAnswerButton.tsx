import { Entities } from "src/common/constants/enum";

import DeleteIcon from "@mui/icons-material/Delete";
import ButtonBase, { ButtonBaseProps } from "src/components/Buttons/ButtonBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

interface DeleteAnswerButtonProps extends ButtonBaseProps {}

const DeleteAnswerButton = (props: DeleteAnswerButtonProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);

    return (
        <ButtonBase
            {...props}
            sx={{ color: "#F44336" }}
            startIcon={<DeleteIcon />}
            data-testid="DeleteAnswerButton__root"
        >
            {t("deleteTheAnswer")}
        </ButtonBase>
    );
};

export default DeleteAnswerButton;
