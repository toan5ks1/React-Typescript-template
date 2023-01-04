/**
 * @jest-environment node
 */
import { getOriginUrl } from "../project";

describe(getOriginUrl.name, () => {
    const defaultValue = "https://localhost:3001";

    it("should return default value when window is undefined", () => {
        expect(getOriginUrl()).toEqual(new URL(defaultValue));
    });
});
