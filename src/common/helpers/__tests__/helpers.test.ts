import { Entities, FatimaEntities } from "src/common/constants/enum";

import { getPrimaryKey, firstOptionsChoice } from "../helpers";

describe(firstOptionsChoice.name, () => {
    it("should return correct values", () => {
        expect(
            firstOptionsChoice({ firstChoiceLabel: "All Course", key: "key", keyValue: "value" })
        ).toEqual({
            value: "All Course",
            key: undefined,
        });
    });
    it("should return default values", () => {
        expect(firstOptionsChoice({ firstChoiceLabel: "All Course" })).toEqual({
            value: "All Course",
            id: undefined,
        });
    });
});

describe(getPrimaryKey.name, () => {
    it("should return correct entity id", () => {
        expect(getPrimaryKey(Entities.BOOKS)).toEqual("book_id");
    });
    it("should return default value id", () => {
        expect(getPrimaryKey(FatimaEntities.PACKAGES)).toEqual("id");
    });
});
