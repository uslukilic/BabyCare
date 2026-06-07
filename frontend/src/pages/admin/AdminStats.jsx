import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch {
      alert("İstatistikler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-10">
      {/* ===== BAŞLIK ===== */}
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* ===== KARTLAR ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Kullanıcı */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">Toplam Kullanıcı</p>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.userCount}
          </p>
        </div>

        {/* Video */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">Toplam Video</p>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.videoCount}
          </p>
        </div>

        {/* Anket */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">Toplam Anket</p>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.surveyCount}
          </p>
        </div>

        {/* Mesaj */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">Toplam Mesaj</p>
          <p className="text-3xl font-semibold text-gray-900">
            {stats.contactCount}
          </p>
        </div>

        {/* Okunmamış Mesaj – VURGULU */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
          <p className="text-sm text-pink-600 mb-2 font-medium">
            Okunmamış Mesaj
          </p>
          <p className="text-3xl font-semibold text-pink-700">
            {stats.unreadContactCount}
          </p>
        </div>
      </div>
    </div>
  );
}
