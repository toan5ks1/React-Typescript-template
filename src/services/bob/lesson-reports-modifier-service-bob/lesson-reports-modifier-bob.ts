import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import {
    InheritedGrpcServiceClient,
    MutationLessonIndividualReportParams,
} from "src/services/service-types";

import { LessonReportModifierServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";

import {
    deleteLessonReportRequest,
    upsertLessonReportRequest,
} from "./lesson-reports-modifier-bob.request";
import { NsBobLessonReportService } from "./types";

class LessonReportModifierBob extends InheritedGrpcServiceClient<LessonReportModifierServicePromiseClient> {
    async submitLessonReport({
        data: lessonReport,
    }: Required<
        MutationLessonIndividualReportParams<NsBobLessonReportService.UpsertLessonReport>
    >) {
        const req = upsertLessonReportRequest(lessonReport);

        const response = await this._call("submitLessonReport", req);
        return response.toObject();
    }

    async saveDraftLessonReport({
        data: lessonReport,
    }: Required<
        MutationLessonIndividualReportParams<NsBobLessonReportService.UpsertLessonReport>
    >) {
        const req = upsertLessonReportRequest(lessonReport);

        const response = await this._call("saveDraftLessonReport", req);
        return response.toObject();
    }

    async deleteLessonReport({
        data: deleteLessonReportPayload,
    }: Required<
        MutationLessonIndividualReportParams<NsBobLessonReportService.DeleteLessonReport>
    >) {
        const req = deleteLessonReportRequest(deleteLessonReportPayload.lessonReportId);

        const response = await this._call("deleteLessonReport", req);
        return response.toObject();
    }
}

const lessonReportModifierServiceBob = new LessonReportModifierBob(
    LessonReportModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonReportModifierServiceBob;
