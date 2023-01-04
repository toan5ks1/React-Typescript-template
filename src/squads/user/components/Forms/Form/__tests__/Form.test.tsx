import { Create } from "react-admin";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import Form from "../Form";

import { render } from "@testing-library/react";

jest.mock("src/squads/user/hooks/useGoBack", () => jest.fn());

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

describe("<Form />", () => {
    it("should render without crash", () => {
        render(
            <TestCommonAppProvider>
                <Create basePath="basePath" resource="resource">
                    <Form>
                        <input />
                    </Form>
                </Create>
            </TestCommonAppProvider>
        );
    });
});
