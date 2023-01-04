import { ArrayElement } from "src/common/constants/types";
import { NsUsermgmtStudentImportService } from "src/squads/user/service/usermgmt/student-import-service-usermgmt/types";

import {
    GenerateImportStudentTemplateResponse,
    ImportStudentResponse,
} from "manabuf/usermgmt/v2/student_pb";

export const importStudentTemplate =
    "Ym1GdFpTeGxiV0ZwYkN4bGJuSnZiR3h0Wlc1MFgzTjBZWFIxY3l4bmNtRmtaU3h3YUc5dVpWOXVkVzFpWlhJc1ltbHlkR2hrWVhrc1oyVnVaR1Z5TEd4dlkyRjBhVzl1Q25OMGRXUmxiblFnYm1GdFpTeHpkSFZrWlc1MFFHVnRZV2xzTG1OdmJTd3hMREVzTVRJek5EVTJOemc1TERJd01EQXZNREV2TURFc01TeE1NREU3VERBeQ==";

export const mockGenerateImportStudentTemplateResp = () => {
    const resp = new GenerateImportStudentTemplateResponse();
    resp.setData(importStudentTemplate);
    return resp;
};

export const mockImportStudentResponse = (
    error?: ArrayElement<NsUsermgmtStudentImportService.ImportStudentResp["errorsList"]>
) => {
    const resp = new ImportStudentResponse();
    const respError = new ImportStudentResponse.ImportStudentError();
    if (error) {
        respError.setError(error.error);
        respError.setRowNumber(error.rowNumber);
        resp.setErrorsList([respError]);
    }
    return resp;
};
