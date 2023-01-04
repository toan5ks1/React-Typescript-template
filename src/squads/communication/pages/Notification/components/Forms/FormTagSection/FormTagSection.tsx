import { useCallback, useState } from "react";

import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { MAX_LENGTH_TAG } from "src/squads/communication/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { Communication_GetTagsManyReferenceQuery } from "src/squads/communication/service/bob/bob-types";

import { Grid } from "@mui/material";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import TagsAutocompleteHF from "src/squads/communication/pages/Notification/components/Autocompletes/TagsAutocompleteHF";

import { UpsertTagRequest } from "manabuf/notificationmgmt/v1/tags_pb";

import { ArrayElementChoice } from "src/squads/communication/hooks/useAutocompleteReference";
import useDialog from "src/squads/communication/hooks/useDialog";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useTagMutation from "src/squads/communication/pages/Notification/hooks/useTagMutation";

const FormTagSection = () => {
    const [tagName, setTagNameValue] = useState<UpsertTagRequest.AsObject["name"]>("");

    const [newTagOption, setNewTagOption] =
        useState<ArrayElementChoice<Communication_GetTagsManyReferenceQuery["tags"]>>();

    const showSnackbar = useShowSnackbar();
    const translate = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const { setValue, getValues, setError } = useFormContext<NotificationFormData>();

    const {
        open: shouldOpenCreateTagConfirmDialog,
        onOpen: onOpenCreateTagConfirmDialog,
        onClose: onCloseCreateTagConfirmDialog,
    } = useDialog();

    const { onUpsert } = useTagMutation();

    const handleCreateTag = useCallback(async () => {
        showSnackbar(translate("ra.common.workInProgress"), "info");

        const newTag = await onUpsert({
            data: {
                tagId: "",
                name: tagName,
            },
            onClose: onCloseCreateTagConfirmDialog,
        });

        if (!newTag) return;

        const currentDateString = new Date().toISOString();

        const newTagOption: ArrayElementChoice<Communication_GetTagsManyReferenceQuery["tags"]> = {
            tag_name: tagName,
            tag_id: newTag.tagId,
            // Watch for mana-ui migration behavior when set option manually
            created_at: currentDateString,
            updated_at: currentDateString,
        };

        setNewTagOption(newTagOption);

        const existedTags = getValues("tags");

        setValue("tags", [...(existedTags ? existedTags : []), newTagOption]);
    }, [
        getValues,
        onCloseCreateTagConfirmDialog,
        onUpsert,
        setValue,
        showSnackbar,
        tagName,
        translate,
    ]);

    const validateTagName = (tagName: UpsertTagRequest.AsObject["name"]) => {
        const trimmedTagNameValue = tagName.trim();

        if (trimmedTagNameValue.length > MAX_LENGTH_TAG) {
            setError("tags", {
                message: translate("resources.input.error.limitLength", {
                    field: tNotification("label.tags"),
                    length: MAX_LENGTH_TAG,
                }),
            });

            return false;
        }

        return true;
    };

    const handleAddOption = (value: UpsertTagRequest.AsObject["name"]) => {
        const isValid = validateTagName(value);

        if (isValid) {
            setTagNameValue(value);
            onOpenCreateTagConfirmDialog();
        }
    };

    return (
        <>
            <Grid item xs={6}>
                <TagsAutocompleteHF
                    data-testid="FormTagSection__tagAutocomplete"
                    name="tags"
                    label={tNotification("label.placeholder.tags")}
                    limitChipText="Ellipsis"
                    getOptionSelectedField="tag_id"
                    addOptionMessagePrefix={translate("ra.common.addOptionPrefix")}
                    onAddOption={handleAddOption}
                    addedOption={newTagOption}
                />
            </Grid>

            <DialogCancelConfirm
                data-testid="FormTagSection__dialogCreateTagConfirm"
                title={`${tNotification("title.addTag")}?`}
                textCancelDialog={translate("ra.common.addNewTag")}
                textSave={translate("ra.common.action.save")}
                open={shouldOpenCreateTagConfirmDialog}
                onSave={handleCreateTag}
                onClose={onCloseCreateTagConfirmDialog}
                footerConfirmButtonProps={{
                    color: "primary",
                }}
            />
        </>
    );
};

export default FormTagSection;
