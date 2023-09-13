export default function Board() {
    return (
        <div className="flex justify-center h-screen bg-blue-100">
            <div className="flex flex-col w-screen items-center">
                <div className="bg-red-100 w-3/4 h-20">Nav</div>
                <div className="bg-blue-300 w-3/4 h-screen">Main content</div>
            </div>
        </div>
    );
}
