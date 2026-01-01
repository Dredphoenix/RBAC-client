import { Link } from "react-router-dom";

export default function UnAuthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">401</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Unauthorized</h2>
                <p className="text-gray-600 mb-8">You don't have permission to access this resource.</p>
                <Link
                    to="/dashboard"
                    className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}