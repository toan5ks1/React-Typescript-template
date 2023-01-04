import { useMemo } from "react";

import { useLocation } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";

import WrapperLookingFor from "src/components/Wrappers/WrapperLookingFor";
import TextColumn from "src/squads/user/components/Tables/ColumnTables/TextColumn";
import TooltipColumn from "src/squads/user/components/Tables/ColumnTables/TooltipColumn";
import TableBaseTableObserveVisible from "src/squads/user/components/Tables/TableObserveVisible/TableBaseTableObserveVisible";
import TableObserveVisibleCheckbox from "src/squads/user/components/Tables/TableObserveVisible/TableObserveVisibleCheckbox";
import GradeColumn from "src/squads/user/modules/student-list/components/StudentListTable/GradeColumn";
import LocationColumn from "src/squads/user/modules/student-list/components/StudentListTable/LocationColumn";
import NameColumn from "src/squads/user/modules/student-list/components/StudentListTable/NameColumn";
import StatusColumn from "src/squads/user/modules/student-list/components/StudentListTable/StatusColumn";

import HomeAddressColumn from "./HomeAddressColumn";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useNormalizeCourses from "src/squads/user/modules/student-list/hooks/useNormalizeCourses";
import useNormalizeGrades from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";
import type { UseQueryStudentsReturn } from "src/squads/user/modules/student-list/hooks/useQueryStudents";
import useStudentHomeAddresses from "src/squads/user/modules/student-list/hooks/useStudentHomeAddresses";
import useStudentListLocation from "src/squads/user/modules/student-list/hooks/useStudentListLocation";

type StudentRecordTableTypes = ArrayElement<UseQueryStudentsReturn["students"]>;

export const useColumns = ({ studentIds }: { studentIds: string[] }) => {
    const tStudent = useResourceTranslate(ERPModules.STUDENTS);
    const location = useLocation();

    const isShowNamePhonetic = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME");
    const isShowHomeAddress = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_HOME_ADDRESS");
    const isShowContactPreference = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_CONTACT_PHONE_NUMBER"
    );
    const shouldDisplaySchoolColumn = useUserFeatureToggle("STUDENT_MANAGEMENT_SCHOOL_HISTORY");

    const { loading: isLoadingGrades, mapGrades, getGradeName } = useNormalizeGrades(studentIds);
    const { loaded: isLoadedCourse, mapCourses } = useNormalizeCourses(studentIds);
    const { isLoading: isLoadingLocation, mapLocations } = useStudentListLocation(studentIds);
    const { isLoading: isLoadingHomeAddress, mapHomeAddresses } =
        useStudentHomeAddresses(studentIds);

    return useMemo(() => {
        return [
            {
                key: "name",
                title: tStudent("labels.studentName"),
                render: (record: StudentRecordTableTypes) => {
                    return (
                        <NameColumn
                            isLoggedIn={record.last_login_date}
                            content={record?.name}
                            redirectUrl={`${location.pathname}/${record?.user_id}/show`}
                            maxLines={2}
                        />
                    );
                },
                cellProps: {
                    sx: { minWidth: 290 },
                    "data-testid": "StudentTableCell__columnName",
                },
            },
            ...(isShowNamePhonetic
                ? [
                      {
                          key: "full_name_phonetic",
                          title: tStudent("labels.phoneticName"),
                          render: (record: StudentRecordTableTypes) => (
                              <TooltipColumn
                                  dataTestIdContent="TableColumnPhoneticName__content"
                                  content={record?.full_name_phonetic}
                                  maxLines={2}
                              />
                          ),
                          cellProps: {
                              sx: { wordBreak: "break-all", minWidth: 180 },
                              "data-testid": "StudentTableCell__columnPhoneticName",
                          },
                      },
                  ]
                : []),
            {
                key: "enrollment_status",
                title: tStudent("enrollmentStatus"),
                render: (record: StudentRecordTableTypes) => {
                    return (
                        <StatusColumn
                            data-testid="TableColumnStatus__content"
                            loading={isLoadingGrades}
                            studentId={record.user_id}
                            mapGrades={mapGrades}
                        />
                    );
                },
                cellProps: {
                    sx: { minWidth: 144 },
                    "data-testid": "StudentTableCell__columnStatus",
                },
            },
            ...(isShowContactPreference
                ? [
                      {
                          key: "contact_preference",
                          title: tStudent("labels.contactPreference"),
                          render: () => (
                              <TextColumn
                                  dataTestIdContent="TableColumnContactPreference__content"
                                  isLoading={false}
                                  content="0909673374 (Father)"
                              />
                          ),
                          cellProps: {
                              sx: { wordBreak: "break-all", minWidth: 180 },
                              "data-testid": "StudentTableCell__columnContactPreference",
                          },
                      },
                  ]
                : []),
            {
                key: "current_grade",
                title: tStudent("labels.grade"),
                render: (record: StudentRecordTableTypes) => {
                    return (
                        <GradeColumn
                            getGradeName={getGradeName}
                            loading={isLoadingGrades}
                            mapGrades={mapGrades}
                            studentId={record?.user_id}
                        />
                    );
                },
                cellProps: {
                    sx: { minWidth: 100 },
                    "data-testid": "StudentTableCell__columnGrade",
                },
            },
            ...(shouldDisplaySchoolColumn
                ? [
                      {
                          key: "School",
                          title: "School",
                          render: () => (
                              <TextColumn
                                  dataTestIdContent="TableColumnSchool__content"
                                  isLoading={false}
                                  content="School Name 01"
                              />
                          ),
                          cellProps: {
                              sx: { wordBreak: "break-all", minWidth: 150 },
                              "data-testid": "StudentTableCell__columnSchool",
                          },
                      },
                  ]
                : []),
            {
                key: "location",
                title: tStudent("labels.location"),
                render: (record: StudentRecordTableTypes) => {
                    return (
                        <LocationColumn
                            isLoading={isLoadingLocation}
                            studentId={record?.user_id}
                            mapLocations={mapLocations}
                        />
                    );
                },
                cellProps: {
                    sx: { wordBreak: "break-all", minWidth: 150 },
                    "data-testid": "StudentTableCell__columnLocation",
                },
            },
            {
                key: "email",
                title: tStudent("labels.email"),
                render: (record: StudentRecordTableTypes) => (
                    <TooltipColumn
                        dataTestIdContent="TableColumnEmail__content"
                        content={record?.email}
                        maxLines={2}
                    />
                ),
                cellProps: {
                    sx: { wordBreak: "break-all", minWidth: 212 },
                    "data-testid": "StudentTableCell__columnEmail",
                },
            },
            ...(isShowHomeAddress
                ? [
                      {
                          key: "home_address",
                          title: tStudent("labels.homeAddress"),
                          render: (record: StudentRecordTableTypes) => {
                              const homeAddress = mapHomeAddresses.get(record.user_id);

                              return (
                                  <HomeAddressColumn
                                      isLoading={isLoadingHomeAddress}
                                      homeAddress={homeAddress}
                                  />
                              );
                          },
                          cellProps: {
                              sx: { wordBreak: "break-all", minWidth: 300 },
                              "data-testid": "StudentTableCell__columnHomeAddress",
                          },
                      },
                  ]
                : []),
            {
                key: "courseName",
                title: tStudent("labels.courseName"),
                render: (record: StudentRecordTableTypes) => {
                    const courses = mapCourses.get(record?.user_id)?.courses;
                    const courseNames = courses?.map((item) => item.name).join(", ");

                    return (
                        <TooltipColumn
                            isLoading={!isLoadedCourse}
                            content={courseNames}
                            dataTestIdContent="TableColumnCourse__content"
                            dataTestIdLoading="TableColumnCourse__loading"
                            maxLines={2}
                        />
                    );
                },
                cellProps: {
                    sx: { wordBreak: "break-all", minWidth: 280 },
                    "data-testid": "StudentTableCell__columnCourse",
                },
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        tStudent,
        isShowNamePhonetic,
        shouldDisplaySchoolColumn,
        isShowHomeAddress,
        isShowContactPreference,
        location.pathname,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(mapGrades),
        isLoadingGrades,
        getGradeName,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(mapLocations),
        isLoadingLocation,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(mapCourses),
        isLoadedCourse,
    ]);
};

export interface StudentListTableProps
    extends Pick<UseQueryStudentsReturn, "loading" | "pagination"> {
    dataSource: UseQueryStudentsReturn["students"];
    onSelect?: (value: UseQueryStudentsReturn["students"]) => void;
    listSelectedItems?: UseQueryStudentsReturn["students"];
}

const StudentListTable = ({
    dataSource,
    loading,
    pagination,
    onSelect,
    listSelectedItems,
}: StudentListTableProps) => {
    const t = useTranslate();

    const studentIds = useMemo(() => {
        return dataSource.map((student) => student.user_id);
    }, [dataSource]);

    const shouldShowCheckbox = useUserFeatureToggle("ENTRY_EXIT_MANAGEMENT");

    const columns = useColumns({ studentIds });

    return (
        <WrapperLookingFor
            variant={!loading && dataSource.length < 1 ? "empty-icon" : "result"}
            content={t("resources.common.noResult")}
            helperText={t("resources.common.noResultSearchAndFilter")}
            height="page"
        >
            {shouldShowCheckbox ? (
                // To be shown only in staging
                <TableObserveVisibleCheckbox
                    data={dataSource}
                    columns={columns}
                    tableProps={{
                        "data-testid": "TableStudent__table",
                    }}
                    withIndex
                    body={{
                        rowKey: "user_id",
                        loading,
                        pagination,
                    }}
                    footer={{
                        pagination,
                    }}
                    styles={{
                        root: {
                            boxShadow: "none",
                        },
                        container: {
                            overflowX: "auto",
                        },
                    }}
                    showHeader={true}
                    onSelect={onSelect}
                    listSelectedItems={listSelectedItems}
                />
            ) : (
                // To be shown only in UAT and prod
                <TableBaseTableObserveVisible
                    data={dataSource}
                    columns={columns}
                    tableProps={{
                        "data-testid": "TableStudent__table",
                    }}
                    withIndex
                    body={{
                        rowKey: "user_id",
                        loading,
                        pagination,
                    }}
                    footer={{
                        pagination,
                    }}
                    styles={{
                        root: {
                            boxShadow: "none",
                        },
                        container: {
                            overflowX: "auto",
                        },
                    }}
                />
            )}
        </WrapperLookingFor>
    );
};

export default StudentListTable;
