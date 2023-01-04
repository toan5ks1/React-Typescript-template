import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { PaginationWithTotal } from "src/squads/lesson/service/service-creator";

import { Skeleton, Box } from "@mui/material";
import NoResultPage from "src/components/NoResultPage";
import { StyleKeys, TableColumn } from "src/components/Table";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TableBaseTableObserveVisible from "src/squads/lesson/components/Tables/TableObserveVisible/TableBaseTableObserveVisible";
import TypographyMaxLines from "src/squads/lesson/components/Typographys/TypographyMaxLines";
import ChipAssignedStudentStatus from "src/squads/lesson/domains/AssignedStudentList/components/ChipAssignedStudentStatus";

import {
    AssignedStudentItem,
    AssignedStudentListTypes,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface TableAssignedStudentWithPagingProps {
    assignedStudentsList: AssignedStudentItem[];
    pagination: PaginationWithTotal;
    tableAssignedStudentType: AssignedStudentListTypes;
    isLoadingAssignedStudentList: boolean;
    isLoadingStudent: boolean;
    isLoadingCourse: boolean;
    isLoadingLocation: boolean;
    isFiltered: boolean;
}

const styles: Partial<StyleKeys> = {
    table: {
        width: "105%",
    },
};

const TableAssignedStudentWithPaging = (props: TableAssignedStudentWithPagingProps) => {
    const {
        assignedStudentsList,
        pagination,
        tableAssignedStudentType,
        isLoadingAssignedStudentList,
        isLoadingStudent,
        isLoadingCourse,
        isLoadingLocation,
        isFiltered,
    } = props;

    const tAssignedStudent = useResourceTranslate(ERPModules.ASSIGNED_STUDENT_LIST);

    const renderTypographyWithLoading = (
        isLoading: boolean,
        value: string = "",
        testId: string,
        textColor?: string
    ) => {
        if (isLoading)
            return <Skeleton data-testid="TableAssignedStudentWithPaging__loadingSkeleton" />;

        return (
            <TypographyMaxLines variant="body2" maxLines={2} data-testid={testId} color={textColor}>
                {value}
            </TypographyMaxLines>
        );
    };

    const columns: TableColumn<AssignedStudentItem>[] = useMemo(() => {
        return [
            {
                title: tAssignedStudent("columns.colStudentName"),
                key: "colStudentName",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
                render: (record) =>
                    renderTypographyWithLoading(
                        isLoadingStudent,
                        record.studentName,
                        "TableAssignedStudentWithPaging__studentName"
                    ),
            },
            {
                title: tAssignedStudent("columns.colCourseName"),
                key: "colCourseName",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
                render: (record) =>
                    renderTypographyWithLoading(
                        isLoadingCourse,
                        record.courseName,
                        "TableAssignedStudentWithPaging__courseName"
                    ),
            },
            {
                title: tAssignedStudent("columns.colLocation"),
                key: "colLocation",
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
                render: (record) =>
                    renderTypographyWithLoading(
                        isLoadingLocation,
                        record.locationName,
                        "TableAssignedStudentWithPaging__location"
                    ),
            },
            ...(tableAssignedStudentType === AssignedStudentListTypes.SLOT
                ? [
                      {
                          title: tAssignedStudent("columns.colDuration"),
                          key: "colDuration",
                          cellProps: {
                              style: {
                                  width: "18%",
                              },
                          },
                          render: (record: AssignedStudentItem) => (
                              <TypographyPrimary
                                  variant="body2"
                                  data-testid="TableAssignedStudentWithPaging__duration"
                              >
                                  {record.durationTime}
                              </TypographyPrimary>
                          ),
                      },
                  ]
                : [
                      {
                          title: tAssignedStudent("columns.colWeek"),
                          key: "colWeek",
                          cellProps: {
                              style: {
                                  width: "18%",
                              },
                          },
                          render: (record: AssignedStudentItem) => (
                              <TypographyPrimary
                                  variant="body2"
                                  data-testid="TableAssignedStudentWithPaging__week"
                              >
                                  {record.week}
                              </TypographyPrimary>
                          ),
                      },
                  ]),
            {
                title: tAssignedStudent("columns.colPurchasedSlot"),
                key: "colPurchasedSlot",
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
                render: (record) => (
                    <TypographyPrimary
                        variant="body2"
                        data-testid="TableAssignedStudentWithPaging__purchasedSlot"
                    >
                        {record.purchasedSlot}
                    </TypographyPrimary>
                ),
            },
            {
                title: tAssignedStudent("columns.colAssignedSlot"),
                key: "colAssignedSlot",
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
                render: (record) => (
                    <TypographyPrimary
                        variant="body2"
                        data-testid="TableAssignedStudentWithPaging__assignedSlot"
                    >
                        {record.assignedSlot}
                    </TypographyPrimary>
                ),
            },
            {
                title: tAssignedStudent("columns.colSlotGap"),
                key: "colSlotGap",
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
                render: (record) => (
                    <TypographyPrimary
                        variant="body2"
                        data-testid="TableAssignedStudentWithPaging__slotGap"
                    >
                        {record.slotGap}
                    </TypographyPrimary>
                ),
            },
            {
                title: tAssignedStudent("columns.colStatus"),
                key: "colStatus",
                cellProps: {
                    style: {
                        width: "12%",
                    },
                },
                render: (record) => {
                    return (
                        <ChipAssignedStudentStatus
                            data-testid="TableAssignedStudentWithPaging__status"
                            isLoading={false}
                            status={record.status}
                            label={record.status}
                        />
                    );
                },
            },
        ];
    }, [
        tAssignedStudent,
        tableAssignedStudentType,
        isLoadingStudent,
        isLoadingCourse,
        isLoadingLocation,
    ]);

    const shouldRenderFooter = !isFiltered && arrayHasItem(assignedStudentsList);
    const shouldRenderNoResult = isFiltered && !arrayHasItem(assignedStudentsList);

    return (
        <Box mt={2}>
            {!shouldRenderNoResult ? (
                <TableBaseTableObserveVisible
                    withIndex
                    data={assignedStudentsList}
                    columns={columns}
                    showHeader={true}
                    footer={shouldRenderFooter ? { pagination } : undefined}
                    styles={styles}
                    tableProps={{
                        "data-testid": "TableAssignedStudentWithPaging__root",
                    }}
                    body={{
                        rowKey: "id",
                        loading: isLoadingAssignedStudentList,
                        pagination: pagination,
                    }}
                />
            ) : (
                <Box pt={10}>
                    <NoResultPage />
                </Box>
            )}
        </Box>
    );
};

export default TableAssignedStudentWithPaging;
