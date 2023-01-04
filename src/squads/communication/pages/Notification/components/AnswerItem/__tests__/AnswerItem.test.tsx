import { TestApp } from "src/squads/communication/test-utils";

import AnswerItem, {
    AnswerItemProps,
} from "src/squads/communication/pages/Notification/components/AnswerItem";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const onDeleteAnswer = jest.fn();

const defaultAnswerItemProps: AnswerItemProps = {
    questionIndex: 0,
    answerIndex: 0,
    onDeleteAnswer,
    shouldDisableRemoveAnswer: false,
};

const renderAnswerItem = (props: AnswerItemProps = defaultAnswerItemProps) => {
    return render(
        <TestApp>
            <TestHookFormProvider>
                <AnswerItem {...props} />
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<AnswerItem />", () => {
    it("should render correct elements on screen", () => {
        renderAnswerItem();

        expect(screen.getByTestId("AnswerItem__root")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Answer")).toBeInTheDocument();
        expect(screen.getByTestId("AnswerItem__buttonDeleteAnswer")).toBeInTheDocument();
    });

    it("should call onDeleteAnswer function when click delete icon button", () => {
        renderAnswerItem();

        userEvent.click(screen.getByTestId("AnswerItem__buttonDeleteAnswer"));
        expect(onDeleteAnswer).toBeCalledTimes(1);
    });
});
