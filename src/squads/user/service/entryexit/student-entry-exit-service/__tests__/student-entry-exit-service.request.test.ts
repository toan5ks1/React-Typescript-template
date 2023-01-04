import {
    newStudentEntryExit,
    createEntryExitReq,
    updateEntryExitReq,
    deleteEntryExitReq,
    newGeneratedStudentQrCodes,
} from "../student-entry-exit-service.request";
import { NsStudentEntryExitService } from "../types";

const mockScanRequest: NsStudentEntryExitService.ScanRequest = {
    qrcodeContent: "test content",
};

const mockStudentIdsList: NsStudentEntryExitService.GenerateStudentQrCodesRequest = {
    studentIdsList: ["user_id_1", "user_id_2"],
};

const mockAddEntryExitRecord: NsStudentEntryExitService.CreateEntryExitRequest = {
    studentId: "student01",
    notifyParents: true,
    entryExitPayload: {
        studentId: "student01",
        notifyParents: true,
    },
};

const mockUpdateEntryExitRecord: NsStudentEntryExitService.UpdateEntryExitRequest = {
    entryexitId: 1,
    entryExitPayload: {
        studentId: "student01",
        notifyParents: true,
    },
};

const mockDeleteEntryExitRecord: NsStudentEntryExitService.DeleteEntryExitRequest = {
    entryexitId: 1,
    studentId: "student01",
};

describe("newStudentEntryExit", () => {
    it("should return correctly request", async () => {
        const request = newStudentEntryExit(mockScanRequest);

        expect(request.toObject().qrcodeContent).toEqual(mockScanRequest.qrcodeContent);
    });
});

describe("createEntryExitReq", () => {
    it("should return correctly request", async () => {
        const request = createEntryExitReq(mockAddEntryExitRecord);

        expect(request.toObject().entryExitPayload?.studentId).toEqual(
            mockAddEntryExitRecord.entryExitPayload?.studentId
        );
        expect(request.toObject().entryExitPayload?.notifyParents).toEqual(
            mockAddEntryExitRecord.entryExitPayload?.notifyParents
        );
    });
});

describe("updateEntryExitReq", () => {
    it("should return correctly request", async () => {
        const request = updateEntryExitReq(mockUpdateEntryExitRecord);

        expect(request.toObject().entryexitId).toEqual(mockUpdateEntryExitRecord.entryexitId);
        expect(request.toObject().entryExitPayload?.studentId).toEqual(
            mockUpdateEntryExitRecord.entryExitPayload?.studentId
        );
        expect(request.toObject().entryExitPayload?.notifyParents).toEqual(
            mockUpdateEntryExitRecord.entryExitPayload?.notifyParents
        );
    });
});

describe("deleteEntryExitReq", () => {
    it("should return correctly request", async () => {
        const request = deleteEntryExitReq(mockDeleteEntryExitRecord);

        expect(request.toObject().entryexitId).toEqual(mockDeleteEntryExitRecord.entryexitId);
        expect(request.toObject().studentId).toEqual(mockDeleteEntryExitRecord.studentId);
    });
});

describe("newGeneratedStudentQrCodes", () => {
    it("should return correctly request", async () => {
        const request = newGeneratedStudentQrCodes(mockStudentIdsList);

        expect(request.toObject().studentIdsList).toEqual(mockStudentIdsList.studentIdsList);
    });
});
