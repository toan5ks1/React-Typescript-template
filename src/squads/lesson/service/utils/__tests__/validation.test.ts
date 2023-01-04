import { NsLesson_Bob_LessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import {
    InvalidParamError,
    MutationLessonIndividualReportParams,
} from "src/squads/lesson/service/service-types";
import {
    getInvalidParamErrorsOfLessonReportPayload,
    getInvalidParamErrorsOfLessonUpsertPayload,
    getInvalidParamErrorsOfNonSensitiveNumberVariables,
    getInvalidParamErrorsOfNonSensitiveStringVariables,
} from "src/squads/lesson/service/utils/validation";

import {
    CreateLessonSavingMethod,
    LessonStatus,
    StudentAttendStatus,
} from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

describe("validation", () => {
    it("getInvalidParamErrorsOfNonSensitiveStringVariables", () => {
        const stringVariables = {
            undefinedField: undefined,
            nullField: null,
            emptyStringField: "",
            validString: "ValidString",
        };

        const errors = getInvalidParamErrorsOfNonSensitiveStringVariables(stringVariables);

        expect(errors).toEqual<InvalidParamError["errors"]>([
            { field: "undefinedField" },
            { field: "nullField" },
            { field: "emptyStringField" },
        ]);
    });

    it("getInvalidParamErrorsOfNonSensitiveNumberVariables", () => {
        const numberVariables = {
            undefinedField: undefined,
            nullField: null,
            validNumber: 10,
        };

        const errors = getInvalidParamErrorsOfNonSensitiveNumberVariables(numberVariables);

        expect(errors).toEqual<InvalidParamError["errors"]>([
            { field: "undefinedField" },
            { field: "nullField" },
        ]);
    });

    it("getInvalidParamErrorsOfLessonUpsertPayload invalid payload", () => {
        const invalidLessonPayload: NsLesson_Bob_LessonsService.UpsertLessons = {
            teacherIdsList: [],
            studentInfoListList: [],
            mediaIds: [],
            centerId: "",
            startTime: new Date(),
            endTime: new Date(),
            teachingMedium: 10,
            teachingMethod: 10,
            classId: "",
            courseId: "",
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
        };

        const errors = getInvalidParamErrorsOfLessonUpsertPayload(invalidLessonPayload);

        expect(errors).toEqual<InvalidParamError["errors"]>([
            { field: "centerId" },
            { field: "savingOption" },
            { field: "teachingMedium" },
            { field: "teachingMethod" },
            { field: "teacherIdsList" },
            { field: "studentInfoListList" },
        ]);
    });

    it("getInvalidParamErrorsOfLessonUpsertPayload valid payload", () => {
        const validLessonPayload: NsLesson_Bob_LessonsService.UpsertLessons = {
            teacherIdsList: ["Teacher_Id_1"],
            studentInfoListList: [
                {
                    attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
                    courseId: "Course_Id_1",
                    locationId: "Location_Id_1",
                    studentId: "Student_Id_1",
                },
            ],
            mediaIds: [],
            centerId: "Center_Id_1",
            startTime: new Date(),
            endTime: new Date(),
            teachingMedium: LessonTeachingMedium.LESSON_TEACHING_MEDIUM_ONLINE,
            teachingMethod: LessonTeachingMethod.LESSON_TEACHING_METHOD_INDIVIDUAL,
            savingOption: {
                method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            },
            classId: "",
            courseId: "",
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
        };

        const errors = getInvalidParamErrorsOfLessonUpsertPayload(validLessonPayload);

        expect(errors).toEqual<InvalidParamError["errors"]>([]);
    });

    it("getInvalidParamErrorsOfLessonUpsertPayload valid payload for saving draft lesson", () => {
        const validLessonPayload: NsLesson_Bob_LessonsService.UpsertLessons = {
            teacherIdsList: [],
            studentInfoListList: [],
            mediaIds: [],
            centerId: "Center_Id_1",
            startTime: new Date(),
            endTime: new Date(),
            teachingMedium: LessonTeachingMedium.LESSON_TEACHING_MEDIUM_ONLINE,
            teachingMethod: LessonTeachingMethod.LESSON_TEACHING_METHOD_INDIVIDUAL,
            savingOption: {
                method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            },
            classId: "",
            courseId: "",
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_DRAFT,
        };

        const errors = getInvalidParamErrorsOfLessonUpsertPayload(validLessonPayload, true);

        expect(errors).toEqual<InvalidParamError["errors"]>([]);
    });

    it("getInvalidParamErrorsOfLessonUpsertPayload invalid payload for saving draft lesson", () => {
        const validLessonPayload: NsLesson_Bob_LessonsService.UpsertLessons = {
            teacherIdsList: [],
            studentInfoListList: [],
            mediaIds: [],
            centerId: "",
            startTime: new Date(),
            endTime: new Date(),
            teachingMedium: LessonTeachingMedium.LESSON_TEACHING_MEDIUM_ONLINE,
            teachingMethod: LessonTeachingMethod.LESSON_TEACHING_METHOD_INDIVIDUAL,
            savingOption: {
                method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            },
            classId: "",
            courseId: "",
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_DRAFT,
        };

        const errors = getInvalidParamErrorsOfLessonUpsertPayload(validLessonPayload, true);

        expect(errors).toEqual<InvalidParamError["errors"]>([{ field: "centerId" }]);
    });

    it("getInvalidParamErrorsOfLessonReportPayload should throw error with invalid lesson report submitted payload", () => {
        const invalidLessonReportPayload: Required<
            MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
        > = {
            data: {
                lessonId: "",
                lessonReportId: "",
                detailsList: [
                    {
                        studentId: "",
                        courseId: "",
                        attendanceRemark: "",
                        attendanceStatus: 0,
                        fieldValuesList: [],
                    },
                ],
            },
        };

        const errors = getInvalidParamErrorsOfLessonReportPayload(invalidLessonReportPayload, true);

        expect(errors).toEqual<InvalidParamError["errors"]>([
            {
                field: "lessonId",
                fieldValueIfNotSensitive: "",
            },
            {
                field: "studentId",
            },
            {
                field: "courseId",
                fieldValueIfNotSensitive: "",
            },
            {
                field: "attendanceStatus",
                fieldValueIfNotSensitive: 0,
            },
        ]);
    });

    it("getInvalidParamErrorsOfLessonReportPayload should throw error with invalid save draft lesson report payload", () => {
        const invalidLessonReportPayload: Required<
            MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
        > = {
            data: {
                lessonId: "",
                lessonReportId: "",
                detailsList: [
                    {
                        studentId: "",
                        courseId: "",
                        attendanceRemark: "",
                        attendanceStatus: 0,
                        fieldValuesList: [],
                    },
                ],
            },
        };

        const errors = getInvalidParamErrorsOfLessonReportPayload(
            invalidLessonReportPayload,
            false
        );

        expect(errors).toEqual<InvalidParamError["errors"]>([
            {
                field: "lessonId",
                fieldValueIfNotSensitive: "",
            },
            {
                field: "studentId",
            },
            {
                field: "courseId",
                fieldValueIfNotSensitive: "",
            },
        ]);
    });

    it("getInvalidParamErrorsOfLessonReportPayload with valid lesson report submitted payload", () => {
        const validLessonReportPayload: Required<
            MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
        > = {
            data: {
                lessonId: "lesson ID 1",
                lessonReportId: "lesson report ID 1",
                detailsList: [
                    {
                        studentId: "student ID 1",
                        courseId: "course ID 1",
                        attendanceRemark: "",
                        attendanceStatus: 1,
                        fieldValuesList: [],
                    },
                ],
            },
        };

        const errors = getInvalidParamErrorsOfLessonReportPayload(validLessonReportPayload, true);

        expect(errors).toEqual<InvalidParamError["errors"]>([]);
    });
});
