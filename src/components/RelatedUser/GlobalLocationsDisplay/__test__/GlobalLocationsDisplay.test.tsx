import {
    mockSortedLocationTypes,
    mockSortedPersistedLocationTypesWithChildrenHandPicked,
} from "src/test-utils/location-types";

import GlobalLocationsDisplay from "src/components/RelatedUser/GlobalLocationsDisplay";

import { render } from "@testing-library/react";
import useGlobalLocationTypesWithLocations from "src/hooks/useGlobalLocationTypesWithLocations";

jest.mock("src/hooks/useGlobalLocationTypesWithLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("GlobalLocationsDisplay display a shorten version of locations based on LT-9751", () => {
    it("should not display anything when the user hasn't selected any locations", () => {
        (useGlobalLocationTypesWithLocations as jest.Mock).mockImplementation(() => ({
            sortedLocationTypesWithLocations: mockSortedLocationTypes,
        }));

        const { baseElement } = render(<GlobalLocationsDisplay />);

        expect(baseElement).toMatchSnapshot();
    });

    it("should display locations using sortedLocationTypes from the globalLocationsTypes hook", () => {
        (useGlobalLocationTypesWithLocations as jest.Mock).mockImplementation(() => ({
            sortedLocationTypesWithLocations:
                mockSortedPersistedLocationTypesWithChildrenHandPicked,
        }));
        const { baseElement } = render(<GlobalLocationsDisplay />);

        expect(baseElement).toMatchSnapshot();
    });
});
