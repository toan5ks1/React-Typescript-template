import { defineService } from "src/squads/user/service/service-creator";
import parentImportServiceUsermgmt from "src/squads/user/service/usermgmt/parent-import-service-usermgmt";
import { NsUsermgmtParentImportService } from "src/squads/user/service/usermgmt/parent-import-service-usermgmt/types";

const parentImportService = defineService({
    mutation: {
        userGenerateImportTemplate: ({}) => {
            return parentImportServiceUsermgmt.generateImportParentTemplate();
        },
        userImport: (variable: NsUsermgmtParentImportService.ImportParentsReq) => {
            return parentImportServiceUsermgmt.importParent(variable);
        },
    },
});

export default parentImportService;
