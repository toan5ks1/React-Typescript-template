import LoginLayout from "src/squads/user/components/Layout/LoginLayout";
import LoginTenantForm from "src/squads/user/components/LoginTenantForm";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

const LoginTenant = () => {
    return (
        <TranslationProvider>
            <LoginLayout form={LoginTenantForm} />
        </TranslationProvider>
    );
};

export default LoginTenant;
