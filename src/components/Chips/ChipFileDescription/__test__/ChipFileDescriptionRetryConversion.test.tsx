import { KeyConversionTaskStatusTypes, KeyMediaTypes } from "src/common/constants/const";

import ChipFileDescriptionRetryConversion, {
    ChipFileDescriptionRetryConversionProps,
} from "../ChipFileDescriptionRetryConversion";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<ChipFileDescriptionRetryConversion /> component", () => {
    let wrapper: RenderResult;
    let props: ChipFileDescriptionRetryConversionProps = {
        file: {
            name: "Material 1",
            type: KeyMediaTypes.MEDIA_TYPE_PDF,
            resource:
                "https://storage.googleapis.com/stag-manabie-backend/user-upload/Computer_Networking_A_Top_Down_Approach01F90T4J4FDD7ZTKY512F4WHW8.pdf",
            media_id: "04",
            created_at: "Created At",
            updated_at: "Updated At",
            conversion_tasks: [
                {
                    created_at: "created at",
                    resource_url:
                        "https://storage.googleapis.com/stag-manabie-backend/user-upload/Computer_Networking_A_Top_Down_Approach01F90T4J4FDD7ZTKY512F4WHW8.pdf",
                    status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                    task_uuid: "task_uuid",
                    updated_at: "update at",
                },
            ],
            conversion_tasks_aggregate: {
                nodes: [],
            },
        },
        onRetryConvertPdf: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(<ChipFileDescriptionRetryConversion {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should call onRetryConvertPdf fn", () => {
        const tryAgainBtn = screen.getByTestId("ChipFileDescriptionRetryConversion__root");
        fireEvent.click(tryAgainBtn);
        expect(props.onRetryConvertPdf).toBeCalled();
    });
});
