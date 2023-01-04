import { Calendar_LocationTypesListQuery } from "src/squads/calendar/service/bob/bob-types";

import { OpeningStatus } from "manabuf/eureka/v1/scheduler_pb";

import { DateHeaderProps, Event, ShowMoreProps } from "@manabie-com/mana-calendar";
import { Maybe } from "src/squads/calendar/__generated__/eureka/root-types";

export interface CalendarEventProps {
    id?: string;
    allDay?: boolean;
    start: Date;
    end: Date;
    metaData: {
        title?: string;
        description?: string;
        remark?: string;
    };
    brandId: string;
    centerId: string;
    schedulePattern: {
        repeatOptionData: {
            repeatType: string; // todo: change to RepeatType enum
            count?: Number;
            until?: Date;
        };
    };
}

export interface CalendarDailyStatusProps {
    id?: string;
    all_day?: boolean;
    start: Date;
    end: Date;
    meta_data: {
        opening_status: string;
    };
    brand_id: Maybe<string> | undefined;
    center_id: Maybe<string> | undefined;
    scheduler_pattern: {
        repeat_option_data: {
            repeat_type: string;
            count?: Number;
            until?: Date;
        };
    };
}

export interface CalendarUntilProps {
    filterData?: FilterDataProps;
    onReload: (data?: FilterDataProps) => void;
}

export interface FilterDataProps {
    year: { id: number; value: string };
    month: { id: number; value: string };
    brands?: { brand_id: string; value: string };
    centers?: { center_id: string; value: string };
}

export interface QueryOpeningTimeProps {
    start_time: string;
    end_time: string;
    brand_id?: string;
    center_id?: string;
    scheduler_type: string;
}

export type CreateOpeningTimeFormProps = {
    brand_id?: string;
    center_id?: string;
    opening_status: OpeningStatus;
    opening_date: Date | undefined;
    opening_hour: number;
    opening_minutes: number;
    repeat_option: number;
    date_until?: Date;
};

export interface CalendarDateHeaderProps extends DateHeaderProps<object> {
    handleOpenAndCloseDrawer: (open: boolean, dateSelect?: string) => void;
    dateSelected: string;
}

export interface CalendarShowMoreProps extends ShowMoreProps<Event> {
    showMoreRef?: React.RefObject<HTMLSpanElement>;
}

export type LocationTypesList = Calendar_LocationTypesListQuery["location_types"];
