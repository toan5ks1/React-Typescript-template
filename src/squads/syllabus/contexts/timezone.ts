import { createContext, useContext } from "react";

import { TimezoneOptions } from "../models/timezone";

export interface ITimezoneContext {
    timezone: TimezoneOptions | { value: string; label?: string };
    onChangeTimezone: (newTimezone: TimezoneOptions) => void;
}

const noopFn = () => void 0;

const TimezoneContext = createContext<ITimezoneContext>({
    timezone: { value: "" },
    onChangeTimezone: noopFn,
});

export const useTimezoneCtx = () => useContext(TimezoneContext);

export default TimezoneContext;
