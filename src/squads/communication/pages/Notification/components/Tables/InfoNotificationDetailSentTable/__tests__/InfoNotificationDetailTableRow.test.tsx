import InfoNotificationDetailSentTableRow from "../InfoNotificationDetailSentTableRow";

import { render, screen } from "@testing-library/react";

describe("<InfoNotificationDetailTableRow />", () => {
    const mockRowItem: string[] = ["Test"];

    beforeEach(() => {
        render(<InfoNotificationDetailSentTableRow rowLabel="Test Label" rowItems={mockRowItem} />);
    });

    it("should match snapshot", () => {
        const { container } = render(
            <InfoNotificationDetailSentTableRow rowLabel="Test Label" rowItems={mockRowItem} />
        );
        expect(container).toMatchSnapshot();
    });

    it("should render InfoNotificationDetailTableRow", () => {
        expect(
            screen.getByTestId("InfoNotificationDetailSentTableRow__container")
        ).toBeInTheDocument();
    });

    it("should render InfoNotificationDetailTableDivRowChipBaseItem", () => {
        expect(screen.getByTestId("ChipBase_item")).toBeInTheDocument();
    });
});
