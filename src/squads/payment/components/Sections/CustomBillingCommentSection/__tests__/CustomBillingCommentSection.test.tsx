import CustomBillingCommentSection from "src/squads/payment/components/Sections/CustomBillingCommentSection/CustomBillingCommentSection";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const renderCustomBillingCommentSection = () => {
    return render(
        <TestHookFormProvider>
            <CustomBillingCommentSection />
        </TestHookFormProvider>
    );
};

describe("<CustomBillingCommentSection />", () => {
    it("should render custom billing comment section input", () => {
        const wrapper = renderCustomBillingCommentSection();

        expect(
            wrapper.getByTestId("CustomBillingCommentSection__commentInput")
        ).toBeInTheDocument();
    });

    it("should be inputted comment text", () => {
        const wrapper = renderCustomBillingCommentSection();
        const commentText: string = "Comment Test Input";

        const commentInput = wrapper.getByTestId(
            "CustomBillingCommentSection__commentInput"
        ) as HTMLTextAreaElement;

        userEvent.type(commentInput, commentText);
        expect(commentInput).toHaveValue(commentText);
    });
});
