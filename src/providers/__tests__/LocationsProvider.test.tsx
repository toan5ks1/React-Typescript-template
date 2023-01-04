import reactiveStorage from "src/internals/reactive-storage";
import {
    mockLowestLevelPersistedLocations,
    mockUnsortedPersistedLocationTypesWithChildrenHandPicked,
} from "src/test-utils/location-types";
import { TestQueryWrapper } from "src/test-utils/react-hooks";

import { LocationTypesWithLocationsProvider } from "../LocationsProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGlobalLocationTypesWithLocations from "src/hooks/useGlobalLocationTypesWithLocations/useGlobalLocationTypesWithLocations";
import useGlobalLocations from "src/hooks/useGlobalLocations";
import useShowSnackbar from "src/hooks/useShowSnackbar";

jest.mock("src/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: false }),
}));

describe("<FormPropsProvider /> should synergize with useGlobalLocations", () => {
    const LowestLevelLocationDisplay = () => {
        const { locations } = useGlobalLocations();

        return (
            <div>
                {locations.map((location) => (
                    <h1 key={location.locationId}>{location.name}</h1>
                ))}
            </div>
        );
    };

    const ChildComponent = () => {
        const { sortedLocationTypesWithLocations, setLocationTypesWithLocations } =
            useGlobalLocationTypesWithLocations();

        const handleClick = () => {
            setLocationTypesWithLocations(mockUnsortedPersistedLocationTypesWithChildrenHandPicked);
        };

        return (
            <div>
                <LowestLevelLocationDisplay />
                <p>
                    {sortedLocationTypesWithLocations
                        .map((locationType) => locationType.name)
                        .toString()}
                </p>
                <button onClick={handleClick}>Click</button>
            </div>
        );
    };

    const showSnackbar = jest.fn();
    (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

    it("should set persisted location_types_with_locations[] so that useGlobalLocations can get the lowest level locations ", () => {
        render(
            <TestQueryWrapper>
                <LocationTypesWithLocationsProvider>
                    <ChildComponent />
                </LocationTypesWithLocationsProvider>
            </TestQueryWrapper>
        );

        const locationsBefore = screen.queryByRole("heading");
        expect(locationsBefore).not.toBeInTheDocument();

        const addButton = screen.getByRole("button");
        userEvent.click(addButton);

        const locationsLowestLevelContainer = screen.getAllByRole("heading");
        expect(locationsLowestLevelContainer).toHaveLength(
            mockLowestLevelPersistedLocations.length
        );

        expect(reactiveStorage.get("SORTED_LOCATIONS_TYPES")).toHaveLength(
            mockUnsortedPersistedLocationTypesWithChildrenHandPicked.length
        );
    });
});
