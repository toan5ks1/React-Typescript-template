import {
    User_CountSchoolCourseByIdsQuery,
    User_CountSchoolCourseByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { schoolCourseQueryService } from "src/squads/payment/service/bob/school-course-bob-service/school-course-query-service";

import schoolCourseQueryBob from "src/squads/payment/service/bob/school-course-bob-service/school-course-bob.query";

jest.mock(
    "src/squads/payment/service/bob/school-course-bob-service/school-course-bob.query",
    () => {
        return {
            __esModule: true,
            default: {
                countSchoolCourseByIds: jest.fn(),
            },
        };
    }
);

describe("schoolCourseQueryService", () => {
    it("countSchoolCourseByIds", async () => {
        const queryVariable: User_CountSchoolCourseByIdsQueryVariables = {
            schoolCourseIds: ["school-course-1"],
        };

        const mockReturnValue: User_CountSchoolCourseByIdsQuery["school_course_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (schoolCourseQueryBob.countSchoolCourseByIds as jest.Mock).mockResolvedValue(
            mockReturnValue
        );

        const response = await schoolCourseQueryService.query.userCountSchoolCourseByIds(
            queryVariable
        );

        expect(schoolCourseQueryBob.countSchoolCourseByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });
});
