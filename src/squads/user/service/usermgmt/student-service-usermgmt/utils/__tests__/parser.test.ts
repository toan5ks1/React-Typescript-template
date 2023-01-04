import { createMockStudentGeneralInfoForm } from "src/squads/user/test-utils/mocks/student";

import { Country } from "manabuf/common/v1/enums_pb";
import { Gender, StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

import { NsUsermgmtStudentService } from "../../types";
import { convertStudentFormToCreateStudentProfile } from "../parser";

import { getEnrollmentStatusAsString } from "src/squads/user/hooks/useStudentFilterByCourseGrade/useStudentFilterByCourseGrade";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

describe("convertStudentFormToCreateStudentProfile", () => {
    const expectedResultConvertStudent = (
        student: NsUsermgmtStudentService.UpsertStudentFormPropsReq["generalInfo"]
    ) => {
        return {
            name: student.name,
            firstName: student.firstName,
            lastName: student.lastName,
            firstNamePhonetic: student.firstNamePhonetic,
            lastNamePhonetic: student.lastNamePhonetic,
            countryCode: Country.COUNTRY_JP,
            phoneNumber: student.phoneNumber,
            email: student.email,
            grade: 1,
            password: "",
            enrollmentStatus: StudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_POTENTIAL,
            enrollmentStatusStr: getEnrollmentStatusAsString(
                StudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_POTENTIAL
            ),
            studentExternalId: student.studentExternalId,
            studentNote: student.studentNote,
            gender: Gender.NONE,
            birthday: null,
            locationIdsList: [],
        };
    };
    it("should return correct expect", async () => {
        const student = createMockStudentGeneralInfoForm({
            name: "last name first name",
            firstNamePhonetic: "first name phonetic",
            lastNamePhonetic: "last name phonetic",
        });

        let result = convertStudentFormToCreateStudentProfile({
            data: student,
            options: { isShowNamePhonetic: true },
        });
        result!.password = ""; //because password is generate

        const expectedResult = expectedResultConvertStudent(student);

        expect(result).toEqual(expectedResult);
    });
});
