import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    wallet: ""
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    try {
const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error);
      }

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {

      setError(err.message);

    }

  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          University Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            className="border p-3 rounded w-full"
            placeholder="University Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            className="border p-3 rounded w-full"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            className="border p-3 rounded w-full"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <input
            className="border p-3 rounded w-full"
            placeholder="Wallet Address"
            value={form.wallet}
            onChange={(e)=>setForm({...form,wallet:e.target.value})}
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Register
          </button>

        </form>

        {error &&
          <p className="text-red-600 mt-4">
            {error}
          </p>
        }

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );

}

export default Register;