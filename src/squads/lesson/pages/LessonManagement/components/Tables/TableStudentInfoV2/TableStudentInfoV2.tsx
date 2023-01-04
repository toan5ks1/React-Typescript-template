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

export interface TableStudentInfoV2Props {
    studentInfosList: LessonManagementStudentInfo[];
    updateStudentAttendance: (
        studentSubscriptionId: LessonManagementStudentInfo["studentSubscriptionId"],
        newAttendanceValue: StudentAttendStatus
    ) => void;
    onSelect?: (studentInfosList: LessonManagementStudentInfo[]) => void;
    selectedStudentInfosList: LessonManagementStudentInfo[];
    errorMessage: TableBaseProps<LessonManagementUpsertFormType>["errorMessage"];
}

const TableStudentInfoV2 = (props: TableStudentInfoV2Props) => {
    const {
        studentInfosList,
        updateStudentAttendance,
        onSelect,
        selectedStudentInfosList,
        errorMessage,
    } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const t = useTranslate();

    const { getStudentGradeName } = useGetStudentGradeNameByCountry();

    const locationIdsList = useMemo(() => {
        return studentInfosList.reduce((locationIds: string[], student) => {
            const locationId = student?.locationId;
            if (locationId) locationIds.push(locationId);

            return locationIds;
        }, []);
    }, [studentInfosList]);

    const { data: locations, isLoading: isLoadingLocations } = useGetManyLocations(locationIdsList);

    const columns: TableColumn<LessonManagementStudentInfo>[] = useMemo(() => {
        return [
            {
                key: "colStudentName",
                title: tLessonManagement("columns.studentName"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="TableStudentInfoV2__columnStudentName"
                    >
                        {record.student.studentName}
                    </TypographyMaxLines>
                ),
                cellProps: {
                    style: {
                        width: "29%",
                    },
                },
            },
            {
                key: "colGradeName",
                title: tLessonManagement("columns.grade"),
                render: (record) => (
                    <TypographyPrimary
                        variant="body2"
                        data-testid="TableStudentInfoV2__columnGrade"
                    >
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
                key: "colCourseName",
                title: tLessonManagement("course"),
                render: (record) => (
                    <TypographyMaxLines
                        maxLines={2}
                        variant="body2"
                        data-testid="TableStudentInfoV2__columnCourseName"
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
                key: "colAttendanceStatus",
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
                            data-testid="TableStudentInfoV2__autocompleteAttendance"
                            limitChipText="Ellipsis"
                            disableClearable={false}
                            clearIcon={<CloseIcon fontSize="small" />}
                            componentsProps={{
                                clearIndicator: {
                                    // @ts-ignore:next-line
                                    "data-testid": "TableStudentInfoV2__iconClear",
                                    onClick: () => {
                                        return updateStudentAttendance(
                                            record.studentSubscriptionId,
                                            StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY
                                        );
                                    },
                                },
                            }}
                            placeholder={tLessonManagement("attendance")}
                            getOptionSelectedField="key"
                        />
                    );
                },
            },
            {
                key: "colLocation",
                title: tLessonManagement("columns.location"),
                render: (record) => {
                    if (isLoadingLocations) return <Skeleton />;

                    const location = locations.find(
                        (center) => center.location_id === record.locationId
                    );

                    return (
                        location && (
                            <TypographyMaxLines
                                maxLines={2}
                                variant="body2"
                                data-testid="TableStudentInfoV2__columnCenterName"
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
        locations,
        getStudentGradeName,
        isLoadingLocations,
        tLessonManagement,
        updateStudentAttendance,
        t,
    ]);

    return (
        <TableWithCheckbox<LessonManagementStudentInfo>
            errorMessage={errorMessage}
            tableProps={{ "data-testid": "TableStudentInfoV2__root" }}
            columns={columns}
            showHeader={true}
            body={{ loading: false, skeCount: 3, rowKey: "studentSubscriptionId" }}
            data={studentInfosList}
            onSelect={onSelect || undefined}
            listSelectedItems={selectedStudentInfosList}
            withIndex
        />
    );
};

export default TableStudentInfoV2;
