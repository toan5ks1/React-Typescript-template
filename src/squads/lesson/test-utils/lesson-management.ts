import { KeyConversionTaskStatusTypes, KeyMediaTypes } from "src/common/constants/const";
import { Entities, MIMETypes } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { combineDateAndTime, formatDate } from "src/common/utils/time";
import {
    DynamicFieldProps,
    DynamicFieldsComponentType,
    LessonReportIndividualDynamicComponentType,
    PartnerFormDynamicFieldValueByPreviousReportQueried,
    LessonReportByPreviousReportQueried,
    LessonReportBusinessRuleFieldIds,
    LessonManagementStudentInfo,
    StudentSubscriptionsQueried,
    GetStudentCourseSubscriptionsRequestQuery,
    Media,
} from "src/squads/lesson/common/types";
import { Grade } from "src/squads/lesson/models/grade";
import { TeacherMany } from "src/squads/lesson/service/bob/bob-modify-types";
import {
    CoursesManyQuery,
    GradesOfStudentsListQuery,
    LessonGroupByIdQuery,
    Lesson_SchedulerBySchedulerIdQuery,
    MediasManyQuery,
    StudentsManyQuery,
    TeacherManyQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import { NsLesson_Bob_LessonStudentSubscriptionsService } from "src/squads/lesson/service/bob/lesson-student-subscriptions-service/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { NsLesson_Master_LocationsService } from "src/squads/lesson/service/master/locations-master-service/types";
import {
    generateSize,
    mockDataConfig,
    WidthVariants,
} from "src/squads/lesson/test-utils/lesson-report";
import { getMockLocations } from "src/squads/lesson/test-utils/locations";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import {
    CreateLessonSavingMethod,
    GetStudentCourseSubscriptionsResponse,
    LessonStatus,
    LessonTime,
    RetrieveLessonsFilterV2,
    RetrieveStudentSubscriptionResponse,
    StudentAttendStatus,
    UpdateLessonRequest,
    ValueType,
} from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

import useGetLatestPartnerFormConfig from "../hooks/useGetLatestPartnerFormConfig";
import useHandleFormActions, { UseHandleFormActionsReturn } from "../hooks/useHandleFormActions";
import useMutationLessonIndividualReport, {
    WriteLessonReportProps,
} from "../pages/LessonManagement/hooks/useMutationLessonIndividualReport";
import useTransformReportSubmitData from "../pages/LessonManagement/hooks/useTransformReportSubmitData";

import { RenderResult } from "@testing-library/react";
import useGlobalLocations from "src/hooks/useGlobalLocations";
import { Lessons } from "src/squads/lesson/__generated__/bob/root-types";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useConvertMedia from "src/squads/lesson/hooks/useConvertMedia";
import useLessonStudentInfoListFilter, {
    UseLessonStudentInfoListFilterReturn,
} from "src/squads/lesson/hooks/useLessonStudentInfoListFilter";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import {
    LessonDataWithStudentSubscriptions,
    LessonManagementReportsIndividualData,
    LessonManagementUpsertFormType,
    LessonUpsertProps,
    LessonSavingMethodKeys,
    LessonTeachingMediumKeys,
    LessonTeachingMethodKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useUpsertLessonOfLessonManagement, {
    UpsertLessonWithMiddlewareProps,
    UseUpsertLessonOfLessonManagementProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement";
import { FormFilterLessonManagementValues } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";
import { FormFilterLessonManagementValuesV2 } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonManagementListFormFilterAdvancedV2";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

//TODO: @lesson fix Media type
export const mockMediaArray: Media[] = [
    // @ts-ignore
    {
        name: "The Wonders of Nature",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "01",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    // @ts-ignore
    {
        name: "Volcano Eruption",
        type: MIMETypes.IMAGE,
        resource: "https://green-school-portal.web.app/",
        media_id: "02",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    // @ts-ignore
    {
        name: "Evolutionary Psychology",
        type: KeyMediaTypes.MEDIA_TYPE_VIDEO,
        resource: "6251025034001",
        media_id: "03",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    // @ts-ignore
    {
        name: "Material 1",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "04",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    // @ts-ignore
    {
        name: "Material 2",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "05",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_CONVERTING,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    // @ts-ignore
    {
        name: "Material 3",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "06",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
];

export function createMockMedia() {
    return mockMediaArray;
}

export const createMockLiveLessonGroup = (
    id: string
): ArrayElement<LessonGroupByIdQuery["lesson_groups"]> => {
    return {
        lesson_group_id: `Lesson Group ID ${id}`,
        media_ids: ["Media ID 01"],
    };
};

export const generateSampleStudent = (
    id: string,
    withAttendanceStatus = false
): ArrayElement<LessonManagementReportsIndividualData["students"]> => {
    const userInfo = {
        user: {
            name: "Student Sample " + id,
            user_id: "ID Sample " + id,
        },
    };

    if (withAttendanceStatus)
        return {
            ...userInfo,
            attendance_status: "STUDENT_ATTEND_STATUS_LEAVE_EARLY",
        };

    return userInfo;
};

export const lessonReportCreateDataSample: LessonManagementReportsIndividualData = {
    lessonId: "Lesson ID Sample",
    lessonReportId: "",
    students: [generateSampleStudent("01", true), generateSampleStudent("02")],
    lessonReportDetails: [],
};

export const lessonReportUpdateDataSample: LessonManagementReportsIndividualData = {
    lessonId: "Lesson ID Sample",
    lessonReportId: "Lesson Report ID Sample",
    students: [generateSampleStudent("01"), generateSampleStudent("02")],
    lessonReportDetails: [
        {
            lessonId: "Lesson ID Sample",
            student: {
                user: {
                    name: "Student Sample 01",
                    user_id: "ID Sample 01",
                },
            },
            dynamicFields: {
                attendance_status: {
                    key: "STUDENT_ATTEND_STATUS_ATTEND",
                    label: "Attend",
                },
                attendance_remark: "Remark Sample",
                homework_submission_completion: "100",
                homework_submission_score: "100",
                lesson_content: "Content Sample",
                lesson_homework: "Homework Sample",
                remarks: "Remarks Sample",
            },
        },
        {
            lessonId: "Lesson ID Sample",
            student: {
                user: {
                    name: "Student Sample 02",
                    user_id: "ID Sample 02",
                },
            },
            dynamicFields: {
                attendance_status: {
                    key: "STUDENT_ATTEND_STATUS_LEAVE_EARLY",
                    label: "Leave Early",
                },
                attendance_remark: "Remark Sample",
                homework_submission_completion: "100",
                homework_submission_score: "100",
                lesson_content: "Content Sample",
                lesson_homework: "Homework Sample",
                remarks: "Remarks Sample",
            },
        },
    ],
};

export const generateDynamicFieldProps = (
    componentType: DynamicFieldsComponentType | LessonReportIndividualDynamicComponentType
): DynamicFieldProps => {
    return {
        field_id: `FieldIdOf${componentType}`,
        is_required: true,
        component_config: {
            type: componentType,
        },
        display_config: {
            size: {
                xs: 6,
            },
        },
        label: {
            i18n: {
                fallback_language: LanguageEnums.JA,
                translations: {
                    en: "Homework",
                    ja: "課題",
                    vi: "Homework",
                },
            },
        },
        value_type: "VALUE_TYPE_STRING",
        component_props: {
            options: [
                {
                    key: "COMPLETED",
                    label: {
                        i18n: {
                            fallback_language: "ja",
                            translations: {
                                en: "Completed",
                                ja: "完了",
                                vi: "Completed",
                            },
                        },
                    },
                },
                {
                    key: "INCOMPLETE",
                    label: {
                        i18n: {
                            fallback_language: "ja",
                            translations: {
                                en: "Incomplete",
                                ja: "未完了",
                                vi: "Incomplete",
                            },
                        },
                    },
                },
            ],
        },
    };
};

export const mockFieldsRender: DynamicFieldProps[] = [
    generateDynamicFieldProps(DynamicFieldsComponentType.AUTOCOMPLETE),
    generateDynamicFieldProps(DynamicFieldsComponentType.TEXT_FIELD),
    generateDynamicFieldProps(DynamicFieldsComponentType.TEXT_FIELD_AREA),
    generateDynamicFieldProps(DynamicFieldsComponentType.TEXT_FIELD_PERCENTAGE),
    generateDynamicFieldProps(DynamicFieldsComponentType.TYPOGRAPHY),
    generateDynamicFieldProps(LessonReportIndividualDynamicComponentType.ATTENDANCE_STATUS),
    generateDynamicFieldProps(LessonReportIndividualDynamicComponentType.ATTENDANCE_REMARK),
    generateDynamicFieldProps(LessonReportIndividualDynamicComponentType.BUTTON_PREVIOUS_REPORT),
    generateDynamicFieldProps(LessonReportIndividualDynamicComponentType.LINK_VIEW_STUDY_PLAN),
];

export const createMockPreviousLessonReportLessonReport =
    (): ArrayElement<LessonReportByPreviousReportQueried> => ({
        lesson_report_id: "lesson_report_id_1",
        form_config_id: "form_config_id_1",
    });

export const testDynamicValueOnLessonReportDetailComponents = (
    wrapper: RenderResult,
    language: LanguageEnums,
    dynamicField: DynamicFieldProps
) => {
    switch (dynamicField.field_id) {
        case LessonReportBusinessRuleFieldIds.LINK_VIEW_STUDY_PLAN: {
            const studyPlanButtonLabel = wrapper.getByText("View Study Plan");

            expect(studyPlanButtonLabel).toBeInTheDocument();
            break;
        }

        case LessonReportBusinessRuleFieldIds.BUTTON_PREVIOUS_REPORT: {
            const previousReportButtonLabel = wrapper.getByText("Previous Report");

            expect(previousReportButtonLabel).toBeInTheDocument();
            break;
        }

        case LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS: {
            const attendanceStatusLabel = wrapper.getByText("Attendance Status");

            expect(attendanceStatusLabel).toBeInTheDocument();
            break;
        }

        case LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK: {
            const attendanceRemarkLabel = wrapper.getByText("Remark");

            expect(attendanceRemarkLabel).toBeInTheDocument();
            break;
        }

        default: {
            const fieldLabels = wrapper.getAllByText(
                `${dynamicField.label?.i18n.translations[language]}`
            );

            expect(fieldLabels.length).toBeGreaterThan(0);
        }
    }
};

export const createMockUpsertLessonReportData = (
    valueType: ValueType
): NsLesson_Bob_LessonReportsService.UpsertLessonReport => {
    const stringArrayValues = {
        arrayValueList: ["string", "value"],
    };

    const numberArrayValues = {
        arrayValueList: [1, 2, 3],
    };

    return {
        lessonId: "Test Lesson Id",
        lessonReportId: "Test Lesson Report Id",
        detailsList: [
            {
                attendanceRemark: "Test Attendance Remark",
                attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
                courseId: "Test Course Id",
                studentId: "Test Student Id",
                fieldValuesList: [
                    {
                        valueType,
                        boolValue: true,
                        dynamicFieldId: "Test Dynamic Field Id",
                        intValue: 1,
                        stringValue: "String Value",
                        intArrayValue: numberArrayValues,
                        intSetValue: numberArrayValues,
                        stringArrayValue: stringArrayValues,
                        stringSetValue: stringArrayValues,
                        fieldRenderGuide: "Test Field Render Guide",
                    },
                ],
            },
        ],
    };
};

/// View Study Plan
export const createMockPartnerDomain = () => {
    return { data: { domain: "https://app-url.com/" } };
};

/// Previous Lesson Report
export const createMockUsePreviousLessonReport = () => {
    return {
        formConfigId: "form_config_id_1",
        dynamicValues: [
            {
                value_type: "VALUE_TYPE_STRING",
                string_value: "string_value 1",
                field_id: "homework_submission_status",
            },
        ],
        attendanceValues: {
            attendance_remark: "attendance_remark 1",
            attendance_status: "attendance_status 1",
        },
    };
};

export const createMockUseGetPartnerFormConfigById = () => {
    return {
        dataConfig: [
            {
                fields: [
                    {
                        label: {
                            i18n: {
                                fallback_language: "ja",
                                translations: {
                                    en: "Homework Submission",
                                    ja: "課題",
                                    vi: "Homework Submission",
                                },
                            },
                        },
                        field_id: "homework_submission_status",
                        value_type: "VALUE_TYPE_STRING",
                        is_required: true,
                        display_config: {
                            size: generateSize(WidthVariants.HALF_WIDTH),
                        },
                        component_props: {
                            required: true,
                        },
                        component_config: {
                            type: "TEXT_FIELD_PERCENTAGE",
                        },
                    },
                ],
                section_id: "homework_section_id",
                section_name: "homework",
            },
        ],
    };
};

export const createMockPreviousLessonReportPartnerDynamicFormFieldValue =
    (): ArrayElement<PartnerFormDynamicFieldValueByPreviousReportQueried>[] => {
        return [generateDynamicFieldValue("homework_submission_status")];
    };

const generateDynamicFieldValue = (
    fieldId: string
): ArrayElement<PartnerFormDynamicFieldValueByPreviousReportQueried> => {
    return {
        field_id: fieldId,
        value_type: "VALUE_TYPE_STRING",
        string_value: "incompleted",
    };
};

// Mocks for student info table
export const generateStudentInfo = (id: number) => {
    // TODO: Decide unique id for student info table
    // Because lesson_member does not include student_subscription_id
    // We have no unique id for student info table
    const courseId = `Course_Id_${id}`;
    const studentId = `Student_Id_${id}`;

    const studentInfo: LessonManagementStudentInfo = {
        studentSubscriptionId: studentId + courseId,
        course: {
            courseId,
            courseName: `Course Name ${String(id).padStart(2, "0")}`,
        },
        student: {
            studentId,
            studentName: `Student Name ${String(id).padStart(2, "0")}`,
        },
        grade: 12,
        attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY,
    };

    return studentInfo;
};

export const mockStudentInfoList = [generateStudentInfo(1), generateStudentInfo(2)];

export const mockCoursesMany: CoursesManyQuery["courses"] = mockStudentInfoList.map(
    (student, index) => {
        return {
            course_id: student.course.courseId,
            name: `Course Name 0${++index}`,
            school_id: 0,
        };
    }
);

export const mockStudentsMany: StudentsManyQuery["users"] = mockStudentInfoList.map(
    (student, index) => {
        return {
            name: `Student Name 0${++index}`,
            user_id: student.student.studentId,
        };
    }
);

export const mockGradesList: GradesOfStudentsListQuery["students"] = mockStudentInfoList.map(
    (student) => {
        return {
            enrollment_status: "ENROLLED",
            student_id: student.student.studentId,
            current_grade: 12,
        };
    }
);

export const mockGrades: Grade[] = [
    {
        id: 0,
        name: "Grade 01",
    },
];

export const mockCourseOptionsAutoCompleteReference: CoursesManyQuery["courses"] = [
    {
        course_id: "course_id_1",
        name: "course_name_1",
        school_id: 1,
    },
];

export const mockStudentSubscriptionsList: StudentSubscriptionsQueried = mockStudentInfoList.map(
    (studentInfo) => {
        return {
            courseId: studentInfo.course.courseId,
            studentId: studentInfo.student.studentId,
            grade: String(studentInfo.grade),
            id: studentInfo.studentSubscriptionId!,
            locationIdsList: ["Location_Id"],
            classId: "Class_Id",
        };
    }
);

export const mockTeachers: TeacherMany[] = [
    {
        user_id: "Teacher ID 01",
        name: "Teacher Name 01",
        email: "teacher01@manabie.com",
    },
    {
        user_id: "Teacher ID 02",
        name: "Teacher Name 02",
        email: "teacher02@manabie.com",
    },
];

export const mockCenters: NsLesson_Master_LocationsService.RetrieveLocationsResponseLocation[] = [
    {
        locationId: "Center ID 01",
        name: "Center Name 01",
    },
    {
        locationId: "Center ID 02",
        name: "Center Name 02",
    },
];

export const mockUseLessonStudentInfoListFilter = () => {
    (useLessonStudentInfoListFilter as jest.Mock).mockReset().mockImplementation(() => {
        const data: UseLessonStudentInfoListFilterReturn = {
            data: mockStudentInfoList,
            isFetchingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(5, 0),
            handleEnterSearchBar: jest.fn(),
            handleApplyFilterCriteria: jest.fn(),
        };
        return data;
    });
};

export const mockUpsertLesson = (isSuccess: boolean) => {
    (useUpsertLessonOfLessonManagement as jest.Mock).mockImplementation(
        (props: UseUpsertLessonOfLessonManagementProps) => {
            return {
                upsertLessonWithMiddleWares: (params: UpsertLessonWithMiddlewareProps) => {
                    if (!isSuccess) {
                        props.onError?.(Error("Fake error"));
                        return;
                    }

                    const { data } = params;
                    const submitData = transformDataToUpsertLessonManagementForTest(data, []);
                    props.onSuccess?.(submitData);
                },
            };
        }
    );
};

export const setupAndMockDataForCreatingLesson = () => {
    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.TEACHERS:
                return { options: mockTeachers, loading: false, setInputVal: jest.fn() };
            case Entities.LOCATIONS:
                return { options: mockCenters, loading: false, setInputVal: jest.fn() };
        }
    });

    const mockShowSnackbar = jest.fn();

    (useConvertMedia as jest.Mock).mockImplementation(() => ({
        convertMedia: jest.fn(),
    }));

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    const mockLowestLocations = getMockLocations();
    (useGlobalLocations as jest.Mock).mockReturnValue({ locations: mockLowestLocations });

    mockUseLessonStudentInfoListFilter();
    mockUpsertLesson(true);
};

// Search and filter
export const mockTeacherAutocompleteList = [{ user_id: "teacher_id", name: "teacher_name" }];
export const mockCentersAutocompleteList = [{ locationId: "center_id", name: "center_name" }];
export const mockLocationsAutocompleteList = [{ locationId: "center_id", name: "center_name" }];
export const mockStudentAutocompleteList = [{ user_id: "student_id_1", name: "student_name_1" }];
export const mockGradeAutocompleteList = [{ name: "grade_1", id: 1 }];
export const mockCourseAutocompleteList = [
    {
        course_id: "course1",
        name: "Course 1",
        grade: 1,
        school_id: 1,
    },
];
export const mockDayOfWeekAutocompleteList = [
    {
        id: "day_id",
        name: "day_name",
    },
];
export const mockLessonStatusAutocompleteList = [
    {
        id: "status_id",
        name: "status_x",
    },
];
export const mockClassAutocompleteList = [
    {
        class_id: "class_id",
        name: "class_name",
    },
];

const now = new Date();
export const expectNowDateStr = formatDate(now, "yyyy/LL/dd");
export const expectNowTimeStr = formatDate(now, "HH:mm");
export const mockDefaultSearchKeyword = "default keyword";

export const mockFillDataFilter: FormFilterLessonManagementValues = {
    lessonStatus: mockLessonStatusAutocompleteList,
    fromDate: now,
    toDate: now,
    dayOfWeek: mockDayOfWeekAutocompleteList,
    startTime: now,
    endTime: now,
    teachers: mockTeacherAutocompleteList,
    centers: mockCentersAutocompleteList,
    students: mockStudentAutocompleteList,
    grades: mockGradeAutocompleteList,
    courses: mockCourseAutocompleteList,
    classOfCourses: mockClassAutocompleteList,
};

export const mockFillDataFilterV2: FormFilterLessonManagementValuesV2 = {
    lessonStatus: mockLessonStatusAutocompleteList,
    fromDate: now,
    toDate: now,
    dayOfWeek: mockDayOfWeekAutocompleteList,
    startTime: {
        label: formatDate(now, "HH:mm"),
        value: now,
    },
    endTime: {
        label: formatDate(now, "HH:mm"),
        value: now,
    },
    teachers: mockTeacherAutocompleteList,
    centers: mockCentersAutocompleteList,
    students: mockStudentAutocompleteList,
    grades: mockGradeAutocompleteList,
    courses: mockCourseAutocompleteList,
    classOfCourses: mockClassAutocompleteList,
};

// Mock function for lesson report test
const mockReturnDataConfig = (isReturned: boolean) => {
    (useGetLatestPartnerFormConfig as jest.Mock).mockImplementation(() => ({
        data: mockDataConfig,
        isLoading: !isReturned,
    }));
};

const mockUseMutationIndividualReport = (mockError?: "onError" | "throwError") => {
    (useMutationLessonIndividualReport as jest.Mock).mockImplementation(() => {
        const mockReturn = (props: WriteLessonReportProps) => {
            if (!mockError) {
                props.onSuccess?.();
                return;
            }
            if (mockError === "onError") {
                props.onError?.();
                return;
            }
            throw Error("ERROR");
        };

        return {
            upsertLessonReport: (props: WriteLessonReportProps) => mockReturn(props),
            saveDraftLessonReport: (props: WriteLessonReportProps) => mockReturn(props),
        };
    });
};

const mockUseTransformSubmitData = () => {
    (useTransformReportSubmitData as jest.Mock).mockImplementation(() => {
        return (props: unknown) => props;
    });
};

const mockUseSubmitFormActions = (props?: Partial<UseHandleFormActionsReturn["formActions"]>) => {
    const result: UseHandleFormActionsReturn = {
        formActions: {
            isSubmittingForm: false,
            isVisibleSubmitDialog: false,
            isVisibleCancelDialog: false,
            ...props,
        },
        submitFormActions: {
            handleSubmittingForm: jest.fn(),
            handleSubmittedForm: jest.fn(),
        },
        cancelDialogActions: {
            handleCloseCancelDialog: jest.fn(),
            handleOpenCancelDialog: jest.fn(),
        },
        submitDialogActions: {
            handleCloseSubmitDialog: jest.fn(),
            handleOpenSubmitDialog: jest.fn(),
        },
    };

    (useHandleFormActions as jest.Mock).mockImplementation(() => result);

    return result;
};

export const mockForLessonReportUpsertTesting = {
    mockReturnDataConfig,
    mockUseMutationIndividualReport,
    mockUseTransformSubmitData,
    mockUseSubmitFormActions,
};

export const transformDataToUpsertLessonManagementForTest = (
    data: LessonManagementUpsertFormType,
    mediaIds: Media["media_id"][],
    lessonId?: Lessons["lesson_id"]
): NsLesson_Bob_LessonsService.UpsertLessons => {
    const startTime = combineDateAndTime(data.date, data.startTime);
    const endTime = combineDateAndTime(data.date, data.endTime);
    const studentsInfoList: NsLesson_Bob_LessonsService.UpsertLessons["studentInfoListList"] =
        data.learners.map((studentInfo) => {
            return {
                attendanceStatus: studentInfo.attendanceStatus,
                courseId: studentInfo.course.courseId,
                studentId: studentInfo.student.studentId,
                locationId: studentInfo.locationId || "",
            };
        });
    const teacherIds = data.teachers.map((teacher) => {
        return teacher.user_id;
    });

    const savingOption: UpdateLessonRequest.SavingOption.AsObject = {
        method: CreateLessonSavingMethod[data.method],
    };
    if (data.method === "CREATE_LESSON_SAVING_METHOD_RECURRENCE" && data.endDate) {
        const endDate = combineDateAndTime(data.endDate, data.endTime);
        savingOption.recurrence = {
            endDate,
        };
    }

    const result: NsLesson_Bob_LessonsService.UpsertLessons = {
        lessonId,
        startTime,
        endTime,
        centerId: data.center.locationId,
        mediaIds,
        teachingMedium: LessonTeachingMedium[data.teachingMedium],
        teachingMethod: LessonTeachingMethod[data.teachingMethod],
        studentInfoListList: studentsInfoList,
        teacherIdsList: teacherIds,
        savingOption,
        classId: "",
        courseId: "",
        schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
    };

    return result;
};

export const mockLessonUpsertData: LessonManagementUpsertFormType = {
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    teachingMedium: "LESSON_TEACHING_MEDIUM_ONLINE",
    teachingMethod: "LESSON_TEACHING_METHOD_INDIVIDUAL",
    center: { locationId: "locationId", name: "locationName" },
    learners: [generateStudentInfo(1)],
    teachers: [{ name: "teacherName", user_id: "teacherId" }],
    materialsList: [],
    method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
};

export const mockTeachersManyList: TeacherManyQuery["find_teacher_by_school_id"] = [
    {
        user_id: "Teacher ID 01",
        name: "Teacher 01",
        email: "Teacher Email 01",
    },
    {
        user_id: "Teacher ID 02",
        name: "Teacher 02",
        email: "Teacher Email 02",
    },
];
export function createMockLessonManagementUpsertFormData(): LessonManagementUpsertFormType {
    const currentDate = new Date();
    const result: LessonManagementUpsertFormType = {
        date: currentDate,
        startTime: currentDate,
        endTime: currentDate,
        learners: [
            {
                studentSubscriptionId: "Test Info Id",
                student: {
                    studentId: "Test Student ID 1",
                    studentName: "Test Student Name 01",
                },
                attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
                course: {
                    courseId: "Test Course ID 1",
                    courseName: "Course Name 01",
                },
                grade: 1,
            },
        ],
        materialsList: createMockMedia(),
        teachers: [
            {
                name: "Teacher Name 01",
                user_id: "Teacher ID 01",
            },
        ],
        center: {
            name: "Center Name 01",
            locationId: "Center ID 01",
        },
        method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
        teachingMethod: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
        teachingMedium: LessonTeachingMediumKeys.LESSON_TEACHING_MEDIUM_OFFLINE,
    };
    return result;
}

export const retrieveLessonParams: NsLesson_Bob_LessonsService.RetrieveLessonsRequest = {
    lessonTime: LessonTime.LESSON_TIME_FUTURE,
    keyword: "keyword",
    paging: {
        limit: 5,
        offsetInteger: 0,
        offsetString: "LessonId__10",
    },
    locationIdsList: [],
    filter: {
        dateOfWeeksList: [0],
        timeZone: "Asia/Ho_Chi_Minh",
        centerIdsList: ["center id"],
        teacherIdsList: ["teacher id"],
        studentIdsList: ["student id"],
        courseIdsList: ["course id"],
        gradesList: [1],
        toDate: new Date(),
        fromDate: new Date(),
        fromTime: new Date(),
        toTime: new Date(),
    } as RetrieveLessonsFilterV2.AsObject,
};

export const queryRetrieveStudentSubscriptionVariable: NsLesson_Bob_LessonStudentSubscriptionsService.RetrieveStudentSubscriptionRequest =
    {
        keyword: "Test key word",
        filter: {
            courseIdList: ["Course 1", "Course 2", "Course 3"],
            gradeList: ["Grade 1", "Grade 2", "Grade 3"],
            classIdList: [],
            locationIdList: [],
        },
        paging: {
            limit: 5,
            offsetInteger: 0,
            offsetString: "",
        },
    };

export const queryGetStudentCourseSubscriptionsVariable: GetStudentCourseSubscriptionsRequestQuery =
    [
        {
            courseId: "courseId1",
            studentId: "studentId1",
        },
    ];

export const retrieveStudentSubscriptionReturn: RetrieveStudentSubscriptionResponse.AsObject = {
    itemsList: [
        {
            id: "ID 1",
            studentId: "Student ID 1",
            courseId: "Course ID 1",
            grade: "Grade ID 1",
            locationIdsList: ["Location ID 1"],
            classId: "Class_Id_1",
        },
        {
            id: "ID 2",
            studentId: "Student ID 2",
            courseId: "Course ID 2",
            grade: "Grade ID 2",
            locationIdsList: ["Location ID 1"],
            classId: "Class_Id_2",
        },
    ],
    totalItems: 2,
};

export const getStudentCourseSubscriptionsReturn: GetStudentCourseSubscriptionsResponse.AsObject = {
    itemsList: [
        {
            id: "ID 1",
            studentId: "Student ID 1",
            courseId: "Course ID 1",
            grade: "Grade ID 1",
            locationIdsList: ["Location ID 1"],
        },
        {
            id: "ID 2",
            studentId: "Student ID 2",
            courseId: "Course ID 2",
            grade: "Grade ID 2",
            locationIdsList: ["Location ID 1"],
        },
    ],
};

export const mockMedias: MediasManyQuery["media"] = [
    {
        media_id: "Media ID 01",
        resource: "6198246273001",
        type: "MEDIA_TYPE_VIDEO",
        name: "Recorded video-[2020-10-07 16:35:41].mp4",
        conversion_tasks: [],
    },
    {
        media_id: "Media ID 02",
        resource: "6198246273001",
        type: "MEDIA_TYPE_PDF",
        name: "Sample Media Name",
        conversion_tasks: [],
    },
];

export const mockQueriedLessonData: NonNullable<LessonUpsertProps["lesson"]> = {
    lesson_id: "Lesson ID 01",
    center_id: "Center ID 01",
    lesson_group_id: "Lesson Group ID 01",
    teaching_medium: "LESSON_TEACHING_MEDIUM_ONLINE",
    teaching_method: "LESSON_TEACHING_METHOD_INDIVIDUAL",
    lesson_type: "LESSON_TYPE_ONLINE",
    scheduling_status: "LESSON_SCHEDULING_STATUS_PUBLISHED",
    start_time: "2021-12-06T17:00:00+00:00",
    end_time: "2021-12-06T18:00:00+00:00",
    lessons_teachers: [
        {
            teacher: {
                users: {
                    user_id: "Teacher ID 01",
                    name: "Teacher Name 01",
                    email: "teacher01@manabie.com",
                },
            },
        },
    ],
    lesson_members: [
        {
            attendance_remark: "Sample Text",
            attendance_status: "STUDENT_ATTEND_STATUS_ATTEND",
            course: {
                course_id: "Course ID 01",
                name: "Course Content gRPC Course ID 01",
                subject: "SUBJECT_NONE",
            },
            user: {
                user_id: "Lesson Member ID 01",
                name: "Content gRPC Student01",
                email: "Student01@example.com",
                student: { current_grade: 1 },
            },
        },
        {
            attendance_remark: "Sample Text",
            attendance_status: "STUDENT_ATTEND_STATUS_ATTEND",
            course: {
                course_id: "Course ID 02",
                name: "Course Content gRPC Course ID 02",
                subject: "SUBJECT_NONE",
            },
            user: {
                user_id: "Lesson Member ID 02",
                name: "Content gRPC Student02",
                email: "Student02@example.com",
                student: { current_grade: 1 },
            },
        },
    ],
    studentSubscriptions: [
        {
            studentId: "Lesson Member ID 01",
            courseId: "Course ID 01",
            grade: "10",
            id: "Subscription ID 01",
            locationIdsList: ["Center ID 01"],
        },
        {
            studentId: "Lesson Member ID 02",
            courseId: "Course ID 02",
            grade: "10",
            id: "Subscription ID 02",
            locationIdsList: ["Center ID 01"],
        },
    ],
    course: {
        course_id: "Course_Id_1",
        name: "Course Name 1",
    },
    class_id: "Class_Id_1",
};

// For Recurring Lesson
export const mockWeeklyRecurringScheduler: ArrayElement<
    Lesson_SchedulerBySchedulerIdQuery["scheduler"]
> = {
    scheduler_id: "scheduler id 1",
    start_date: "2021-10-10T09:30:09+00:00",
    end_date: "2022-11-30T12:00:00+00:00",
    freq: "weekly",
};

export const mockOneTimeScheduler: ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]> = {
    scheduler_id: "scheduler id 2",
    start_date: "2021-10-10T09:30:09+00:00",
    end_date: "2021-10-10T09:30:09+00:00",
    freq: "once",
};

const endDate = new Date(mockWeeklyRecurringScheduler.end_date);
export const submittedRecurringLesson = {
    lessonId: mockQueriedLessonData.lesson_id,
    centerId: mockQueriedLessonData.center_id,
    startTime: new Date(mockQueriedLessonData.start_time),
    endTime: new Date(mockQueriedLessonData.end_time),
    mediaIds: [],
    savingOption: {
        method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
        recurrence: {
            endDate: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 18, 0),
        },
    },
    studentInfoListList: [
        {
            attendanceStatus: 1,
            courseId: "Course ID 01",
            locationId: "Center ID 01",
            studentId: "Lesson Member ID 01",
        },
        {
            attendanceStatus: 1,
            courseId: "Course ID 02",
            locationId: "Center ID 01",
            studentId: "Lesson Member ID 02",
        },
    ],
    teacherIdsList: mockQueriedLessonData.lessons_teachers.map(
        (teacher) => teacher.teacher.users?.user_id
    ),
    teachingMedium: 1,
    teachingMethod: 0,
    courseId: "",
    classId: "",
};

export const generateALessonMember = (params: {
    studentId: number;
    courseId: number;
}): ArrayElement<LessonDataWithStudentSubscriptions["lesson_members"]> => {
    const { courseId, studentId } = params;

    return {
        attendance_remark: "Sample Remark",
        attendance_status: "STUDENT_ATTEND_STATUS_ATTEND",
        course: {
            course_id: `Course_ID_${courseId}`,
            name: `Course ${courseId}`,
            subject: "SUBJECT_NONE",
        },
        user: {
            user_id: `Lesson_Member_ID_${studentId}`,
            name: `Lesson Member ${studentId}`,
            email: `lesson_member_${studentId}@example.com`,
            student: { current_grade: 1 },
        },
    };
};

export const mockStudentCourseInfos: GetStudentCourseSubscriptionsRequestQuery = [
    {
        courseId: "courseId1",
        studentId: "studentId1",
    },
    {
        courseId: "courseId2",
        studentId: "studentId2",
    },
];
export const mockGetStudentSubscriptionsList: GetStudentCourseSubscriptionsResponse.AsObject = {
    itemsList: [
        {
            studentId: "studentId1",
            courseId: "courseId1",
            grade: "",
            locationIdsList: ["locationId1"],
            id: "id1",
        },
        {
            studentId: "studentId2",
            courseId: "courseId2",
            grade: "",
            locationIdsList: ["locationId1"],
            id: "id2",
        },
    ],
};

export const lessonDefaultData: LessonManagementUpsertFormType = {
    date: new Date("2022/02/02"),
    startTime: new Date("2022/02/02"),
    endTime: new Date("2022/02/02"),
    teachers: [
        {
            user_id: "Teacher ID 01",
            name: "Teacher 01",
            email: "teacher01@email",
        },
    ],
    center: {
        locationId: "Center ID 01",
        name: "Center Name 01",
    },
    learners: [
        {
            studentSubscriptionId: "Test Info Id",
            student: {
                studentId: "Test Student ID 1",
                studentName: "Test Student Name 01",
            },
            attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
            course: {
                courseId: "Test Course ID 1",
                courseName: "Course Name 01",
            },
            grade: 1,
        },
    ],
    materialsList: mockMedias,
    method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
    teachingMedium: "LESSON_TEACHING_MEDIUM_ONLINE",
    teachingMethod: "LESSON_TEACHING_METHOD_INDIVIDUAL",

    startTimeAutocomplete: {
        label: "00:15",
        value: new Date("2022-06-06T17:15:00.000Z"),
    },
    endTimeAutocomplete: {
        label: "01:15",
        value: new Date("2022-06-06T18:15:00.000Z"),
    },
    location: {
        locationId: "Center ID 01",
        name: "Center Name 01",
    },
    course: {
        course_id: "Course_Id_1",
        name: "Course Name 1",
    },
    classData: {
        class_id: "Class_Id_1",
        name: "Class Name 1",
    },
    endDate: null,
};
