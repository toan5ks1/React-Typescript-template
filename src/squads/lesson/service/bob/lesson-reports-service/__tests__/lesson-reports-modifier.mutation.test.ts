import { convertEnumKeys } from "src/common/constants/helper";
import { createMockUpsertLessonReportData } from "src/squads/lesson/test-utils/lesson-management";

import { LessonReportModifierServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { ValueType } from "manabuf/bob/v1/lessons_pb";

import lessonReportsModifierServiceBob, {
    deleteLessonReportRequest,
    upsertLessonReportRequest,
} from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-modifier.mutation";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.LessonReportModifierServicePromiseClient.prototype.submitLessonReport = jest.fn();
    actual.LessonReportModifierServicePromiseClient.prototype.saveDraftLessonReport = jest.fn();
    actual.LessonReportModifierServicePromiseClient.prototype.deleteLessonReport = jest.fn();
    return actual;
});

const valueTypes = convertEnumKeys(ValueType);

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("lesson-reports-modifier.mutation", () => {
    it("should submit lesson report", () => {
        (
            LessonReportModifierServicePromiseClient.prototype.submitLessonReport as jest.Mock
        ).mockReturnValue(fakeReturn);

        const _callSpy = jest.spyOn(lessonReportsModifierServiceBob, "_call");

        Object.values(valueTypes).forEach(async (type) => {
            const data = createMockUpsertLessonReportData(ValueType[type]);
            await lessonReportsModifierServiceBob.submitLessonReport({ data });

            expect(
                LessonReportModifierServicePromiseClient.prototype.submitLessonReport
            ).toBeCalledWith(upsertLessonReportRequest(data));
        });

        expect(_callSpy).toHaveBeenCalledTimes(7);
    });

    it("should save draft lesson report", () => {
        (
            LessonReportModifierServicePromiseClient.prototype.saveDraftLessonReport as jest.Mock
        ).mockReturnValue(fakeReturn);

        const _callSpy = jest.spyOn(lessonReportsModifierServiceBob, "_call");

        Object.values(valueTypes).forEach(async (type) => {
            const data = createMockUpsertLessonReportData(ValueType[type]);
            await lessonReportsModifierServiceBob.saveDraftLessonReport({ data });

            expect(
                LessonReportModifierServicePromiseClient.prototype.saveDraftLessonReport
            ).toBeCalledWith(upsertLessonReportRequest(data));
        });

        expect(_callSpy).toHaveBeenCalledTimes(7);
    });

    it("should delete lesson report", async () => {
        (
            LessonReportModifierServicePromiseClient.prototype.deleteLessonReport as jest.Mock
        ).mockReturnValue(fakeReturn);

        const data = {
            lessonReportId: "Sample Lesson Report Id",
        };

        const _callSpy = jest.spyOn(lessonReportsModifierServiceBob, "_call");
        await lessonReportsModifierServiceBob.deleteLessonReport({ data });
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            LessonReportModifierServicePromiseClient.prototype.deleteLessonReport
        ).toBeCalledWith(deleteLessonReportRequest(data.lessonReportId));
    });
});
