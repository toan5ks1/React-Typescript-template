import { useCallback, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import {
    Entities,
    EurekaEntities,
    MutationMenus,
    NotifyActions,
    Features,
} from "src/common/constants/enum";
import { convertToChoices } from "src/common/utils/choice";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { translateForChoices } from "src/squads/syllabus/common/utils/choice";
import logger from "src/squads/syllabus/internals/logger";

import { Box, Grid, Skeleton } from "@mui/material";
import DialogFooterConfirm from "src/components/Dialogs/DialogFooterConfirm";
import { DialogFooterProps } from "src/components/Dialogs/types";
import HookForm from "src/components/Forms/HookForm";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import WrapperGrid from "src/components/Wrappers/WrapperGrid";
import WrapperPortalDialogFooter from "src/components/Wrappers/WrapperPortalDialogFooter";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useNotifyForm from "src/squads/syllabus/hooks/useNotifyForm";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTopicControl from "src/squads/syllabus/hooks/useTopicControl";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useCreateLOs from "src/squads/syllabus/pages/Book/hooks/useCreateLOs";
import {
    CreateLOFormData,
    LOsWithAssignmentType,
    losWithAssignmentTypes,
} from "src/squads/syllabus/pages/LO/common/type";

export interface CreateLOsTabProps extends Pick<DialogFooterProps, "onClose"> {
    searchURL: string;
    topicId: string;
}

const CreateLOsTab = ({ topicId, searchURL, onClose }: CreateLOsTabProps) => {
    const t = useTranslate();
    const navigate = useNavigation();
    const { createLOs, isLoading, isPrepareLoading } = useCreateLOs({ topicId });
    const tLOs = useResourceTranslate(Entities.LOS);

    const { configKeys } = useTopicControl();

    // TODO: Remove when Exam LO instruction is released
    const { isEnabled: isEnabledExamInstruction } = useFeatureToggle(
        Features.SYLLABUS_EXAM_LO_INSTRUCTION
    );

    const methodHF = useForm<CreateLOFormData>();
    const { handleSubmit } = methodHF;

    const onNotify = useNotifyForm({
        entityName: tLOs("shortenName"),
        action: MutationMenus.CREATE,
        shouldLowercase: false,
    });

    const [type, setType] = useState<keyof typeof KeyLOTypes>();

    const handleChangeType = useCallback((e) => {
        setType(e.target.value as keyof typeof KeyLOTypes);
    }, []);

    const handleCreateLO = useCallback(
        (formData: CreateLOFormData) => {
            createLOs(formData, {
                onSuccess: ({ loIdsList }) => {
                    navigate.push(
                        `/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${loIdsList[0]}/show${searchURL}`
                    );
                    onNotify(NotifyActions.SUCCESS, {}, "");
                },
                onError: (error) => {
                    logger.warn("[LOs create]", error);

                    onNotify(NotifyActions.FAILURE, {}, error.message);
                },
            });
        },
        [createLOs, navigate, onNotify, searchURL]
    );

    const handleCreateAssignment = useCallback(() => {
        const createLink: string = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.ASSIGNMENTS}/create${searchURL}`;

        navigate.push(createLink);
    }, [navigate, searchURL]);

    const handleCreateTaskAssignment = useCallback(() => {
        const createLink: string = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/create${searchURL}`;

        navigate.push(createLink);
    }, [navigate, searchURL]);

    const handleCreateExamLO = useCallback(() => {
        const createLink: string = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.EXAM_LO}/create${searchURL}`;

        navigate.push(createLink);
    }, [navigate, searchURL]);

    const onSubmit = useCallback(
        (data: CreateLOFormData) => {
            switch (type) {
                case losWithAssignmentTypes.ASSIGNMENT:
                    handleCreateAssignment();
                    break;
                case losWithAssignmentTypes.TASK_ASSIGNMENT:
                    handleCreateTaskAssignment();
                    break;
                case losWithAssignmentTypes.EXAM_LO:
                    isEnabledExamInstruction ? handleCreateExamLO() : handleCreateLO(data);
                    break;
                // LO types(The other types)
                default:
                    handleCreateLO(data);
                    break;
            }
        },
        [
            type,
            handleCreateAssignment,
            handleCreateTaskAssignment,
            handleCreateLO,
            isEnabledExamInstruction,
            handleCreateExamLO,
        ]
    );

    const optionsAllowed = useMemo(() => {
        let options: Partial<LOsWithAssignmentType> = {};
        // Mapping config keys to the type of the choice
        for (const [key, isAllow] of Object.entries(configKeys)) {
            if (isAllow) options[key] = losWithAssignmentTypes[key];
        }
        const choices = translateForChoices(
            convertToChoices(options, "LearningObjectiveType", Entities.LOS),
            t
        );
        return choices;
    }, [configKeys, t]);

    const shouldVisibleFormData = useMemo(
        () =>
            type &&
            ![losWithAssignmentTypes.ASSIGNMENT, losWithAssignmentTypes.TASK_ASSIGNMENT].includes(
                type
            ),
        [type]
    );

    if (isPrepareLoading) {
        return (
            <Box data-testid="CreateLOsTab__prepareLoading">
                <Skeleton height={32} />
                <Skeleton height={84} />
                <Skeleton height={64} />
            </Box>
        );
    }

    return (
        <div data-testid="CreateLOsTab__root">
            <HookForm
                methods={methodHF}
                formProps={{ onSubmit: handleSubmit(onSubmit) }}
                shouldPressKey={true}
            >
                <WrapperGrid>
                    <Box pt={1}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <SelectHF
                                    label={tLOs("placeholder.selectLOsType")}
                                    required
                                    rules={{
                                        required: {
                                            value: true,
                                            message: t("resources.input.error.required"),
                                        },
                                    }}
                                    name="type"
                                    options={optionsAllowed}
                                    onChange={handleChangeType}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                {shouldVisibleFormData && (
                                    <TextFieldHF
                                        required
                                        label={tLOs("placeholder.loName")}
                                        name="name"
                                        rules={{
                                            required: t("resources.input.error.required"),
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </WrapperGrid>
            </HookForm>

            <WrapperPortalDialogFooter>
                <DialogFooterConfirm
                    onSave={handleSubmit(onSubmit)}
                    onClose={onClose}
                    textSave={t("ra.action.confirm")}
                    footerConfirmButtonProps={{
                        disabled: isLoading,
                    }}
                />
            </WrapperPortalDialogFooter>
        </div>
    );
};

export default CreateLOsTab;
