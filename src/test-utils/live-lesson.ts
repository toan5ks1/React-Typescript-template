import { KeyConversionTaskStatusTypes, KeyMediaTypes } from "src/common/constants/const";
import { MIMETypes } from "src/common/constants/enum";

import type { Media } from "src/__generated__/root-types";

export const mockMedias: Media[] = [
    {
        name: "The Wonders of Nature",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "01",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Volcano Eruption",
        type: MIMETypes.IMAGE,
        resource: "https://green-school-portal.web.app/",
        media_id: "02",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Evolutionary Psychology",
        type: KeyMediaTypes.MEDIA_TYPE_VIDEO,
        resource: "6251025034001",
        media_id: "03",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Material 1",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "04",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Material 2",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "05",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_CONVERTING,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    {
        name: "Material 3",
        type: KeyMediaTypes.MEDIA_TYPE_PDF,
        resource: "https://green-school-portal.web.app/",
        media_id: "06",
        created_at: "Created At",
        updated_at: "Updated At",
        conversion_tasks: [
            {
                created_at: "created at",
                resource_url: "https://green-school-portal.web.app/",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                task_uuid: "task_uuid",
                updated_at: "update at",
            },
        ],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
];

export function createMockMedia() {
    return mockMedias;
}
