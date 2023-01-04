import { useCallback, useMemo, useState } from "react";

import { DateTime } from "luxon";
import { Entities, ModeOpenDialog, MutationMenus, Features } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import {
    inferQueryPagination,
    inferQueryPaginationBob,
} from "src/squads/adobo/domains/entry-exit/services/infer-service";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import DateFilter, {
    DateFilterRange,
    getEndDate,
} from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/components/DateFilter";
import DialogUpsertEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/components/DialogUpsertEntryExitRecord/";
import TranslationProvider from "src/squads/adobo/domains/entry-exit/providers/TranslationProvider";

import { Maybe } from "src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/root-types";
import useFeatureToggle from "src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate";
import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";
import useAddEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useAddEntryExitRecord";
import useDeleteEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useDeleteEntryExitRecord";
import useEditEntryExitRecord from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useEditEntryExitRecord";

interface StudentEntryExitProps {
    studentId: string;
    enrollmentStatus?: string;
}

export interface StudentEntryExitRecord {
    entry_at: any;
    entryexit_id: number;
    exit_at?: Maybe<any>;
    student_id: string;
}

const StudentEntryExitComponent = ({ studentId, enrollmentStatus }: StudentEntryExitProps) => {
    const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);
    const t = useTranslate();
    const [openAddRecord, setOpenAddRecord] = useState(false);
    const [toDeleteRecord, setToDeleteRecord] = useState<StudentEntryExitRecord | null>(null);

    const [openEditRecord, setOpenEditRecord] = useState(false);
    const [toEditRecord, setToEditRecord] = useState<StudentEntryExitRecord | null>(null);

    const { addEntryExitRecord, isLoading: isLoadingAdd } = useAddEntryExitRecord();
    const { editEntryExitRecord, isLoading: isLoadingEdit } = useEditEntryExitRecord();
    const { deleteEntryExitRecord } = useDeleteEntryExitRecord();

    const isPotentialOrEnrolled =
        enrollmentStatus === "STUDENT_ENROLLMENT_STATUS_ENROLLED" ||
        enrollmentStatus === "STUDENT_ENROLLMENT_STATUS_POTENTIAL";

    const { isEnabled: shouldUseEntryExitMgmtQueries } = useFeatureToggle(
        Features.ENTRY_EXIT_MANAGEMENT_USE_ENTRYEXITMGMT_QUERIES
    );

    const inferQueryPaginationV2 = shouldUseEntryExitMgmtQueries
        ? inferQueryPagination
        : inferQueryPaginationBob;

    const OLD_DATE = 0;
    const currentMonth = DateTime.local().month;
    const [dateFilterRange, setDateFilterRange] = useState<DateFilterRange>({
        startDate: new Date(OLD_DATE).toISOString(), //1970-01-01T00:00:00.000Z
        endDate: getEndDate(currentMonth),
    });

    const {
        data: studentEntryExitRecords = [],
        pagination: pagination,
        result: { isLoading: isLoadingRecords, refetch },
    } = inferQueryPaginationV2({
        entity: "studentEntryExit",
        action: "entryExitGetManyStudentRecordsByDate",
    })(
        {
            filter: {
                student_id: studentId,
                start_date: dateFilterRange?.startDate,
                end_date: dateFilterRange?.endDate,
            },
        },
        { enabled: true }
    );

    const actions: Action[] = useMemo(() => {
        return [
            { action: MutationMenus.EDIT },
            { action: MutationMenus.DELETE, withConfirm: false },
        ];
    }, []);

    // default values if mode is ADD
    let defaultValues: EntryExitRecordFormData = {
        entryDate: new Date(),
        entryTime: new Date(),
        exitTime: null,
        studentId: studentId,
        notifyParents: false,
    };

    const onAction = useCallback(
        (actionName: MutationMenus, record: StudentEntryExitRecord) => {
            switch (actionName) {
                case MutationMenus.EDIT:
                    setToEditRecord(record);
                    return setOpenEditRecord(true);

                case MutationMenus.DELETE:
                    return setToDeleteRecord(record);
            }
        },
        [setToDeleteRecord]
    );

    const handleAddRecord = (formData: EntryExitRecordFormData) => {
        formData.studentId = studentId;
        return addEntryExitRecord(formData, {
            onSuccess: () => {
                void refetch();
                setOpenAddRecord(false);
            },
        });
    };

    const getRecordValues = () => {
        if (toEditRecord) {
            const record: StudentEntryExitRecord = toEditRecord;

            const entryAt = new Date(record.entry_at);

            const recordValues: EntryExitRecordFormData = {
                entryDate: entryAt,
                entryTime: entryAt,
                exitTime: null,
                studentId: record.student_id,
                notifyParents: false,
            };

            if (toEditRecord.exit_at) {
                const exitAt = new Date(record.exit_at);
                recordValues.exitTime = exitAt;
            }

            return recordValues;
        }

        return defaultValues;
    };

    const handleEditRecord = (updatedFormData: EntryExitRecordFormData) => {
        if (toEditRecord) {
            const record: StudentEntryExitRecord = toEditRecord;
            updatedFormData.studentId = studentId;

            return editEntryExitRecord(
                {
                    updatedFormData: updatedFormData,
                    entryExitId: record.entryexit_id,
                },
                {
                    onSuccess: () => {
                        void refetch();
                        setOpenEditRecord(false);
                    },
                }
            );
        }
    };

    const handleDeleteRecord = () => {
        // keep if statement here to remove error, since record can be null
        if (toDeleteRecord) {
            const record: StudentEntryExitRecord = toDeleteRecord;

            return deleteEntryExitRecord(
                {
                    entryexitId: record.entryexit_id,
                    studentId: record.student_id,
                },
                {
                    onSuccess: () => {
                        setToDeleteRecord(null);
                        void refetch();
                    },
                }
            );
        }
    };

    const columns: TableColumn<StudentEntryExitRecord>[] = useMemo(
        () => [
            {
                key: "date",
                title: tEntryExit("columns.date"),
                cellProps: {
                    "data-testid": "StudentEntryExitRecordsTableCell__columnDate",
                },
                render: (record: StudentEntryExitRecord) => {
                    const recordDate = formatDate(record.entry_at, "yyyy/LL/dd");
                    return (
                        <TypographyBase variant="body2" data-testid="EntryExitRecord__date">
                            {recordDate}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "entryTime",
                title: tEntryExit("columns.entryTime"),
                cellProps: {
                    "data-testid": "StudentEntryExitRecordsTableCell__columnEntryTime",
                },
                render: (record: StudentEntryExitRecord) => {
                    const timeEntry = formatDate(record.entry_at, "HH:mm");
                    return (
                        <TypographyBase variant="body2" data-testid="EntryExitRecord__entryTime">
                            {timeEntry}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "exitTime",
                title: tEntryExit("columns.exitTime"),
                cellProps: {
                    "data-testid": "StudentEntryExitRecordsTableCell__columnExitTime",
                },
                render: (record: StudentEntryExitRecord) => {
                    const timeExitAt = record.exit_at ? formatDate(record.exit_at, "HH:mm") : "--";
                    return (
                        <TypographyBase variant="body2" data-testid="EntryExitRecord__exitTime">
                            {timeExitAt}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "action",
                title: tEntryExit("columns.action"),
                cellProps: {
                    align: "center",
                    "data-testid": "StudentEntryExitRecordsTableCell__columnAction",
                },
                render: (record: StudentEntryExitRecord) => {
                    return (
                        <ActionPanel
                            loading={isLoadingRecords}
                            onAction={onAction}
                            record={record}
                            actions={actions}
                            recordName={record.entryexit_id}
                            style={{
                                justifyContent: "center",
                            }}
                            disables={{
                                edit: !isPotentialOrEnrolled,
                                delete: !isPotentialOrEnrolled,
                            }}
                        />
                    );
                },
            },
        ],
        [actions, tEntryExit, isLoadingRecords, onAction, isPotentialOrEnrolled]
    );

    const { isEnabled: shouldEnableEntryExitManagementDateFilter } = useFeatureToggle(
        Features.ENTRY_EXIT_MANAGEMENT_DATE_FILTER
    );

    return (
        <>
            <Box
                mt={3}
                data-testid="StudentEntryExit"
                mb={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <TypographyBase data-testid="StudentEntryExit__title" variant="h6">
                    {tEntryExit("history")}
                </TypographyBase>
                <ButtonCreate
                    onClick={() => setOpenAddRecord(true)}
                    data-testid="StudentEntryExit__btnAdd"
                    disabled={!isPotentialOrEnrolled}
                >
                    {t("ra.common.action.add")}
                </ButtonCreate>
            </Box>
            {shouldEnableEntryExitManagementDateFilter ? (
                <DateFilter setDateFilterRange={setDateFilterRange} />
            ) : null}
            <TableBase
                data={studentEntryExitRecords}
                body={{
                    rowKey: "entryexit_id",
                    loading: isLoadingRecords,
                    pagination: pagination,
                }}
                withIndex
                columns={columns}
                tableProps={{
                    "data-testid": "StudentEntryExit__table",
                }}
                {...(studentEntryExitRecords.length
                    ? {
                          footer: {
                              pagination,
                          },
                      }
                    : null)}
            />
            {openAddRecord ? (
                <DialogUpsertEntryExitRecord
                    open={openAddRecord}
                    onClose={() => {
                        setOpenAddRecord(false);
                    }}
                    onSave={handleAddRecord}
                    mode={ModeOpenDialog.ADD}
                    defaultValues={defaultValues}
                    loading={isLoadingAdd}
                />
            ) : null}
            {openEditRecord ? (
                <DialogUpsertEntryExitRecord
                    open={openEditRecord}
                    onClose={() => {
                        setOpenEditRecord(false);
                    }}
                    onSave={handleEditRecord}
                    mode={ModeOpenDialog.EDIT}
                    defaultValues={getRecordValues()}
                    loading={isLoadingEdit}
                />
            ) : null}
            {!!toDeleteRecord ? (
                <DialogCancelConfirm
                    open={!!toDeleteRecord}
                    onClose={() => {
                        setToDeleteRecord(null);
                    }}
                    onSave={handleDeleteRecord}
                    title={tEntryExit("deleteConfirm.title")}
                    textCancelDialog={tEntryExit("deleteConfirm.message")}
                />
            ) : null}
        </>
    );
};

const StudentEntryExit = ({ studentId, enrollmentStatus }: StudentEntryExitProps) => {
    return (
        <TranslationProvider>
            <StudentEntryExitComponent studentId={studentId} enrollmentStatus={enrollmentStatus} />
        </TranslationProvider>
    );
};

export default StudentEntryExit;
