import { FormatDateOptions } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";

import { TextField } from "@mui/material";
import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import DatePickerBase, { DatePickerBaseProps } from "../DatePickerBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<DatePickerBase /> with English", () => {
    let wrapper: RenderResult;
    const formatType: FormatDateOptions = "yyyy/LL/dd";
    const defaultDate = new Date(2021, 1, 5, 9, 35);
    const props: DatePickerBaseProps = {
        inputFormat: formatType,
        value: defaultDate,
        renderInput: (props) => <TextField {...props} />,
        onChange: jest.fn(),
        onAccept: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <DatePickerBase {...props} />
            </MuiPickersUtilsProvider>
        );
    });

    it("should exist value", () => {
        expect(screen.getByDisplayValue(formatDate(defaultDate, formatType))).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
// TODO: Fix these test to test this component with different languages
// describe("<DatePickerBase /> with Japanese", () => {
//     let wrapper: RenderResult;

//     const props: DatePickerBaseProps = {
//         value: new Date(2021, 1, 5, 9, 35),
//         format: formatType,
//         onChange: jest.fn(),
//         onAccept: jest.fn(),
//     };

//     beforeEach(() => {
//         wrapper = render(
//             <LangContext.Provider
//                 value={{
//                     state: { language: LanguageKeys.JA },
//                     dispatch: { setLanguage: jest.fn(), translate: (key: string) => key },
//                 }}
//             >
//                 <MuiPickersUtilsProvider>
//                     <DatePickerBase {...props} />
//                 </MuiPickersUtilsProvider>
//             </LangContext.Provider>
//         );
//     });

//     it("should exist value", async () => {
//         expect(await screen.findByDisplayValue("2月 05, 2021")).toBeInTheDocument();
//     });

//     it("should match snapshot", async () => {
//         await waitFor(() => expect(wrapper.container).toMatchSnapshot());
//     });
// });

// describe("<DatePickerBase /> with Vietnamese", () => {
//     let wrapper: RenderResult;

//     const props: DatePickerBaseProps = {
//         value: new Date(2021, 1, 5, 9, 35),
//         format: formatType,
//         onChange: jest.fn(),
//         onAccept: jest.fn(),
//     };

//     beforeEach(() => {
//         wrapper = render(
//             <LangContext.Provider
//                 value={{
//                     state: { language: LanguageKeys.VI },
//                     dispatch: { setLanguage: jest.fn(), translate: (key: string) => key },
//                 }}
//             >
//                 <MuiPickersUtilsProvider>
//                     <DatePickerBase {...props} />
//                 </MuiPickersUtilsProvider>
//             </LangContext.Provider>
//         );
//     });

//     it("should exist value", () => {
//         expect(screen.getByDisplayValue("Thg 02 05, 2021")).toBeInTheDocument();
//     });

//     it("should match snapshot", () => {
//         expect(wrapper.container).toMatchSnapshot();
//     });
// });
