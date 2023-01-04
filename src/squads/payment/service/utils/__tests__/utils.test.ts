import { getEmptyResponse, createEmptyResponse } from "src/squads/payment/service/utils/utils";

const mockData = undefined;

describe("getEmptyResponse", () => {
    it("should return promise with data response with null id", () => {
        expect(getEmptyResponse()).toEqual(
            Promise.resolve({
                data: {
                    id: null,
                },
            })
        );
    });
});

describe("createEmptyResponse", () => {
    it("should return promise with input parameter", () => {
        expect(createEmptyResponse(mockData)).toEqual(Promise.resolve(mockData));
    });
});
