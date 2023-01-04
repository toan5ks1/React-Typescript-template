import { ProviderTypes } from "src/common/constants/enum";
import { MasterDataTypes } from "src/services/bob/master-data-reader-bob/types";
import { TestApp } from "src/test-utils";
import {
    mockFlattenPersistedLocations,
    mockUnsortedPersistedLocationTypesWithChildrenHandPicked,
    mockSortedPersistedLocationTypesWithChildrenHandPicked,
    mockUnsortedLocationTypes,
} from "src/test-utils/location-types";
import { mockBranchLocationParent, mockFlatLocations } from "src/test-utils/locations";
import { TestQueryWrapper } from "src/test-utils/react-hooks";

import LocationSettingOnNav, {
    LocationSettingOnNavProps,
} from "src/components/RelatedUser/LocationSettingOnNav/LocationSettingOnNav";

import { render, screen, waitFor, waitForElementToBeRemoved, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseQueryRequest } from "src/hooks/data/useQueryV2";
import useDataProvider from "src/hooks/useDataProvider";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("LocationSettingOnNav enables users to interact with location checkbox tree", () => {
    const renderTestComponent = ({
        isOpen = true,
        persistedLocationTypes: persistedLocations = [],
        onCloseDialog = jest.fn(),
        onSubmitLocationDialog = jest.fn(),
        updatePersistedLocationTypes = jest.fn(),
    }: Partial<LocationSettingOnNavProps>) => {
        return render(
            <TestApp>
                <TestQueryWrapper>
                    <LocationSettingOnNav
                        isOpen={isOpen}
                        persistedLocationTypes={persistedLocations}
                        onCloseDialog={onCloseDialog}
                        onSubmitLocationDialog={onSubmitLocationDialog}
                        updatePersistedLocationTypes={updatePersistedLocationTypes}
                    />
                </TestQueryWrapper>
            </TestApp>
        );
    };

    const mockLocationForUseQuery = () => {
        (useDataProvider as jest.Mock).mockImplementation(() => {
            return {
                [ProviderTypes.MANY]: (
                    _: UseQueryRequest["entity"],
                    parameters: UseQueryRequest<MasterDataTypes>["params"]
                ) => {
                    if (!parameters?.filter)
                        return {
                            data: {},
                        };

                    switch (parameters.filter.type) {
                        case MasterDataTypes.Location:
                            return {
                                data: mockFlatLocations,
                            };
                        case MasterDataTypes.LocationType:
                            return {
                                data: mockUnsortedLocationTypes,
                            };
                    }
                },
            };
        });
    };

    beforeEach(() => {
        mockLocationForUseQuery();
    });

    it("should render all locations inside locations tree from flat locations array", async () => {
        const wrapper = renderTestComponent({});
        await waitForElementToBeRemoved(screen.queryByRole("progressbar"));

        expect(wrapper).toMatchSnapshot();

        mockFlatLocations.forEach((location) =>
            expect(screen.getByText(location.name)).toBeInTheDocument()
        );
    });

    const assertCheckBoxIsChecked = (locationId: string) => {
        const locationInputContainer = screen.getByTestId(`CheckBoxLocation__${locationId}`);
        expect(locationInputContainer).toBeInTheDocument();

        const locationInput = within(locationInputContainer).getByRole("checkbox");
        expect(locationInput).toBeChecked();
    };

    it("should check all persisted locations and indeterminate their unchecked ancestors when user opens the dialog", async () => {
        const onSubmitLocationDialog = jest.fn();
        renderTestComponent({
            persistedLocationTypes: mockSortedPersistedLocationTypesWithChildrenHandPicked,
            onSubmitLocationDialog,
        });
        await waitForElementToBeRemoved(screen.queryByRole("progressbar"));

        mockFlattenPersistedLocations.forEach((location) => {
            assertCheckBoxIsChecked(location.locationId);
        });

        // TODO: check for "indeterminate their unchecked ancestors"

        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveButton);

        await waitFor(() => {
            expect(onSubmitLocationDialog).toBeCalledWith(
                mockUnsortedPersistedLocationTypesWithChildrenHandPicked
            );
        });
    });

    const toggleLocationCheckBox = (locationId: string) => {
        const locationInputContainer = screen.getByTestId(`CheckBoxLocation__${locationId}`);
        expect(locationInputContainer).toBeInTheDocument();

        userEvent.click(locationInputContainer!);

        const locationInput = within(locationInputContainer).getByRole("checkbox");
        expect(locationInput).toBeChecked();
    };

    it("should call onCloseDialog when the user confirm the discard dialog after they toggle a location", async () => {
        const onCloseDialog = jest.fn();
        renderTestComponent({ onCloseDialog });
        await waitForElementToBeRemoved(screen.queryByRole("progressbar"));

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        const cancelButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelButton);

        const dialogCancelConfirm = screen.getByTestId("DialogCancelConfirm__dialog");
        const discardButton = within(dialogCancelConfirm).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );
        userEvent.click(discardButton);

        await waitFor(() => {
            expect(onCloseDialog).toBeCalled();
        });
    });

    it("should NOT call onCloseDialog when the user cancel the discard dialog after they toggle a location", async () => {
        const onCloseDialog = jest.fn();
        renderTestComponent({ onCloseDialog });
        await waitForElementToBeRemoved(screen.queryByRole("progressbar"));

        toggleLocationCheckBox(mockBranchLocationParent.locationId);

        const cancelButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelButton);

        const dialogCancelConfirm = screen.getByTestId("DialogCancelConfirm__dialog");
        const cancelDiscardButton = within(dialogCancelConfirm).getByTestId(
            "FooterDialogConfirm__buttonClose"
        );
        userEvent.click(cancelDiscardButton);

        await waitForElementToBeRemoved(screen.queryByTestId("DialogCancelConfirm__dialog"));

        expect(onCloseDialog).not.toBeCalled();
    });
});
