declare module NsConfigs {
    interface Countries {
        COUNTRY_NONE: string;
        COUNTRY_MASTER: string;
        COUNTRY_VN: string;
        COUNTRY_ID: string;
        COUNTRY_SG: string;
        COUNTRY_JP: string;
    }

    export interface RootObject {
        config_title: string;
        apply: string;
        choices: {
            countries: Countries;
        };
    }
}
export interface Configs extends NsConfigs.RootObject {}
