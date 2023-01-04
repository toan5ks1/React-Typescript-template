import { formInvalidErr } from "../common";

describe("formInvalidErr", () => {
    it("should throw correct message", () => {
        expect(() => {
            throw formInvalidErr;
        }).toThrowError("ra.message.invalid_form");
    });
});
