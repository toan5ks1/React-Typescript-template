import { useCallback, useMemo } from "react";

import { useHistory, useLocation } from "react-router";
import { Entities, Features, MutationMenus } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionByType } from "src/squads/payment/helpers/product-type";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import DoubleDash from "src/components/DoubleDash";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipProductListStatus from "src/squads/payment/components/ChipProductListStatus";

import {
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
    StudentProductLabel,
    StudentProductStatus,
} from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrderProductsResponse } from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import { useStudentBillingPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/student-billing";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

interface StudentProductDetails {
    status: StudentProductStatus;
    studentProductId: RetrieveListOfOrderProductsResponse.OrderProduct.AsObject["studentProductId"];
    studentProductLabel: RetrieveListOfOrderProductsResponse.OrderProduct.AsObject["studentProductLabel"];
    locationInfo?: RetrieveListOfOrderProductsResponse.OrderProduct.AsObject["locationInfo"];
}

interface StudentProductDetailsWithAction extends StudentProductDetails {
    action: MutationMenus;
}

const useColumns = ({
    studentId,
}: {
    studentId: NsFatimaOrderService.RetrieveListOfOrderProductsRequest["studentId"];
}) => {
    const history = useHistory();
    const location = useLocation();
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { currentCurrency } = getCurrentCurrency();

    const { getProductPluginsMap } = useStudentBillingPluginsContext();

    const { isEnabled: shouldShowUpdateOrder } = useFeatureToggle(
        Features.PAYMENT_UPDATE_ORDER_UPSERT
    );

    const onUpdateOrderClick = useCallback(
        ({
            status,
            studentProductId,
            studentProductLabel,
            locationInfo,
        }: StudentProductDetails): void => {
            switch (status) {
                case StudentProductStatus.CANCELLED:
                case StudentProductStatus.PENDING:
                    showSnackbar(tOrder("message.error.invalidProductUpdate"), "error");
                    break;
                case StudentProductStatus.ORDERED:
                    if (
                        studentProductLabel === StudentProductLabel.WITHDRAWAL_SCHEDULED ||
                        studentProductLabel === StudentProductLabel.GRADUATION_SCHEDULED
                    ) {
                        showSnackbar(
                            tOrder("message.error.withdrawalOrGraduationProductUpdate"),
                            "error"
                        );
                        break;
                    }

                    if (studentProductLabel === StudentProductLabel.UPDATE_SCHEDULED) {
                        showSnackbar(tOrder("message.error.updateScheduledError"), "error");
                        break;
                    }

                    history.push({
                        pathname: `/${MicroFrontendTypes.PAYMENT}/orders/update`,
                        search: `?studentId=${studentId}&studentProductId=${studentProductId}&locationId=${locationInfo?.locationId}&redirectUrl=${location.pathname}${location.search}`,
                    });
                    break;
            }
        },
        [history, location.pathname, location.search, showSnackbar, studentId, tOrder]
    );

    const actions: Action<MutationMenus>[] = useMemo(
        () => [
            ...(shouldShowUpdateOrder
                ? [
                      {
                          action: MutationMenus.UPDATE,
                          label: t("ra.common.action.update"),
                          withConfirm: false,
                      },
                  ]
                : []),
        ],
        [shouldShowUpdateOrder, t]
    );

    const onAction = useCallback(
        ({
            action,
            status,
            studentProductId,
            locationInfo,
            studentProductLabel,
        }: StudentProductDetailsWithAction) => {
            switch (action) {
                case MutationMenus.UPDATE:
                    onUpdateOrderClick({
                        status,
                        studentProductId,
                        locationInfo,
                        studentProductLabel,
                    });
                    break;
                default:
                    return;
            }
        },
        [onUpdateOrderClick]
    );

    const columns: TableColumn<RetrieveListOfOrderProductsResponse.OrderProduct.AsObject>[] =
        useMemo(
            () => [
                {
                    key: "location",
                    title: tOrder("column.location"),
                    render: ({ locationInfo }) => {
                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="StudentBillingProductListTable__location"
                            >
                                {convertString(locationInfo?.locationName)}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "10%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "productDetails",
                    title: tOrder("column.productDetails"),
                    render: ({
                        productName,
                        discountInfo,
                        courseItemsList,
                        productType,
                        materialType,
                        feeType,
                        packageType,
                        studentProductLabel,
                        updatedToStudentProductId,
                    }) => {
                        const productAndProductExtensionType = getProductAndProductExtensionByType({
                            productType: getEnumString(ProductType, productType),
                            materialType:
                                KeyProductMaterialTypes[getEnumString(MaterialType, materialType)],
                            feeType: KeyProductFeeTypes[getEnumString(FeeType, feeType)],
                            packageType:
                                KeyProductPackageTypes[getEnumString(PackageType, packageType)],
                        });

                        const { ProductDetailsProductListCell } = getProductPluginsMap(
                            productAndProductExtensionType
                        );

                        return (
                            <ProductDetailsProductListCell
                                productName={productName}
                                discountName={discountInfo?.discountName}
                                courseItemsList={courseItemsList}
                                studentProductLabel={studentProductLabel}
                                updatedToStudentProductId={updatedToStudentProductId}
                            />
                        );
                    },
                    cellProps: {
                        style: {
                            width: "22%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "status",
                    title: tOrder("column.status"),
                    render: ({ status }) => {
                        return (
                            <ChipProductListStatus
                                data-testid="StudentBillingProductListTable__status"
                                status={status}
                            />
                        );
                    },
                    cellProps: {
                        style: {
                            width: "10%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "duration",
                    title: tOrder("column.duration"),
                    render: ({ duration, materialType, feeType }) => {
                        const materialTypeEnum =
                            KeyProductMaterialTypes[getEnumString(MaterialType, materialType)];
                        const feeTypeEnum = KeyProductFeeTypes[getEnumString(FeeType, feeType)];

                        if (
                            !duration ||
                            materialTypeEnum === "MATERIAL_TYPE_ONE_TIME" ||
                            feeTypeEnum === "FEE_TYPE_ONE_TIME"
                        ) {
                            return (
                                <TypographyBase
                                    variant="body2"
                                    color="textSecondary"
                                    data-testid="StudentBillingProductListTable__duration"
                                >
                                    <DoubleDash />
                                </TypographyBase>
                            );
                        }

                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="StudentBillingProductListTable__duration"
                            >
                                {`${formatDate(
                                    convertTimestampToDate(duration.from),
                                    "yyyy/LL/dd"
                                )} - ${formatDate(
                                    convertTimestampToDate(duration.to),
                                    "yyyy/LL/dd"
                                )}`}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "18%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "upcomingBillingDate",
                    title: tOrder("column.upcomingBillingDate"),
                    render: ({ upcomingBillingDate }) => {
                        if (!upcomingBillingDate) {
                            return (
                                <TypographyBase
                                    variant="body2"
                                    color="textSecondary"
                                    data-testid="StudentBillingProductListTable__upcomingBillingDate"
                                >
                                    <DoubleDash />
                                </TypographyBase>
                            );
                        }

                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="StudentBillingProductListTable__upcomingBillingDate"
                            >
                                {formatDate(
                                    convertTimestampToDate(upcomingBillingDate),
                                    "yyyy/LL/dd"
                                )}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "15%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "amount",
                    title: tOrder("column.amount"),
                    render: ({ amount }) => {
                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="StudentBillingProductListTable__amount"
                            >
                                {getFormattedItemPrice(currentCurrency, false, amount)}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "11%",
                            textAlign: "right",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "action",
                    title: tOrder("column.action"),
                    render: ({ status, studentProductId, locationInfo, studentProductLabel }) => {
                        return (
                            <ActionPanel
                                recordName=""
                                style={{ justifyContent: "center" }}
                                actions={actions}
                                onAction={(action: MutationMenus) => {
                                    onAction({
                                        action,
                                        status,
                                        studentProductId,
                                        locationInfo,
                                        studentProductLabel,
                                    });
                                }}
                            />
                        );
                    },
                    cellProps: {
                        style: {
                            width: "9%",
                            textAlign: "center",
                            verticalAlign: "top",
                            padding: 4,
                        },
                        headerStyle: {
                            textAlign: "center",
                            verticalAlign: "center",
                        },
                    },
                },
            ],
            [tOrder, getProductPluginsMap, currentCurrency, actions, onAction]
        );

    return columns;
};

export interface StudentBillingProductListTableProps {
    studentId: NsFatimaOrderService.RetrieveListOfOrderProductsRequest["studentId"];
    dataSource?: RetrieveListOfOrderProductsResponse.OrderProduct.AsObject[];
    loading: boolean;
    pagination: PaginationWithTotal;
}

export const StudentBillingProductListTable = ({
    studentId,
    dataSource,
    loading,
    pagination,
}: StudentBillingProductListTableProps) => {
    const columns = useColumns({ studentId });

    return (
        <TableBase
            tableProps={{
                "data-testid": "StudentBillingProductListTable__root",
            }}
            data={dataSource ?? []}
            columns={columns}
            withIndex={{ width: "5%" }}
            styleIndexCol={{ verticalAlign: "top" }}
            body={{
                loading,
                rowKey: "index",
                pagination,
            }}
            footer={{ pagination }}
        />
    );
};

export default StudentBillingProductListTable;
