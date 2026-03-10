import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getMe(); 
                setUser(response.user);
            } catch (error) {
                setUser(null);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);


    return(
        <AuthContext.Provider value = {{ user, loading, setUser, setLoading }} >
            {children}
        </AuthContext.Provider>
    )


}
