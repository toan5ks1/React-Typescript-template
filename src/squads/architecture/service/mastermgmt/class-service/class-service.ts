import { defineService } from "src/squads/architecture/service/service-creator";

import classMutationServiceMaster from "src/squads/architecture/service/mastermgmt/class-service/class.mutation";

export const classServiceMaster = defineService({
    mutation: {
        classImport: (file: File) => {
            return classMutationServiceMaster.importClass(file);
        },
    },
});
