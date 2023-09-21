export default function Board() {
    return (
        <div className="flex justify-center h-screen bg-blue-100">
            <div className="flex flex-col w-screen items-center">
                <div className="bg-blue-300 w-screen h-20">
                    <div>Members Only</div>
                    <div>
                        <button className="bg-red-100 p-2 m-2">Log In</button>
                        <button className="bg-red-100 p-2 m-2">Register</button>
                    </div>
                </div>
                <div className="bg-blue-100 w-screen h-screen">
                    <div>Main content</div>
                    <div className="bg-red-100 h-1/4 w-1/3">
                        Messages box
                        <div>
                            Poster info
                            <div>User profile</div>
                            <div>Date</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
