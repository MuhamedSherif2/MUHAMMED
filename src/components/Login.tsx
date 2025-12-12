import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../server/login";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

// Login.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  try {
    const data = await login(email.trim(), password);

    if (data?.token) {
      console.log("Login success:", data);
      localStorage.setItem("token", data.token);
      navigate('/admin');
    } else {
      setError("Invalid email or password");
    }
  } catch (err: any) {
    console.error('Login error:', err.response?.data || err.message);
    setError(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white dark:bg-gray-700 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded dark:bg-gray-600 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded dark:bg-gray-600 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;