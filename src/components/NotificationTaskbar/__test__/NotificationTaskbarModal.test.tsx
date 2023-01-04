import { KeyConversionTaskStatusTypes } from "src/common/constants/const";
import { Material } from "src/store/lesson-convert/lesson-convert-types";
import { TestThemeProvider, TestApp } from "src/test-utils";

import { MasterImportItem } from "../Item";
import MaterialItem from "../Item/MaterialItem";
import NotificationTaskbarModal, {
    NotificationTaskbarModalProps,
} from "../NotificationTaskbarModal";

import { cleanup, render, RenderResult, screen } from "@testing-library/react";

afterAll(() => {
    cleanup();
});

describe("<NotificationTaskbar />", () => {
    const list = "NotificationTaskbarModal__list";
    const progress = "NotificationTaskbarModal__progress";

    let wrapper: RenderResult;
    const defaultProps: NotificationTaskbarModalProps = {
        open: true,
        onClose: jest.fn(),
        items: [
            {
                id: "01",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "01",
            },
        ],
    };

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <NotificationTaskbarModal {...defaultProps} />
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match UI", () => {
        expect(screen.getByTestId(list).children).toHaveLength(1);
        expect(screen.getAllByTestId(progress).length).toBeGreaterThan(0);
    });
});

afterAll(() => {
    cleanup();
});

describe("<NotificationTaskbar /> <MaterialItem />", () => {
    const file = "FileIcon";
    const name = "NotificationTaskbarModal__name";

    let wrapper: RenderResult;
    const defaultProps: Material = {
        id: "01",
        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
        name: "name 01",
    };

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <MaterialItem {...defaultProps} />
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match UI", () => {
        expect(screen.getByTestId(file)).toBeInTheDocument();
        expect(screen.getByTestId(name).textContent).toMatch("name 01 converting ...");
    });
});

describe("<NotificationTaskbar /> <MasterImportItem />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <MasterImportItem fileName="fileName" />
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match UI", () => {
        expect(screen.getByTestId("MasterImportItem__text")).toHaveTextContent(
            "fileName converting ..."
        );
    });
});
