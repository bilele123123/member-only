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

    // Function to validate the secret code and update the user's role accordingly
    const validateSecretCode = async (secretCode) => {
        try {
            const response = await axios.post('/validate-secret-code', { secretCode });
            setRole(response.data.role);
        } catch (error) {
            console.error('Error validating secret code', error);
        }
    };

    return (
        <UserContext.Provider value={{username, setUsername, id, setId, role, validateSecretCode}}>
            {children}
        </UserContext.Provider>
    );

    
}