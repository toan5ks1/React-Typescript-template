import authProvider from "src/internals/auth-provider";
import { AuthProviderType } from "src/typings/auth-provider";

function useAuthProvider(): AuthProviderType {
    return authProvider;
}

export default useAuthProvider;
