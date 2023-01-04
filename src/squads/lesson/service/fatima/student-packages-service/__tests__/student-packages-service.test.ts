import { User_StudentPackagesByListStudentIdV2QueryVariables } from "src/squads/lesson/service/fatima/fatima-types";
import { studentPackagesService } from "src/squads/lesson/service/fatima/student-packages-service/student-packages-service";
import { ListQuery } from "src/squads/lesson/service/service-types";

import { studentPackages } from "src/squads/lesson/hooks/useCourseMapStudent/__mocks__";
import studentPackagesQueriesFatima from "src/squads/lesson/service/fatima/student-packages-service/student-packages-fatima.query";

jest.mock(
    "src/squads/lesson/service/fatima/student-packages-service/student-packages-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getList: jest.fn(),
        },
    })
);

describe("student-packages-service", () => {
    it("should query studentPackagesGetList success", async () => {
        (studentPackagesQueriesFatima.getList as jest.Mock).mockResolvedValue(studentPackages);

        const variables: ListQuery<User_StudentPackagesByListStudentIdV2QueryVariables> = {
            filter: {
                student_ids: ["student id"],
            },
            sort: {
                end_at: "desc",
                start_at: "asc",
            },
        };

        const response = await studentPackagesService.query.studentPackagesGetList(variables);
        expect(studentPackagesQueriesFatima.getList).toBeCalledWith({
            order_by: {
                end_at: "desc",
                start_at: "asc",
            },
            student_ids: ["student id"],
        });
        expect(response).toEqual(studentPackages);
    });

    it("should not call studentPackagesGetList with invalid parameters", async () => {
        const invalidQueryVariable: ListQuery<User_StudentPackagesByListStudentIdV2QueryVariables> =
            {
                filter: {
                    student_ids: [],
                },
                sort: {
                    end_at: "desc",
                    start_at: "asc",
                },
            };

        await expect(async () => {
            await studentPackagesService.query.studentPackagesGetList(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentPackagesGetList",
            serviceName: "fatimaGraphQL",
            errors: [{ field: "student_ids" }],
            name: "InvalidParamError",
        });

        expect(studentPackagesQueriesFatima.getList).not.toBeCalled();
    });
});
