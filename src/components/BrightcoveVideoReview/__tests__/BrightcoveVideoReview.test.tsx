import BrightcoveVideoReview from "../BrightcoveVideoReview";

import { render, fireEvent, screen } from "@testing-library/react";

jest.mock("src/hooks/useBrightcoveProfileData", () => ({
    __esModule: true,
    default: () => ({ accountId: "accountId", policyKey: "" }),
}));

describe("<BrightcoveVideoReview />", () => {
    it("should trigger dialog on children click", () => {
        render(
            <BrightcoveVideoReview videoId={"123"}>
                <button data-testid="XYZ">Test</button>
            </BrightcoveVideoReview>
        );
        expect(screen.queryByTestId("Brightcove__video")).not.toBeInTheDocument();

        fireEvent(
            screen.getByTestId("XYZ"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(screen.getByTestId("Brightcove__video")).toBeInTheDocument();
    });
});
