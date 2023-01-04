import { MediaType } from "manabie-bob/enum_pb";

import { ConversionTaskHasura } from "./conversion-task";

export interface MediaHasura {
    id: string;
    media_id: string;
    name: string;
    type: keyof typeof MediaType;
    resource: string;
}

export interface MediaConversionHasura extends MediaHasura, ConversionTaskHasura {}
