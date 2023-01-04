import { KeyStudentProductStatus } from "src/squads/payment/constants/const";
import { Payment_GetManyStudentProductsByStudentProductIdsV2Query } from "src/squads/payment/service/fatima/fatima-types";

export const createMockStudentProducts =
    (): Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"] => {
        return [
            {
                approval_status: "approved",
                end_date: "2022-08-17T23:00:00+00:00",
                location_id: "location_id_1",
                product_id: "product_id_1",
                product_status: KeyStudentProductStatus.ORDERED,
                start_date: "2022-01-17T23:00:00+00:00",
                student_id: "student_id_1",
                student_product_id: "student_product_id_1",
                upcoming_billing_date: "2022-01-17T23:00:00+00:00",
            },
            {
                approval_status: "approved",
                end_date: "2022-08-17T23:00:00+00:00",
                location_id: "location_id_2",
                product_id: "product_id_2",
                product_status: KeyStudentProductStatus.ORDERED,
                start_date: "2022-01-17T23:00:00+00:00",
                student_id: "student_id_2",
                student_product_id: "student_product_id_2",
                upcoming_billing_date: "2022-01-17T23:00:00+00:00",
            },
        ];
    };
