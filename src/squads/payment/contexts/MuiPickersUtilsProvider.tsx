import { ReactNode } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import useLocale from "src/squads/payment/hooks/useLocale";

interface MuiPickersUtilsProviderProps {
    children: ReactNode;
}

class LocalizedAdapter extends AdapterLuxon {
    getMeridiemText = (meridiem: "am" | "pm") => {
        if (meridiem === "am") return "AM";
        return "PM";
    };
    getWeekdays = (): string[] => {
        switch (this.locale) {
            case "vi":
                return ["H", "B", "T", "N", "S", "B", "CN"];
            case "ja":
                return ["月", "火", "水", "木", "金", "土", "日"];
            default:
                return ["M", "T", "W", "T", "F", "S", "S"];
        }
    };
}

const MuiPickersUtilsProvider = ({ children }: MuiPickersUtilsProviderProps) => {
    const language = useLocale();

    return (
        <LocalizationProvider
            dateAdapter={LocalizedAdapter}
            // Remove this when this issue is fixed: https://github.com/moment/luxon/issues/549
            dateFormats={{
                month: language === "ja" ? "L月" : "LLLL",
            }}
            locale={language}
        >
            {children}
        </LocalizationProvider>
    );
};

export default MuiPickersUtilsProvider;
