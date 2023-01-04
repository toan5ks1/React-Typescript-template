import {
    createMockStudentGeneralInfoForm,
    createMockUpsertCourseTest,
    mockReissueUserPasswordReqData,
    mockRemoveParentReqData,
    mockUpsertParentData,
} from "src/squads/user/test-utils/mocks/student";

import {
    createParentReq,
    updateParentReq,
    reissueUserPasswordReq,
    createStudentReq,
    updateStudentReq,
    upsertStudentCoursePackageReq,
    removeParentReq,
} from "../student-service-usermgmt.request";

describe("createParentReq", () => {
    it("should return correctly request", async () => {
        const request = createParentReq(mockUpsertParentData);

        expect(request.toObject().studentId).toEqual(mockUpsertParentData.studentId);
        expect(request.toObject().parentProfilesList).toHaveLength(1);
    });
});

describe("updateParentReq", () => {
    it("should return correctly request", async () => {
        const request = updateParentReq(mockUpsertParentData);

        expect(request.toObject().studentId).toEqual(mockUpsertParentData.studentId);
        expect(request.toObject().parentProfilesList).toHaveLength(1);
    });
});

describe("reissueUserPasswordReq", () => {
    it("should return correctly request", async () => {
        const request = reissueUserPasswordReq(mockReissueUserPasswordReqData);

        expect(request.toObject().userId).toEqual(mockReissueUserPasswordReqData.userId);
        expect(request.toObject().userId.length).toEqual(6);
    });
});

describe("createStudentReq", () => {
    it("should return request with EMPTY ID when create", async () => {
        const student = createMockStudentGeneralInfoForm();
        const request = createStudentReq({
            data: {
                generalInfo: student,
            },
            options: { isUseEnrollmentStatusStr: true },
        });

        expect(request.toObject().studentProfile?.email).toEqual(student.email);
        expect(request.toObject().studentProfile?.phoneNumber).toEqual(student.phoneNumber);
    });
});

describe("updateStudentReq", () => {
    it("should return request with ID when edit", async () => {
        const studentId = "studentId";
        const student = createMockStudentGeneralInfoForm({ studentId });
        const request = updateStudentReq({
            data: {
                generalInfo: student,
            },
            options: { isUseEnrollmentStatusStr: true },
        });

        expect(request.toObject().studentProfile?.id).toEqual(studentId);
        expect(request.toObject().studentProfile?.email).toEqual(student.email);
    });
});

describe("upsertStudentCoursePackageReq", () => {
    it("should return request correct data", async () => {
        const studentId = "studentId";
        const studentCourse = createMockUpsertCourseTest(studentId);
        const request = upsertStudentCoursePackageReq(studentCourse);
        const { studentId: studentIdReq, studentPackageProfilesList } = request.toObject();

        expect(studentIdReq).toEqual(studentId);
        expect(studentPackageProfilesList.length).toEqual(1);
    });
});

describe("removeParentReq", () => {
    it("should return correctly request", async () => {
        const request = removeParentReq(mockRemoveParentReqData);

        expect(request.toObject().studentId).toEqual(mockRemoveParentReqData.studentId);
        expect(request.toObject().parentId).toEqual(mockRemoveParentReqData.parentId);
    });
});
