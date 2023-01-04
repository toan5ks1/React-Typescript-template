import warn from "src/internals/warner";

const logger = {
    info: warn.log,
    error: warn.error,
    warn: warn.warn,
};

export default logger;
