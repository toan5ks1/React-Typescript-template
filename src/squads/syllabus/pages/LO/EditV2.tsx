import { useForm } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { Syllabus_LearningObjectivesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import { DialogFullScreenProps } from "src/components/Dialogs/types";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";

import logger from "../../internals/logger";
import NsSyllabus_LearningObjectiveService from "../../services/eureka/learning-objective/types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export const titleType = {
    [KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD]: "flashCard",
    [KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING]: "offlineStudy",
    [KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING]: "learningObjective",
};

export interface EditLOProps extends Omit<DialogFullScreenProps, "dialogCancelProps" | "title"> {
    defaultValues: LODetail;
}

type LODetail = Syllabus_LearningObjectivesOneQuery["learning_objectives"][0];

const EditLOV2 = (props: EditLOProps) => {
    const { open, onClose, onSave, defaultValues } = props;
    const showSnackbar = useShowSnackbar();
    const tLos = useResourceTranslate(Entities.LOS);
    const tCommon = useTranslate();

    const methodHF = useForm<LODetail>({
        defaultValues,
        mode: "all",
    });
    const { handleSubmit } = methodHF;
    const { mutate } = inferMutation({
        entity: "learningObjective",
        action: "syllabusLOUpsert",
    })({
        onSuccess: () => {
            showSnackbar(
                tCommon(
                    "ra.common.updatedSuccess",
                    // TODO: Change `smart_count` to a different variable name like `object`
                    {
                        smart_count: tCommon(
                            `resources.topics.${titleType[props.defaultValues.type as string]}`
                        ),
                    },
                    { lowercase: true }
                )
            );
            onSave?.();
        },
        onError: (err) => {
            logger.warn(`onError upsertLOs`, err);

            const error = handleUnknownError(err);
            showSnackbar(tCommon(error.message), "error");
        },
    });

    const onSubmit = async (data: LODetail) => {
        const {
            lo_id: loId,
            school_id: schoolId,
            topic_id: topicId,
            name,
            type,
            display_order: displayOrder,
            prerequisites,
            study_guide,
            video,
        } = data;
        const payload: NsSyllabus_LearningObjectiveService.UpsertLOs = {
            loId,
            schoolId,
            topicId: topicId as string,
            name: name,
            type: type as keyof typeof LearningObjectiveType,
            displayOrder: Number(displayOrder),
            prerequisitesList: prerequisites,
            studyGuide: study_guide || undefined,
            video: video || undefined,
        };
        mutate(payload);
    };

    return (
        <DialogFullScreenHF
            title={tLos("editTitle")}
            open={open}
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            methods={methodHF}
        >
            <PaperSectionWrapper>
                <TextFieldHF
                    inputProps={{
                        "data-testid": "LODialog__inputName",
                    }}
                    required
                    label={tCommon(
                        `resources.topics.${titleType[props.defaultValues.type as string]}`
                    )}
                    autoFocus
                    name="name"
                />
            </PaperSectionWrapper>
        </DialogFullScreenHF>
    );
};

export default EditLOV2;
