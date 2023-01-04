import { ReactNode } from "react";

import { ContentState } from "draft-js";

import InlineBlank, { InlineBlankProps } from "../InlineBlank";

import { render, screen } from "@testing-library/react";

const contentState = {} as ContentState;
const entityKey: string = "test-entity-key";
const offsetKey: string = "test-key";
const childrenText: string = "children text";
const children: ReactNode = <div>{childrenText}</div>;

const renderUtil = (props: InlineBlankProps) => render(<InlineBlank {...props} />);

describe(InlineBlank.name, () => {
    it("should render span element with correct attribute", () => {
        renderUtil({ offsetKey, children, contentState, entityKey });

        expect(screen.getByTestId("InlineBlank__root")).toHaveAttribute(
            "data-offset-key",
            offsetKey
        );
    });
});
