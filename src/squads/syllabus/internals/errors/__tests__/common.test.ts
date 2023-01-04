import { formInvalidError, paramsInvalidError } from "../common";

describe("throw correctly error messages", () => {
    it(formInvalidError.name, () => {
        expect(() => {
            throw formInvalidError;
        }).toThrowError("ra.message.invalid_form");
    });

    it(paramsInvalidError.name, () => {
        expect(() => {
            throw paramsInvalidError;
        }).toThrowError("ra.manabie-error.invalid_params");
    });
});
