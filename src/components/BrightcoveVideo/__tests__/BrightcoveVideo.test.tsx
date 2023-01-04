import BrightcoveVideo from "../BrightcoveVideo";

import { render } from "@testing-library/react";

jest.mock("src/hooks/useBrightcoveProfileData", () => ({
    __esModule: true,
    default: () => ({ accountId: "accountId", policyKey: "" }),
}));

describe("BrightcoveVideo />", () => {
    it("should render without crash", () => {
        render(<BrightcoveVideo videoId={"2103218401"} />);
    });
});
