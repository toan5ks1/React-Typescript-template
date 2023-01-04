import { PropsWithChildren, useCallback, useMemo, useState, useEffect } from "react";

import { getLocalTimezone } from "../common/utils/timezone";
import TimezoneContext, { ITimezoneContext } from "../contexts/timezone";
import reactiveStorage from "../internals/reactive-storage";
import { TimezoneOptions } from "../models/timezone";

import isEqual from "lodash/isEqual";

const { Provider } = TimezoneContext;

const TimezoneProvider = ({ children }: PropsWithChildren<{}>) => {
    const [timezone, setTimezone] = useState<TimezoneOptions>(
        reactiveStorage.get("TIMEZONE") || getLocalTimezone()
    );

    useEffect(() => {
        const unregister = reactiveStorage.registerListener(
            "TIMEZONE",
            (newVal) => {
                if (newVal && newVal.value && !isEqual(timezone, newVal)) {
                    setTimezone(newVal);
                    return;
                }

                if (!newVal) reactiveStorage.set("TIMEZONE", timezone);
            },
            { run1st: true }
        );

        return () => {
            if (typeof unregister === "function") {
                unregister();
            }
        };
    }, [timezone]);

    const onChangeTimezone = useCallback((value: TimezoneOptions) => {
        reactiveStorage.set("TIMEZONE", value);
    }, []);

    useEffect(() => {
        if (!(timezone && timezone.value)) {
            setTimezone(getLocalTimezone());
        }
    }, [timezone]);

    const memoizedTimezone: ITimezoneContext = useMemo(() => {
        return {
            timezone,
            onChangeTimezone,
        };
    }, [timezone, onChangeTimezone]);

    return <Provider value={memoizedTimezone}>{children}</Provider>;
};

export default TimezoneProvider;
