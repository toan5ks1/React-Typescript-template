import { ProviderTypes } from "src/common/constants/enum";
import { TestApp } from "src/test-utils";
import { mockUnsortedLocationTypes } from "src/test-utils/location-types";
import { TestQueryWrapper } from "src/test-utils/react-hooks";

import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";

import { render } from "@testing-library/react";
import useDataProvider from "src/hooks/useDataProvider";
import useFetchGlobalLocationTypes from "src/hooks/useFetchGlobalLocationTypes";
import { FetchGlobalLocationsTypesDataMappedType } from "src/hooks/useFetchGlobalLocationTypes/useFetchGlobalLocationTypes";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("it should fetch a flat array of locations types and transform it to a map", () => {
    const TestComponent = ({
        onSuccess,
    }: {
        onSuccess: (data: FetchGlobalLocationsTypesDataMappedType) => void;
    }) => {
        const { isLoading } = useFetchGlobalLocationTypes({ onSuccess: onSuccess });
        return isLoading ? <CircularProgressBase /> : <h1>Loaded</h1>;
    };

    it("should transform location_type[] into a map with locations[] as an attribute", (done) => {
        (useDataProvider as jest.Mock).mockImplementation(() => {
            return {
                [ProviderTypes.MANY]: () => {
                    return {
                        data: mockUnsortedLocationTypes,
                    };
                },
            };
        });

        render(
            <TestApp>
                <TestQueryWrapper>
                    <TestComponent
                        onSuccess={({ locationTypesMap }) => {
                            expect(Array.from(locationTypesMap.values())).toStrictEqual(
                                mockUnsortedLocationTypes.map((locationType) => ({
                                    ...locationType,
                                    locations: [],
                                }))
                            );
                            done();
                        }}
                    />
                </TestQueryWrapper>
            </TestApp>
        );
    });
});
