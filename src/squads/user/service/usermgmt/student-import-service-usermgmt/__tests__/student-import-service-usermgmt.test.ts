import {
    importStudentTemplate,
    mockGenerateImportStudentTemplateResp,
    mockImportStudentResponse,
} from "src/squads/user/test-utils/mocks/csv";

import { StudentServicePromiseClient } from "manabuf/usermgmt/v2/student_grpc_web_pb";

import studentServiceImportUsermgmt from "../student-import-service-usermgmt";

describe("studentServiceImportUsermgmt.generateImportStudentTemplate", () => {
    it("should return resp string base64", async () => {
        const generateImportStudentTemplateMock = jest
            .spyOn(StudentServicePromiseClient.prototype, "generateImportStudentTemplate")
            .mockResolvedValue(mockGenerateImportStudentTemplateResp());

        const resp = await studentServiceImportUsermgmt.generateImportStudentTemplate();
        expect(resp).toBe(importStudentTemplate);

        generateImportStudentTemplateMock.mockClear();
    });

    it("should return throw", async () => {
        const generateImportStudentTemplateMock = jest
            .spyOn(StudentServicePromiseClient.prototype, "generateImportStudentTemplate")
            .mockRejectedValue(new Error("error"));

        try {
            await studentServiceImportUsermgmt.generateImportStudentTemplate();
        } catch (error) {
            expect(error).toMatchObject(new Error("error"));
        }

        generateImportStudentTemplateMock.mockClear();
    });
});

describe("studentServiceImportUsermgmt.importStudent", () => {
    it("should return resp empty errorsList", async () => {
        const importStudentMock = jest
            .spyOn(StudentServicePromiseClient.prototype, "importStudent")
            .mockResolvedValue(mockImportStudentResponse());

        const resp = await studentServiceImportUsermgmt.importStudent({
            payload: importStudentTemplate,
        });

        expect(resp).toMatchObject({ errorsList: [] });
        importStudentMock.mockClear();
    });

    it("should return resp errorsList", async () => {
        const mockError = { error: "test", rowNumber: 1, fieldName: "" };
        const importStudentMock = jest
            .spyOn(StudentServicePromiseClient.prototype, "importStudent")
            .mockResolvedValue(mockImportStudentResponse(mockError));

        const resp = await studentServiceImportUsermgmt.importStudent({
            payload: importStudentTemplate,
        });

        expect(resp).toMatchObject({ errorsList: [mockError] });
        importStudentMock.mockClear();
    });

    it("should return throw", async () => {
        const importStudentMock = jest
            .spyOn(StudentServicePromiseClient.prototype, "importStudent")
            .mockRejectedValue(new Error("error"));

        try {
            await studentServiceImportUsermgmt.importStudent({ payload: importStudentTemplate });
        } catch (error) {
            expect(error).toMatchObject(new Error("error"));
        }

        importStudentMock.mockClear();
    });
});
