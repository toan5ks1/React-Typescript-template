import TypographyBase from "src/components/Typographys/TypographyBase";
import NotImplementYet, {
    NotImplementYetProps,
} from "src/squads/payment/components/NotImplementYet";

import { render, screen } from "@testing-library/react";

const renderNotImplementYet = (props: NotImplementYetProps) => {
    return render(<NotImplementYet {...props} />);
};

describe("<NotImplementYet />", () => {
    it("should render correctly", () => {
        renderNotImplementYet({ isImplemented: false });

        expect(screen.getByTestId("NotImplementYet__label")).toBeInTheDocument();
    });

    it("should render correctly with new text", () => {
        const notImplementText = "new text";

        renderNotImplementYet({ isImplemented: false, notImplementText });

        expect(screen.getByTestId("NotImplementYet__label")).toHaveTextContent(notImplementText);
    });

    it("should render children when implemented", () => {
        const implementedText = "Implemented";

        renderNotImplementYet({
            isImplemented: true,
            children: <TypographyBase>{implementedText}</TypographyBase>,
        });

        const implementedTextElement = screen.getByText(implementedText);

        expect(implementedTextElement).toBeInTheDocument();

        expect(implementedTextElement).toHaveTextContent(implementedText);
    });
});
