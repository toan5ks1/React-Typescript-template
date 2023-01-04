import { shallow } from "enzyme";

import Tooltip from "../Tooltip";

describe("<Tooltip />", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <Tooltip title="Title">
                <div>content</div>
            </Tooltip>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should have content matches", () => {
        const title = "Title";
        const children = <div>123</div>;
        const wrapper = shallow(<Tooltip title={title}>{children}</Tooltip>);
        expect(wrapper.prop("title").props.children).toEqual(title);
        expect(wrapper.contains(children)).toEqual(true);
    });
});
