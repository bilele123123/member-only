import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Board() {
    const {
        username,
        setUsername: setLoggedInUserName,
        setId,
        role,
        validateSecretCode,
    } = useContext(UserContext);
    const [secretCodeInput, setSecretCodeInput] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSecretCodeSubmit = async (e) => {
        e.preventDefault();

        // Call the validateSecretCode function with the user's input
        await validateSecretCode(secretCodeInput);

        // Clear the input field
        setSecretCodeInput("");
    };

    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            setLoggedInUserName("");
            setImmediate("");
        } catch (error) {
            console.error("Log-out failed", error);
        }
    };

    return (
        <div className="flex h-screen bg-blue-100">
            <div className="flex flex-col w-screen items-center">
                <div className="bg-blue-300 w-screen">
                    <div className="m-2 flex items-center justify-between w-auto font-bold text-xl">
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8"
                            >
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5+.157 3.768+.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                            </svg>
                            <div>Member's Only</div>
                        </div>

                        <div
                            className="flex items-center"
                            onMouseEnter={() => setIsFormVisible(true)}
                            onMouseLeave={() => setIsFormVisible(false)}
                        >
                            {role === "admin" ? (
                                <div className="flex items-center">Special User</div>
                            ) : (
                                <div className="flex items-center">Regular User</div>
                            )}

                            {isFormVisible && (
                                <form className="ml-4" onSubmit={handleSecretCodeSubmit}>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter Secret Code"
                                        value={secretCodeInput}
                                        onChange={(e) => setSecretCodeInput(e.target.value)}
                                    />
                                    <button className="bg-green-500 hover:bg-green-700 p-1 rounded-full ml-2" type="submit">Submit</button>
                                </form>
                            )}
                        </div>

                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div>{username}</div>
                            <button
                                className="bg-red-100 p-2 m-2 rounded-xl"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-blue-100 w-screen h-screen">
                    <div className="bg-red-100 h-1/4 w-1/3">
                        This is a test message, for the Member-Only application built using
                        MERN stack. Today is October 21st, 2023, I am working on the
                        Member's Only fullstack-application. Currently several features I
                        need to implement include creating API handle request and Endpoint
                        to grab user messages and information.
                        <div className="bg-blue-300 flex">
                            <div className="mr-5">bilele123123</div>
                            <div>October 18th, 2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
