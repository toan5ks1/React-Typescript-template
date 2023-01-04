import { Entities } from "src/common/constants/enum";

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Theme } from "@mui/material";
import ButtonBase, { ButtonBaseProps } from "src/components/Buttons/ButtonBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

interface DeleteButtonProps extends ButtonBaseProps {}

const DeleteButton = (props: DeleteButtonProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);

    return (
        <ButtonBase
            {...props}
            sx={(theme: Theme) => ({ color: theme.palette.red?.[500] })}
            startIcon={<DeleteOutline />}
            data-testid="DeleteButton__root"
        >
            {t("deleteTheAnswer")}
        </ButtonBase>
    );
};

export default DeleteButton;
