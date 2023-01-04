import { Entities } from "src/common/constants/enum";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import StudentBillingBillingItemsTable from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingBillingItemsTable";

import useStudentBillingBillingItems from "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingBillingItems";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const StudentBillingBillingItemsSection = ({
    studentId,
}: NsFatimaOrderService.RetrieveListOfBillItemsRequest) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { studentBillingBillingItemsData, isLoadingStudentBillingBillingItems, pagination } =
        useStudentBillingBillingItems({ studentId });

    return (
        <StudentBillingPluginsProvider>
            <Grid container item spacing={2}>
                <Grid item xs={12}>
                    <TypographyBase variant="subtitle1">
                        {tOrder("title.billingItems")}
                    </TypographyBase>
                </Grid>
                <Grid item xs={12}>
                    <StudentBillingBillingItemsTable
                        dataSource={studentBillingBillingItemsData?.itemsList}
                        loading={isLoadingStudentBillingBillingItems}
                        pagination={pagination}
                    />
                </Grid>
            </Grid>
        </StudentBillingPluginsProvider>
    );
};

export default StudentBillingBillingItemsSection;
