import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import { User_StudentPackagesByListStudentIdV2QueryVariables } from "src/squads/lesson/service/fatima/fatima-types";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import { Order_By } from "src/squads/lesson/__generated__/bob/root-types";
import { studentPackages } from "src/squads/lesson/hooks/useCourseMapStudent/__mocks__";
import studentPackagesQueriesFatima from "src/squads/lesson/service/fatima/student-packages-service/student-packages-fatima.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("student-packages-fatima.query", () => {
    it("should query getList success", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: { student_packages: [studentPackages] },
        });
        reactiveStorage.set("PROFILE", user);

        const variables: User_StudentPackagesByListStudentIdV2QueryVariables = {
            student_ids: ["student id"],
            order_by: {
                end_at: Order_By.Desc,
                start_at: Order_By.Asc,
            },
        };

        const _callSpy = jest.spyOn(studentPackagesQueriesFatima, "_call");
        const result = await studentPackagesQueriesFatima.getList(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual([studentPackages]);
    });
});
