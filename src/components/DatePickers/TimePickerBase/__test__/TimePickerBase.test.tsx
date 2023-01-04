import { FormatDateOptions } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";

import { TextField } from "@mui/material";
import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import TimePickerBase, { TimePickerBaseProps } from "../TimePickerBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TimePickerBase /> with English", () => {
    let wrapper: RenderResult;
    const formatType: FormatDateOptions = "HH:mm";
    const defaultDate = new Date(2021, 1, 5, 9, 35);
    const props: TimePickerBaseProps = {
        renderInput: (props) => <TextField {...props} />,
        value: defaultDate,
        inputFormat: formatType,
        onChange: jest.fn(),
        onAccept: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <TimePickerBase {...props} />
            </MuiPickersUtilsProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should exist value", () => {
        expect(screen.getByDisplayValue(formatDate(defaultDate, formatType))).toBeInTheDocument();
    });
});
