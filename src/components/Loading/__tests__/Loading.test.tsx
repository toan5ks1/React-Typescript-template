import { shallow } from "enzyme";

import { CircularProgress } from "@mui/material";

import Loading from "../Loading";

describe("<Loading />", () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<Loading loading />);
    });

    it("should match snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("should render correct UI base on loading prop", () => {
        expect(wrapper.exists(CircularProgress)).toEqual(true);

        wrapper.setProps({ loading: false });
        expect(wrapper.exists(CircularProgress)).toEqual(false);

        //should render loading if prop loading is not defied
        wrapper.setProps({ loading: undefined });
        expect(wrapper.exists(CircularProgress)).toEqual(true);
    });
});
