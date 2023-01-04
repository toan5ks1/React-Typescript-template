import { TestApp } from "src/test-utils";
import {
    createMockLocationTypesObject,
    mockSortedPersistedLocationTypesWithChildrenHandPicked,
    mockSortedLocationTypes,
} from "src/test-utils/location-types";
import {
    createMockLocationsObject,
    mockBranchLocationChildren,
    mockBranchLocationParent,
    mockFlatLocations,
} from "src/test-utils/locations";
import { GlobalLocationTypeWithLocations } from "src/typings/locations-provider";

import DialogLocationSelectOnNav from "src/components/RelatedUser/DialogLocationSelectOnNav";
import { DialogLocationSelectOnNavProps } from "src/components/RelatedUser/DialogLocationSelectOnNav/DialogLocationSelectOnNav";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("DialogLocationSelectOnNav enables users to interact with location checkbox tree", () => {
    const renderTestComponent = ({
        isOpen = true,
        persistedLocationTypes: persistedLocations = [],
        onCloseDialog = jest.fn(),
        onSubmitLocationDialog = jest.fn(),
        updatePersistedLocationTypes = jest.fn(),
        showDiscardDialog = jest.fn(),
        isLoadingLocationTypes = false,
        isLoadingLocations = false,
        locationsObjects = createMockLocationsObject(),
        locationTypesObject = createMockLocationTypesObject(),
    }: Partial<DialogLocationSelectOnNavProps>) => {
        return render(
            <TestApp>
                <DialogLocationSelectOnNav
                    isOpen={isOpen}
                    persistedLocationTypes={persistedLocations}
                    onCloseDialog={onCloseDialog}
                    onSubmitLocationDialog={onSubmitLocationDialog}
                    updatePersistedLocationTypes={updatePersistedLocationTypes}
                    locationsObjects={locationsObjects}
                    locationTypesObject={locationTypesObject}
                    isLoadingLocations={isLoadingLocations}
                    isLoadingLocationTypes={isLoadingLocationTypes}
                    showDiscardDialog={showDiscardDialog}
                />
            </TestApp>
        );
    };

    it("should render Loading when loading data", () => {
        const wrapper = renderTestComponent({
            isLoadingLocationTypes: true,
            isLoadingLocations: true,
            locationTypesObject: undefined,
            locationsObjects: undefined,
        });

        expect(wrapper).toMatchSnapshot();
        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should render all locations inside locations tree from flat locations array", () => {
        const wrapper = renderTestComponent({});

        expect(wrapper).toMatchSnapshot();

        mockFlatLocations.forEach((location) =>
            expect(screen.getByText(location.name)).toBeInTheDocument()
        );
    });

    const toggleLocationCheckBox = (locationId: string) => {
        const locationInputContainer = screen.getByTestId(`CheckBoxLocation__${locationId}`);
        expect(locationInputContainer).toBeInTheDocument();

        userEvent.click(locationInputContainer!);

        const locationInput = within(locationInputContainer).getByRole("checkbox");
        expect(locationInput).toBeChecked();
    };

    const assertCheckBoxIsChecked = (locationId: string) => {
        const locationInputContainer = screen.getByTestId(`CheckBoxLocation__${locationId}`);
        expect(locationInputContainer).toBeInTheDocument();

        const locationInput = within(locationInputContainer).getByRole("checkbox");
        expect(locationInput).toBeChecked();
    };

    const assertCheckBoxIsIndeterminate = (locationId: string) => {
        const locationInputContainer = screen.getByTestId(`CheckBoxLocation__${locationId}`);
        expect(locationInputContainer).toBeInTheDocument();

        const locationInput = within(locationInputContainer).getByRole("checkbox");
        expect(locationInput).toHaveAttribute("data-indeterminate", "true");
    };

    it("should select descendants locations when parent location is selected", () => {
        renderTestComponent({});

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        mockBranchLocationChildren?.forEach((childLocation) => {
            assertCheckBoxIsChecked(childLocation.locationId);
        });
    });
    it("should make ancestors locations indeterminate when child location is selected", () => {
        renderTestComponent({});

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        expect(mockBranchLocationParent.accessPath).toBeTruthy();
        const locationAncestorIds = mockBranchLocationParent.accessPath?.split("/");
        expect(locationAncestorIds).toHaveLength(3); // 3 is based on the current value of mockBranchLocation.accessPath

        locationAncestorIds?.forEach((locationAncestorId) => {
            if (locationAncestorId === mockBranchLocationParent.locationId) return;
            assertCheckBoxIsIndeterminate(locationAncestorId);
        });
    });

    it("should display 1 location only, when it and its children are selected", () => {
        renderTestComponent({});

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        mockBranchLocationChildren?.forEach((childLocation) => {
            assertCheckBoxIsChecked(childLocation.locationId);
        });
        const locationWithChildrenNamesDisplay = screen.getByTestId(
            "LocationDisplay__LocationNames"
        );
        expect(locationWithChildrenNamesDisplay).toHaveTextContent(mockBranchLocationParent.name);
    });

    it("should display sorted locations based on location types, from highest to lowest level", () => {
        renderTestComponent({
            persistedLocationTypes: mockSortedPersistedLocationTypesWithChildrenHandPicked,
        });

        const locationWithChildrenNamesDisplay = screen.getByTestId(
            "LocationDisplay__LocationNames"
        );
        expect(locationWithChildrenNamesDisplay).toMatchSnapshot();
    });

    const generateExpectedGlobalLocationTypes = () => {
        return mockSortedLocationTypes.map((locationType) => {
            let locations: GlobalLocationTypeWithLocations["locations"] = [];
            if (locationType.locationTypeId === mockBranchLocationParent.locationType) {
                locations = [mockBranchLocationParent];
            } else if (locationType.locationTypeId === mockBranchLocationChildren[0].locationType) {
                locations = mockBranchLocationChildren;
            }
            const result: GlobalLocationTypeWithLocations = {
                ...locationType,
                locations,
            };

            return result;
        });
    };
    const mockGlobalLocationTypes = generateExpectedGlobalLocationTypes();
    it("should callback with an array of locations when submitted", async () => {
        const onSubmitLocationDialog = jest.fn();
        renderTestComponent({ onSubmitLocationDialog });

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveButton);

        await waitFor(() => {
            expect(onSubmitLocationDialog).toBeCalledWith(mockGlobalLocationTypes);
        });
    });

    it("should call onCloseDialog when clicking cancel if the user hasn't selected anything", async () => {
        const onCloseDialog = jest.fn();
        renderTestComponent({ onCloseDialog });

        const cancelButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelButton);

        await waitFor(() => {
            expect(onCloseDialog).toBeCalled();
        });
    });

    it("should NOT call onCloseDialog when the user cancel the discard dialog after they toggle a location", () => {
        const onCloseDialog = jest.fn();
        renderTestComponent({ onCloseDialog });

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        const cancelButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelButton);

        expect(onCloseDialog).not.toBeCalled();
    });
});
