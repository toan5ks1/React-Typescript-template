import { AxiosResponse } from "axios";
import axios from "src/internals/axios-client";
import warner from "src/internals/warner";

import RemoteRichTextDisplay from "../RemoteRichTextDisplay";

import { render, screen } from "@testing-library/react";

jest.mock("src/internals/warner", () => {
    return {
        log: jest.fn(),
    };
});

jest.mock("axios");

describe("<RemoteRichTextDisplay />", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should render without crash", async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
            data: "<div data-testid='Test'>123</div>",
            status: 200,
            config: {},
        } as AxiosResponse<string>);
        render(<RemoteRichTextDisplay url={"test"} />);

        expect(await screen.findByTestId("Test")).toBeInTheDocument();
    });

    it("should sanitize the bad html", async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
            data: "<div >456<script>alert('Hacked')</script></div>",
            status: 200,
            config: {},
        } as AxiosResponse<string>);
        const { container } = render(<RemoteRichTextDisplay url={"/badUrl"} />);

        expect(await screen.findByText("456")).toBeInTheDocument();

        expect(container.querySelector("script")).toEqual(null);
        expect(warner.log).toHaveBeenCalled();
    });
});
