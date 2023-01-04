import { convertFromRaw, RawDraftContentState } from "draft-js";
import { TestThemeProvider } from "src/squads/communication/test-utils";
import { getThemeWithMuiV5 } from "src/styles";

import BlockLink, { BlockLinkProps } from "../BlockLink";

import { render, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const ChildComponent = () => {
    return <div data-testid="BlockLink__children">Children</div>;
};

const rawDraftContentStateLink: RawDraftContentState = {
    blocks: [
        {
            data: {},
            depth: 0,
            entityRanges: [
                {
                    key: 0,
                    length: 7,
                    offset: 0,
                },
            ],
            inlineStyleRanges: [],
            key: "7mgkb",
            text: "youtube",
            type: "unstyled",
        },
    ],
    entityMap: {
        0: {
            data: {
                url: "https://green-school-portal.web.app/",
            },
            mutability: "MUTABLE",
            type: "LINK",
        },
    },
};

const contentState = convertFromRaw(rawDraftContentStateLink);
const entityKey = contentState
    .getBlockForKey(rawDraftContentStateLink.blocks[0].key)
    .getEntityAt(0);

const defaultBlockLinkProps: BlockLinkProps = {
    entityKey,
    contentState,
    children: <ChildComponent />,
};

const muiTheme = getThemeWithMuiV5({ options: theme });

const renderBlockLinkComponent = (props: BlockLinkProps = defaultBlockLinkProps) => {
    return render(
        <TestThemeProvider>
            <BlockLink {...props} />
        </TestThemeProvider>
    );
};

describe("<BlockLink />", () => {
    it("should render children component and link", () => {
        renderBlockLinkComponent();

        const linkUrl = rawDraftContentStateLink.entityMap[0].data.url;

        expect(screen.getByTestId("BlockLink__root")).toBeInTheDocument();
        expect(screen.getByTestId("BlockLink__children")).toBeInTheDocument();
        expect(screen.getByTestId("BlockLink__root")).toHaveAttribute("href", linkUrl);
        expect(screen.getByTestId("BlockLink__root")).toHaveAttribute("rel", "noreferrer");
    });

    it("should render correct color and text decoration styles", () => {
        renderBlockLinkComponent();

        expect(screen.getByTestId("BlockLink__root")).toHaveStyle({
            "text-decoration": "underline",
        });
        expect(screen.getByTestId("BlockLink__root")).toHaveStyle({
            color: muiTheme.palette.primary.main,
        });
    });
});
