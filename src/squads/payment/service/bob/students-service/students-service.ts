import { Payment_GetStudentsManyV3QueryVariables } from "src/squads/payment/service/bob/bob-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyArray } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import studentsQueriesBob from "src/squads/payment/service/bob/students-service/students-bob.query";

export const studentsService = defineService({
    query: {
        paymentGetOneStudent: ({ studentIds }: Payment_GetStudentsManyV3QueryVariables) => {
            if (isInvalidOrEmptyArray(studentIds)) {
                throw new InvalidParamError({
                    action: "paymentGetOneStudent",
                    errors: [{ field: "studentIds", fieldValueIfNotSensitive: studentIds }],
                    serviceName: "bobGraphQL",
                });
            }

            return studentsQueriesBob.getOne({ studentIds });
        },
        paymentGetManyStudents: ({ studentIds }: Payment_GetStudentsManyV3QueryVariables) => {
            if (isInvalidOrEmptyArray(studentIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyStudents",
                    errors: [{ field: "studentIds", fieldValueIfNotSensitive: studentIds }],
                    serviceName: "bobGraphQL",
                });
            }
            return studentsQueriesBob.getMany({ studentIds });
        },
    },

    mutation: {},
});
