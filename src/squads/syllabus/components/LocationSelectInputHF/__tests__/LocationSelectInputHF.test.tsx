import { getMockLocations, mockTreeLocations } from "src/squads/syllabus/test-utils/locations";

import LocationSelectInputHF from "../LocationSelectInputHF";

import { render, screen, within, fireEvent } from "@testing-library/react";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useMapTreeLocations", () => {
    return {
        __esModule: true,
        default: () => ({ treeLocations: mockTreeLocations }),
    };
});

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});

describe("<LocationSelectInputHF />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <TestThemeProvider>
                <TestHookForm defaultValues={{}}>
                    <LocationSelectInputHF
                        label="Location"
                        name="locations"
                        getOptionSelectedField="locationId"
                    />
                </TestHookForm>
            </TestThemeProvider>
        );

        expect(container).toMatchSnapshot();
    });

    it("should match snapshot with default value", () => {
        const locations = getMockLocations(5);

        const { container } = render(
            <TestThemeProvider>
                <TestHookForm defaultValues={{ locations }}>
                    <LocationSelectInputHF
                        label="Location"
                        name="locations"
                        getOptionSelectedField="locationId"
                    />
                </TestHookForm>
            </TestThemeProvider>
        );

        expect(container).toMatchSnapshot("with default value");
    });

    it("should render correctly with default value", () => {
        const locations = getMockLocations(5);
        render(
            <TestThemeProvider>
                <TestHookForm defaultValues={{ locations }}>
                    <LocationSelectInputHF
                        label="Location"
                        name="locations"
                        getOptionSelectedField="locationId"
                    />
                </TestHookForm>
            </TestThemeProvider>
        );

        const tagBoxes = screen.getAllByTestId("LocationSelectInputHF__tagBox");
        expect(tagBoxes).toHaveLength(locations.length);

        for (let index = 0; index < tagBoxes.length; index++) {
            const tagBox = tagBoxes[index];
            const expectLocationName = locations[index].name;
            const chip = within(tagBox).getByTestId("LocationSelectInputHF__ChipTag");
            expect(chip).toBeInTheDocument();
            expect(chip).toHaveTextContent(expectLocationName);
        }
    });

    it("should render correctly with limitTags props", () => {
        const locations = getMockLocations(10);
        const limitTags = 5;
        render(
            <TestThemeProvider>
                <TestHookForm defaultValues={{ locations }}>
                    <LocationSelectInputHF
                        label="Location"
                        name="locations"
                        limitTags={limitTags}
                        getOptionSelectedField="locationId"
                    />
                </TestHookForm>
            </TestThemeProvider>
        );
        const tagBoxes = screen.getAllByTestId("LocationSelectInputHF__tagBox");
        expect(tagBoxes).toHaveLength(limitTags);

        const chipLimitTags = screen.getByTestId("LocationSelectInputHF__chipLimitTags");
        expect(chipLimitTags).toBeInTheDocument();
        expect(chipLimitTags).toHaveTextContent(`+ ${locations.length - limitTags}`);
    });

    it("should display DialogTreeLocations", () => {
        render(
            <TestThemeProvider>
                <TestHookForm defaultValues={{}}>
                    <LocationSelectInputHF
                        label="Location"
                        name="locations"
                        getOptionSelectedField="locationId"
                    />
                </TestHookForm>
            </TestThemeProvider>
        );
        const input = screen.getByTestId("AutocompleteBase__input");
        fireEvent.keyDown(input, { key: "ArrowDown" });

        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");
        expect(treeLocationDialog).toBeInTheDocument();
    });
});
