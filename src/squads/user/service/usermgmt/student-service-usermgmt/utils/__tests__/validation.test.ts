import { formInvalidErr } from "src/internals/errors";
import {
    createMockStudentCourse,
    createMockStudentGeneralInfoForm,
    createMockUpsertCourseTest,
    mockReissueUserPasswordReqData,
    mockRemoveParentReqData,
    mockUpsertParentData,
} from "src/squads/user/test-utils/mocks/student";

import {
    validateUpsertParentReq,
    validateReissueUserPasswordReq,
    validateCreateStudentReq,
    validateUpsertCourseReq,
    validateRemoveParentReq,
    validateUpsertStudentCoursePackageReq,
} from "../validation";

describe("validateUpsertParentReq", () => {
    it("should NOT THROW when correct request", () => {
        expect(() => {
            validateUpsertParentReq(mockUpsertParentData);
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        expect(() => {
            validateUpsertParentReq();
        }).toThrowError(formInvalidErr);
    });
});

describe("validateReissueUserPasswordReq", () => {
    it("should NOT THROW when correct request", () => {
        expect(() => {
            validateReissueUserPasswordReq(mockReissueUserPasswordReqData);
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        expect(() => {
            validateReissueUserPasswordReq();
        }).toThrowError(formInvalidErr);
    });
});

describe("validateCreateStudentReq", () => {
    it("should NOT THROW when correct request", () => {
        const student = createMockStudentGeneralInfoForm();

        expect(() => {
            validateCreateStudentReq({ data: { generalInfo: student } });
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        const student = createMockStudentGeneralInfoForm({ name: "", email: "" });
        expect(() => {
            validateCreateStudentReq({ data: { generalInfo: student } });
        }).toThrowError(formInvalidErr);
    });
});

describe("validateUpsertCoursePackageReq", () => {
    it("should NOT THROW when correct request", () => {
        const course = createMockStudentCourse();

        expect(() => {
            validateUpsertCourseReq(course);
        });
    });
});

describe("validateRemoveParentReq", () => {
    it("should NOT THROW when correct request", () => {
        expect(() => {
            validateRemoveParentReq(mockRemoveParentReqData);
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        expect(() => {
            validateUpsertCourseReq();
        }).toThrowError(formInvalidErr);
    });
});

describe("validateUpsertStudentCoursePackageReq", () => {
    it("should NOT THROW when correct request", () => {
        const studentId = "studentId";
        const studentCourse = createMockUpsertCourseTest(studentId);

        expect(() => {
            validateUpsertStudentCoursePackageReq(studentCourse);
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        expect(() => {
            validateUpsertStudentCoursePackageReq();
        }).toThrowError(formInvalidErr);
    });
});
