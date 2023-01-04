import CommentSection from "src/squads/payment/components/Sections/CommentSection";

import { render } from "@testing-library/react";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const renderCommentSection = () => {
    const firstStudentIndex = 0;
    return render(
        <TestHookFormProvider>
            <CommentSection studentIndex={firstStudentIndex} />
        </TestHookFormProvider>
    );
};

describe("<CommentSection />", () => {
    it("should render comment section input", () => {
        const wrapper = renderCommentSection();

        expect(wrapper.getByTestId("CommentSection__commentInput")).toBeInTheDocument();
    });
});
