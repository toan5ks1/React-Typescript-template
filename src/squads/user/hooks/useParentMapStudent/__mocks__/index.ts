import { StudentParentDataType } from "../useParentMapStudent";

export const parents: StudentParentDataType[] = [
    {
        parent_id: "01F4V8P0M4TSYP4DQK0WEFB53R",
        student_id: "01F4V8P0M0KTR1HASWVN8HF89N",
        relationship: "FAMILY_RELATIONSHIP_MOTHER",
        parent_user: {
            name: "Mẹ của Nam",
            email: "menam@gmail.com",
            phone_number: "09161237670",
            country: "COUNTRY_JP",
        },
    },
    {
        parent_id: "01F4V8P0M9Q38QK8J8531A1AXJ",
        student_id: "01F4V8P0M0KTR1HASWVN8HF89N",
        relationship: "FAMILY_RELATIONSHIP_FATHER",
        parent_user: {
            name: "Ba Nam",
            email: "10a.t22hanhnam@gmail.com",
            phone_number: "0916112370",
            country: "COUNTRY_JP",
        },
    },
];

export default () => ({
    parents,
    isLoading: false,
    refetch: jest.fn(),
});
