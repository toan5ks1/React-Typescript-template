import { useWatch } from "react-hook-form";
import {
    createMockHighestLevelLocations,
    createMockLocationTypesObject,
} from "src/test-utils/location-types";
import {
    brand_1_prefectures,
    org_1,
    org_1_brands,
    prefecture_1_1_centers,
} from "src/test-utils/locations";

import LocationsDisplay, {
    LocationsDisplayProps,
} from "src/components/RelatedUser/DialogLocationSelectOnNav/components/LocationDisplay/LocationDisplay";

import { render, screen } from "@testing-library/react";

jest.mock("src/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});

describe("LocationsDisplay component", () => {
    const mockHighestLevelLocations = createMockHighestLevelLocations();
    const mockLocationTypeMap = createMockLocationTypesObject().locationTypesMap;

    const props: LocationsDisplayProps = {
        highestLevelLocations: mockHighestLevelLocations,
        locationTypesMap: mockLocationTypeMap,
    };

    it("should render list of selected locations is empty", () => {
        const wrapper = render(<LocationsDisplay {...props} />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render list of selected locations when all locations are checked", () => {
        (useWatch as jest.Mock).mockImplementation(() => {
            return {
                org_1: {
                    ...org_1,
                    indeterminate: false,
                    isChecked: true,
                    children: [
                        {
                            ...org_1_brands[0],
                            indeterminate: false,
                            isChecked: true,
                            children: [],
                        },
                        {
                            ...org_1_brands[1],
                            indeterminate: false,
                            isChecked: true,
                            children: [],
                        },
                    ],
                },
                brand_1: {
                    ...org_1_brands[0],
                    indeterminate: false,
                    isChecked: true,
                    children: [],
                },
                brand_2: {
                    ...org_1_brands[1],
                    indeterminate: false,
                    isChecked: true,
                    children: [],
                },
            };
        });

        const wrapper = render(<LocationsDisplay {...props} />);
        expect(wrapper.container).toMatchSnapshot();
        expect(screen.getByTestId("LocationDisplay__LocationNames")).toHaveTextContent(org_1.name);
    });

    it("should render list of selected locations when some of locations are checked", () => {
        (useWatch as jest.Mock).mockImplementation(() => {
            return {
                org_1: {
                    ...org_1,
                    indeterminate: true,
                    isChecked: false,
                    children: [
                        {
                            ...org_1_brands[0],
                            indeterminate: true,
                            isChecked: false,
                            children: [
                                {
                                    ...brand_1_prefectures[0],
                                    indeterminate: true,
                                    isChecked: false,
                                    children: [
                                        {
                                            ...prefecture_1_1_centers[0],
                                            indeterminate: false,
                                            isChecked: true,
                                            children: [],
                                        },
                                        {
                                            ...prefecture_1_1_centers[1],
                                            indeterminate: false,
                                            isChecked: true,
                                            children: [],
                                        },
                                        {
                                            ...prefecture_1_1_centers[2],
                                            indeterminate: false,
                                            isChecked: false,
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    ...brand_1_prefectures[1],
                                    indeterminate: false,
                                    isChecked: true,
                                    children: [],
                                },
                            ],
                        },
                        {
                            ...org_1_brands[1],
                            indeterminate: false,
                            isChecked: true,
                            children: [],
                        },
                    ],
                },
                brand_1: {
                    ...org_1_brands[0],
                    indeterminate: true,
                    isChecked: false,
                    children: [],
                },
                brand_2: {
                    ...org_1_brands[1],
                    indeterminate: false,
                    isChecked: true,
                    children: [],
                },
                prefecture_1_1: {
                    ...brand_1_prefectures[0],
                    indeterminate: true,
                    isChecked: false,
                    children: [],
                },
                prefecture_1_2: {
                    ...brand_1_prefectures[1],
                    indeterminate: false,
                    isChecked: true,
                    children: [],
                },
                center_1: {
                    ...prefecture_1_1_centers[0],
                    indeterminate: false,
                    isChecked: true,
                    children: [],
                },
                center_2: {
                    ...prefecture_1_1_centers[1],
                    indeterminate: false,
                    isChecked: true,
                    children: [],
                },
                center_3: {
                    ...prefecture_1_1_centers[2],
                    indeterminate: false,
                    isChecked: false,
                    children: [],
                },
            };
        });

        const wrapper = render(<LocationsDisplay {...props} />);
        expect(wrapper.container).toMatchSnapshot();
        expect(screen.getByTestId("LocationDisplay__LocationNames")).toHaveTextContent(
            `${org_1_brands[1].name}, ${brand_1_prefectures[1].name}, ${prefecture_1_1_centers[0].name}, ${prefecture_1_1_centers[1].name}`
        );
    });
});
