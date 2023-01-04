import { useState } from "react";

import { Entities, ProviderTypes } from "src/common/constants/enum";

import { Order_By, Books_Order_By } from "../../../../__generated__/root-types";
import { TestQueryWrapper } from "../../../../test-utils/react-hooks";
import useDataProvider from "../../../useDataProvider";
import { UseQueryBaseRequest } from "../../data-types";
import useDataReload from "../../useDataReload";
import useQueryV2 from "../useQueryBaseV2";

import { act, renderHook } from "@testing-library/react-hooks";

jest.mock("src/hooks/useDataProvider", () => {
    return jest.fn();
});

describe("data/useQueryBaseV2", () => {
    type FakeData = {
        id: string;
        name: string;
    };

    const fakeReturnData: { data: FakeData[] } = {
        data: [{ id: "1", name: "2" }],
    };
    const callData: UseQueryBaseRequest<Books_Order_By> = {
        entity: Entities.BOOKS,
        action: ProviderTypes.LIST,
        params: {
            filter: {},
            sort: {
                school_id: Order_By.Asc,
            },
        },
    };

    let fakeProvider = {
        [ProviderTypes.LIST]: jest.fn(),
    };

    beforeEach(() => {
        fakeProvider[ProviderTypes.LIST].mockImplementation(() => fakeReturnData);
        (useDataProvider as jest.Mock).mockImplementation(() => fakeProvider);
    });

    it("should return correct data when called", async () => {
        const { result, waitFor } = renderHook(() => useQueryV2<FakeData[]>(callData), {
            wrapper: TestQueryWrapper,
        });

        expect(fakeProvider[ProviderTypes.LIST]).toHaveBeenCalledWith(
            callData.entity,
            callData.params
        );
        await waitFor(() => Boolean(result.current.data));
        expect(result.current.data).toEqual(fakeReturnData);
    });

    it("should be able refetch the data", async () => {
        const { result, waitFor } = renderHook(() => useQueryV2<FakeData[]>(callData), {
            wrapper: TestQueryWrapper,
        });

        await waitFor(() => Boolean(result.current.data));
        expect(result.current.data).toEqual(fakeReturnData);

        const previousCallTimes = fakeProvider[ProviderTypes.LIST].mock.calls.length;
        await act(async () => {
            // should call provider again to refetch
            await result.current.refetch();
        });

        expect(fakeProvider[ProviderTypes.LIST].mock.calls.length).toBeGreaterThan(
            previousCallTimes
        );
    });

    it("should rerun when version changed", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => {
                const res = useQueryV2<FakeData[]>(callData);
                const { reload } = useDataReload();

                return {
                    result: res,
                    reload,
                };
            },
            {
                wrapper: TestQueryWrapper,
            }
        );

        const previousCallTimes = fakeProvider[ProviderTypes.LIST].mock.calls.length;
        act(() => {
            // should reload the API calls when call global reload
            result.current.reload();
        });

        await waitForNextUpdate();
        expect(fakeProvider[ProviderTypes.LIST].mock.calls.length).toBeGreaterThan(
            previousCallTimes
        );
    });

    it("should rerender when payload changed", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => {
                const [payload, setPayload] = useState(callData);
                const res = useQueryV2<FakeData[]>(payload);

                return {
                    result: res,
                    setPayload,
                };
            },
            {
                wrapper: TestQueryWrapper,
            }
        );

        // call 1st time
        expect(fakeProvider[ProviderTypes.LIST]).toHaveBeenCalledWith(
            callData.entity,
            callData.params
        );

        // should recall when payload changed
        const previousCallTimes = fakeProvider[ProviderTypes.LIST].mock.calls.length;
        const newPayload: UseQueryBaseRequest<Books_Order_By> = {
            ...callData,
            params: {
                filter: {
                    hello: 1,
                },
            },
        };
        act(() => {
            result.current.setPayload(newPayload);
        });

        await waitForNextUpdate();
        // should reload the API calls when payload changed
        expect(fakeProvider[ProviderTypes.LIST].mock.calls.length).toBeGreaterThan(
            previousCallTimes
        );
        expect(fakeProvider[ProviderTypes.LIST]).toHaveBeenCalledWith(
            newPayload.entity,
            newPayload.params
        );
    });
});
