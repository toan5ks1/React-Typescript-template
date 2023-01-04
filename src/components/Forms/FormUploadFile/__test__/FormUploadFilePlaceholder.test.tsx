import FormUploadFilePlaceholder, {
    FormUploadFilePlaceholderProps,
} from "../FormUploadFilePlaceholder";

import { render, screen } from "@testing-library/react";

describe("<FormUploadFilePlaceholder /> should render with uploading and isDragActive equal true", () => {
    const props: FormUploadFilePlaceholderProps = {
        uploading: true,
        isDragActive: true,
    };

    beforeEach(() => {
        render(
            <FormUploadFilePlaceholder data-testid="FormUploadFilePlaceholder__root" {...props} />
        );
    });

    it("should match snapshot", () => {
        expect(screen.getByTestId("FormUploadFilePlaceholder__root")).toMatchSnapshot();
    });
});

describe("<FormUploadFilePlaceholder /> should render with uploading and isDragActive equal false", () => {
    const props: FormUploadFilePlaceholderProps = {
        uploading: false,
        isDragActive: false,
    };

    beforeEach(() => {
        render(
            <FormUploadFilePlaceholder data-testid="FormUploadFilePlaceholder__root" {...props} />
        );
    });

    it("should match snapshot", () => {
        expect(screen.getByTestId("FormUploadFilePlaceholder__root")).toMatchSnapshot();
    });
});
