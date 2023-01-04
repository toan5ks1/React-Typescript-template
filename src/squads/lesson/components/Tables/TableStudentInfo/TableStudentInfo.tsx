import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import {
    DynamicAutocompleteOptionProps,
    LessonManagementStudentInfo,
    StudentAttendStatusKeys,
    StudentAttendStatusType,
} from "src/squads/lesson/common/types";

import { Close as CloseIcon } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import TableWithCheckbox, {
    TableBaseProps,
    TableColumn,
} from "src/components/Table/TableWithCheckbox";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import AutocompleteAttendanceStatus from "src/squads/lesson/components/Autocompletes/AutocompleteAttendanceStatus";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import useGetStudentGradeNameByCountry from "src/squads/lesson/hooks/useGetStudentGradeNameByCountry";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";
import useGetManyLocations from "src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations";

export interface TableStudentInfoProps {
    studentsList: LessonManagementStudentInfo[];
    updateStudentAttendance: (
        studentSubscriptionId: LessonManagementStudentInfo["studentSubscriptionId"],
        newAttendanceValue: StudentAttendStatus
    ) => void;
    onSelect?: (list: LessonManagementStudentInfo[]) => void;
    selectedStudentsList: LessonManagementStudentInfo[];
    errorMessage: TableBaseProps<LessonManagementUpsertFormType>["errorMessage"];
}

const TableStudentInfo = (props: TableStudentInfoProps) => {
    const { studentsList, updateStudentAttendance, onSelect, selectedStudentsList, errorMessage } =
        props;
    const isLoadingData = false;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const t = useTranslate();

    const { getStudentGradeName } = useGetStudentGradeNameByCountry();

    const locationIdsList = useMemo(() => {
        return studentsList.reduce((locationIds: string[], student) => {
            const locationId = student?.locationId;
            if (locationId) locationIds.push(locationId);

            return locationIds;
        }, []);
    }, [studentsList]);

    const { data: centers, isLoading: isLoadingCenters } = useGetManyLocations(locationIdsList);

    const columns: TableColumn<LessonManagementStudentInfo>[] = useMemo(() => {
        return [
            {
                key: "name",
                title: tLessonManagement("columns.studentName"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="TableStudentInfo__columnStudentName"
                    >
                        {record.student.studentName}
                        {/* There might be some chips here in the future */}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "29%",
                    },
                },
            },
            {
                key: "grade",
                title: tLessonManagement("columns.grade"),
                render: (record) => (
                    <TypographyPrimary variant="body2" data-testid="TableStudentInfo__columnGrade">
                        {t(getStudentGradeName(record.grade) || "")}
                    </TypographyPrimary>
                ),
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
            },
            {
                key: "course",
                title: tLessonManagement("course"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="TableStudentInfo__columnCourseName"
                    >
                        {record.course.courseName}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "23%",
                    },
                },
            },
            {
                key: "attendance",
                title: tLessonManagement("attendance"),
                render: (record, index) => {
                    if (index === undefined) return;

                    const attendanceStatusValue =
                        Object.keys(StudentAttendStatusKeys)[record.attendanceStatus];

                    const emptyStatus: StudentAttendStatusType = "STUDENT_ATTEND_STATUS_EMPTY";

                    const autocompleteValue: DynamicAutocompleteOptionProps | null =
                        attendanceStatusValue === emptyStatus
                            ? null
                            : {
                                  key: attendanceStatusValue,
                                  label: tLessonManagement(
                                      `studentAttendanceStatus.${attendanceStatusValue}`
                                  ),
                              };

                    return (
                        <AutocompleteAttendanceStatus
                            value={autocompleteValue}
                            onChange={(statusOption) =>
                                updateStudentAttendance(
                                    record.studentSubscriptionId,
                                    StudentAttendStatus[statusOption.key]
                                )
                            }
                            data-testid="TableStudentInfo__autocompleteAttendance"
                            limitChipText="Ellipsis"
                            disableClearable={false}
                            clearIcon={<CloseIcon fontSize="small" />}
                            componentsProps={{
                                clearIndicator: {
                                    // @ts-ignore:next-line
                                    "data-testid": "TableStudentInfo__iconClear",
                                    onClick: () => {
                                        return updateStudentAttendance(
                                            record.studentSubscriptionId,
                                            StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY
                                        );
                                    },
                                },
                            }}
                            getOptionSelectedField="key"
                        />
                    );
                },
            },
            {
                key: "center",
                title: tLessonManagement("columns.center"),
                render: (record) => {
                    if (isLoadingCenters) return <Skeleton />;

                    const locationId = record?.locationId || "";
                    const location = centers.find((center) => center.location_id === locationId);

                    return (
                        location && (
                            <TypographyMaxLines
                                maxLines={2}
                                variant="body2"
                                data-testid="TableStudentInfo__columnCenterName"
                            >
                                {location.name}
                            </TypographyMaxLines>
                        )
                    );
                },
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
            },
        ];
    }, [
        centers,
        getStudentGradeName,
        isLoadingCenters,
        tLessonManagement,
        updateStudentAttendance,
        t,
    ]);

    return (
        <TableWithCheckbox<LessonManagementStudentInfo>
            errorMessage={errorMessage}
            tableProps={{
                "data-testid": "TableStudentInfo__root",
            }}
            columns={columns}
            showHeader={true}
            body={{
                loading: isLoadingData,
                skeCount: 3,
                rowKey: "studentSubscriptionId",
            }}
            data={studentsList}
            onSelect={onSelect ? onSelect : undefined}
            listSelectedItems={selectedStudentsList}
            withIndex
        />
    );
};

export default TableStudentInfo;
