import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    });
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

    {error && (
      <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
    )}

    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  </div>
</div>

  );
}
