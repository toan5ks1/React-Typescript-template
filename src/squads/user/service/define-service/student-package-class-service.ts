import { User_StudentPackagesClassListWithFilterQueryVariables } from "src/squads/user/service/fatima/fatima-types";
import { studentPackageClassFatimaQuery } from "src/squads/user/service/fatima/student-package-class-fatima";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const studentPackageClassService = defineService({
    query: {
        userGetManyStudentPackageClassWithFilter: (
            variables: ListQuery<User_StudentPackagesClassListWithFilterQueryVariables>
        ) => {
            const { filter } = variables;
            return studentPackageClassFatimaQuery.getListWithFilter({
                student_id: filter?.student_id || "",
                student_package_ids: filter?.student_package_ids || [],
            });
        },
    },
});

export default studentPackageClassService;
