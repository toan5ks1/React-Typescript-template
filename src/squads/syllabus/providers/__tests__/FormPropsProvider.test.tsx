import { FormPropsProvider, useFormProps } from "../FormPropsProvider";

import { render } from "@testing-library/react";

describe("<FormPropsProvider />", () => {
    const ChildComponent = () => {
        const props = useFormProps();

        return <div>{JSON.stringify(props)}</div>;
    };

    it("should have correct context value", () => {
        const { container } = render(
            <FormPropsProvider readOnly={true}>
                <ChildComponent />
            </FormPropsProvider>
        );

        expect(container).toMatchSnapshot();
    });
});
