import { FormatDateOptions } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";

import { TextField } from "@mui/material";
import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

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
