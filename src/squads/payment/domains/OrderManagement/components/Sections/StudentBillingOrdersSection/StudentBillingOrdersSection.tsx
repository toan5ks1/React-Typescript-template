import { Entities } from "src/common/constants/enum";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import StudentBillingOrdersTable from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingOrdersTable";

import useStudentBillingOrders from "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingOrders";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const StudentBillingOrdersSection = ({
    studentId,
}: NsFatimaOrderService.RetrieveListOfOrderItemsRequest) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { studentBillingOrdersData, isLoadingStudentBillingOrders, pagination } =
        useStudentBillingOrders({ studentId });

    return (
        <Grid container item spacing={2}>
            <Grid item xs={12}>
                <TypographyBase variant="subtitle1">{tOrder("title.orders")}</TypographyBase>
            </Grid>
            <Grid item xs={12}>
                <StudentBillingOrdersTable
                    dataSource={studentBillingOrdersData?.itemsList}
                    loading={isLoadingStudentBillingOrders}
                    pagination={pagination}
                />
            </Grid>
        </Grid>
    );
};

export default StudentBillingOrdersSection;
