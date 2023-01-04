import { Entities, ProviderTypes } from "src/common/constants/enum";

import { TestQueryWrapper } from "../../../../test-utils/react-hooks";
import useDataProvider from "../../../useDataProvider";
import useQueryV2, { UseQueryOptions } from "../useQueryV2";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/hooks/useDataProvider", () => {
    return jest.fn();
});

type FakeData = {
    id: string;
    name: string;
};

describe("data/useQueryV2", () => {
    let fakeOptions: UseQueryOptions<FakeData>;
    let fakeProvider: {
        [ProviderTypes.LIST]: jest.Mock;
    };

    beforeEach(() => {
        fakeOptions = {
            selector: jest.fn().mockImplementation((e: FakeData) => {
                return e;
            }), //return same value for assertion
        };

        fakeProvider = { [ProviderTypes.LIST]: jest.fn() };
    });
    const entity = Entities.LOS;

    it("should take the data return from the provider", async () => {
        const validReturnData: { data: FakeData[] } = {
            data: [{ id: "1", name: "2" }],
        };

        fakeProvider[ProviderTypes.LIST].mockImplementation(() => validReturnData);
        (useDataProvider as jest.Mock).mockImplementation(() => fakeProvider);

        const callParams = { filter: { hello: 1 } };

        const { result, waitFor } = renderHook(
            () =>
                useQueryV2<FakeData>(
                    { entity, params: callParams, action: ProviderTypes.LIST },
                    fakeOptions
                ),
            {
                wrapper: TestQueryWrapper,
            }
        );

        await waitFor(() => Boolean(result.current.data));

        expect(fakeProvider[ProviderTypes.LIST]).toHaveBeenCalledWith(entity, callParams);

        // for queryOne, if result return an array, we select the first element
        expect(result.current.data).toEqual(validReturnData.data);
        expect(fakeOptions.selector).toHaveBeenCalledWith(validReturnData.data);
    });
});
