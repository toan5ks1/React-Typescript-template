import { Box } from "@mui/material";

import useTextEllipsis from "../useTextEllipsis";

import { render } from "@testing-library/react";

describe("useDatePickerPairHF with default offset", () => {
    const ComponentEllipsis = () => {
        return (
            <Box component="p" data-testid="TextEllipsis__text" sx={useTextEllipsis}>
                This is a very long text
            </Box>
        );
    };

    it("should render style to make text ellipsis", () => {
        const wrapper = render(<ComponentEllipsis />);

        expect(wrapper.getByTestId("TextEllipsis__text")).toHaveStyle("text-overflow: ellipsis");
    });
});
