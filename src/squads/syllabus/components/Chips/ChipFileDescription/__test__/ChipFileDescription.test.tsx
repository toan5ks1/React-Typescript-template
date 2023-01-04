import { KeyConversionTaskStatusTypes } from "src/squads/syllabus/common/constants/const";

import { getKeyByValue, MediaType } from "src/components/ListMediaChipsBase/utils/type";

import ChipFileDescription, { ChipFileDescriptionProps } from "../ChipFileDescription";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe("<ChipFileDescription />", () => {
    let wrapper: RenderResult;

    const props: ChipFileDescriptionProps = {
        name: "Test Name",
        href: "href",
        requirePdfConversion: true,
        file: {
            name: "Test Name",
            type: getKeyByValue(MediaType, MediaType.MEDIA_TYPE_PDF),
            resource:
                "https://storage.googleapis.com/stag-manabie-backend/user-upload/Material301FA1KD94AWGK48PBEBF9NYN15.pdf",
            media_id: "06",
            created_at: "Created At",
            updated_at: "Updated At",
            conversion_tasks: [
                {
                    created_at: "created at",
                    resource_url:
                        "https://storage.googleapis.com/stag-manabie-backend/user-upload/Material301FA1KD94AWGK48PBEBF9NYN15.pdf",
                    status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                    task_uuid: "task_uuid",
                    updated_at: "update at",
                },
            ],
            conversion_tasks_aggregate: {
                nodes: [],
            },
        },
        convertPdf: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ChipFileDescription {...props} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(wrapper.getByTestId("ChipFileDescription")).toBeInTheDocument();
        expect(wrapper.getByTestId("ExternalLink")).toBeInTheDocument();

        expect(wrapper.getByTestId("FileIcon")).toBeInTheDocument();
        expect(wrapper.getByTestId("FileIcon__file")).toBeInTheDocument();

        expect(wrapper.getByTestId("ChipFileDescription__name")).toBeInTheDocument();
        expect(wrapper.getByTestId("ChipFileDescription__name").textContent).toEqual(props.name);
    });

    it("should not render delete icon", () => {
        expect(wrapper.queryByTestId("ChipRemoveIcon__icon")).not.toBeInTheDocument();
    });

    it("should render correct style", () => {
        expect(wrapper.getByTestId("FileIcon")).toHaveStyle("minHeight: 28px");
        expect(wrapper.getByTestId("FileIcon")).toHaveStyle("minWidth: 28px");
        expect(wrapper.getByTestId("ChipFileDescription")).toHaveStyle(
            "background-color: transparent"
        );
        expect(wrapper.getByTestId("ChipFileDescription")).toHaveStyle("border: 1px solid #bdbdbd"); // old rgba(0, 0, 0, 0.23)??
        expect(wrapper.getByTestId("ChipFileDescription")).toHaveStyle("height: 32px");
        expect(wrapper.getByTestId("ChipFileDescription")).toHaveStyle("position: relative");
    });

    it("should render try again button and call convertPdf fn when clicking try again", () => {
        const tryAgainBtn = screen.getByText("resources.courses.lessonConvert.tryAgain");
        expect(tryAgainBtn).toBeInTheDocument();
        fireEvent.click(tryAgainBtn);
        expect(props.convertPdf).toBeCalled();
    });
});

describe("<ChipFileDescription with delete action/>", () => {
    let wrapper: RenderResult;

    const props: ChipFileDescriptionProps = {
        name: "Test Name",
        lessonGroup: "week 1",
        onDelete: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <ChipFileDescription {...props} />
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render without href", () => {
        expect(wrapper.queryByTestId("ExternalLink")).not.toBeInTheDocument();
    });

    it("should render delete icon", () => {
        expect(wrapper.queryByTestId("ChipRemoveIcon__icon")).toBeInTheDocument();
    });

    it("should render confirm dialog", () => {
        fireEvent.click(wrapper.getByTestId("ChipRemoveIcon__icon"));
        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        expect(wrapper.getByTestId("FooterDialogConfirm__buttonSave")).toBeInTheDocument();
        expect(
            wrapper.getByText(
                `You're about to remove the file named “${props.name}” for ${props.lessonGroup}.`
            )
        ).toBeInTheDocument();

        const confirmBtn = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(confirmBtn);
        expect(props.onDelete).toBeCalled();
    });
});

describe("<ChipFileDescription with delete action/>", () => {
    let wrapper: RenderResult;

    const props: ChipFileDescriptionProps = {
        name: "Test Name",
        onDelete: jest.fn(),
        shouldConfirmDelete: false,
    };

    beforeEach(() => {
        wrapper = render(<ChipFileDescription {...props} />);
    });

    it("should not render confirm dialog", () => {
        fireEvent.click(wrapper.getByTestId("ChipRemoveIcon__icon"));
        expect(wrapper.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument();
    });
});
