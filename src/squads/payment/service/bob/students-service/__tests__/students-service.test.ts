import {
    Payment_GetStudentsManyV3Query,
    Payment_GetStudentsManyV3QueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { studentsService } from "src/squads/payment/service/bob/students-service/students-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import studentsQueriesBob from "src/squads/payment/service/bob/students-service/students-bob.query";

jest.mock("src/squads/payment/service/bob/students-service/students-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
        },
    };
});

describe("students-service", () => {
    it("should return student when calling paymentGetOneStudent", async () => {
        const mockId = "student_id_1";
        const queryVariable: Payment_GetStudentsManyV3QueryVariables = {
            studentIds: [mockId],
        };

        const mockQueryReturn: Payment_GetStudentsManyV3Query["students"] = [
            {
                enrollment_status: "withdrawn",
                student_id: mockId,
                student_note: "student note",
            },
        ];

        (studentsQueriesBob.getOne as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await studentsService.query.paymentGetOneStudent(queryVariable);

        expect(studentsQueriesBob.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });

    it("should throw an error if id is empty when calling paymentGetOneStudent", async () => {
        const queryVariable: Payment_GetStudentsManyV3QueryVariables = {
            studentIds: [],
        };

        await expect(async () => {
            await studentsService.query.paymentGetOneStudent(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetOneStudent",
                errors: [{ field: "id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "bobGraphQL",
            })
        );

        expect(studentsQueriesBob.getOne).not.toBeCalled();
    });
});
