import { DynamicAutocompleteOptionProps } from "src/squads/lesson/common/types";
import { createTimeList, isDynamicAutocompleteOptionProps } from "src/squads/lesson/common/utils";

describe("isDynamicAutocompleteProps testing", () => {
    it("should not return true if the params is wrong type", () => {
        const isNotDynamicProps = {
            STRING: "STRING",
            NUMBER: "NUMBER",
            UNDEFINED: undefined,
            NULL: null,
            ARRAY_STRING: ["StringA", "StringB"],
            ARRAY_NUMBER: [1, 2],
        };

        expect(isDynamicAutocompleteOptionProps()).not.toEqual(true);
        expect(isDynamicAutocompleteOptionProps(isNotDynamicProps.STRING)).not.toEqual(true);
        expect(isDynamicAutocompleteOptionProps(isNotDynamicProps.NUMBER)).not.toEqual(true);
        expect(isDynamicAutocompleteOptionProps(isNotDynamicProps.UNDEFINED)).not.toEqual(true);
        expect(isDynamicAutocompleteOptionProps(isNotDynamicProps.NULL)).not.toEqual(true);
        expect(isDynamicAutocompleteOptionProps(isNotDynamicProps.ARRAY_STRING)).not.toEqual(true);
        expect(isDynamicAutocompleteOptionProps(isNotDynamicProps.ARRAY_NUMBER)).not.toEqual(true);
    });

    it("should return true if the params is DynamicAutocompleteOptionProps type", () => {
        const isDynamicProps: DynamicAutocompleteOptionProps = {
            key: "Test Key",
            label: "Attend",
        };

        expect(isDynamicAutocompleteOptionProps(isDynamicProps)).toEqual(true);
    });

    it("should create list of time with base date", () => {
        const mockToday = new Date("2022-02-02T09:00:00.000Z");

        const [firstOption, secondOption, thirdOption] = createTimeList(mockToday);

        expect(firstOption).toEqual({
            label: "00:00",
            value: new Date("2022-02-02T00:00:00.000Z"),
        });

        expect(secondOption).toEqual({
            label: "00:01",
            value: new Date("2022-02-02T00:01:00.000Z"),
        });

        expect(thirdOption).toEqual({
            label: "00:02",
            value: new Date("2022-02-02T00:02:00.000Z"),
        });
    });
});
