import { QuizOptionConfig } from "src/squads/syllabus/models/quiz";

import QuizAnswerSetting, { QuizAnswerSettingProps } from "../QuizAnswerSetting";

import { render, screen, fireEvent, RenderResult } from "@testing-library/react";

describe(QuizAnswerSetting.name, () => {
    let wrapper: RenderResult;
    const formLabelTestId = "QuizAnswerSetting__formLabel";
    const defaultProps: QuizAnswerSettingProps = {
        settings: [
            QuizOptionConfig.QUIZ_OPTION_CONFIG_PARTIAL_CREDIT,
            QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE,
        ],
        settingValues: [QuizOptionConfig.QUIZ_OPTION_CONFIG_PARTIAL_CREDIT],
        onChangeAnswerConfigs: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(<QuizAnswerSetting {...defaultProps} />);
    });

    it("should render list select setting", () => {
        expect(screen.getAllByTestId(formLabelTestId)).toHaveLength(2);
    });

    it("should auto selected with values", () => {
        expect(
            wrapper.container.querySelector(`[data-testid='${formLabelTestId}'] .Mui-checked`)
        ).toBeInTheDocument();
    });

    it("should callback when click", () => {
        fireEvent.click(screen.getAllByTestId(formLabelTestId)[0]);
        expect(defaultProps.onChangeAnswerConfigs).toBeCalled();
    });
});
