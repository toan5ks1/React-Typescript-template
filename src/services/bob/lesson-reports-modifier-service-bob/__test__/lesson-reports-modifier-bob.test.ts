import { convertEnumKeys } from "src/common/constants/helper";
import { createMockUpsertLessonReportData } from "src/test-utils/lesson-management";

import { LessonReportModifierServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { ValueType } from "manabuf/bob/v1/lessons_pb";

import lessonReportModifierServiceBob from "../lesson-reports-modifier-bob";
import {
    deleteLessonReportRequest,
    upsertLessonReportRequest,
} from "../lesson-reports-modifier-bob.request";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.LessonReportModifierServicePromiseClient.prototype.submitLessonReport = jest.fn();
    actual.LessonReportModifierServicePromiseClient.prototype.saveDraftLessonReport = jest.fn();
    actual.LessonReportModifierServicePromiseClient.prototype.deleteLessonReport = jest.fn();
    return actual;
});

const valueTypes = convertEnumKeys(ValueType);

const fakeModifierReturn = {
    toObject: jest.fn(),
};

describe("lesson-reports-modifier-bob unit test", () => {
    it("should submit lesson report", () => {
        (
            LessonReportModifierServicePromiseClient.prototype.submitLessonReport as jest.Mock
        ).mockImplementation(() => {
            return fakeModifierReturn;
        });

        Object.values(valueTypes).forEach(async (type) => {
            const data = createMockUpsertLessonReportData(ValueType[type]);

            await lessonReportModifierServiceBob.submitLessonReport({
                data,
            });

            expect(
                LessonReportModifierServicePromiseClient.prototype.submitLessonReport
            ).toBeCalledWith(upsertLessonReportRequest(data));
        });
    });

    it("should save draft lesson report", () => {
        (
            LessonReportModifierServicePromiseClient.prototype.saveDraftLessonReport as jest.Mock
        ).mockImplementation(() => {
            return fakeModifierReturn;
        });

        Object.values(valueTypes).forEach(async (type) => {
            const data = createMockUpsertLessonReportData(ValueType[type]);

            await lessonReportModifierServiceBob.saveDraftLessonReport({
                data,
            });

            expect(
                LessonReportModifierServicePromiseClient.prototype.saveDraftLessonReport
            ).toBeCalledWith(upsertLessonReportRequest(data));
        });
    });

    it("should delete lesson report", async () => {
        (
            LessonReportModifierServicePromiseClient.prototype.deleteLessonReport as jest.Mock
        ).mockImplementation(() => {
            return fakeModifierReturn;
        });

        const data = {
            lessonReportId: "Sample Lesson Report Id",
        };

        await lessonReportModifierServiceBob.deleteLessonReport({
            data,
        });

        expect(
            LessonReportModifierServicePromiseClient.prototype.deleteLessonReport
        ).toBeCalledWith(deleteLessonReportRequest(data.lessonReportId));
    });
});
