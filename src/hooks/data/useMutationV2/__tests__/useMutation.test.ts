import { Entities, ProviderTypes } from "src/common/constants/enum";

import { TestQueryWrapper } from "../../../../test-utils/react-hooks";
import useDataProvider from "../../../useDataProvider";
import useMutationV2, { UseMutationParams, UseMutationOptions } from "../useMutationV2";

import { act, renderHook } from "@testing-library/react-hooks";

jest.mock("src/hooks/useDataProvider", () => {
    return jest.fn();
});

describe("data/useMutation", () => {
    type FakeData = {
        id: string;
        name: string;
    };
    const fakeReturnData: { data: FakeData } = {
        data: {
            id: "2",
            name: "3",
        },
    };
    const initialParams: UseMutationParams = {
        entity: Entities.BOOKS,
        action: ProviderTypes.UPDATE,
    };
    let fakeProvider: {
        [ProviderTypes.UPDATE]: jest.Mock;
    } = { [ProviderTypes.UPDATE]: jest.fn() };

    beforeEach(() => {
        fakeProvider[ProviderTypes.UPDATE] = jest.fn().mockImplementation(() => fakeReturnData);
        (useDataProvider as jest.Mock).mockImplementation(() => fakeProvider);
    });

    type Var = {
        hello: number;
        hi: string;
    };

    it("should return correct data when called", async () => {
        const variables: Var = {
            hi: "hi",
            hello: 2,
        };

        const { result, waitForNextUpdate } = renderHook(
            () => useMutationV2<Var, FakeData>(initialParams),
            {
                wrapper: TestQueryWrapper,
            }
        );

        act(() => {
            result.current.mutate(variables);
        });

        await waitForNextUpdate();
        expect(fakeProvider[ProviderTypes.UPDATE]).toHaveBeenCalledWith(
            initialParams.entity,
            variables
        );
        expect(result.current.data).toEqual(fakeReturnData.data);
    });

    it("it should call lifecycle hooks correctly", async () => {
        const variables: Var = {
            hi: "hi11",
            hello: 2222,
        };
        const options: UseMutationOptions<Var, FakeData> = {
            onSuccess: jest.fn(),
        };

        const { result, waitForNextUpdate } = renderHook(
            () => useMutationV2<Var, FakeData>(initialParams, options),
            {
                wrapper: TestQueryWrapper,
            }
        );

        act(() => {
            result.current.mutate(variables);
        });

        await waitForNextUpdate();
        expect(options.onSuccess).toHaveBeenCalledWith(fakeReturnData.data, variables, undefined); // undefined context
    });
});
