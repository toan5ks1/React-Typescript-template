import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetStudentsManyV3Query,
    Payment_GetStudentsManyV3QueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";

import studentsQueriesBob from "src/squads/payment/service/bob/students-service/students-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockStudentInfo = createMockStudentInfo();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetStudentsManyV3Query> = {
    data: {
        students: [mockStudentInfo],
    },
};

describe("Query students", () => {
    it("Get one student", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetStudentsManyV3QueryVariables = {
            studentIds: ["student_id_1"],
        };

        const result = await studentsQueriesBob.getOne(variables);

        expect(result).toEqual(mockStudentInfo);
    });
});
