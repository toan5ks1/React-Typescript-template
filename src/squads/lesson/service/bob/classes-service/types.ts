import { MediaHasura } from "src/squads/lesson/models/media";

import { MediaType } from "manabie-bob/enum_pb";

export declare namespace NsLesson_Bob_ClassesService {
    export interface ConvertMedia {
        mediaList: Array<{
            media_id?: string;
            name?: string;
            resource: string;
            type: MediaHasura["type"];
        }>;
    }

    export interface UpsertMedia {
        type: MediaType;
        name: string;
        resource: string;
    }
}
