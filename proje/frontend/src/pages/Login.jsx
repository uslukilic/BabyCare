import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data.token);
      navigate("/");
    } catch {
      alert("Email veya şifre hatalı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F7ECF3] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-10">
        {/* Başlık */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          Giriş Yap
        </h1>
        <p className="text-gray-600 text-sm mb-8 text-center">
          Hesabınıza giriş yaparak devam edin
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />

          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-medium transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </section>
  );
}
