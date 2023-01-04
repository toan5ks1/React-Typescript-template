import { StyledEngineProvider } from "@mui/material";
import ThemeProvider from "src/providers/ThemeProvider";

import TypographyEntityDetailLabel, {
    TypographyEntityDetailLabelProps,
} from "../TypographyEntityDetailLabel";

import { render, RenderResult, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

describe("<TypographyHeader />", () => {
    let wrapper: RenderResult;

    const props: TypographyEntityDetailLabelProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(
            <StyledEngineProvider injectFirst>
                <ThemeProvider>
                    <TypographyEntityDetailLabel {...props} />
                </ThemeProvider>
            </StyledEngineProvider>
        );
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render text with correct style", () => {
        expect(wrapper.getByText("Test")).toHaveStyle(`color: ${theme.palette?.text?.secondary}`);
    });
});
