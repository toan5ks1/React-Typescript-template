import { Box } from "@mui/material";

import useTextEntity from "../useTextEntity";

import { render } from "@testing-library/react";

const ComponentTextEntity = () => {
    const { textEntity } = useTextEntity;
    return (
        <Box data-testid="TextEntity__text" sx={textEntity}>
            Entity Title
        </Box>
    );
};

describe("useTextEntity to style Typography", () => {
    it("should render correct text with entity style", () => {
        const wrapper = render(<ComponentTextEntity />);
        expect(wrapper.getByTestId("TextEntity__text")).toHaveStyle({
            marginTop: "0",
            marginBottom: "0",
            maxWidth: "100%",
            overflowWrap: "anywhere",
        });
    });
});
