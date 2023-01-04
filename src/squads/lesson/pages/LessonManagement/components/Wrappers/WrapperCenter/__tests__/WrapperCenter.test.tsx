import WrapperCenter from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperCenter/WrapperCenter";

import { render } from "@testing-library/react";

describe("WrapperCenter", () => {
    it("should match snapshot", () => {
        const wrapper = render(<WrapperCenter>Sample Content</WrapperCenter>);
        expect(wrapper.container).toMatchSnapshot();
    });
});
