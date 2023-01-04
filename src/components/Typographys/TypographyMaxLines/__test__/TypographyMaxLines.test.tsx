import TypographyMaxLines, { TypographyMaxLinesProps } from "../TypographyMaxLines";

import { render } from "@testing-library/react";
import useTextClamped from "src/hooks/useTextClamped";

jest.mock("src/hooks/useTextClamped", () => jest.fn());

const wrapRender = (props: TypographyMaxLinesProps) => {
    return render(<TypographyMaxLines {...props} />);
};

describe("<TypographyMaxLines />", () => {
    it("should match snapshot", () => {
        (useTextClamped as jest.Mock).mockImplementation(() => {
            return {
                isClamped: false,
            };
        });
        const props: TypographyMaxLinesProps = {
            children: `Line1\nLine2\nLine3`,
            maxLines: 2,
        };
        const wrapper = wrapRender(props);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should not show title", () => {
        (useTextClamped as jest.Mock).mockImplementation(() => {
            return {
                isClamped: false,
            };
        });
        const props: TypographyMaxLinesProps = {
            children: `Line1\nLine2`,
            maxLines: 2,
        };

        wrapRender(props);

        expect(document.getElementById("TypographyMaxLines__TypographyBase")).toHaveAttribute(
            "title",
            ""
        );
    });

    it("should show title", () => {
        const props: TypographyMaxLinesProps = {
            children: `Line1\nLine2\nLine3`,
            maxLines: 2,
        };
        (useTextClamped as jest.Mock).mockImplementation(() => {
            return {
                isClamped: true,
            };
        });
        wrapRender(props);

        expect(document.getElementById("TypographyMaxLines__TypographyBase")).toHaveAttribute(
            "title",
            props.children
        );
    });
});
