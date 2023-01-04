import type { Media } from "../__generated__/root-types";
import { MIMETypes } from "../common/constants/enum";

export function createFakeMedia(overrides: Partial<Media>): Media {
    return {
        name: "The Wonders of Nature",
        type: MIMETypes.PDF,
        resource:
            "https://storage.googleapis.com/stag-manabie-backend/avatar/2021-02-09/origin/01EY2Q2QAZ020F5KG9PYKCR0ER.pdf",
        media_id: "01",
        comments: [],
        conversion_tasks: [],
        converted_images: [],
        created_at: "",
        deleted_at: "",
        updated_at: "",
        conversion_tasks_aggregate: {
            aggregate: {
                count: 0,
            },
            nodes: [],
        },
        ...overrides,
    };
}
