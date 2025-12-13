import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import api from "../api/axios";
import { Card,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password || !form.name) {
      setError("All fields required.");
      return;
    }

    try {
      const res = await api.post("/users/register", form);

      // auto-login after successful registration  
      dispatch(
        loginUser({ email: form.email, password: form.password })
      ).then((r) => {
        if (r.meta.requestStatus === "fulfilled") {
          navigate("/dashboard");
        }
      });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
  <Card className="w-full max-w-md shadow-lg">
    <CardContent className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label htmlFor="name" className="mb-1">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email" className="mb-1">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="password" className="mb-1">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </Button>
      </form>

      <Separator className="my-6" />

      <p className="text-sm text-center text-gray-500">
        Already have an account? <span className="text-blue-500 hover:underline cursor-pointer">Login</span>
      </p>
    </CardContent>
  </Card>
</div>
  );
}
