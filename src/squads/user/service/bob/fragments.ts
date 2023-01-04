import { gql } from "graphql-tag";

export const userFragment = gql`
    fragment UserAttrs on users {
        user_id
        name
        email
        avatar
        phone_number
        user_group
        country
    }
`;
