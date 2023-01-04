import { ProviderTypes } from "src/common/constants/enum";
import { TestApp } from "src/test-utils";
import {
    mockFlatLocations,
    mockFlattenedTreeLocations,
    mockTreeLocations,
    mockTreeLocationsMap,
} from "src/test-utils/locations";
import { TestQueryWrapper } from "src/test-utils/react-hooks";

import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";

import { render } from "@testing-library/react";
import useDataProvider from "src/hooks/useDataProvider";
import useFetchGlobalLocations from "src/hooks/useFetchGlobalLocations";
import { FetchGlobalLocationsDataMappedType } from "src/hooks/useFetchGlobalLocations/useFetchGlobalLocations";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("useFetchGlobalLocations should fetch a flat array of locations and transform it", () => {
    const TestComponent = ({
        onSuccess,
    }: {
        onSuccess: (data: FetchGlobalLocationsDataMappedType) => void;
    }) => {
        const { isLoading } = useFetchGlobalLocations({ onSuccess: onSuccess });
        return isLoading ? <CircularProgressBase /> : <h1>Loaded</h1>;
    };

    it("should transform location[] into a tree, a map and an array of locations", (done) => {
        (useDataProvider as jest.Mock).mockImplementation(() => {
            return {
                [ProviderTypes.MANY]: () => {
                    return {
                        data: mockFlatLocations,
                    };
                },
            };
        });

        render(
            <TestApp>
                <TestQueryWrapper>
                    <TestComponent
                        onSuccess={({ locationsArray, locationsMap, locationsTree }) => {
                            expect(locationsTree).toStrictEqual(mockTreeLocations);
                            expect(locationsArray).toStrictEqual(mockFlattenedTreeLocations);
                            expect(Array.from(locationsMap.values())).toStrictEqual(
                                Array.from(mockTreeLocationsMap.values())
                            );
                            done();
                        }}
                    />
                </TestQueryWrapper>
            </TestApp>
        );
    });
});
