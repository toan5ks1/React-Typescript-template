import {
    flatTreeLocationByRecursive,
    getLeafLocationsByRecursive,
    getNodeTreeByRecursive,
} from "src/squads/user/common/helpers/tree-locations";
import { mockTreeLocations } from "src/squads/user/test-utils/mocks/locations";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import DialogTreeLocations, { DialogTreeLocationsProps } from "../DialogTreeLocations";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useMapTreeLocations");

describe("<DialogTreeLocations/>", () => {
    const onClose = jest.fn();
    const onAdd = jest.fn();
    const props: DialogTreeLocationsProps = {
        onClose,
        open: true,
        onAdd,
        title: "A Title",
        textSave: "Add",
        textClose: "Close",
        showRootOrg: true,
    };
    const renderComponent = (overrideProps?: Partial<DialogTreeLocationsProps>) => {
        return render(
            <TestCommonAppProvider>
                <DialogTreeLocations {...props} {...overrideProps} />
            </TestCommonAppProvider>
        );
    };

    it("should match to snapshot", () => {
        renderComponent();
        expect(screen.getByTestId("DialogTreeLocations")).toMatchSnapshot();
    });

    it("should root org be displayed", () => {
        renderComponent();
        expect(screen.getByText(mockTreeLocations[0].name)).toBeInTheDocument();
    });

    it("should be called onAdd with selected parent location", () => {
        renderComponent();
        const brandData = getNodeTreeByRecursive(mockTreeLocations[0], "brand_1");

        userEvent.click(screen.getByText(brandData.name));

        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        expect(subNote).toHaveTextContent(brandData.name);

        userEvent.click(screen.getByTestId(`FooterDialogConfirm__buttonSave`));

        expect(onAdd).toBeCalledWith([brandData]);
    });

    it("should be called onAdd with selected Org location", () => {
        renderComponent();

        userEvent.click(screen.getByText("Organization"));
        userEvent.click(screen.getByTestId(`FooterDialogConfirm__buttonSave`));
        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        expect(subNote).toHaveTextContent("Organization");
        expect(onAdd).toBeCalledWith([mockTreeLocations[0]]);
    });

    it("should all children locations be checked when parent location is checked", () => {
        renderComponent();
        const subNote = screen.getByTestId("DialogTreeLocations__subNote");
        const brandData = getNodeTreeByRecursive(mockTreeLocations[0], "brand_2");
        const brandElement = document.querySelector(
            `[data-value='${brandData.locationId}']`
        ) as HTMLElement;

        userEvent.click(brandElement);

        const childrenLocations = flatTreeLocationByRecursive(brandData);
        const locationElements = childrenLocations.map((location) => {
            return document.querySelector(`[data-value='${location.locationId}']`) as HTMLElement;
        });
        for (const location of locationElements) {
            expect(location.querySelector("input")).toBeChecked();
        }
        expect(subNote).toHaveTextContent(brandData.name);
    });
    it(`should render "indeterminate" location correctly`, () => {
        renderComponent();
        const brandData = getNodeTreeByRecursive(mockTreeLocations[0], "brand_2");
        const prefectureData = getNodeTreeByRecursive(mockTreeLocations[0], "prefecture_2_1");
        const lastChildrenLocations = getLeafLocationsByRecursive({ node: brandData });
        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        const centerElements = lastChildrenLocations.map((location) => {
            return document.querySelector(`[data-value='${location.locationId}']`) as HTMLElement;
        });

        const orgElement = document.querySelector(
            `[data-value='${mockTreeLocations[0].locationId}']`
        ) as HTMLElement;

        const brandElement = document.querySelector(
            `[data-value='${brandData.locationId}']`
        ) as HTMLElement;

        const prefectureElement = document.querySelector(
            `[data-value='${prefectureData.locationId}']`
        ) as HTMLElement;

        // click all child
        centerElements.forEach((element) => userEvent.click(element));

        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).toBeChecked();
        }
        expect(orgElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        expect(brandElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        expect(prefectureElement.querySelector("input")).toHaveAttribute(
            "data-indeterminate",
            "true"
        );
        const expectedSubNote = lastChildrenLocations.map((location) => location.name).join(", ");
        expect(subNote).toHaveTextContent(expectedSubNote);

        // click on a node (prefecture)
        userEvent.click(prefectureElement);
        expect(prefectureElement.querySelector("input")).toBeChecked();
        expect(brandElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        expect(orgElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).toBeChecked();
        }
        expect(subNote).toHaveTextContent(prefectureData.name);

        // click on a node (branch)
        userEvent.click(brandElement);
        expect(brandElement.querySelector("input")).toBeChecked();
        expect(prefectureElement.querySelector("input")).toBeChecked();
        expect(orgElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).toBeChecked();
        }
        expect(subNote).toHaveTextContent(brandData.name);

        // click on a node (org)
        userEvent.click(orgElement);
        expect(brandElement.querySelector("input")).toBeChecked();
        expect(prefectureElement.querySelector("input")).toBeChecked();
        expect(orgElement.querySelector("input")).toBeChecked();
        for (const centerElement of centerElements) {
            expect(centerElement.querySelector("input")).toBeChecked();
        }
        expect(subNote).toHaveTextContent(mockTreeLocations[0].name);
    });

    it("should render location checkbox correctly when de-select location", () => {
        const initialCheckedList = [mockTreeLocations[0]];
        const brand1Data = getNodeTreeByRecursive(mockTreeLocations[0], "brand_1");
        const brand2Data = getNodeTreeByRecursive(mockTreeLocations[0], "brand_2");
        const prefectureData = getNodeTreeByRecursive(mockTreeLocations[0], "prefecture_2_1");
        const center1Data = getNodeTreeByRecursive(mockTreeLocations[0], "center_16");
        const center2Data = getNodeTreeByRecursive(mockTreeLocations[0], "center_17");
        renderComponent({ initialCheckedList });

        const [rootOrgElement, brand2Element, prefectureElement, center1Element, center2Element] = [
            mockTreeLocations[0],
            brand2Data,
            prefectureData,
            center1Data,
            center2Data,
        ].map(
            (location) =>
                document.querySelector(`[data-value='${location.locationId}']`) as HTMLElement
        );

        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        expect(subNote).toHaveTextContent(mockTreeLocations[0].name);

        userEvent.click(center1Element);

        const flatBrand1Data = flatTreeLocationByRecursive(brand1Data);
        const brand1Locations = flatBrand1Data.map(
            (location) =>
                document.querySelector(`[data-value='${location.locationId}']`) as HTMLElement
        );
        for (const location of brand1Locations) {
            expect(location.querySelector("input")).toBeChecked();
        }
        expect(center2Element.querySelector("input")).toBeChecked();
        expect(prefectureElement.querySelector("input")).toHaveAttribute(
            "data-indeterminate",
            "true"
        );
        expect(brand2Element.querySelector("input")).toHaveAttribute("data-indeterminate", "true");
        expect(rootOrgElement.querySelector("input")).toHaveAttribute("data-indeterminate", "true");

        expect(subNote).toHaveTextContent(`${brand1Data.name}, ${center2Data.name}`);
    });

    it("should be unable to uncheck location in checked list", () => {
        const initialCheckedList = [mockTreeLocations[0]];
        renderComponent({ initialCheckedList, checkable: false });

        const subNote = screen.getByTestId("DialogTreeLocations__subNote");

        expect(subNote).toHaveTextContent("Organization");

        const location = screen.getByText("Organization");

        const wrapperLocations = location.closest("div") as HTMLDivElement;

        expect(within(wrapperLocations).getByRole("checkbox")).toBeChecked();

        userEvent.click(location);

        expect(within(wrapperLocations).getByRole("checkbox")).toBeChecked();

        expect(subNote).toHaveTextContent("Organization");
    });
});
