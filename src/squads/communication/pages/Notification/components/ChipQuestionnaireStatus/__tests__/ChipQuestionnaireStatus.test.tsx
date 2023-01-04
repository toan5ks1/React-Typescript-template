import { KeyQuestionnaireStatus } from "src/squads/communication/common/constants/const";
import { TestThemeProvider } from "src/squads/communication/test-utils";
import { QuestionnaireStatusKeys } from "src/squads/communication/typings/remote";
import { getThemeWithMuiV5 } from "src/styles";

import ChipQuestionnaireStatus from "../ChipQuestionnaireStatus";

import { render, RenderResult, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

interface ChipQuestionnaireStatusTestCases {
    status: QuestionnaireStatusKeys;
    background?: string;
    label: string;
}

describe("<ChipQuestionnaireStatus /> component", () => {
    const cases: Array<ChipQuestionnaireStatusTestCases> = [
        {
            status: KeyQuestionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_ANSWERED,
            background: muiTheme.palette.success.lightBackground,
            label: "Submitted",
        },
        {
            status: KeyQuestionnaireStatus.USER_NOTIFICATION_QUESTIONNAIRE_STATUS_UNANSWERED,
            background: muiTheme.palette.grey[100], // the default background of chip
            label: "Un Submitted",
        },
    ];
    let wrapper: RenderResult;
    test.each(cases)(
        "it should render label %p and background color %p when status is %p",
        ({ status, background, label }) => {
            wrapper = render(
                <TestThemeProvider>
                    <ChipQuestionnaireStatus status={status} label={label} />
                </TestThemeProvider>
            );
            expect(wrapper.container).toMatchSnapshot();

            expect(screen.getByTestId("ChipQuestionnaireStatus")).toHaveTextContent(label);

            expect(screen.getByTestId("ChipQuestionnaireStatus")).toHaveStyle(
                `background: ${background}`
            );
        }
    );
});
