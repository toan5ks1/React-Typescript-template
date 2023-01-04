const { exec } = require("child_process");
const { resolveNeedToValidateJapaneseFile } = require("./utils");

const containsJapanese = new RegExp(
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
);

const regVariables = new RegExp(/(\%\{\w+\})/, "gm");

const regSpecialChars = new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "gi");

const specialCases = [
    "Pseudo",
    "TA",
    "Unknown",
    "ID",
    "Latex",
    "1, 2, 3...",
    "a, b, c...",
    "A, B, C...",
    "A",
    "B",
    "C",
    "D",
];

const detectSpecialChars = (newTerm) => {
    return !!String(newTerm).match(regSpecialChars);
};

const detectVariables = (newTerm) => {
    return !!String(newTerm).match(regVariables);
};

const detectJapanese = (newTerm) => {
    if (newTerm === "") return true;
    return !!String(newTerm).trim().match(containsJapanese);
};

const checkTranslationInJson = (data) => {
    let errorTerms = {};
    if (typeof data !== "object" || !data) return errorTerms;

    Object.keys(data).forEach((key) => {
        const terms = data[key];
        if (typeof terms === "object") {
            errorTerms = { ...errorTerms, ...checkTranslationInJson(terms) };
        } else {
            if (specialCases.includes(terms)) {
                return;
            }
            if (!detectJapanese(terms)) {
                // only check if detect japanese fail to reduce scope
                if (detectVariables(terms) || detectSpecialChars(terms)) {
                    const afterRemoveVariables = String(terms)
                        .replace(regVariables, "")
                        .replace(regSpecialChars, "")
                        .trim();

                    if (detectJapanese(afterRemoveVariables)) {
                        return;
                    }
                }

                errorTerms[key] = terms;
            }
        }
    });
    return errorTerms;
};

const checkTranslationBeforeMerge = () => {
    exec(
        `release_branch=${process.env.release_branch} bash ./scripts/diff-ja.sh`,
        (err, stdout, stderr) => {
            //If ja file change
            if (stdout.match("Something change in ja file")) {
                const result = checkTranslationInJson(require(resolveNeedToValidateJapaneseFile()));
                if (Object.keys(result).length) {
                    // eslint-disable-next-line no-console
                    console.log(
                        "Please make sure everything is translated before merging your PR",
                        JSON.stringify(result, null, 2)
                    );
                    return process.exit(1);
                } else {
                    // eslint-disable-next-line no-console
                    console.log("Everything is translated");
                }
            } else {
                // eslint-disable-next-line no-console
                console.log("Don't have any change in translation file");
            }
            process.exit(0);
        }
    );
};

checkTranslationBeforeMerge();

module.exports = {
    checkTranslationBeforeMerge,
    detectJapanese,
};
