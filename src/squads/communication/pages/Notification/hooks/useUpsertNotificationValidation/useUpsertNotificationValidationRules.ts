import { MutableRefObject } from "react";

import { EditorState } from "draft-js";
import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { isEditorContentEmpty } from "src/common/utils/draft-js";
import {
    MAX_LENGTH_EDITOR,
    MAX_LENGTH_TITLE,
} from "src/squads/communication/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { TimeAutocompleteOption } from "src/squads/communication/models/time-autocomplete";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";

const useUpsertNotificationValidationRules = (
    shouldValidateFullForm?: MutableRefObject<boolean>
) => {
    const tCommon = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const { getValues } = useFormContext<NotificationFormData>();

    const shouldShowErrorOptional = () => {
        const { courses, grades, students } = getValues();

        if (shouldValidateFullForm?.current) {
            return !courses?.length && !grades?.length && !students?.length;
        }
    };

    return {
        title: {
            validate: (title: string) => {
                const titleValue = convertString(title).trim();
                if (!titleValue) return tCommon("resources.input.error.required");

                if (titleValue.length > MAX_LENGTH_TITLE)
                    return tCommon("resources.input.error.limitLength", {
                        field: tNotification("label.title"),
                        length: MAX_LENGTH_TITLE,
                    });
            },
        },
        content: {
            validate: (content: EditorState) => {
                if (isEditorContentEmpty(content.getCurrentContent()))
                    return tCommon("resources.input.error.required");

                if (content?.getCurrentContent().getPlainText("").length > MAX_LENGTH_EDITOR) {
                    return tCommon("resources.input.error.limitLength", {
                        field: tNotification("label.content"),
                        length: MAX_LENGTH_EDITOR,
                    });
                }
            },
        },
        courses: {
            validate: () => {
                if (shouldShowErrorOptional()) return tCommon("resources.input.error.required");
            },
        },
        grades: {
            validate: () => {
                if (shouldShowErrorOptional()) return tCommon("resources.input.error.required");
            },
        },
        students: {
            validate: () => {
                if (shouldShowErrorOptional()) return tCommon("resources.input.error.required");
            },
        },
        scheduleTime: {
            validate: (option?: TimeAutocompleteOption) => {
                if (!option) return tCommon("resources.input.error.required");
            },
        },
    };
};

export default useUpsertNotificationValidationRules;
