import { NsSyllabus_Master_ClassService } from "src/squads/syllabus/services/master/class-master-service/types";
import { defineService } from "src/squads/syllabus/services/service-creator";

import classServiceMaster from "src/squads/syllabus/services/master/class-master-service/class-master.mutation";

export const classMasterService = defineService({
    mutation: {
        classUpdate: (variables: NsSyllabus_Master_ClassService.UpdateClassRequest) => {
            return classServiceMaster.updateClass(variables);
        },

        classDelete: (variables: NsSyllabus_Master_ClassService.DeleteClassRequest) => {
            return classServiceMaster.deleteClass(variables);
        },
    },
});
