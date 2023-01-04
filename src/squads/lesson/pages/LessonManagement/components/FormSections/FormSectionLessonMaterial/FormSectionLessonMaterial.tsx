import { Media } from "src/squads/lesson/common/types";

import FormUploadMaterials from "src/squads/lesson/components/Forms/FormUploadMaterials";

import useHookFormField from "src/squads/lesson/hooks/useHookFormField";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface FormSectionLessonMaterialProps {
    defaultMaterialsList?: LessonManagementUpsertFormType["materialsList"];
}

const FormSectionLessonMaterial = (props: FormSectionLessonMaterialProps) => {
    const [files, setFiles] = useHookFormField<
        LessonManagementUpsertFormType,
        LessonManagementUpsertFormType["materialsList"]
    >("materialsList", props.defaultMaterialsList || []);

    return (
        <FormUploadMaterials
            // TODO: refactor FormUploadMaterials to not require this anymore
            files={files as (Media | File)[]}
            onChange={setFiles}
            variant="outlined"
            isBrightCoveOptional
            formUploadFileProps={{ multiple: true }}
        />
    );
};

export default FormSectionLessonMaterial;
