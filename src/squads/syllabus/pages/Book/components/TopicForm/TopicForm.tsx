import { Box } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import AvatarInputHF from "src/squads/syllabus/components/InputFiles/AvatarInputHF";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface TopicFormData {
    name: string;
    files?: FileList;
}

const TopicForm = () => {
    const t = useTranslate();

    return (
        <Box data-testid="TopicForm__root">
            <Box display="flex" justifyContent="center" mb={2}>
                <AvatarInputHF name="files" initialSource="icon_url" mode="files" />
            </Box>
            <TextFieldHF
                name="name"
                label={t("resources.topics.topicName")}
                required
                rules={{ required: t("resources.input.error.required") }}
            />
        </Box>
    );
};

export default TopicForm;
