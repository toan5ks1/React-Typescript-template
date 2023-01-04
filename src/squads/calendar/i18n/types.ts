// this file is reserve for language typing
import { ReactAdmin } from "src/squads/calendar/i18n/react-admin";
import { Schedules } from "src/squads/calendar/i18n/resource-types/schedules";

interface Common {
    youAreOffline: string;
    cannotLoadPage: string;
    somethingWentWrong: string;
    pleaseHelpUsReport: string;
    back: string;
    details: string;
    netWorkUnstable: string;
}

interface Resources {
    schedule: Schedules;
    common: Common;
}

export default interface TranslationKeys {
    resources: Resources;
    ra: ReactAdmin;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
