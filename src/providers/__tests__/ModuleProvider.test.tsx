import { Entities } from "../../common/constants/enum";
import { ModuleProvider, useModules } from "../ModuleProvider";

import { render } from "@testing-library/react";

describe("<ModuleProvider />", () => {
    const ChildComponent = () => {
        const props = useModules();

        return <div>{JSON.stringify(props)}</div>;
    };

    it("should have correct context value", () => {
        const { container } = render(
            <ModuleProvider
                modules={[{ key: Entities.BOOK_CHAPTERS, name: Entities.BOOK_CHAPTERS }]}
            >
                <ChildComponent />
            </ModuleProvider>
        );

        expect(container).toMatchSnapshot();
    });
});
