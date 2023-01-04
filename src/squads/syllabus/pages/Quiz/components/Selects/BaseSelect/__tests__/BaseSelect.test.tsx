import { shallow } from "enzyme";

import { MenuItem, Select } from "@mui/material";

import BaseSelect from "../BaseSelect";

import { render, fireEvent } from "@testing-library/react";

describe("<BaseSelect />", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <BaseSelect label={"This is label"}>
                <MenuItem value={1}>Test menu</MenuItem>
            </BaseSelect>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should render correct menu item", () => {
        const fn = jest.fn();
        const wrapper = shallow(
            <BaseSelect onChange={fn} value={1}>
                <MenuItem value={1}>Test menu</MenuItem>

                <MenuItem value={2}>Test menu2</MenuItem>
            </BaseSelect>
        );

        // has correct number of selectable children
        expect(wrapper.find(MenuItem).length).toEqual(2);
    });

    it("should change on menu click", () => {
        const fn = jest.fn();
        const { getAllByRole, getByRole } = render(
            <Select onChange={fn} value="0">
                <MenuItem value="0" />

                <MenuItem value="1" />

                <MenuItem value="2" />
            </Select>
        );

        fireEvent.mouseDown(getByRole("button"));
        getAllByRole("option")[1].click();

        expect(fn).toHaveBeenCalledTimes(1);
    });
});
