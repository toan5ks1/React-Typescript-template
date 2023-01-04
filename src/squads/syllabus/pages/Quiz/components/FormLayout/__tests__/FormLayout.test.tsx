import { shallow } from "enzyme";

import FormLayout from "../FormLayout";

describe("<FormLayout />", () => {
    it("should match snapshot", () => {
        const wrapper = shallow(
            <FormLayout formTitle="Title">
                <div>Children</div>
            </FormLayout>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it("should has correct content based on props", () => {
        const title = "Title1";
        const children = <div>321</div>;
        const wrapper = shallow(<FormLayout formTitle={title}>{children}</FormLayout>);

        expect(wrapper.find('[data-testid="FormLayout__title"]').contains(title)).toEqual(true);
        expect(wrapper.contains(children)).toEqual(true);
    });
});
