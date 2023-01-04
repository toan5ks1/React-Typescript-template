const en = require("../src/i18n/source/cms_en.json");
const ja = require("../src/i18n/source/cms_ja.json");
const set = require("lodash/set");

function getTermHasVariable(en, jp) {
    let enResult = {};
    let jpResult = {};

    Object.keys(en).filter((key) => {
        const value = en[key];
        const compareValue = jp[key];

        if (typeof value === "string" && value.includes("||||") && value.includes("%{")) {
            const [left, right] = value.split("||||");
            const [compareLeft, compareRight = ""] = compareValue.split("||||");

            if (!compareRight) {
                set(enResult, key, value);
                set(jpResult, key, compareValue);
            }

            if (
                (left.includes("%{") && !compareLeft.includes("%{")) ||
                (!left.includes("%{") && compareLeft.includes("%{"))
            ) {
                set(enResult, key, value);
                set(jpResult, key, compareValue);
            }

            if (
                (right.includes("%{") && !compareRight.includes("%{")) ||
                (!right.includes("%{") && compareRight.includes("%{"))
            ) {
                set(enResult, key, value);
                set(jpResult, key, compareValue);
            }
        }
        if (typeof value === "object") {
            const { enResult: enNestedResult, jpResult: jpNestedResult } = getTermHasVariable(
                value,
                compareValue
            );
            if (Object.keys(enNestedResult).length) {
                set(enResult, key, enNestedResult);
                set(jpResult, key, jpNestedResult);
            }
        }
    });
    return { enResult, jpResult };
}

function checkPosition() {
    const { enResult, jpResult } = getTermHasVariable(en, ja);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(enResult));
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(jpResult));
}
checkPosition();
