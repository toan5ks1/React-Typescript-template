import QuizPreviewText, {
    QuizPreviewTextProps,
} from "src/squads/syllabus/pages/QuizV2/components/QuizPreview/QuizPreviewText";

import { render, screen } from "@testing-library/react";

const props: QuizPreviewTextProps = {
    title: "title",
    value: "value",
};

const renderUtil = (props: QuizPreviewTextProps) => render(<QuizPreviewText {...props} />);

describe(QuizPreviewText.name, () => {
    it("should render correct title and value", () => {
        renderUtil(props);

        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.value)).toBeInTheDocument();
    });

    it("should render nothing if there is no value", () => {
        const { container } = renderUtil({ ...props, value: "" });

        expect(container).toBeEmptyDOMElement();
    });
});
