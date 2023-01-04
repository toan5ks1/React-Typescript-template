import { choiceSubjects, choiceCountries, choiceDayOfWeek } from "../choices";

describe("choices", () => {
    it("choiceCountries", () => {
        expect(choiceCountries).toEqual([
            { id: "COUNTRY_MASTER", name: "resources.choices.countries.COUNTRY_MASTER" },
            { id: "COUNTRY_VN", name: "resources.choices.countries.COUNTRY_VN" },
            { id: "COUNTRY_ID", name: "resources.choices.countries.COUNTRY_ID" },
            { id: "COUNTRY_SG", name: "resources.choices.countries.COUNTRY_SG" },
            { id: "COUNTRY_JP", name: "resources.choices.countries.COUNTRY_JP" },
        ]);
    });
    it("choiceSubjects", () => {
        expect(choiceSubjects).toEqual([
            { id: "SUBJECT_MATHS", name: "resources.choices.subjects.SUBJECT_MATHS" },
            { id: "SUBJECT_BIOLOGY", name: "resources.choices.subjects.SUBJECT_BIOLOGY" },
            { id: "SUBJECT_PHYSICS", name: "resources.choices.subjects.SUBJECT_PHYSICS" },
            { id: "SUBJECT_CHEMISTRY", name: "resources.choices.subjects.SUBJECT_CHEMISTRY" },
            { id: "SUBJECT_GEOGRAPHY", name: "resources.choices.subjects.SUBJECT_GEOGRAPHY" },
            { id: "SUBJECT_ENGLISH", name: "resources.choices.subjects.SUBJECT_ENGLISH" },
            { id: "SUBJECT_ENGLISH_2", name: "resources.choices.subjects.SUBJECT_ENGLISH_2" },
            { id: "SUBJECT_JAPANESE", name: "resources.choices.subjects.SUBJECT_JAPANESE" },
            { id: "SUBJECT_SCIENCE", name: "resources.choices.subjects.SUBJECT_SCIENCE" },
            {
                id: "SUBJECT_SOCIAL_STUDIES",
                name: "resources.choices.subjects.SUBJECT_SOCIAL_STUDIES",
            },
            { id: "SUBJECT_LITERATURE", name: "resources.choices.subjects.SUBJECT_LITERATURE" },
        ]);
    });
    it("choiceDayOfWeek", () => {
        expect(choiceDayOfWeek).toEqual([
            { id: "DATE_OF_WEEK_SUNDAY", name: "resources.choices.dayOfWeek.DATE_OF_WEEK_SUNDAY" },
            { id: "DATE_OF_WEEK_MONDAY", name: "resources.choices.dayOfWeek.DATE_OF_WEEK_MONDAY" },
            {
                id: "DATE_OF_WEEK_TUESDAY",
                name: "resources.choices.dayOfWeek.DATE_OF_WEEK_TUESDAY",
            },
            {
                id: "DATE_OF_WEEK_WEDNESDAY",
                name: "resources.choices.dayOfWeek.DATE_OF_WEEK_WEDNESDAY",
            },
            {
                id: "DATE_OF_WEEK_THURSDAY",
                name: "resources.choices.dayOfWeek.DATE_OF_WEEK_THURSDAY",
            },
            { id: "DATE_OF_WEEK_FRIDAY", name: "resources.choices.dayOfWeek.DATE_OF_WEEK_FRIDAY" },
            {
                id: "DATE_OF_WEEK_SATURDAY",
                name: "resources.choices.dayOfWeek.DATE_OF_WEEK_SATURDAY",
            },
        ]);
    });
});
