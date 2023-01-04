import { ArchitectureReserveCategory } from "src/squads/payment/constants/master";
import { NsMastermgmtGradeImportService } from "src/squads/payment/service/mastermgmt/grade-service/types";
import { createMockCSVFiles } from "src/squads/payment/test-utils/mocks/master";

import { GradeServicePromiseClient } from "manabuf/mastermgmt/v1/grades_grpc_web_pb";

import gradeImportModifierMutationService from "src/squads/payment/service/mastermgmt/grade-service/grade-import-mastermgmt-modifier.mutation";

jest.mock("manabuf/mastermgmt/v1/grades_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/grades_grpc_web_pb");

    actual.GradeServicePromiseClient.prototype.importGrades = jest.fn();

    return actual;
});

describe("importGrade", () => {
    it("should successfully import grade with valid payload", async () => {
        (GradeServicePromiseClient.prototype.importGrades as jest.Mock).mockImplementation(() => {
            return {
                toObject: jest.fn(),
            };
        });

        const importGradePayloadData: NsMastermgmtGradeImportService.ImportGradesRequest = {
            payload: {
                category: ArchitectureReserveCategory.Grade,
                file: createMockCSVFiles()[0],
            },
        };

        await gradeImportModifierMutationService.importFile(importGradePayloadData);

        expect(GradeServicePromiseClient.prototype.importGrades).toBeCalled();
    });
});
