import { Entities } from "src/common/constants/enum";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import StudentBillingProductListTable from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingProductListTable";

import useStudentBillingProductList from "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingProductList/useStudentBillingProductList";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const StudentBillingProductListSection = ({
    studentId,
}: NsFatimaOrderService.RetrieveListOfOrderProductsRequest) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { studentBillingProductListData, isLoadingStudentBillingProductList, pagination } =
        useStudentBillingProductList({
            studentId,
        });

    return (
        <StudentBillingPluginsProvider>
            <Grid container item spacing={2}>
                <Grid item xs={12}>
                    <Box py={0.5}>
                        <TypographyBase variant="subtitle1">
                            {tOrder("title.productList")}
                        </TypographyBase>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <StudentBillingProductListTable
                        studentId={studentId}
                        dataSource={studentBillingProductListData?.itemsList}
                        loading={isLoadingStudentBillingProductList}
                        pagination={pagination}
                    />
                </Grid>
            </Grid>
        </StudentBillingPluginsProvider>
    );
};

export default StudentBillingProductListSection;
