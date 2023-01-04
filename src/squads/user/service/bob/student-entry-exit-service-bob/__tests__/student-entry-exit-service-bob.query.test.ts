import graphqlClient from "src/squads/user/internals/hasura-client";

import studentEntryExitQueriesBob from "../student-entry-exit-service-bob.query";

const mockStudentQrMany = [{ qr_url: "qu_url", qr_id: 1, student_id: "id01" }];

jest.mock("@manabie-com/graphql-client");

describe("student-entry-exit-service-bob", () => {
    it("getMany method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                student_qr: mockStudentQrMany,
            },
        });
        const _callSpy = jest.spyOn(studentEntryExitQueriesBob, "_call");
        const result = await studentEntryExitQueriesBob.getMany({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockStudentQrMany);
        _callSpy.mockClear();
    });
});
