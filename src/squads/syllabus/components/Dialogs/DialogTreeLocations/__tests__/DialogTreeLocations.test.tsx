import {
    getLeafLocationsByRecursive,
    getNodeTreeByRecursive,
} from "src/squads/syllabus/common/helpers/tree-locations";
import { LocationInformation } from "src/squads/syllabus/common/types/common";
import {
    mockListLocationsChecked,
    mockTreeLocations,
} from "src/squads/syllabus/test-utils/locations";

import DialogTreeLocations from "../DialogTreeLocations";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

jest.mock("src/squads/syllabus/hooks/useMapTreeLocations", () => {
    return {
        __esModule: true,
        default: () => ({ treeLocations: mockTreeLocations }),
    };
});

describe("<DialogTreeLocations/>", () => {
    const onClose = jest.fn();
    const onAdd = jest.fn();

    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <DialogTreeLocations
                    onClose={onClose}
                    open={true}
                    onAdd={onAdd}
                    title="A Title"
                    textSave="Add"
                    textClose="Close"
                />
            </TestCommonAppProvider>
        );
    };

    it("should match to snapshot", () => {
        renderComponent();
        expect(screen.getByTestId("DialogTreeLocations")).toMatchSnapshot();
    });

    it("should render included title, tree, correct textSave and textClose", () => {
        renderComponent();

        expect(screen.getByText("A Title")).toBeInTheDocument();
        expect(screen.getByText("Add")).toBeInTheDocument();
        expect(screen.getByText("Close")).toBeInTheDocument();
        expect(screen.getByTestId("DialogTreeLocations__tree")).toBeInTheDocument();
        expect(screen.getByTestId("DialogTreeLocations")).toBeInTheDocument();
    });

    it("should be called onAdd with selected data", () => {
        renderComponent();

        userEvent.click(screen.getByText("Location 12"));
        userEvent.click(screen.getByText("Location 13"));
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        expect(subNote).toHaveTextContent("Location 12");
        expect(subNote).toHaveTextContent("Location 13");

        const location12 = getNodeTreeByRecursive(mockTreeLocations[0], "center_12");
        const location13 = getNodeTreeByRecursive(mockTreeLocations[0], "center_13");

        const expectedResults: LocationInformation[] = [location12, location13];

        expect(onAdd).toBeCalledWith(expectedResults);
    });

    it("should be called onClose", () => {
        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(onClose).toBeCalledTimes(1);
    });
    it(`should render "indeterminate" and "indeterminate" on checkbox correctly`, () => {
        renderComponent();

        const brandData = getNodeTreeByRecursive(mockTreeLocations[0], "brand_2");
        const prefectureData = getNodeTreeByRecursive(mockTreeLocations[0], "prefecture_2_1");
        const lastChildrenLocations = getLeafLocationsByRecursive({ node: brandData });

        const centerElements = lastChildrenLocations.map((location) => {
            return document.querySelector(`[data-value='${location.locationId}']`) as HTMLElement;
        });

        const brandElement = document.querySelector(
            `[data-value='${brandData.locationId}']`
        ) as HTMLElement;

        const prefectureElement = document.querySelector(
            `[data-value='${prefectureData.locationId}']`
        ) as HTMLElement;

        // click on a child
        userEvent.click(centerElements[0]);

        expect(centerElements[0].querySelector("input")).toBeChecked();
        expect(brandElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        expect(prefectureElement.querySelector("input")).toHaveAttribute(
            "data-indeterminate",
            "true"
        );
        // click on a node (branch)
        userEvent.click(brandElement);
        expect(brandElement.querySelector("input")).toBeChecked();
        expect(prefectureElement.querySelector("input")).toBeChecked();
        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).toBeChecked();
        }

        // click on a node (prefecture)
        userEvent.click(prefectureElement);
        expect(brandElement.querySelector("input")).not.toBeChecked();
        expect(prefectureElement.querySelector("input")).not.toBeChecked();
        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).not.toBeChecked();
        }

        //click on children
        for (const centerElement of centerElements) {
            userEvent.click(centerElement);
        }
        expect(brandElement.querySelector("input")).toBeChecked();
        expect(prefectureElement.querySelector("input")).toBeChecked();
        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).toBeChecked();
        }
    });
});

describe("<DialogTreeLocations/> edited", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <DialogTreeLocations
                    onClose={jest.fn()}
                    open={true}
                    onAdd={jest.fn()}
                    title="A Title"
                    textSave="Add"
                    textClose="Close"
                    initialCheckedList={mockListLocationsChecked}
                />
            </TestCommonAppProvider>
        );
    };
    it("should match snapshot on edited", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should be able to uncheck location in checked list", () => {
        renderComponent();

        const location = screen.getByText("Location 13");

        const wrapperLocations = location.closest("div") as HTMLDivElement;

        expect(within(wrapperLocations).getByRole("checkbox")).toBeChecked();

        userEvent.click(location);

        expect(within(wrapperLocations).getByRole("checkbox")).not.toBeChecked();

        userEvent.click(screen.getByTestId(`FooterDialogConfirm__buttonSave`));

        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        expect(subNote).not.toHaveTextContent("Location 13");
    });
});
