import {
    DeleteLessonReportRequest,
    DynamicFieldValue,
    WriteLessonReportRequest,
} from "manabuf/bob/v1/lessons_pb";

export type ArrayOrSetValue =
    | DynamicFieldValue.StringSetValue.AsObject["arrayValueList"]
    | DynamicFieldValue.StringArrayValue.AsObject["arrayValueList"]
    | DynamicFieldValue.IntArrayValue.AsObject["arrayValueList"]
    | DynamicFieldValue.IntSetValue.AsObject["arrayValueList"];

export type WriteLessonReportRequestType = WriteLessonReportRequest.AsObject;
export type DeleteLessonReportRequestType = DeleteLessonReportRequest.AsObject;
export declare namespace NsBobLessonReportService {
    export interface UpsertLessonReport extends WriteLessonReportRequestType {}
    export interface DeleteLessonReport extends DeleteLessonReportRequestType {}
}
