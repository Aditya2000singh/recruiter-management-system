import { useState } from "react";
import { register } from "../services/authService";

function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await register(
        name,
        email,
        password
      );

      alert(
        "Account created successfully"
      );

      window.location.href = "/";

    } catch {

      alert(
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl">

        <h1 className="text-5xl font-bold text-center text-slate-900">
          TalentFlow AI
        </h1>

        <p className="text-center text-gray-500 mt-4 mb-8">
          Create Recruiter Account
        </p>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-semibold"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;