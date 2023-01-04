import { choiceLessonStatus } from "src/squads/lesson/common/choices";

export type ChoiceLessonStatus = {
    id: string;
    name: string;
};

export interface UseLessonStatusReturns {
    choiceLessonStatus: ChoiceLessonStatus[];
}

const useLessonStatus = (): UseLessonStatusReturns => {
    const choices = choiceLessonStatus.map((status) => ({
        id: status.id,
        name: status.name,
    }));

    return { choiceLessonStatus: choices };
};

export default useLessonStatus;
