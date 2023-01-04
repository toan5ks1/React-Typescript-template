import { NsMasterDataReaderService } from "src/squads/syllabus/services/bob/master-reader-service/type";

import { Media as MediaRoot } from "src/squads/syllabus/__generated__/bob/root-types";

export type LocationInformation = NsMasterDataReaderService.LocationObjectResponse & {
    isArchived?: boolean;
};
export type LocationTypeInformation = NsMasterDataReaderService.LocationTypeObjectResponse;

export type LocationUpsertCourses = Pick<LocationInformation, "locationId" | "name">;

export type DynamicAutocompleteOptionProps = {
    key: string;
    label: string;
};

export type DynamicFormFieldValue =
    | string
    | DynamicAutocompleteOptionProps
    | DynamicAutocompleteOptionProps[] // Autocomplete Type
    | string
    | number
    | boolean
    | string[]
    | number[]
    | null;
export type Media = Omit<MediaRoot, "resource_path">;
