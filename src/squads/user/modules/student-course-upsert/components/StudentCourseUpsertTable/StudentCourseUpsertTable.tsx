import { ReactNode, useMemo, useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { createValidDate } from "src/common/utils/time";
import { StudentKeys } from "src/squads/user/common/constants/student";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types/student";

import CourseAutoCompleteHF from "../../components/CourseAutoCompleteHF";
import CourseClassAutocompleteHF from "../../components/CourseClassAutocompleteHF";
import CourseLocationAutocompleteHF from "../../components/CourseLocationAutocompleteHF";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import TableWithCheckbox from "src/components/Table/TableWithCheckbox";

import { useStudentDetailContext } from "src/squads/user/contexts/StudentDetailContext";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useCourseAutocomplete from "src/squads/user/modules/student-course-upsert/hooks/useCourseAutocomplete";
import type { UseCourseFieldArrayReturn } from "src/squads/user/modules/student-course-upsert/hooks/useCourseFieldArray";
import useCourseFormValidation from "src/squads/user/modules/student-course-upsert/hooks/useCourseFormValidation";
import useFetchCourseAutocomplete from "src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete";

interface CourseUpsertTableProps {
    courses: StudentPackageClientWithLocation[];
    errorMessage?: string | ReactNode;
    onSelect?: (v: StudentPackageClientWithLocation[]) => void;
    listSelectedItems?: StudentPackageClientWithLocation[];
    updateRow: UseCourseFieldArrayReturn["update"];
}

export const StudentCourseUpsertTable = (props: CourseUpsertTableProps) => {
    const { student } = useStudentDetailContext();
    const { courses, errorMessage, onSelect, listSelectedItems, updateRow } = props;
    const [currentIndex, setCurrentIndex] = useState<number | undefined>(-1);
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const { validate } = useCourseFormValidation();
    const { checkOptionSelected, checkOptionDisabled } = useCourseAutocomplete(courses);

    const studentLocations = useMemo(() => {
        return student?.user.locations?.filter((location) => !location.is_archived);
    }, [student]);

    const studentLocationIds = useMemo(() => {
        return studentLocations?.map((location) => location.location_id);
    }, [studentLocations]);

    const { options, setInputValDebounced, loading } = useFetchCourseAutocomplete({
        locationIds: studentLocationIds,
    });

    const isShowValidationStudentCourse = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_VALIDATION_STUDENT_COURSE"
    );
    const columns = useMemo(() => {
        return [
            {
                key: "name",
                title: tStudents("labels.name"),
                render: (record: StudentPackageClientWithLocation, index?: number) => {
                    return (
                        <CourseAutoCompleteHF
                            name={`${StudentKeys.STUDENT_PACKAGES}[${index}].course`}
                            placeholder={tStudents("labels.name")}
                            size="small"
                            data-testid="StudentCourseUpsertTable__courseName"
                            multiple={false}
                            disableCloseOnSelect
                            rules={{ validate: validate.course }}
                            getOptionDisabled={checkOptionDisabled as any}
                            isOptionEqualToValue={checkOptionSelected as any}
                            disableClearable
                            filterSelectedOptions
                            limitChipText="Ellipsis"
                            key={record.course.course_id}
                            disabled={!record.isDraft || false}
                            required
                            onInputChange={(_e, value) => {
                                if (value !== record.course.name) {
                                    setInputValDebounced(value);
                                }
                            }}
                            options={options}
                            onSelect={() => setCurrentIndex(index)}
                            loading={loading ? currentIndex === index : false}
                            id="CoursesAutocompleteHF__autocomplete"
                            onChange={(_e, value) => {
                                if (typeof index === "undefined") return;
                                updateRow(index, {
                                    ...record,
                                    course: value,
                                    location: null,
                                    class: null,
                                });
                                setInputValDebounced("");
                            }}
                            onClose={() => {
                                setInputValDebounced("");
                            }}
                            getOptionSelectedField="course_id"
                            shouldShowHelperText={false}
                        />
                    );
                },
            },
            {
                key: "location",
                title: tStudents("labels.location"),
                render: (record: StudentPackageClientWithLocation, index?: number) => {
                    return (
                        <CourseLocationAutocompleteHF
                            courseId={record?.course?.course_id}
                            studentLocations={studentLocations || []}
                            name={`${StudentKeys.STUDENT_PACKAGES}[${index}].location`}
                            getOptionSelectedField="location_id"
                            placeholder={tStudents("labels.location")}
                            rules={{ required: validate.required }}
                            key={record.location?.location_id}
                            onChange={(_e, value) => {
                                const locationId =
                                    value && typeof value === "object" && "location_id" in value
                                        ? value.location_id
                                        : "";
                                const isReselect = record.location?.location_id === locationId;
                                if (typeof index === "undefined" || isReselect) return;
                                updateRow(index, {
                                    ...record,
                                    location: value,
                                    class: null,
                                });
                            }}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: 190,
                    },
                },
            },
            {
                key: "class",
                title: tStudents("labels.class"),
                render: (record: StudentPackageClientWithLocation, index?: number) => {
                    return (
                        <CourseClassAutocompleteHF
                            courseId={record?.course?.course_id}
                            locationId={record?.location?.location_id || ""}
                            name={`${StudentKeys.STUDENT_PACKAGES}[${index}].class`}
                            getOptionSelectedField="class_id"
                            placeholder={tStudents("labels.class")}
                            key={record.class?.class_id}
                            onChange={(_e, value) => {
                                if (typeof index === "undefined") return;
                                updateRow(index, {
                                    ...record,
                                    class: value,
                                });
                            }}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: 190,
                    },
                },
            },
            {
                key: "startDate",
                title: tStudents("labels.startDate"),
                render: (record: StudentPackageClientWithLocation, index?: number) => {
                    return (
                        <DatePickerHF
                            name={`${StudentKeys.STUDENT_PACKAGES}[${index}].start`}
                            InputProps={{
                                placeholder: tStudents("labels.startDate"),
                                "data-testid": "StudentCourseUpsertTable__startDate",
                                required: true,
                            }}
                            rules={{
                                required: validate.required,
                            }}
                            onAccept={(date) => {
                                if (!date || typeof index === "undefined") return;
                                const startDay = new Date((date as Date).toString());

                                let end = record?.end;

                                if (end) end = startDay > new Date(end) ? startDay : new Date(end);

                                updateRow(index, {
                                    ...record,
                                    start: startDay,
                                    end: end,
                                });
                            }}
                            shouldShowHelperText={false}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: 190,
                    },
                },
            },
            {
                key: "endDate",
                title: tStudents("labels.endDate"),
                render: (record: StudentPackageClientWithLocation, index?: number) => {
                    return (
                        <DatePickerHF
                            name={`${StudentKeys.STUDENT_PACKAGES}[${index}].end`}
                            InputProps={{
                                placeholder: tStudents("labels.endDate"),
                                required: true,
                                "data-testid": "StudentCourseUpsertTable__endDate",
                            }}
                            inputFormat="yyyy/LL/dd"
                            minDate={record.start ? createValidDate(record.start) : undefined}
                            rules={{
                                required: validate.required,
                                ...(isShowValidationStudentCourse
                                    ? {
                                          validate: (endDate: Date) =>
                                              validate.validateStudentCourseLocationEndDate(
                                                  endDate,
                                                  record
                                              ),
                                      }
                                    : {}),
                            }}
                            onAccept={(date) => {
                                if (!date || typeof index === "undefined") return;

                                const endDay = new Date((date as Date).toString());
                                updateRow(index, {
                                    ...record,
                                    end: endDay,
                                });
                            }}
                            shouldShowHelperText={false}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: 190,
                    },
                },
            },
        ];
    }, [
        tStudents,
        validate,
        checkOptionDisabled,
        checkOptionSelected,
        options,
        loading,
        currentIndex,
        setInputValDebounced,
        updateRow,
        studentLocations,
        isShowValidationStudentCourse,
    ]);

    return (
        <TableWithCheckbox
            tableProps={{
                "data-testid": "StudentCourseUpsertTable",
            }}
            data={courses}
            columns={columns}
            withIndex={{ width: "5%" }}
            body={{
                loading: false,
                rowKey: "id",
            }}
            errorMessage={errorMessage}
            onSelect={onSelect}
            listSelectedItems={listSelectedItems || []}
            hasDraftProperty={true}
        />
    );
};

export default StudentCourseUpsertTable;

StudentCourseUpsertTable.defaultProps = {
    errorMessage: "",
};
