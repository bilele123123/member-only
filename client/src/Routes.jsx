import { useContext } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";
import Board from "./Board";

export default function Routes() {
    const {username, id} = useContext(UserContext);

    if (username) {
        return (
            <Board />
        )
    }

    return (
        <RegisterAndLoginForm />
    )
}