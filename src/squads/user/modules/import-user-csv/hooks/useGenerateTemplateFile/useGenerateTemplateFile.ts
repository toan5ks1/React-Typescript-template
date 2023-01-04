import { handleUnknownError } from "src/common/utils/error";
import { ModeImportUserTypes } from "src/squads/user/common/types";
import { downloadCsvFromBase64 } from "src/squads/user/common/utils/cvs";
import { inferMutation } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface useGenerateTemplateFileReturn {
    downloadStudentTemplateFile: () => Promise<void>;
    isLoading: boolean;
}

export default function useGenerateTemplateFile(mode: ModeImportUserTypes) {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { mutateAsync, isLoading } = inferMutation({
        entity: mode === "IMPORT_STUDENT_CSV" ? "studentImport" : "parentImport",
        action: "userGenerateImportTemplate",
    })();

    const fileName =
        mode === "IMPORT_STUDENT_CSV" ? "import-student-template" : "import-parent-template";

    const generateTemplate = async () => {
        try {
            const data = await mutateAsync({});
            downloadCsvFromBase64({ data: data, nameFile: fileName });
        } catch (error) {
            const err = handleUnknownError(error);
            showSnackbar(t(err.message), "error");
        }
    };

    return { generateTemplate, isLoading };
}
