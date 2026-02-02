import { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    babyAge: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contact", {
        ...form,
        babyAge: Number(form.babyAge),
      });

      alert("Mesajınız alındı");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        babyAge: "",
        message: "",
      });
    } catch {
      alert("Mesaj gönderilemedi");
    }
  };

  return (
    <>
      {/* ===== ÜST BAŞLIK ===== */}
      <section className="w-full bg-[#F7ECF3] py-24">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-[42px] font-semibold text-gray-900 mb-4">
            İletişim
          </h1>
          <p className="text-gray-600 text-lg">
            Sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="w-full bg-white py-32">
        <div className="max-w-3xl mx-auto px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-12 space-y-8"
          >
            {/* Ad Soyad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="firstName"
                placeholder="Ad"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
              />

              <input
                name="lastName"
                placeholder="Soyad"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Email Telefon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
              />

              <input
                name="phone"
                placeholder="Telefon"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Bebek yaşı */}
            <input
              type="number"
              name="babyAge"
              placeholder="Bebek Yaşı (ay)"
              value={form.babyAge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500"
            />

            {/* Mesaj */}
            <textarea
              name="message"
              placeholder="Mesajınız"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-500 resize-none"
            />

            {/* Gönder */}
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-4 rounded-full font-medium
                         hover:bg-pink-700 transition"
            >
              Gönder
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
