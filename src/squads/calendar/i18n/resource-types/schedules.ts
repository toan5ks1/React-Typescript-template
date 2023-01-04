declare module NsSchedule {
    export interface Button {
        today: string;
        releaseTime: string;
        releaseEvent: string;
        addEvent: string;
        openTime: string;
        setTime: string;
        moreEvent: string;
        viewCenter: string;
    }

    export interface Label {
        scheduleTitle: string;
        datePickerTitle: string;
        openingStatus: string;
        repeatType: string;
        openingHour: string;
        openingMinute: string;
        endHour: string;
        endMinute: string;
        openingDate: string;
        endDate: string;
        date: string;
        brandName: string;
        centerName: string;
        month: string;
        week: string;
        day: string;
        year: string;
        remark: string;
        eventName: string;
        tomorrow: string;
        lookingFor: string;
        schedule: string;
        lookingForSchedule: string;
        helperText: string;
        selectLocation: string;
    }

    export interface OpeningStatus {
        0: string;
        1: string;
        2: string;
        3: string;
    }

    export interface RepeatType {
        0: string;
        1: string;
        2: string;
        3: string;
    }

    export interface ScheduleSearchType {
        0: string;
        1: string;
    }

    export interface DayConditionType {
        0: string;
        1: string;
    }

    export interface Choices {
        openingStatus: OpeningStatus;
        repeatType: RepeatType;
        scheduleSearchType: ScheduleSearchType;
        dayConditionType: DayConditionType;
    }

    export interface Event {
        addEventTitle: string;
        editEventTitle: string;
        eventCentersApplied: string;
        allDayEventDescription: string;
        specificTimeEventDescription: string;
        missingName: string;
        releaseEventTitle: string;
        releaseEventMessage: string;
    }

    export interface Success {
        releaseEvent: string;
        releaseTime: string;
        addOpenningTime: string;
    }

    export interface Message {
        success: Success;
    }

    export interface Error {
        eventName: {
            required: string;
        };
        openingStatus: {
            required: string;
        };
        openingHour: {
            required: string;
        };
        openingMinutes: {
            required: string;
        };
        repeatOption: {
            required: string;
        };
        date: {
            required: string;
        };
    }

    export interface RootObject {
        name: string;
        button: Button;
        label: Label;
        openingStatus: OpeningStatus;
        choices: Choices;
        event: Event;
        message: Message;
        error: Error;
    }
}

export interface Schedules extends NsSchedule.RootObject {}
