import { inferQuery } from "src/squads/adobo/domains/invoice/services/infer-service";
import { Invoice_UsersQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

export interface UseGetUserNameProps {
    userIds: Invoice_UsersQueryVariables["user_ids"];
}

const useGetUserName = ({ userIds = [] }: UseGetUserNameProps) => {
    return inferQuery({
        entity: "invoice",
        action: "invoiceGetUsers",
    })(
        {
            user_ids: userIds || [],
        },
        {
            enabled: userIds!.length > 0,
            onError: (error) => {
                window.warner?.warn("useGetUserName", error);
            },
        }
    );
};

export default useGetUserName;
