import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps; 
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext( {} as AuthContextDataProps );

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [ user, setUser ] = useState<UserProps>({} as UserProps);

    const [ isUserLoading, setIsUserLoding ] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '215044460432-siff8dg331rb0u5fcd6bsv6d71jn40r7.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), 
        scopes: ['profile', 'email']
    })
    console.log();

    async function signIn() {
        try {
            setIsUserLoding(true);
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error; 
        } finally {
            setIsUserLoding(false);
        }
    }

    async function signInWithGoogle(access_token: string){
        console.log("TOKEN DE AUTENTICAÇÃO ===>", access_token)
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);

    return(
        <AuthContext.Provider value={{
            signIn,
            isUserLoading, 
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )

}