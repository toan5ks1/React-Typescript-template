import { coursesService } from "src/squads/payment/service/fatima/courses-service/courses-service";
import { Payment_GetManyCourseByCourseIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockCourseList } from "src/squads/payment/test-utils/mocks/package-course";

import courseQueriesFatima from "src/squads/payment/service/fatima/courses-service/courses-fatima.query";

jest.mock("src/squads/payment/service/fatima/courses-service/courses-fatima.query", () => ({
    __esModule: true,
    default: {
        getManyCourseByCourseIds: jest.fn(),
    },
}));

describe("Course service", () => {
    it("should return courses when calling getManyCourseByCourseIds", async () => {
        const mockCourseList = createMockCourseList();
        (courseQueriesFatima.getManyCourseByCourseIds as jest.Mock).mockResolvedValue(
            mockCourseList
        );

        const queryVariable: Payment_GetManyCourseByCourseIdsQueryVariables = {
            course_ids: ["course_id_1", "course_id_2"],
        };

        const response = await coursesService.query.paymentGetManyCoursesByCourseIds(queryVariable);

        expect(courseQueriesFatima.getManyCourseByCourseIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockCourseList);
    });

    it("should throw an error when calling getManyCourseByCourseIds with empty course_ids", async () => {
        const mockCourseList = createMockCourseList();
        (courseQueriesFatima.getManyCourseByCourseIds as jest.Mock).mockResolvedValue(
            mockCourseList
        );

        const queryVariable: Partial<Payment_GetManyCourseByCourseIdsQueryVariables> = {
            course_ids: [],
        };

        await expect(async () => {
            await coursesService.query.paymentGetManyCoursesByCourseIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyCoursesByCourseIds",
                errors: [{ field: "course_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(courseQueriesFatima.getManyCourseByCourseIds).not.toBeCalled();
    });
});
