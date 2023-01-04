import { Box } from "@mui/material";

import useTextCapitalize from "../useTextCapitalize";

import { render } from "@testing-library/react";

const ComponentTextCapitalize = () => {
    return (
        <Box data-testid="TextCapitalize__text" sx={useTextCapitalize}>
            Title
        </Box>
    );
};

describe("useTextCapitalize to style Typography", () => {
    it("should render correct text with capitilize", () => {
        const wrapper = render(<ComponentTextCapitalize />);
        expect(wrapper.getByTestId("TextCapitalize__text")).toHaveStyle(
            "text-transform: capitalize"
        );
    });
});
