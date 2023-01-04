import { LocationOptions } from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteLocation";

export type AutocompleteCalendarLocationDataProps =
    | string
    | LocationOptions
    | (string | LocationOptions)[]
    | null;
