import { ProviderTypes } from "src/common/constants/enum";
import { NsMasterDataReaderService } from "src/services/master/master-reader-service-master/types";
import { TestApp } from "src/test-utils";
import { mockFlatLocations } from "src/test-utils/locations";
import { TestQueryWrapper } from "src/test-utils/react-hooks";
import { GlobalLocationItem } from "src/typings/locations-provider";

import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";

import { convertLocationRootToLocationArray } from "../useFetchGlobalLocationsArray";

import { render } from "@testing-library/react";
import useDataProvider from "src/hooks/useDataProvider";
import useFetchGlobalLocationsArray from "src/hooks/useFetchGlobalLocationsArray";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("useFetchGlobalLocationsArray should fetch a flat array of locations", () => {
    const TestComponent = ({
        onSuccess,
    }: {
        onSuccess: (data: NsMasterDataReaderService.LocationObjectResponse[]) => void;
    }) => {
        const { isLoading } = useFetchGlobalLocationsArray({ onSuccess: onSuccess });
        return isLoading ? <CircularProgressBase /> : <h1>Loaded</h1>;
    };

    it("should transform location[] into an array of locations", (done) => {
        (useDataProvider as jest.Mock).mockImplementation(() => {
            return {
                [ProviderTypes.MANY]: () => {
                    return {
                        data: mockFlatLocations,
                    };
                },
            };
        });
        let expectLocationsArrayRef: GlobalLocationItem[] = [];
        convertLocationRootToLocationArray(mockFlatLocations, "", expectLocationsArrayRef);

        render(
            <TestApp>
                <TestQueryWrapper>
                    <TestComponent
                        onSuccess={(locationsArray) => {
                            expect(locationsArray).toStrictEqual(expectLocationsArrayRef);
                            done();
                        }}
                    />
                </TestQueryWrapper>
            </TestApp>
        );
    });
});
