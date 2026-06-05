import { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(
        email,
        password
      );

      localStorage.setItem(
      "access_token",
      data.access_token
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            TalentFlow AI
          </h1>

          <p className="text-gray-500 mt-2">
            AI Powered Recruitment Platform
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
          >
            Sign In
          </button>

          <div className="text-center mt-6">

  <span className="text-gray-500">
    Don't have an account?
  </span>

  <a
    href="/signup"
    className="ml-2 text-blue-600 font-semibold"
  >
    Create Account
  </a>

</div>

        </form>

      </div>

    </div>
  );
}

export default Login;