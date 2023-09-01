import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
    const [code, setCode] = useState('');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
    async function register(ev) {
        ev.preventDefault();
        const { data } = await axios.post('/register', { username, password, code }, { headers: { 'Content-Type': 'application/json' } });
        setLoggedInUsername(username);
        setId(data.id);
    }
    return (
        <div className="bg-blue-100 h-screen flex items-center">
            <form className="w-80 mx-auto m-12 bg-green-50 p-4 rounded-xl" onSubmit={register}>
                <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border"></input>
                <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"></input>
                <input value={code} onChange={ev => setCode(ev.target.value)} type="password" placeholder="secret code" className="block w-full rounded-sm p-2 mb-2 border"></input>
                <button className="bg-blue-500 text-white block w-full rounded-sm">{isLoginOrRegister === 'register' ? 'Register' : 'Login'}</button>
                <div className="text-center mt-2">
                    <div>{isLoginOrRegister === 'register' && (
                        <div>
                            Already a member? <button onClick={() => setIsLoginOrRegister('login')}>Login</button>
                        </div>
                    )}
                        {isLoginOrRegister === 'login' && (
                            <div>
                                Don't have an account? <button onClick={() => setIsLoginOrRegister('register')}>Register</button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}