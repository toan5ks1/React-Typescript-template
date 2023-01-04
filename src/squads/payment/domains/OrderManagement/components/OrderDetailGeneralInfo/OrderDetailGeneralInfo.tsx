import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { formatDate } from "src/common/utils/time";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";
import { getStudentName } from "src/squads/payment/helpers/student";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import {
    Payment_GetOrderByOrderIdQuery,
    Payment_GetLocationNameByLocationIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWithValue, {
    TypographyWithValueProps,
} from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

interface GeneralInfoElements
    extends Pick<TypographyWithValueProps, "label" | "value" | "dataTestidValue"> {}

export interface OrderDetailGeneralInfoProps {
    order: ArrayElement<Payment_GetOrderByOrderIdQuery["order"]>;
    locations?: ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>;
    student?: ArrayElement<Payment_GetStudentsManyV3Query["students"]>;
}

const OrderDetailGeneralInfo = ({ order, locations, student }: OrderDetailGeneralInfoProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const generalInfoOrderList = useMemo<GeneralInfoElements[]>(
        () => [
            {
                label: tOrder("label.orderNumber"),
                value: getOrderSequenceNumberPrefix(order.order_sequence_number),
                dataTestidValue: "OrderManagementGeneralInfo__orderNumberValue",
            },
            {
                label: tOrder("label.orderType"),
                value: order.order_type ? tOrder(`choices.orderType.${order.order_type}`) : "",
                dataTestidValue: "OrderManagementGeneralInfo__orderTypeValue",
            },
            {
                label: tOrder("label.studentName"),
                value: getStudentName(student?.user),
                dataTestidValue: "OrderManagementGeneralInfo__studentNameValue",
            },
            {
                label: tOrder("label.location"),
                value: convertString(locations?.name),
                dataTestidValue: "OrderManagementGeneralInfo__locationNameValue",
            },
            {
                label: tOrder("label.createdDate"),
                value: formatDate(order.created_at, "yyyy/LL/dd"),
                dataTestidValue: "OrderManagementGeneralInfo__createdDateValue",
            },
        ],
        [
            tOrder,
            order.order_sequence_number,
            order.order_type,
            student?.user,
            locations?.name,
            order.created_at,
        ]
    );

    return (
        <>
            <Box mb={0.5}>
                <TypographyBase variant="subtitle1">{tOrder("title.generalInfo")}</TypographyBase>
            </Box>
            <Grid container item xs={12}>
                {generalInfoOrderList.map(({ value, label, dataTestidValue }, index) => (
                    <Grid key={index} item xs={6}>
                        <Box mt={1.5}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={value}
                                label={label}
                                xsLabel={2}
                                xsValue={10}
                                dataTestidValue={dataTestidValue}
                                sxValue={(theme) => ({ paddingLeft: theme.spacing(3) })}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default OrderDetailGeneralInfo;
