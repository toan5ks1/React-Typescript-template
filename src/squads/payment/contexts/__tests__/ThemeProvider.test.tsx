import { useTheme } from "@mui/material/styles";

import ThemeProvider from "../ThemeProvider";

import { render } from "@testing-library/react";

jest.mock("src/styles/utils", () => {
    return {
        getThemeWithMuiV5: () => {
            return {
                palette: {
                    common: {
                        black: "whiteTest",
                        white: "whiteTest",
                    },
                },
            };
        },
    };
});

describe("<ThemeProvider />", () => {
    const ChildComponent = () => {
        const theme = useTheme();

        return <div>{JSON.stringify(theme)}</div>;
    };

    it("should have correct context value", () => {
        const { container } = render(
            <ThemeProvider>
                <ChildComponent />
            </ThemeProvider>
        );

        expect(container).toMatchSnapshot();
    });
});
