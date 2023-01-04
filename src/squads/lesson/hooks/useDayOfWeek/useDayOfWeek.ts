import { choiceDayOfWeek } from "src/common/constants/choices";

export type DayOfWeekType = {
    id: string;
    name: string;
};

export interface UseDayOfWeekMapReturns {
    choiceDayOfWeek: DayOfWeekType[];
}

const useDayOfWeek = (): UseDayOfWeekMapReturns => {
    const choices = choiceDayOfWeek.map((day) => ({
        id: day.id,
        name: day.name,
    }));

    return { choiceDayOfWeek: choices };
};

export default useDayOfWeek;
