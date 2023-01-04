import { UseMediaListReturn } from "../useMediaList";

//TODO: @syllabus fix Media type
//@ts-ignore
export const mediaList: UseMediaListReturn["mediaList"] = [
    //@ts-ignore
    {
        media_id: "media1",
        name: "Media 1",
        created_at: "2021-05-1T14:50:17.74564+00:00",
        updated_at: "2021-05-2T14:50:17.74564+00:00",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
    //@ts-ignore
    {
        media_id: "media2",
        name: "Media 2",
        created_at: "2021-05-1T14:50:17.74564+00:00",
        updated_at: "2021-05-2T14:50:17.74564+00:00",
        conversion_tasks: [],
        conversion_tasks_aggregate: {
            nodes: [],
        },
    },
];

export default (): UseMediaListReturn => ({
    isFetchingMediaList: false,
    mediaList,
});
