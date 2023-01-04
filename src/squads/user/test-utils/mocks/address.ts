import { StudentHomeAddressFormProps, UserAddress } from "src/squads/user/common/types";

export const mockStudentHomeAddress: StudentHomeAddressFormProps = {
    postalCode: "70000",
    prefecture: "prefecture_id",
    city: "千代田区",
    firstStreet: "千代田",
    secondStreet: "１−１",
};

export const mockUserAddressList: UserAddress[] = [...Array(5).keys()].map((value) => {
    return {
        user_id: `user_id_${value}`,
        user_address_id: `user_address_id_${value}`,
        postal_code: `postal_code_${value}`,
        city: `city_${value}`,
        first_street: `first_street_${value}`,
        second_street: `second_street_${value}`,
        prefecture: {
            prefecture_id: `prefecture_id_${value}`,
            name: `prefecture_name_${value}`,
        },
    };
});
