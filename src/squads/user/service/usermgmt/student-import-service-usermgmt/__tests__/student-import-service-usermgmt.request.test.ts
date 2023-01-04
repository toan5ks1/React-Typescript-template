import { formInvalidErr } from "src/internals/errors";

import {
    generateImportStudentTemplateReq,
    importStudentReq,
    validateImportStudentReq,
} from "../student-import-service-usermgmt.request";

describe("generateImportStudentTemplateReq", () => {
    it("should return empty object", () => {
        const req = generateImportStudentTemplateReq();
        expect(req).toMatchObject({});
    });
});

describe("importStudentReq", () => {
    it("should return payload base64", () => {
        const mock = { payload: "string-base64" };
        const req = importStudentReq(mock);
        expect(req.toObject()).toMatchObject(mock);
    });
});

describe("validateImportStudentReq", () => {
    it("should return undefined", () => {
        const mock = { payload: "string-base64" };
        const req = validateImportStudentReq(mock);
        expect(req).toBeUndefined();
    });

    it("should return formInvalidErr", () => {
        try {
            validateImportStudentReq();
        } catch (error) {
            expect(error).toMatchObject(formInvalidErr);
        }
    });
});
