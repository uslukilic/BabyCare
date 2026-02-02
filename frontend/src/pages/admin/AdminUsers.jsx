import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    babyAge: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch {
      alert("Kullanıcılar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        babyAge: Number(form.babyAge),
      });

      alert("Kullanıcı eklendi");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        babyAge: "",
      });

      loadUsers();
    } catch {
      alert("Kullanıcı eklenemedi");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Kullanıcı silinsin mi?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      alert("Silme başarısız");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-12">
      {/* ===== BAŞLIK ===== */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Kullanıcı Yönetimi
      </h1>

      {/* ===== KULLANICI EKLE ===== */}
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Yeni Kullanıcı Ekle</h2>

        <form
          onSubmit={createUser}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="firstName"
            placeholder="Ad"
            value={form.firstName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="lastName"
            placeholder="Soyad"
            value={form.lastName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Şifre"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="phoneNumber"
            placeholder="Telefon"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="babyAge"
            type="number"
            placeholder="Bebek Yaşı (ay)"
            value={form.babyAge}
            onChange={handleChange}
            required
            className="input"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="px-8 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
            >
              Kullanıcı Ekle
            </button>
          </div>
        </form>
      </div>

      {/* ===== KULLANICI TABLOSU ===== */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Ad Soyad</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Telefon</th>
              <th className="px-6 py-3 text-left">Bebek Yaşı</th>
              <th className="px-6 py-3 text-right">İşlem</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td className="px-6 py-4">{user.babyAge}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
