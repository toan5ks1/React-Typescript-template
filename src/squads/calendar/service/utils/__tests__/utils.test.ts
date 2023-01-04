import { PagingRequest } from "src/common/constants/types";
import {
    createEmptyResponse,
    getEmptyResponse,
    getFileExtension,
    getFileNameWithoutExtension,
    getOptionsForSelectLocationType,
    getOptionsForSelectLocationTypeReturn,
    getSearchString,
    sortLocationTypes,
    toBasicPagingProto,
} from "src/squads/calendar/service/utils/utils";

import { LocationTypesList } from "src/squads/calendar/domains/Calendar/types";

describe(createEmptyResponse.name, () => {
    it("should return an object", async () => {
        const obj = { data: { id: "123" } };

        expect(await createEmptyResponse(obj)).toEqual(obj);
    });
    it("should return undefined", async () => {
        const obj = undefined;

        expect(await createEmptyResponse(obj)).toEqual(obj);
    });
    it("should return an array", async () => {
        const sampleArray = [{ id: 123 }];

        expect(await createEmptyResponse(sampleArray)).toEqual(sampleArray);
    });
});

describe(getEmptyResponse.name, () => {
    it("should return an empty response", async () => {
        expect(await getEmptyResponse()).toEqual({ data: { id: null } });
    });
});

describe(getSearchString.name, () => {
    it("should return a search string", () => {
        expect(getSearchString("text")).toEqual("%text%");
    });

    it("should return undefined for empty search string", () => {
        expect(getSearchString("")).toEqual(undefined);
    });

    it("should return undefined for undefined value", () => {
        expect(getSearchString(undefined)).toEqual(undefined);
    });
});

describe(toBasicPagingProto.name, () => {
    it("should return Paging proto", () => {
        const pagingObject: PagingRequest = {
            limit: 5,
            offsetInteger: 0,
            offsetString: "offsetString__dependsOnApi",
        };
        const actualValue = toBasicPagingProto(pagingObject);
        expect(actualValue.getLimit()).toEqual(pagingObject.limit);
        expect(actualValue.getOffsetInteger()).toEqual(pagingObject.offsetInteger);
        expect(actualValue.getOffsetString()).toEqual(pagingObject.offsetString);
    });

    it("should ignore offsetString", () => {
        const pagingObject: PagingRequest = {
            limit: 5,
            offsetInteger: 10,
            offsetString: "",
        };
        const actualValue = toBasicPagingProto(pagingObject);
        expect(actualValue.getLimit()).toEqual(pagingObject.limit);
        expect(actualValue.getOffsetInteger()).toEqual(pagingObject.offsetInteger);
        expect(actualValue.getOffsetString()).toEqual("");
    });

    it("should ignore offsetInteger", () => {
        const pagingObject: PagingRequest = {
            limit: 5,
            offsetInteger: 10,
            offsetString: "offsetString__dependsOnApi",
        };
        const actualValue = toBasicPagingProto(pagingObject);
        expect(actualValue.getLimit()).toEqual(pagingObject.limit);
        expect(actualValue.getOffsetInteger()).toEqual(0);
        expect(actualValue.getOffsetString()).toEqual(pagingObject.offsetString);
    });
});

describe(getFileExtension.name, () => {
    it("should return correct file extension", () => {
        expect(getFileExtension("image.png")).toEqual("png");
    });

    it("should return empty", () => {
        expect(getFileExtension("")).toEqual("");
    });
});

describe(getFileNameWithoutExtension.name, () => {
    it("should return correct file extension", () => {
        expect(getFileNameWithoutExtension("image.png")).toEqual("image");
    });

    it("should return file name when dont have extension", () => {
        expect(getFileNameWithoutExtension("image")).toEqual("image");
        expect(getFileNameWithoutExtension("image.")).toEqual("image");
    });
    it("should return empty", () => {
        expect(getFileNameWithoutExtension("")).toEqual("");
    });
});

describe("sortLocationTypes function", () => {
    it("Sort location type function should work properly", () => {
        const mockLocationTypesList: LocationTypesList = [
            { location_type_id: "c", parent_location_type_id: "b", name: "c", is_archived: false },
            { location_type_id: "d", parent_location_type_id: "c", name: "d", is_archived: false },
            { location_type_id: "a", parent_location_type_id: null, name: "a", is_archived: false },
            { location_type_id: "e", parent_location_type_id: "d", name: "e", is_archived: false },
            { location_type_id: "b", parent_location_type_id: "a", name: "b", is_archived: false },
        ];

        const sortedList = sortLocationTypes(mockLocationTypesList, {
            location_type_id: "a",
            parent_location_type_id: null,
            name: "a",
            is_archived: false,
        });

        expect(sortedList).toEqual<LocationTypesList>([
            { location_type_id: "a", parent_location_type_id: null, name: "a", is_archived: false },
            { location_type_id: "b", parent_location_type_id: "a", name: "b", is_archived: false },
            { location_type_id: "c", parent_location_type_id: "b", name: "c", is_archived: false },
            { location_type_id: "d", parent_location_type_id: "c", name: "d", is_archived: false },
            { location_type_id: "e", parent_location_type_id: "d", name: "e", is_archived: false },
        ]);
    });

    it("Should not loop forever when location type list is not linked together", () => {
        const mockLocationTypesList = [
            { location_type_id: "c", parent_location_type_id: "j", name: "c", is_archived: false },
            { location_type_id: "d", parent_location_type_id: "h", name: "d", is_archived: false },
            { location_type_id: "a", parent_location_type_id: null, name: "a", is_archived: false },
            { location_type_id: "e", parent_location_type_id: "f", name: "e", is_archived: false },
            { location_type_id: "b", parent_location_type_id: "g", name: "b", is_archived: false },
        ];

        const sortedList = sortLocationTypes(mockLocationTypesList, {
            location_type_id: "a",
            parent_location_type_id: null,
            name: "a",
            is_archived: false,
        });

        expect(sortedList).toHaveLength(mockLocationTypesList.length);
    });
});

describe(getOptionsForSelectLocationType.name, () => {
    it("Get options for select location type function should work properly", () => {
        const mockLocationTypesList: LocationTypesList = [
            { location_type_id: "c", parent_location_type_id: "b", name: "c", is_archived: false },
            { location_type_id: "d", parent_location_type_id: "c", name: "d", is_archived: false },
            { location_type_id: "a", parent_location_type_id: null, name: "a", is_archived: false },
            { location_type_id: "e", parent_location_type_id: "b", name: "e", is_archived: false },
            {
                location_type_id: "b",
                parent_location_type_id: null,
                name: "org",
                is_archived: false,
            },
        ];

        const options = getOptionsForSelectLocationType(mockLocationTypesList);

        expect(options).toEqual<getOptionsForSelectLocationTypeReturn>({
            locationTypesOptions: [
                {
                    location_type_id: "c",
                    parent_location_type_id: "b",
                    name: "c",
                    is_archived: false,
                },
                {
                    location_type_id: "d",
                    parent_location_type_id: "c",
                    name: "d",
                    is_archived: false,
                },
                {
                    location_type_id: "e",
                    parent_location_type_id: "b",
                    name: "e",
                    is_archived: false,
                },
            ],
            defaultValue: {
                location_type_id: "c",
                parent_location_type_id: "b",
                name: "c",
                is_archived: false,
            },
        });
    });
});
