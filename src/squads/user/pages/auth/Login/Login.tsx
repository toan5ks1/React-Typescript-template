import LoginLayout from "src/squads/user/components/Layout/LoginLayout";
import LoginFormV2 from "src/squads/user/components/LoginFormV2";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

const LoginPage = () => {
    return (
        <TranslationProvider>
            <LoginLayout form={LoginFormV2} />
        </TranslationProvider>
    );
};

export default LoginPage;
