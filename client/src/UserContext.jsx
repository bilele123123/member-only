import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        axios.get('/profile').then(response => {
            setId(response.data.userId);
            setUsername(response.data.username);
            setRole(response.data.role);
        });
    }, []);
    return (
        <UserContext.Provider value={{username, setUsername, id, setId, role}}>
            {children}
        </UserContext.Provider>
    );
}