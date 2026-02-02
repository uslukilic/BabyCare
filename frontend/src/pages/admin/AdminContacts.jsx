import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await api.get("/admin/contacts");
      setMessages(res.data);
    } catch {
      alert("Mesajlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/admin/contacts/${id}/read`);
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)),
      );
    } catch {
      alert("Okundu işaretlenemedi");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Mesaj silinsin mi?")) return;

    try {
      await api.delete(`/admin/contacts/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
    } catch {
      alert("Silme başarısız");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-8">
      {/* ===== BAŞLIK ===== */}
      <h1 className="text-2xl font-semibold text-gray-900">
        İletişim Mesajları
      </h1>

      {/* ===== TABLO ===== */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Ad Soyad</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Telefon</th>
              <th className="px-6 py-3 text-left">Bebek Yaşı</th>
              <th className="px-6 py-3 text-left">Mesaj</th>
              <th className="px-6 py-3 text-left">Durum</th>
              <th className="px-6 py-3 text-right">İşlem</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className={msg.isRead ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4">{msg.id}</td>
                <td className="px-6 py-4">
                  {msg.firstName} {msg.lastName}
                </td>
                <td className="px-6 py-4">{msg.email}</td>
                <td className="px-6 py-4">{msg.phone}</td>
                <td className="px-6 py-4">{msg.babyAge}</td>
                <td className="px-6 py-4 max-w-xs truncate">{msg.message}</td>
                <td className="px-6 py-4">
                  {msg.isRead ? (
                    <span className="text-gray-500">Okundu</span>
                  ) : (
                    <span className="text-pink-600 font-medium">Yeni</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  {!msg.isRead && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="text-pink-600 hover:underline"
                    >
                      Okundu
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
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
