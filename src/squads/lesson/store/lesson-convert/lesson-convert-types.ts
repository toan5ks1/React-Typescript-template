import { ConversionTaskStatus } from "src/squads/lesson/models/conversion-task";

export interface Material {
    id: string;
    status: ConversionTaskStatus | string;
    name: string;
}

export type LessonCollection = Map<string, Material[]>;

export interface LessonConvert {
    readonly [courseId: string]: LessonCollection;
}
