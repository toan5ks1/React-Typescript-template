import { QuizzesByExternalIdQueryVariables } from "src/squads/syllabus/services/eureka/eureka-types";

import quizQueries from "../quizzes-service-bob.query";
import { createMockDataQuizzesByExternalIdQueryRaw } from "./data";

const spyCallFn = () => {
    return jest.spyOn(quizQueries, "_call");
};

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    default: { isFeatureEnabled: jest.fn() },
}));

describe(quizQueries.getQuizzesByExternalId.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();
        const response = createMockDataQuizzesByExternalIdQueryRaw();
        const params: QuizzesByExternalIdQueryVariables = { external_id: "externalId" };

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await quizQueries.getQuizzesByExternalId(params);

        expect(result).toEqual(response.quizzes);
    });
});
