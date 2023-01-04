/**
 * @jest-environment node
 */
import { isSSR } from "../utils";

describe("isSSR", () => {
    it("should return this is server environment", () => {
        expect(isSSR()).toEqual(true); // fake node env, window doesnt exist, same with server env, so true
    });
});
