import { TestContext } from "ra-test";
import { convertString } from "src/common/constants/helper";
import { toShortenStr } from "src/common/utils/other";
import { createMockMedia } from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import ListMaterials, { ListMaterialsProps } from "../ListMaterials";

import { render, screen } from "@testing-library/react";

const mockMediaList = createMockMedia();

const renderListMaterials = (props: ListMaterialsProps) =>
    render(
        <TestContext>
            <TestQueryWrapper>
                <ListMaterials {...props} />
            </TestQueryWrapper>
        </TestContext>
    );
describe("<ListMaterials /> component renders", () => {
    it("should render media chips correctly", () => {
        const props: ListMaterialsProps = {
            mediasList: mockMediaList,
            isLoadingMedias: false,
        };
        renderListMaterials(props);
        mockMediaList.forEach((media) => {
            const shortenedMediaName = toShortenStr(convertString(media.name), 20);
            expect(screen.getByText(shortenedMediaName)).toBeInTheDocument();
        });
    });

    it("should render no data", () => {
        const props: ListMaterialsProps = {
            mediasList: undefined,
            isLoadingMedias: false,
        };
        renderListMaterials(props);
        expect(screen.getByText("ra.message.noDataInformation")).toBeInTheDocument();
    });

    it("should render skeleton when loading is true", () => {
        const props: ListMaterialsProps = {
            mediasList: undefined,
            isLoadingMedias: true,
        };
        renderListMaterials(props);
        expect(screen.getByTestId("ListMaterials__skeleton")).toBeInTheDocument();
    });
});
