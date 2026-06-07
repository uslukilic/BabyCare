import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminSurvey() {
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState("");
  const [optionText, setOptionText] = useState("");

  useEffect(() => {
    loadActiveSurvey();
  }, []);

  const loadActiveSurvey = async () => {
    try {
      const res = await api.get("/survey/active");
      setActiveSurvey(res.data);
    } catch {
      setActiveSurvey(null);
    } finally {
      setLoading(false);
    }
  };

  const createSurvey = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/survey", { question });
      setActiveSurvey(res.data);
      setQuestion("");
    } catch {
      alert("Anket oluşturulamadı");
    }
  };

  const addOption = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/survey/${activeSurvey.id}/options`, {
        text: optionText,
      });

      setOptionText("");
      loadActiveSurvey();
    } catch {
      alert("Seçenek eklenemedi");
    }
  };

  const deleteSurvey = async () => {
    if (!window.confirm("Aktif anket silinsin mi?")) return;

    try {
      await api.delete(`/survey/${activeSurvey.id}`);
      setActiveSurvey(null);
    } catch {
      alert("Anket silinemedi");
    }
  };

  if (loading) {
    return <p className="text-gray-600">Yükleniyor...</p>;
  }

  return (
    <div className="space-y-12">
      {/* ===== BAŞLIK ===== */}
      <h1 className="text-2xl font-semibold text-gray-900">Anket Yönetimi</h1>

      {/* ===== AKTİF ANKET YOKSA ===== */}
      {!activeSurvey && (
        <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl">
          <h2 className="text-lg font-semibold mb-6">Yeni Anket Oluştur</h2>

          <form onSubmit={createSurvey} className="space-y-4">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Anket sorusu"
              required
              className="input"
            />

            <button
              type="submit"
              className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
            >
              Anket Oluştur
            </button>
          </form>
        </div>
      )}

      {/* ===== AKTİF ANKET VARSA ===== */}
      {activeSurvey && (
        <div className="space-y-8">
          {/* Anket Kartı */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-semibold mb-2">Aktif Anket</h2>

            <p className="text-gray-800 font-medium mb-6">
              {activeSurvey.question}
            </p>

            <ul className="space-y-2 mb-6">
              {activeSurvey.options?.map((opt) => (
                <li
                  key={opt.id}
                  className="px-4 py-2 border border-gray-200 rounded-md"
                >
                  {opt.text}
                </li>
              ))}
            </ul>

            <button
              onClick={deleteSurvey}
              className="text-red-600 hover:underline"
            >
              Anketi Sil
            </button>
          </div>

          {/* Seçenek Ekle */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl">
            <h3 className="text-md font-semibold mb-4">Seçenek Ekle</h3>

            <form onSubmit={addOption} className="flex gap-4">
              <input
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
                placeholder="Seçenek metni"
                required
                className="input"
              />

              <button
                type="submit"
                className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
              >
                Ekle
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
