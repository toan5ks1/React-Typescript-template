import { KeyCountries, UserRoles } from "src/common/constants/const";
import { KeyStudentEnrollmentStatusTypes } from "src/squads/payment/constants/const";
import {
    Payment_GetStudentsManyV3Query,
    UserNameByIdsQuery,
} from "src/squads/payment/service/bob/bob-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

export const createMockStudentInfo = (
    index: number = 1
): ArrayElement<Payment_GetStudentsManyV3Query["students"]> => ({
    enrollment_status: KeyStudentEnrollmentStatusTypes.STUDENT_ENROLLMENT_STATUS_ENROLLED,
    student_id: `student_id_${index}`,
    student_note: "student note",
    current_grade: 1,
    user: {
        country: KeyCountries.COUNTRY_VN,
        email: "test-email@test.com",
        last_name: "test",
        first_name: "name",
        user_group: UserRoles.USER_GROUP_STUDENT,
        user_id: `student_id_${index}`,
    },
});

export const createMockUsersList = (): UserNameByIdsQuery["users"] => {
    return [
        {
            user_id: "user_id_1",
            name: "user 1",
        },
        {
            user_id: "user_id_2",
            name: "user 2",
        },
        {
            user_id: "user_id_3",
            name: "user 3",
        },
        {
            user_id: "user_id_4",
            name: "user 4",
        },
        {
            user_id: "user_id_5",
            name: "user 5",
        },
    ];
};
