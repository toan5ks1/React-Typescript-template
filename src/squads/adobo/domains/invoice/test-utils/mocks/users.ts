import { Invoice_UsersQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

export const getUsersMock = (): Invoice_UsersQuery["users"] => [
    {
        user_id: "user_id_1",
        name: "Student Name",
    },
    {
        user_id: "student_id_1",
        name: "Student One",
    },
    {
        user_id: "student_id_2",
        name: "Student Two",
    },
    {
        user_id: "student_id_3",
        name: "Student Three",
    },
    {
        user_id: "student_id_4",
        name: "Student Four",
    },
    {
        user_id: "student_id_5",
        name: "Student Five",
    },
];
