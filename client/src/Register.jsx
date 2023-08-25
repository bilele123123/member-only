export default function Register() {
    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto">
                <input text="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border"></input>
                <input text="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"></input>
                <input text="secret" placeholder="secret code" className="block w-full rounded-sm p-2 mb-2 border"></input>
                <button className="bg-blue-500 text-white block w-full rounded-sm">Register</button>
            </form>
        </div>
    )
}