import { defineService } from "src/squads/user/service/service-creator";
import studentImportServiceUsermgmt from "src/squads/user/service/usermgmt/student-import-service-usermgmt";
import { NsUsermgmtStudentImportService } from "src/squads/user/service/usermgmt/student-import-service-usermgmt/types";

const studentImportService = defineService({
    mutation: {
        userGenerateImportTemplate: ({}) => {
            return studentImportServiceUsermgmt.generateImportStudentTemplate();
        },
        userImport: (variable: NsUsermgmtStudentImportService.ImportStudentReq) => {
            return studentImportServiceUsermgmt.importStudent(variable);
        },
    },
});

export default studentImportService;
