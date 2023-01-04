import { ArrayElement } from "src/common/constants/types";
import {
    UpsertStudentFormProps,
    NormalizeStudentInformation,
    UserByEmailOrPhoneQuery,
    GenderKeys,
    LocationInformationHasura,
    UserAddress,
} from "src/squads/user/common/types";
import { StudentPackageClientWithLocation } from "src/squads/user/common/types/student";
import { Grade } from "src/squads/user/models/grade";
import {
    CountStudentWithFilterQuery,
    CourseAttrsFragment,
    GradesOfStudentsListQuery,
    User_CoursesManyWithLocationQuery,
} from "src/squads/user/service/bob/bob-types";
import { UpsertStudentPayloadType } from "src/squads/user/service/define-service/student-service";
import { CourseStudentsListV2Query } from "src/squads/user/service/eureka/eureka-types";
import type { PaginationWithTotal } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";
import { getMockLocationsHasura } from "src/squads/user/test-utils/mocks/locations";

import type { DialogAccountInfoProps } from "src/squads/user/components/DialogAccountInfo";

import { Country } from "manabie-bob/enum_pb";
import { FamilyRelationship, Gender } from "manabuf/usermgmt/v2/enums_pb";

import { mockStudentHomeAddress } from "./address";

// TODO: Update after move components in phase - 2
import { ChoiceType } from "src/hooks/useAutocompleteReference";
import { ICourseAndStudent } from "src/squads/user/hooks/useCourseMapStudent";
import {
    GradeStudent,
    UseGetGradeAndStatusOfStudentsReturn,
} from "src/squads/user/hooks/useGetGradeAndStatusOfStudents";
import { StudentParentDataType } from "src/squads/user/hooks/useParentMapStudent";
import { UseStudentFilterByCourseGradeReturn } from "src/squads/user/hooks/useStudentFilterByCourseGrade";
import { UseQueryStudentsReturn } from "src/squads/user/modules/student-list/hooks/useQueryStudents";

type CreateMockStudentParam = {
    id: string;
    current_grade?: number;
    enrollment_status?: string;
    country?: string;
};

type CreateMockParentParam = {
    length: number;
    student_id: string;
    relationship?: string;
    country?: string;
};

export const creatMockStudentWithGrade = (
    id: string,
    grade: number,
    enrollment_status?: string
): ArrayElement<GradesOfStudentsListQuery["students"]> => ({
    student_id: id,
    current_grade: grade,
    enrollment_status: enrollment_status || "STUDENT_ENROLLMENT_STATUS_ENROLLED",
});

export interface CourseOptions
    extends ChoiceType<ArrayElement<User_CoursesManyWithLocationQuery["courses"]>> {
    id: ArrayElement<User_CoursesManyWithLocationQuery["courses"]>["course_id"];
}

export const createMockMapGradeOfStudents = (
    studentId: string = "01",
    grade: number = 1
): Map<GradeStudent["student_id"], GradeStudent> => {
    const student = creatMockStudentWithGrade(studentId, grade);

    const mapGradeOfStudents: UseGetGradeAndStatusOfStudentsReturn["mapGradeOfStudents"] = new Map<
        GradeStudent["student_id"],
        GradeStudent
    >();
    mapGradeOfStudents.set(student.student_id, student);

    return mapGradeOfStudents;
};

export const createMockStudentsFilterByCourseGrade =
    (): UseStudentFilterByCourseGradeReturn["data"] => {
        return [
            {
                email: "student email 1",
                name: "student name 1",
                user_id: "01",
                country: "vn",
                resource_path: "-2147483644",
            },
            {
                email: "student email 2",
                name: "student name 2",
                user_id: "02",
                country: "vn",
                resource_path: "-2147483644",
            },
        ];
    };

export const createMockStudent = ({
    id,
    current_grade,
    enrollment_status = "STUDENT_ENROLLMENT_STATUS_ENROLLED",
    country = "COUNTRY_JP",
}: CreateMockStudentParam): NormalizeStudentInformation => {
    return {
        current_grade,
        student_id: id,
        enrollment_status: enrollment_status,
        student_external_id: `external_id ${id}`,
        student_note: `Student note ${id}`,
        user: {
            user_id: id,
            avatar: "",
            email: `${id}@example.com`,
            name: `Name ${id}`,
            first_name: `First Name ${id}`,
            last_name: `Last Name ${id}`,
            first_name_phonetic: `First Name Phonetic ${id}`,
            last_name_phonetic: `Last Name Phonetic ${id}`,
            phone_number: `0364579988`,
            user_group: "test group",
            country: country,
            gender: GenderKeys.MALE,
            birthday: "2021-01-01",
            locations: [
                {
                    name: `Center 1`,
                    location_id: `center_0`,
                    location_type: `center`,
                    parent_location_id: `parent_center`,
                    access_path: "",
                    is_archived: false,
                },
                {
                    name: `Center 2`,
                    location_id: `center_1`,
                    location_type: `center`,
                    parent_location_id: `parent_center`,
                    access_path: "",
                    is_archived: false,
                },
                {
                    name: "Center JP 3",
                    location_type: "01FVEFZHEEPC06CQ5618M93ETV",
                    location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
                    parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
                    access_path: "",
                    is_archived: false,
                },
            ],
        },
    };
};

export const expectedResultUpdateStudent: UpsertStudentPayloadType = {
    data: {
        generalInfo: {
            studentId: "student-01",
            name: "Name student-01",
            firstName: "First Name student-01",
            lastName: "Last Name student-01",
            firstNamePhonetic: "First Name Phonetic student-01",
            lastNamePhonetic: "Last Name Phonetic student-01",
            email: "student-01@example.com",
            phoneNumber: "0364579988",
            grade: { id: 1, name: "Grade 1" },
            countryCode: 5,
            enrollmentStatus: { id: "STUDENT_ENROLLMENT_STATUS_ENROLLED", value: "Enrolled" },
            studentExternalId: "external_id student-01",
            studentNote: "Student note student-01",
            birthday: "2021-01-01",
            gender: "MALE",
            locations: [
                {
                    name: "Center 1",
                    location_id: "center_0",
                    location_type: "center",
                    parent_location_id: "parent_center",
                    access_path: "",
                    is_archived: false,
                },
                {
                    name: "Center 2",
                    location_id: "center_1",
                    location_type: "center",
                    parent_location_id: "parent_center",
                    access_path: "",
                    is_archived: false,
                },
                {
                    name: "Center JP 3",
                    location_type: "01FVEFZHEEPC06CQ5618M93ETV",
                    location_id: "01FXSHEXY5NRA3TBZFCHKWFV0X",
                    parent_location_id: "01FXSHEXXEC11TZFYHC08JQP5P",
                    access_path: "",
                    is_archived: false,
                },
            ],
        },
        schoolHistories: [
            {
                schoolId: "1",
                schoolLevelId: "2",
                endDate: "2002-11-11T00:00:00.000Z",
                startDate: "2000-11-11T00:00:00.000Z",
                schoolCourseId: "3",
            },
        ],
        homeAddress: mockStudentHomeAddress,
    },
    options: {
        isShowNamePhonetic: true,
        isUseEnrollmentStatusStr: true,
    },
};

export function createMockStudentGeneralInfoForm(
    override?: Partial<NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"]>
) {
    return {
        countryCode: 5,
        name: "student_02",
        enrollmentStatus: {
            id: "STUDENT_ENROLLMENT_STATUS_POTENTIAL",
            value: "Potential",
        },
        email: "student_02@mail.com",
        grade: {
            id: 1,
            name: "Grade 1",
        },
        phoneNumber: "0703111492",
        studentExternalId: "ID2",
        studentNote: "Note",
        gender: GenderKeys.NONE,
        birthday: null,
        firstName: "first name",
        lastName: "last name",
        ...override,
    };
}

export const mockUpsertParentData: NsUsermgmtStudentService.UpsertParent = {
    studentId: "student_1",
    parent: {
        userId: "parent_1",
        name: "Parent name",
        email: "parent@manabie.com",
        countryCode: Country.COUNTRY_JP,
        relationship: FamilyRelationship.FAMILY_RELATIONSHIP_FATHER,
        phoneNumber: "0922222222",
    },
};

export const mockReissueUserPasswordReqData: NsUsermgmtStudentService.ReissueUserPasswordReq = {
    userId: "user_1",
};

export const mockRemoveParentReqData: NsUsermgmtStudentService.RemoveParentReq = {
    studentId: "student_1",
    parentId: "parent_1",
};

export const createMockUpsertCourseTest = (
    studentId?: string
): NsUsermgmtStudentService.UpsertStudentCoursePackageFormReq => {
    const course = createMockStudentCourse(studentId);

    return {
        studentId: studentId || "id_01",
        studentPackages: [course],
    };
};
export const expectedResultCreateStudent: UpsertStudentPayloadType = {
    data: {
        generalInfo: {
            countryCode: 5,
            birthday: null,
            gender: "NONE",
            firstName: "first name",
            lastName: "last name",
            firstNamePhonetic: "first name phonetic",
            lastNamePhonetic: "last name phonetic",
            email: "name@email.com",
            phoneNumber: "0364561918",
            grade: { id: 1, name: "Grade 1" },
            enrollmentStatus: { id: "STUDENT_ENROLLMENT_STATUS_POTENTIAL", value: "Potential" },
            studentExternalId: "ExternalStudentID 1",
            locations: [
                {
                    locationId: "center_12",
                    name: "Location 12",
                    locationType: "3",
                    parentLocationId: "prefecture_1_1",
                    accessPath: "org_1/brand_1/prefecture_1_1/center_12",
                    children: [],
                    level: 3,
                },
            ],
            studentNote: "note",
        },
        schoolHistories: [],
        homeAddress: {
            city: "",
            firstStreet: "",
            postalCode: "",
            prefecture: undefined,
            secondStreet: "",
        },
    },
    options: {
        isShowNamePhonetic: true,
        isUseEnrollmentStatusStr: true,
    },
};

export const mockDialogAccountInfo: DialogAccountInfoProps["student"] = {
    email: "email@gmail.com",
    password: "123456789",
    userId: "id-1",
};

// TODO: Move to file family.ts
export const createMockListParent = ({
    length,
    student_id,
    relationship = "FAMILY_RELATIONSHIP_FATHER",
    country = "COUNTRY_JP",
}: CreateMockParentParam): Array<StudentParentDataType> => {
    const listParent = Array.from<{ length: number }, StudentParentDataType>(
        { length },
        (_, i) => ({
            student_id: student_id,
            parent_id: `parent_id ${i}`,
            relationship,
            parent_user: {
                name: `Parent Name ${i}`,
                email: `parent_email${i}@example.com`,
                phone_number: `Phone Number ${i}`,
                country,
            },
        })
    );

    return listParent;
};

export const createMockQueryCourses = (
    length: number,
    studentId: string
): Array<ICourseAndStudent> => {
    const listCourse = Array.from<{ length: number }, ICourseAndStudent>({ length }, (_, i) => ({
        courses: [
            {
                course_id: `course_id ${i}`,
                name: `Course name ${i}`,
                course_access_paths: [
                    {
                        location: {
                            name: `Center 1`,
                            location_id: `center_0`,
                            location_type: `center`,
                            parent_location_id: `parent_center`,
                            access_path: ``,
                        },
                    },
                ],
                end_date: "2021-06-12",
                start_date: "2021-06-11",
                student_package_id: `student_package_id ${i}`,
                locations: [
                    {
                        name: `Center 1`,
                        location_id: `center_0`,
                        location_type: `center`,
                        parent_location_id: `parent_center`,
                        access_path: ``,
                    },
                ],
            },
        ],
        studentId: studentId,
    }));

    return listCourse;
};

export const createMockStudentCourse = (
    studentId: string = "id_01"
): StudentPackageClientWithLocation => {
    const mockQueryCourse = createMockQueryCourses(1, studentId)[0];
    const mockCourse = mockQueryCourse.courses[0];

    return {
        course: {
            course_id: mockCourse.course_id,
            name: mockCourse.name,
            course_access_paths: [
                {
                    location: {
                        name: `Center 1`,
                        location_id: `center_0`,
                        location_type: `center`,
                        parent_location_id: `parent_center`,
                        access_path: ``,
                    },
                },
            ],
        },
        studentPackageId: mockCourse.student_package_id,
        end: new Date(mockCourse.end_date),
        start: new Date(mockCourse.start_date),
        location: {
            name: `Center 1`,
            location_id: `center_0`,
            location_type: `center`,
            parent_location_id: `parent_center`,
            access_path: ``,
        },
        class: {
            class_id: "class_1",
            name: "Class 1",
        },
    };
};

export const createMockListStudentCourse = (
    length: number
): Array<StudentPackageClientWithLocation> => {
    const mockCourses = Array.from<{ length: number }, StudentPackageClientWithLocation>(
        { length },
        (_, i) => ({
            course: {
                course_id: `course_id ${i}`,
                name: `Course name ${i}`,
                course_access_paths: [
                    {
                        location: {
                            name: `Center 1`,
                            location_id: `center_0`,
                            location_type: `center`,
                            parent_location_id: `parent_center`,
                            access_path: ``,
                        },
                    },
                ],
            },
            studentPackageId: `student_package_id ${i}`,
            end: new Date("2021-06-12"),
            start: new Date("2021-06-11"),
            location: {
                name: `Center 1`,
                location_id: `center_0`,
                location_type: `center`,
                parent_location_id: `parent_center`,
                access_path: ``,
            },
            class: {
                class_id: "class_1",
                name: "Class 1",
            },
        })
    );
    return mockCourses;
};

export const createMockStudentCourseUpsert = (
    studentId: string = "id_01"
): StudentPackageClientWithLocation => {
    const mockCourse = createMockStudentCourse(studentId);
    return {
        ...mockCourse,
        course: {
            ...mockCourse.course,
            value: mockCourse.course.name,
        },
        id: "5bd5cc3e-3958-4299-9632-bf399928e344",
    };
};

export const createMockMapCourses = (
    studentId: string = "id_01"
): Map<string, ICourseAndStudent> => {
    const mockCourse = createMockQueryCourses(1, studentId)[0];
    const mapCourses = new Map<string, ICourseAndStudent>();
    mapCourses.set(mockCourse.studentId, mockCourse);

    return mapCourses;
};

export const createMockMapLocations = (
    studentId: string = "id_01"
): Map<string, LocationInformationHasura[]> => {
    const mockData = getMockLocationsHasura(2);
    const locations = new Map<string, LocationInformationHasura[]>();
    locations.set(studentId, mockData);
    return locations;
};

export const createMockHomeAddress = (studentId: string = "id_01"): Map<string, UserAddress> => {
    const mockHomeAddress: UserAddress = {
        user_id: studentId,
        user_address_id: `user_address_id`,
        postal_code: `postal_code`,
        city: `city`,
        first_street: `first_street`,
        second_street: `second_street`,
        prefecture: {
            prefecture_id: `prefecture_id`,
            name: `prefecture_name`,
        },
    };
    const homeAddresses = new Map<string, UserAddress>();
    homeAddresses.set(studentId, mockHomeAddress);
    return homeAddresses;
};

export const createMockStudentUpsertInfoForm = ({
    id,
    current_grade = 1,
    country = "COUNTRY_JP",
}: CreateMockStudentParam): UpsertStudentFormProps => {
    return {
        generalInfo: {
            studentId: id,
            name: `Name ${id}`,
            countryCode: Country[country],
            grade: {
                id: current_grade,
                name: `Grade ${current_grade}`,
            },
            phoneNumber: "0322222222",
            email: `email_${id}@manabie.com`,
            enrollmentStatus: {
                id: "STUDENT_ENROLLMENT_STATUS_POTENTIAL",
                value: "Potential",
            },
            studentExternalId: `ExternalId ${id}`,
            studentNote: `Note ${id}`,
            gender: GenderKeys.MALE,
            birthday: "2021-01-01",
            firstName: `First Name ${id}`,
            lastName: `Last Name  ${id}`,
            firstNamePhonetic: `First Name Phonetic ${id}`,
            lastNamePhonetic: `Last Name Phonetic ${id}`,
            locations: [
                {
                    locationId: "center_13",
                    name: "Location 13",
                    locationType: "3",
                    parentLocationId: "prefecture_1_1",
                    accessPath: "org_1/brand_1/prefecture_1_1/center_13",
                },
            ],
        },
    };
};

export const createMockUsersFilterByEmail = (): UserByEmailOrPhoneQuery => {
    return {
        avatar: null,
        country: "COUNTRY_JP",
        email: "p_s6@mail.com",
        name: "p_s6",
        phone_number: "0703648491",
        user_group: "USER_GROUP_PARENT",
        user_id: "01FFSFA19404YX49HDJ00F4A88",
    };
};

export const createMockStudentWithFilter = (
    student_id: string
): CourseStudentsListV2Query["course_students"] => [
    { student_id: student_id, course_id: `COURSE_${student_id}` },
];

export const createMockListStudentWithFilter = (
    user_id: string
): UseQueryStudentsReturn["students"] => [
    {
        user_id: user_id,
        name: `${user_id}`,
        email: `${user_id}@manabie.com`,
        phone_number: null,
        country: "COUNTRY_JP",
        last_login_date: null,
        resource_path: "-2147483644",
        full_name_phonetic: `${user_id} phonetic`,
    },
];
export const createMockStudentCount = (
    count: number
): CountStudentWithFilterQuery["users_aggregate"] => ({
    aggregate: { count },
});

export const createMockGradesWithFilter = (): Grade[] => [
    {
        id: 1,
        name: "Grade 1",
    },
];

export const createMockCoursesWithFilter = (): CourseAttrsFragment[] => [
    {
        country: "COUNTRY_JP",
        course_id: "123456",
        display_order: 1,
        grade: 0,
        icon: "",
        name: "fake course name",
        school_id: 123,
        subject: "SUBJECT_ENGLISH",
    },
];
export const createMockStudentTableData = (isLoading: boolean) => {
    const tableData: UseStudentFilterByCourseGradeReturn = {
        data: [
            {
                email: "email",
                name: "name",
                user_id: "student_id",
                country: "VN",
                resource_path: "-2147483644",
            },
        ],
        isLoading,
        pagination: {
            count: 1,
            onPageChange: jest.fn(),
            page: 0,
            rowsPerPage: 5,
            limit: 10,
            offset: 0,
            onRowsPerPageChange: jest.fn(),
        },
        refetchStudents: jest.fn(),
        resetPaginationOffset: jest.fn(),
        isFetching: isLoading,
    };
    return tableData;
};

//TODO: update locationIdsList when implementing the feature
export const createStudentResp: NsUsermgmtStudentService.CreateStudentResp = {
    student: {
        userProfile: {
            userId: "01FM22FZ56EE809VZ4J4R6QZMF",
            email: "s10_test_04-010-2021@mail.com",
            name: "s10_test_04-010-2021",
            gender: Gender.MALE,
            avatar: "",
            group: 1,
            phoneNumber: "0703611492",
            facebookId: "",
            appleUserId: "",
            givenName: "",
            countryCode: 5,
            locationIdsList: [],
            firstName: "",
            firstNamePhonetic: "",
            fullNamePhonetic: "",
            lastName: "",
            lastNamePhonetic: "",
            birthday: "",
        },
        grade: 1,
        schoolId: 6152,
        enrollmentStatus: 0,
        studentExternalId: "",
        studentNote: "",
        email: "",
        gender: Gender.MALE,
        birthday: "2021-01-01",
    },
    studentPassword: "7EQKLR",
};

export const mockUpsetStudentResp: NsUsermgmtStudentService.UpdateStudentResp = {
    email: "s8_thao_08-11-2021+edited@mail.com",
    enrollmentStatus: 2,
    grade: 4,
    id: "01FM25YQTBQZCD4GP8ADV5251C",
    name: "s8_thao_08-11-2021+edited@mail.com",
    firstName: "first name",
    lastName: "last name",
    firstNamePhonetic: "first name phonetic",
    lastNamePhonetic: "last name phonetic",
    studentExternalId: "",
    studentNote: "up uo",
    gender: Gender.MALE,
    birthday: "2021-01-01",
    locationIdsList: [],
    enrollmentStatusStr: "STUDENT_ENROLLMENT_STATUS_ENROLLED",
    fullNamePhonetic: "",
};

export const errorsStudentCourseUpsert: {
    [x: string]: any;
} = {
    studentPackages: [
        {
            course: {
                type: "validate",
                message: "",
                ref: {
                    name: "studentPackages[2].course",
                },
            },
            start: {
                type: "required",
                message: "",
                ref: {
                    name: "studentPackages[2].start",
                },
            },
            end: {
                type: "required",
                message: "",
                ref: {
                    name: "studentPackages[2].end",
                },
            },
        },
    ],
};

export const mockDraftCourses: StudentPackageClientWithLocation = {
    id: "77f78e2e-82ee-4069-9eeb-b7e0c7d0cedc",
    course: {
        name: "",
        course_id: "01FNDEZNT2KTH8CSDSK7YSADTT",
        course_access_paths: [],
    },
    studentPackageId: "",
    start: "",
    end: "",
    isDraft: true,
    location: {
        location_id: "",
        name: "",
        access_path: "",
        location_type: "",
        parent_location_id: "",
    },
};

export const courseOptions: CourseOptions[] = [
    {
        value: "course1_14-12-2021",
        course_id: "01FPW5AZKDM4P22250EX4QBJDE",
        name: "course1_14-12-2021",
        icon: "",
        grade: 0,
        subject: "SUBJECT_NONE",
        country: "COUNTRY_NONE",
        school_id: -2147483647,
        display_order: 1,
        id: "01FPW5AZKDM4P22250EX4QBJDE",
        course_access_paths: [
            {
                location: {
                    name: `Center 1`,
                    location_id: `center_0`,
                    location_type: `center`,
                    parent_location_id: `parent_center`,
                    access_path: ``,
                },
            },
        ],
    },
    {
        value: "Yen Minh Course",
        course_id: "01FPC5MMRJ4DXYWBKV1NXJ1GS7",
        name: "Yen Minh Course",
        icon: "",
        grade: 0,
        subject: "SUBJECT_NONE",
        country: "COUNTRY_NONE",
        school_id: -2147483647,
        display_order: 1,
        id: "01FPC5MMRJ4DXYWBKV1NXJ1GS7",
        course_access_paths: [
            {
                location: {
                    name: `Center 1`,
                    location_id: `center_0`,
                    location_type: `center`,
                    parent_location_id: `parent_center`,
                    access_path: ``,
                },
            },
        ],
    },
];

export const pagination = (count?: number | null): PaginationWithTotal => {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: count || 0,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
    };
};
