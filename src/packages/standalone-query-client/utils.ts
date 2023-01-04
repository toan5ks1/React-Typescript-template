function stringifyReplacer(_key: string | number | symbol, value: any) {
    if (typeof value === "undefined") {
        return "undefined";
    }

    const specialTypes = ["function", "bigint", "symbol"];
    // We use different operation for special kinds
    if (specialTypes.includes(typeof value)) {
        return value.toString();
    }

    return value;
}

export function safeStringify(target: any, spacing?: number): string {
    return JSON.stringify(target, stringifyReplacer, spacing);
}

interface InvalidParamErrorProps {
    serviceName: "bobGraphQL" | "eurekaGraphQL" | "fatimaGraphQL" | "yasuoGraphQL";
    // only set fieldValueIfNotSensitive when it isn't user private info (check https://www.weber.edu/iso/sensitive-data.html)
    errors: { field: string; fieldValueIfNotSensitive?: any }[];
    action: string;
}

interface ToStringFormat extends InvalidParamErrorProps {
    errorName: string;
}

export class InvalidParamError extends Error {
    name: string = "InvalidParamError";

    private readonly errors?: InvalidParamErrorProps["errors"];
    private readonly serviceName: InvalidParamErrorProps["serviceName"];
    private readonly action: InvalidParamErrorProps["action"];

    constructor({ serviceName, errors, action }: InvalidParamErrorProps) {
        super("ra.message.manabie-error.invalid_params");

        this.serviceName = serviceName;
        this.errors = errors;
        this.action = action;
    }

    toString() {
        const formatted: ToStringFormat = {
            errorName: this.name,
            serviceName: this.serviceName,
            errors: this.errors || [],
            action: this.action,
        };
        return safeStringify(formatted, 2);
    }
}
